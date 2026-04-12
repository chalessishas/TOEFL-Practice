#!/usr/bin/env python3
"""
TOEFL PDF Question Extractor
Converts PDF pages to images, sends to Claude API for structured extraction,
outputs JSON ready for the TOEFL Reading app.

Usage:
  python3 scripts/extract-pdf.py <pdf_path> [--output output.json] [--pages 1-20]

Requires:
  - ANTHROPIC_API_KEY env var
  - pip install pymupdf anthropic
"""

import sys
import os
import json
import argparse
import base64
import fitz  # pymupdf
import anthropic

EXTRACTION_PROMPT = """You are extracting TOEFL Reading questions from exam screenshots.

Analyze the images and extract ALL reading content into structured JSON.

The exam has these task types in the Reading section:
1. "complete_words" — Fill in missing letters in a paragraph
2. "daily_life" — Read emails/notices and answer questions (multiple questions per reading material)
3. "academic_passage" — Read an academic passage and answer questions

For each group of related questions, output one object with this structure:

For "daily_life" type:
{
  "type": "daily_life",
  "title": "short descriptive title",
  "material_type": "email" | "notice" | "letter",
  "material": {
    "subject": "email subject if applicable",
    "from": "sender name",
    "to": "recipient name",
    "body": "full text of the email/notice"
  },
  "questions": [
    {
      "id": question_number,
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correct": 0  // 0-indexed, your best judgment based on the passage
    }
  ]
}

For "academic_passage" type:
{
  "type": "academic_passage",
  "title": "passage title",
  "passage": "full text of the passage (all paragraphs)",
  "questions": [
    {
      "id": question_number,
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correct": 0,  // 0-indexed, your best judgment
      "question_type": "detail" | "vocab" | "inference" | "attitude" | "purpose" | "negative_fact"
    }
  ]
}

For "complete_words" type:
{
  "type": "complete_words",
  "paragraph_with_blanks": "the paragraph with ____ for blanks",
  "paragraph_complete": "your best reconstruction of the full paragraph"
}

IMPORTANT:
- Extract the FULL text of passages and emails — don't summarize
- For questions, determine the correct answer based on the passage content
- Include the question_type classification for academic passage questions
- If a word is highlighted/underlined in the passage for a vocab question, note it in the question text
- Skip pages that are just instructions or section headers (no questions)
- Only extract Reading section content (stop at Listening section)

Output ONLY valid JSON array. No markdown, no explanation."""


def pdf_pages_to_images(pdf_path, page_range=None, dpi=200):
    """Convert PDF pages to base64 PNG images."""
    doc = fitz.open(pdf_path)
    images = []

    if page_range:
        start, end = page_range
        pages = range(start - 1, min(end, len(doc)))
    else:
        pages = range(len(doc))

    for i in pages:
        page = doc[i]
        mat = fitz.Matrix(dpi / 72, dpi / 72)
        pix = page.get_pixmap(matrix=mat)
        img_bytes = pix.tobytes("png")
        b64 = base64.standard_b64encode(img_bytes).decode("utf-8")
        images.append({"page": i + 1, "data": b64})
        print(f"  Converted page {i + 1}/{pages[-1] + 1}", file=sys.stderr)

    doc.close()
    return images


def extract_questions(images, batch_size=10):
    """Send images to Claude API in batches and extract questions."""
    client = anthropic.Anthropic()
    all_results = []

    for i in range(0, len(images), batch_size):
        batch = images[i:i + batch_size]
        page_nums = [img["page"] for img in batch]
        print(f"\nProcessing pages {page_nums[0]}-{page_nums[-1]}...", file=sys.stderr)

        content = []
        for img in batch:
            content.append({
                "type": "text",
                "text": f"--- Page {img['page']} ---"
            })
            content.append({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/png",
                    "data": img["data"]
                }
            })

        content.append({"type": "text", "text": EXTRACTION_PROMPT})

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=8192,
            messages=[{"role": "user", "content": content}]
        )

        raw = response.content[0].text.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1]
            raw = raw.rsplit("```", 1)[0]

        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                all_results.extend(parsed)
            else:
                all_results.append(parsed)
            print(f"  Extracted {len(parsed) if isinstance(parsed, list) else 1} item(s)", file=sys.stderr)
        except json.JSONDecodeError as e:
            print(f"  WARNING: Failed to parse JSON from pages {page_nums}: {e}", file=sys.stderr)
            print(f"  Raw output saved to _debug_batch_{i}.txt", file=sys.stderr)
            with open(f"_debug_batch_{i}.txt", "w") as f:
                f.write(raw)

    return all_results


def convert_to_app_format(extracted):
    """Convert extracted data to the format used by the TOEFL app (data.js)."""
    app_passages = []

    for item in extracted:
        if item.get("type") == "academic_passage":
            passage = {
                "id": len(app_passages) + 1,
                "title": item.get("title", "Untitled"),
                "topic": "Academic Reading",
                "passage": item.get("passage", ""),
                "questions": []
            }

            type_map = {
                "detail": "detail",
                "vocab": "vocab",
                "inference": "inference",
                "attitude": "attitude",
                "purpose": "inference",
                "negative_fact": "detail",
            }

            for q in item.get("questions", []):
                passage["questions"].append({
                    "id": q["id"],
                    "type": type_map.get(q.get("question_type", "detail"), "detail"),
                    "text": q["text"],
                    "options": q["options"],
                    "correct": q.get("correct", 0),
                })

            app_passages.append(passage)

        elif item.get("type") == "daily_life":
            mat = item.get("material", {})
            body = mat.get("body", "")
            subject = mat.get("subject", "")
            sender = mat.get("from", "")
            recipient = mat.get("to", "")

            header = ""
            if subject:
                header += f"Subject: {subject}\n"
            if recipient:
                header += f"Dear {recipient},\n\n"
            passage_text = header + body
            if sender:
                passage_text += f"\n\n{sender}"

            passage = {
                "id": len(app_passages) + 1,
                "title": item.get("title", subject or "Email"),
                "topic": "Daily Life Reading",
                "material_type": item.get("material_type", "email"),
                "passage": passage_text,
                "questions": []
            }

            for q in item.get("questions", []):
                passage["questions"].append({
                    "id": q["id"],
                    "type": "detail",
                    "text": q["text"],
                    "options": q["options"],
                    "correct": q.get("correct", 0),
                })

            app_passages.append(passage)

    return app_passages


def main():
    parser = argparse.ArgumentParser(description="Extract TOEFL questions from PDF")
    parser.add_argument("pdf", help="Path to the TOEFL PDF file")
    parser.add_argument("--output", "-o", default=None, help="Output JSON file path")
    parser.add_argument("--pages", "-p", default=None, help="Page range, e.g. '1-20'")
    parser.add_argument("--raw", action="store_true", help="Output raw extraction (skip app format conversion)")
    parser.add_argument("--batch-size", "-b", type=int, default=8, help="Pages per API call (default: 8)")
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: Set ANTHROPIC_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(args.pdf):
        print(f"ERROR: File not found: {args.pdf}", file=sys.stderr)
        sys.exit(1)

    page_range = None
    if args.pages:
        parts = args.pages.split("-")
        page_range = (int(parts[0]), int(parts[1]))

    output_path = args.output
    if not output_path:
        base = os.path.splitext(os.path.basename(args.pdf))[0]
        output_path = f"{base}_questions.json"

    print(f"Converting PDF pages to images...", file=sys.stderr)
    images = pdf_pages_to_images(args.pdf, page_range)
    print(f"Total pages: {len(images)}", file=sys.stderr)

    print(f"\nSending to Claude API for extraction...", file=sys.stderr)
    extracted = extract_questions(images, batch_size=args.batch_size)

    if args.raw:
        result = extracted
    else:
        print(f"\nConverting to app format...", file=sys.stderr)
        result = convert_to_app_format(extracted)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nDone! Extracted {len(result)} passage(s) -> {output_path}", file=sys.stderr)

    for i, item in enumerate(result):
        title = item.get("title", item.get("type", "?"))
        q_count = len(item.get("questions", []))
        print(f"  {i+1}. {title} ({q_count} questions)", file=sys.stderr)


if __name__ == "__main__":
    main()

import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { ThemeProvider } from './shared/ThemeContext.jsx'
import Layout from './Layout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Reading = lazy(() => import('./pages/Reading.jsx'))
const Writing = lazy(() => import('./pages/Writing.jsx'))
const BuildSentence = lazy(() => import('./writing/BuildSentence.jsx'))
const WriteEmail = lazy(() => import('./writing/WriteEmail.jsx'))
const AcademicDiscussion = lazy(() => import('./writing/AcademicDiscussion.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <ErrorBoundary>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/build-sentence" element={<BuildSentence />} />
            <Route path="/writing/email" element={<WriteEmail />} />
            <Route path="/writing/discussion" element={<AcademicDiscussion />} />
          </Routes>
        </Suspense>
      </Layout>
      </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

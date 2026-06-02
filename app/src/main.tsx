import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root') as HTMLElement

// Design-preview routes — additive, separate from production reader
// Access via /preview/a, /preview/b, or /preview/c
const previewMatch = window.location.pathname.match(/^\/preview\/([abc])$/)
if (previewMatch) {
  const variant = previewMatch[1] as 'a' | 'b' | 'c'
  import('./components/previews/PreviewRoot').then(({ PreviewRoot }) => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <PreviewRoot variant={variant} />
      </React.StrictMode>,
    )
  })
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

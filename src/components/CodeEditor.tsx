import { useRef, useEffect, useCallback } from 'react'
import './CodeEditor.css'

interface Props {
  value: string
  onChange: (v: string) => void
}

// Simple syntax highlighting for CSS/HTML
function highlight(code: string): string {
  return code
    // HTML tags
    .replace(/(&lt;\/?\w+)/g, '<span class="ce-tag">$1</span>')
    .replace(/(\/&gt;|&gt;)/g, '<span class="ce-tag">$1</span>')
    // CSS properties
    .replace(/([\w-]+)\s*:/g, '<span class="ce-prop">$1</span>:')
    // Values after colon (simplified)
    .replace(/:\s*([^;{}]+)/g, ': <span class="ce-val">$1</span>')
    // Selectors before {
    .replace(/([.#\w][^{]*)\{/g, '<span class="ce-sel">$1</span>{')
    // Braces
    .replace(/([{}])/g, '<span class="ce-brace">$1</span>')
    // Strings
    .replace(/(".*?"|'.*?')/g, '<span class="ce-str">$1</span>')
    // Comments
    .replace(/(\/\*.*?\*\/)/gs, '<span class="ce-comment">$1</span>')
}

export default function CodeEditor({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [])

  useEffect(() => {
    if (highlightRef.current) {
      const escaped = value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      highlightRef.current.innerHTML = highlight(escaped) + '\n'
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newVal = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newVal)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="code-editor">
      <div className="ce-line-numbers">
        {value.split('\n').map((_, i) => (
          <div key={i} className="ce-line-num">{i + 1}</div>
        ))}
      </div>
      <div className="ce-content">
        <pre ref={highlightRef} className="ce-highlight" aria-hidden="true" />
        <textarea
          ref={textareaRef}
          className="ce-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  )
}

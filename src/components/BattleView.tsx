import { useState, useRef, useCallback, useEffect } from 'react'
import type { Challenge } from '../data/challenges'
import { useProgress } from '../hooks/useProgress'
import { compareCanvases } from '../utils/pixelDiff'
import CodeEditor from './CodeEditor'
import './BattleView.css'

interface Props {
  challenge: Challenge
  progress: ReturnType<typeof useProgress>
  onBack: () => void
  onNext: () => void
}

const CANVAS_W = 400
const CANVAS_H = 300

export default function BattleView({ challenge, progress, onBack, onNext }: Props) {
  const [code, setCode] = useState('<div></div>\n<style>\n\n</style>')
  const [accuracy, setAccuracy] = useState(0)
  const [lastScore, setLastScore] = useState<number | null>(null)
  const [showDiff, setShowDiff] = useState(false)
  const [showHints, setShowHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [view, setView] = useState<'output' | 'diff'>('output')
  const targetCanvasRef = useRef<HTMLCanvasElement>(null)
  const diffCanvasRef = useRef<HTMLCanvasElement>(null)
  const outputIframeRef = useRef<HTMLIFrameElement>(null)

  const chars = code.replace(/\s/g, '').length
  const p = progress.getProgress(challenge.id)

  // Render target into hidden canvas on mount
  useEffect(() => {
    const canvas = targetCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">
      <foreignObject width="100%" height="100%">
        ${challenge.html}
      </foreignObject>
    </svg>`
    img.onload = () => { ctx.drawImage(img, 0, 0) }
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
  }, [challenge])

  const handleScore = useCallback(() => {
    const targetCanvas = targetCanvasRef.current
    if (!targetCanvas) return

    // Render output to canvas via same SVG foreignObject trick
    const outputCanvas = document.createElement('canvas')
    outputCanvas.width = CANVAS_W
    outputCanvas.height = CANVAS_H
    const ctx = outputCanvas.getContext('2d')!

    const fullHtml = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0}body{width:${CANVAS_W}px;height:${CANVAS_H}px;overflow:hidden}</style></head><body>${code}</body></html>`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">${fullHtml}</div>
      </foreignObject>
    </svg>`

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const { accuracy: acc, diffCanvas } = compareCanvases(targetCanvas, outputCanvas)
      setAccuracy(acc)
      const score = progress.update(challenge.id, acc, chars)
      setLastScore(score)

      // Draw diff
      if (diffCanvasRef.current) {
        const dCtx = diffCanvasRef.current.getContext('2d')!
        dCtx.clearRect(0, 0, CANVAS_W, CANVAS_H)
        dCtx.drawImage(diffCanvas, 0, 0)
      }
      setShowDiff(true)
    }
    img.onerror = () => {
      setAccuracy(0)
      setLastScore(0)
    }
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
  }, [code, chars, challenge.id, progress])

  const outputSrcDoc = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0}body{width:${CANVAS_W}px;height:${CANVAS_H}px;overflow:hidden}</style></head><body>${code}</body></html>`

  const shareText = lastScore !== null
    ? `I scored ${lastScore} pts on CSS Battle #${challenge.id} "${challenge.title}" with ${chars} chars! 🎯 ${accuracy}% accuracy`
    : ''

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="battle">
      <header className="battle-header">
        <button className="battle-back" onClick={onBack}>← Challenges</button>
        <div className="battle-title-wrap">
          <span className="battle-num">#{challenge.id}</span>
          <h1 className="battle-title">{challenge.title}</h1>
          <span className={`battle-diff battle-diff--${challenge.difficulty}`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="battle-header-actions">
          {lastScore !== null && <button className="battle-share-btn" onClick={handleShare}>📋 Share</button>}
          <button className="battle-next-btn" onClick={onNext}>Next →</button>
        </div>
      </header>

      <div className="battle-desc">{challenge.description}</div>

      <div className="battle-main">
        {/* Left: Target */}
        <div className="battle-panel">
          <div className="battle-panel-header">
            <span className="battle-panel-label">🎯 Target</span>
            <div className="battle-colors">
              {challenge.colors.map((c, i) => (
                <span key={i} className="battle-color-swatch" style={{ background: c }} title={c} onClick={() => navigator.clipboard.writeText(c)} />
              ))}
            </div>
          </div>
          <div className="battle-canvas-wrap">
            <iframe
              srcDoc={`<!DOCTYPE html><html><body style="margin:0;padding:0;width:${CANVAS_W}px;height:${CANVAS_H}px;overflow:hidden">${challenge.html}</body></html>`}
              sandbox="allow-same-origin"
              className="battle-canvas-iframe"
              tabIndex={-1}
            />
            <canvas ref={targetCanvasRef} width={CANVAS_W} height={CANVAS_H} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="battle-editor-panel">
          <div className="battle-panel-header">
            <span className="battle-panel-label">✏️ Your Code</span>
            <span className="battle-chars">{chars} chars</span>
          </div>
          <CodeEditor value={code} onChange={setCode} />
          <div className="battle-actions">
            <button className="battle-score-btn" onClick={handleScore}>
              🎯 Score It
            </button>
            <button className="battle-hint-btn" onClick={() => setShowHints(h => Math.min(h + 1, challenge.hints.length))}>
              💡 Hint {showHints > 0 ? `(${showHints}/${challenge.hints.length})` : ''}
            </button>
            <button className="battle-solution-btn" onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? '🙈 Hide' : '👁 Solution'}
            </button>
          </div>
          {showHints > 0 && (
            <div className="battle-hints">
              {challenge.hints.slice(0, showHints).map((h, i) => (
                <div key={i} className="battle-hint">💡 {h}</div>
              ))}
            </div>
          )}
          {showSolution && (
            <div className="battle-solution">
              <pre>{challenge.css}</pre>
            </div>
          )}
        </div>

        {/* Right: Output */}
        <div className="battle-panel">
          <div className="battle-panel-header">
            <span className="battle-panel-label">
              {view === 'output' ? '📺 Your Output' : '🔍 Diff View'}
            </span>
            {showDiff && (
              <button className="battle-toggle-diff" onClick={() => setView(v => v === 'output' ? 'diff' : 'output')}>
                {view === 'output' ? 'Show Diff' : 'Show Output'}
              </button>
            )}
          </div>
          <div className="battle-canvas-wrap">
            <iframe
              ref={outputIframeRef}
              srcDoc={outputSrcDoc}
              sandbox="allow-same-origin"
              className="battle-canvas-iframe"
              tabIndex={-1}
              style={{ display: view === 'output' ? 'block' : 'none' }}
            />
            <canvas
              ref={diffCanvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="battle-diff-canvas"
              style={{ display: view === 'diff' ? 'block' : 'none' }}
            />
          </div>
          {lastScore !== null && (
            <div className="battle-results">
              <div className="battle-result-item">
                <span className="battle-result-label">Accuracy</span>
                <span className="battle-result-value" style={{ color: accuracy >= 90 ? 'var(--green)' : accuracy >= 50 ? 'var(--yellow)' : 'var(--red)' }}>
                  {accuracy.toFixed(1)}%
                </span>
              </div>
              <div className="battle-result-item">
                <span className="battle-result-label">Characters</span>
                <span className="battle-result-value">{chars}</span>
              </div>
              <div className="battle-result-item">
                <span className="battle-result-label">Score</span>
                <span className="battle-result-value" style={{ color: 'var(--accent)' }}>{lastScore}</span>
              </div>
            </div>
          )}
          {p && (
            <div className="battle-best">
              Best: {p.bestAccuracy.toFixed(1)}% · {p.bestChars === Infinity ? '—' : `${p.bestChars} chars`} · {p.bestScore} pts · {p.attempts} attempts
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

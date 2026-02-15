import type { Challenge } from '../data/challenges'
import { useProgress } from '../hooks/useProgress'
import './ChallengeList.css'

interface Props {
  challenges: Challenge[]
  progress: ReturnType<typeof useProgress>
  onSelect: (id: number) => void
}

const difficultyOrder = ['beginner', 'intermediate', 'advanced'] as const
const difficultyLabel = { beginner: '🟢 Beginner', intermediate: '🟡 Intermediate', advanced: '🔴 Advanced' }
const difficultyColors = { beginner: '#a6e3a1', intermediate: '#f9e2af', advanced: '#f38ba8' }

export default function ChallengeList({ challenges, progress, onSelect }: Props) {
  const grouped = difficultyOrder.map(d => ({
    key: d,
    label: difficultyLabel[d],
    color: difficultyColors[d],
    items: challenges.filter(c => c.difficulty === d),
  }))

  return (
    <div className="challenge-list">
      <header className="cl-header">
        <div className="cl-logo">
          <span className="cl-brace">{'{ '}</span>
          <span className="cl-title">CSS Battle Solo</span>
          <span className="cl-brace">{' }'}</span>
        </div>
        <p className="cl-subtitle">Write minimal CSS to match the target. Score by accuracy & code length.</p>
        <div className="cl-stats">
          <span>🏆 Total Score: <strong>{progress.totalScore.toLocaleString()}</strong></span>
          <span>✅ Solved: <strong>{progress.solvedCount}</strong>/{challenges.length}</span>
        </div>
      </header>

      <div className="cl-mobile-note">📱 Best experienced on desktop for the split-screen editor.</div>

      {grouped.map(group => (
        <section key={group.key} className="cl-section">
          <h2 className="cl-section-title" style={{ color: group.color }}>{group.label}</h2>
          <div className="cl-grid">
            {group.items.map(c => {
              const p = progress.getProgress(c.id)
              return (
                <button key={c.id} className="cl-card" onClick={() => onSelect(c.id)}>
                  <div className="cl-card-preview">
                    <iframe
                      srcDoc={`<!DOCTYPE html><html><body style="margin:0;padding:0;width:400px;height:300px;overflow:hidden;transform-origin:0 0;transform:scale(0.35)">${c.html}</body></html>`}
                      sandbox="allow-same-origin"
                      style={{ width: 140, height: 105, border: 'none', pointerEvents: 'none', overflow: 'hidden' }}
                      tabIndex={-1}
                    />
                  </div>
                  <div className="cl-card-info">
                    <span className="cl-card-num">#{c.id}</span>
                    <span className="cl-card-title">{c.title}</span>
                    {p?.solved && <span className="cl-card-check">✅</span>}
                  </div>
                  {p && (
                    <div className="cl-card-score">
                      <span>{p.bestAccuracy.toFixed(1)}%</span>
                      <span>{p.bestChars === Infinity ? '—' : `${p.bestChars} chars`}</span>
                      <span className="cl-card-pts">{p.bestScore} pts</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      ))}

      <footer className="cl-footer">
        <p>CSS Battle Solo — Practice CSS like a puzzle game. No login required. Progress saved locally.</p>
      </footer>
    </div>
  )
}

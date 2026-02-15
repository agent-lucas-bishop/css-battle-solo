import { useState, useEffect, useCallback } from 'react'

export interface ChallengeProgress {
  bestAccuracy: number
  bestChars: number
  bestScore: number
  attempts: number
  solved: boolean
}

type ProgressMap = Record<number, ChallengeProgress>

const STORAGE_KEY = 'css-battle-solo-progress'

function load(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch { return {} }
}

function save(p: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function calcScore(accuracy: number, chars: number): number {
  // Accuracy is 0-100, chars bonus inversely proportional
  const accScore = accuracy * 6 // max 600
  const charScore = Math.max(0, 400 - Math.max(0, chars - 50) * 2) // max 400 at ≤50 chars
  return Math.round(accScore + charScore)
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(load)

  useEffect(() => { save(progress) }, [progress])

  const update = useCallback((id: number, accuracy: number, chars: number) => {
    const score = calcScore(accuracy, chars)
    setProgress(prev => {
      const existing = prev[id] || { bestAccuracy: 0, bestChars: Infinity, bestScore: 0, attempts: 0, solved: false }
      return {
        ...prev,
        [id]: {
          bestAccuracy: Math.max(existing.bestAccuracy, accuracy),
          bestChars: Math.min(existing.bestChars, chars || Infinity),
          bestScore: Math.max(existing.bestScore, score),
          attempts: existing.attempts + 1,
          solved: existing.solved || accuracy >= 90,
        }
      }
    })
    return score
  }, [])

  const getProgress = useCallback((id: number): ChallengeProgress | undefined => {
    return progress[id]
  }, [progress])

  const totalScore = Object.values(progress).reduce((s, p) => s + p.bestScore, 0)
  const solvedCount = Object.values(progress).filter(p => p.solved).length

  return { progress, update, getProgress, totalScore, solvedCount }
}

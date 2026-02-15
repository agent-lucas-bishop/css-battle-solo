import { useState } from 'react'
import { challenges } from './data/challenges'
import { useProgress } from './hooks/useProgress'
import ChallengeList from './components/ChallengeList'
import BattleView from './components/BattleView'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const progressHook = useProgress()

  const challenge = selectedId !== null ? challenges.find(c => c.id === selectedId) : null

  if (challenge) {
    return (
      <BattleView
        challenge={challenge}
        progress={progressHook}
        onBack={() => setSelectedId(null)}
        onNext={() => {
          const idx = challenges.findIndex(c => c.id === challenge.id)
          if (idx < challenges.length - 1) setSelectedId(challenges[idx + 1].id)
        }}
      />
    )
  }

  return (
    <ChallengeList
      challenges={challenges}
      progress={progressHook}
      onSelect={setSelectedId}
    />
  )
}

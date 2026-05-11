// app/src/components/diagrams/InfoCard.tsx
import { motion, AnimatePresence } from 'motion/react'

export interface InfoCardData {
  title: string
  description: string
  accentColor: string
  position: { x: number; y: number }
}

interface InfoCardProps {
  card: InfoCardData | null
}

export function InfoCard({ card }: InfoCardProps) {
  return (
    <AnimatePresence>
      {card && (
        <motion.div
          key={card.title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed z-50 bg-[#161b22] rounded-lg p-4 shadow-2xl"
          style={{
            left: card.position.x + 10,
            top: card.position.y + 10,
            maxWidth: 280,
            border: `2px solid ${card.accentColor}`,
          }}
        >
          {/* Pulsing border overlay */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ border: `2px solid ${card.accentColor}` }}
            animate={{ opacity: [0.6, 0.15, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p
            className="font-mono text-xs font-bold mb-2 tracking-widest"
            style={{ color: card.accentColor }}
          >
            {card.title.toUpperCase()}
          </p>
          <p className="font-mono text-xs text-white/70 leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

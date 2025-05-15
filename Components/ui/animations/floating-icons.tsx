"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Braces,
  Code,
  FileCode,
  FileJson,
  FileIcon as FilePy,
  FileIcon as FileTs,
  FileType,
  Hash,
  Terminal,
} from "lucide-react"

export default function FloatingIcons() {
  const [icons, setIcons] = useState<
    {
      id: number
      Icon: any
      x: number
      y: number
      size: number
      rotation: number
      color: string
      delay: number
    }[]
  >([])

  useEffect(() => {
    // Available icons
    const iconComponents = [Code, FileCode, FileJson, FilePy, FileTs, FileType, Hash, Terminal, Braces]

    // Generate random icons
    const newIcons = Array.from({ length: 15 }, (_, i) => {
      const Icon = iconComponents[Math.floor(Math.random() * iconComponents.length)]
      const size = 24 + Math.floor(Math.random() * 24)

      // Generate a random color with a bias towards tech colors
      const hues = [180, 210, 240, 270, 300, 330] // Cyan, Blue, Indigo, Purple, Pink
      const hue = hues[Math.floor(Math.random() * hues.length)]
      const color = `hsl(${hue}, 100%, 70%)`

      return {
        id: i,
        Icon,
        x: Math.random() * 100, // percentage of viewport width
        y: Math.random() * 100, // percentage of viewport height
        size,
        rotation: Math.random() * 360,
        color,
        delay: Math.random() * 5,
      }
    })

    setIcons(newIcons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            color: icon.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
            scale: [0, 1, 0.9, 1],
            y: [0, -20, 20, -10],
            rotate: [0, icon.rotation / 2, icon.rotation, icon.rotation / 2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: icon.delay,
          }}
        >
          <icon.Icon size={icon.size} />
        </motion.div>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

export default function HexagonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Hexagon properties
    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalSpacing = hexHeight
    const hexHorizontalSpacing = hexWidth * 0.75

    // Calculate grid dimensions
    const columns = Math.ceil(canvas.width / hexHorizontalSpacing) + 1
    const rows = Math.ceil(canvas.height / hexVerticalSpacing) + 1

    // Create hexagons
    const hexagons: {
      x: number
      y: number
      size: number
      opacity: number
      hue: number
      pulse: number
      pulseSpeed: number
    }[] = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
        const y = row * hexVerticalSpacing

        // Add some randomness to position
        const xOffset = (Math.random() - 0.5) * 10
        const yOffset = (Math.random() - 0.5) * 10

        hexagons.push({
          x: x + xOffset,
          y: y + yOffset,
          size: hexSize * (0.5 + Math.random() * 0.5),
          opacity: 0.1 + Math.random() * 0.3,
          hue: 180 + Math.random() * 60, // Blue to purple range
          pulse: Math.random() * Math.PI * 2, // Random starting phase
          pulseSpeed: 0.5 + Math.random() * 1.5,
        })
      }
    }

    // Draw hexagon function
    const drawHexagon = (x: number, y: number, size: number, color: string, lineWidth = 1) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }

    // Mouse interaction
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    canvas.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    // Animation loop
    let animationId: number
    let lastTime = 0

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw hexagons
      hexagons.forEach((hex) => {
        // Update pulse
        hex.pulse += hex.pulseSpeed * 0.001 * deltaTime

        // Calculate opacity with pulse
        const pulseOpacity = hex.opacity + Math.sin(hex.pulse) * 0.1

        // Mouse interaction
        let finalOpacity = pulseOpacity
        let finalSize = hex.size
        let lineWidth = 1
        let hueShift = 0

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - hex.x
          const dy = mouse.y - hex.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const intensity = 1 - distance / mouse.radius
            finalOpacity = Math.min(1, pulseOpacity + intensity * 0.5)
            finalSize = hex.size * (1 + intensity * 0.3)
            lineWidth = 1 + intensity * 2
            hueShift = intensity * 60 // Shift hue based on mouse proximity
          }
        }

        // Draw hexagon
        const color = `hsla(${hex.hue + hueShift}, 100%, 70%, ${finalOpacity})`
        drawHexagon(hex.x, hex.y, finalSize, color, lineWidth)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

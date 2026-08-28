'use client';

import { useInView } from 'framer-motion';
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    startTransition,
    type PointerEvent,
} from 'react';

interface PixelScatterLogoProps {
    image?: { src?: string; srcSet?: string; alt?: string }
    sizingMode?: 'compact' | 'fill'
    displayWidth?: number
    pixelSize?: number
    dotGap?: number
    interactionRadius?: number
    force?: number
    returnSpeed?: number
    transparentBackground?: boolean
    backgroundColor?: string
}

interface DotParticle {
    ox: number
    oy: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
}

export function PixelScatterLogo(props: PixelScatterLogoProps) {
    const {
        image = {
            src: '/brand-icon.png',
            alt: 'Dev Alliance Forge',
        },
        sizingMode = 'compact',
        displayWidth = 373,
        pixelSize = 4,
        dotGap = 2,
        interactionRadius = 60,
        force = 0.85,
        returnSpeed = 0.08,
        transparentBackground = true,
        backgroundColor = '#FFFFFF',
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const particlesRef = useRef<DotParticle[]>([])
    const pointerRef = useRef({ x: 0, y: 0, active: false })
    const sizeRef = useRef({
        width: Math.max(1, displayWidth),
        height: Math.max(1, (displayWidth * 130) / 373),
    })
    const [aspectRatio, setAspectRatio] = useState(373 / 130)
    const isInView = useInView(containerRef, { amount: 0.1 })

    const step = useMemo(
        () => Math.max(1, Math.round(pixelSize + dotGap)),
        [pixelSize, dotGap]
    )
    const radius = useMemo(() => Math.max(1, pixelSize / 2), [pixelSize])

    const buildParticles = useCallback(() => {
        const img = imgRef.current
        if (!img) return

        const width = sizeRef.current.width
        const height = sizeRef.current.height
        if (width <= 0 || height <= 0) return

        const offscreen = document.createElement('canvas')
        offscreen.width = Math.max(1, Math.floor(width))
        offscreen.height = Math.max(1, Math.floor(height))
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true })
        if (!offCtx) return

        offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
        const iw = img.naturalWidth
        const ih = img.naturalHeight
        const scale = Math.min(offscreen.width / iw, offscreen.height / ih)
        const dw = Math.max(1, Math.floor(iw * scale))
        const dh = Math.max(1, Math.floor(ih * scale))
        offCtx.drawImage(
            img,
            (offscreen.width - dw) / 2,
            (offscreen.height - dh) / 2,
            dw,
            dh
        )
        let imageData: Uint8ClampedArray
        try {
            imageData = offCtx.getImageData(
                0,
                0,
                offscreen.width,
                offscreen.height
            ).data
        } catch {
            particlesRef.current = []
            return
        }
        const particles: DotParticle[] = []

        for (let y = 0; y < offscreen.height; y += step) {
            for (let x = 0; x < offscreen.width; x += step) {
                const index = (y * offscreen.width + x) * 4
                const a = imageData[index + 3]!
                if (a < 30) continue
                const r = imageData[index]!
                const g = imageData[index + 1]!
                const b = imageData[index + 2]!
                particles.push({
                    ox: x,
                    oy: y,
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
                })
            }
        }

        particlesRef.current = particles
    }, [step])

    const updateCanvasSize = useCallback(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const measuredWidth = container.clientWidth || 1
        const measuredHeight = container.clientHeight || 1
        sizeRef.current.width = measuredWidth
        sizeRef.current.height = measuredHeight

        const dpr =
            typeof window !== 'undefined'
                ? Math.max(1, window.devicePixelRatio || 1)
                : 1
        canvas.width = Math.floor(measuredWidth * dpr)
        canvas.height = Math.floor(measuredHeight * dpr)
        canvas.style.width = `${measuredWidth}px`
        canvas.style.height = `${measuredHeight}px`

        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, measuredWidth, measuredHeight)
    }, [])

    const drawFrame = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { width, height } = sizeRef.current
        ctx.clearRect(0, 0, width, height)

        if (!transparentBackground) {
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, width, height)
        }

        const pointer = pointerRef.current
        const particles = particlesRef.current

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]!
            if (pointer.active) {
                const dx = p.x - pointer.x
                const dy = p.y - pointer.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance > 0 && distance < interactionRadius) {
                    const power = (1 - distance / interactionRadius) * force
                    p.vx += (dx / distance) * power
                    p.vy += (dy / distance) * power
                }
            }

            p.vx += (p.ox - p.x) * returnSpeed
            p.vy += (p.oy - p.y) * returnSpeed
            p.vx *= 0.88
            p.vy *= 0.88
            p.x += p.vx
            p.y += p.vy

            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
            ctx.fill()
        }
    }, [
        backgroundColor,
        force,
        interactionRadius,
        radius,
        returnSpeed,
        transparentBackground,
    ])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const source = image?.src
        if (!source) return
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.decoding = 'async'
        img.onload = () => {
            imgRef.current = img
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                startTransition(() => {
                    setAspectRatio(img.naturalWidth / img.naturalHeight)
                })
            }
            updateCanvasSize()
            buildParticles()
            drawFrame()
        }
        img.src = source

        return () => {
            imgRef.current = null
        }
    }, [image, buildParticles, drawFrame, updateCanvasSize])

    useEffect(() => {
        if (typeof window === 'undefined') return
        updateCanvasSize()
        buildParticles()
        drawFrame()
    }, [
        displayWidth,
        sizingMode,
        step,
        updateCanvasSize,
        buildParticles,
        drawFrame,
    ])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const el = containerRef.current
        if (!el) return

        const observer = new ResizeObserver(() => {
            updateCanvasSize()
            buildParticles()
            drawFrame()
        })
        observer.observe(el)

        return () => {
            observer.disconnect()
        }
    }, [buildParticles, drawFrame, updateCanvasSize])

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (!isInView) return

        let running = true
        const loop = () => {
            if (!running) return
            drawFrame()
            rafRef.current = window.requestAnimationFrame(loop)
        }
        rafRef.current = window.requestAnimationFrame(loop)

        return () => {
            running = false
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [drawFrame, isInView])

    const wrapperStyle = useMemo(() => {
        if (sizingMode === 'compact') {
            return {
                width: `${Math.max(40, displayWidth)}px`,
                height: `${Math.max(20, displayWidth / aspectRatio)}px`,
            }
        }
        return {
            width: '100%',
            height: '100%',
        }
    }, [aspectRatio, displayWidth, sizingMode])

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            const canvas = canvasRef.current
            if (!canvas) return
            const rect = canvas.getBoundingClientRect()
            pointerRef.current.x = event.clientX - rect.left
            pointerRef.current.y = event.clientY - rect.top
            pointerRef.current.active = true
        },
        []
    )

    const handlePointerLeave = useCallback(() => {
        pointerRef.current.active = false
    }, [])

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label={image?.alt || 'Dev Alliance Forge'}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
                position: 'relative',
                display: 'block',
                overflow: 'hidden',
                background: transparentBackground
                    ? 'transparent'
                    : backgroundColor,
                ...wrapperStyle,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: 'block', width: '100%', height: '100%' }}
            />
        </div>
    )
}
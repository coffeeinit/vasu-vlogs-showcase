<template>
  <div class="min-h-screen flex flex-col app-shell">
    <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true"></canvas>
    <div ref="cursorRing" class="custom-cursor-ring" aria-hidden="true"><span ref="cursorLabel">View</span></div>
    <div ref="cursorDot" class="custom-cursor-dot" aria-hidden="true"></div>
    <NavBar @open-promo="isPromoOpen = true" />
    <router-view class="flex-grow" />
    <Footer />
    <PromoPopup :is-visible="isPromoOpen" @update:is-visible="isPromoOpen = $event" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import PromoPopup from '@/components/PromoPopup.vue'

const isPromoOpen = ref(false)
const particleCanvas = ref(null)
const cursorRing = ref(null)
const cursorDot = ref(null)
const cursorLabel = ref(null)
let cleanupInteraction

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const canvas = particleCanvas.value
  const context = canvas?.getContext('2d')
  let frame
  let particles = []

  if (canvas && context && !reduceMotion) {
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: finePointer ? 34 : 18 }, (_, index) => ({
        x: (index * 97) % window.innerWidth,
        y: (index * 53) % window.innerHeight,
        radius: 1 + (index % 3) * 0.45,
        drift: 0.08 + (index % 4) * 0.025,
        phase: index * 1.7
      }))
    }
    const draw = (time) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach((particle, index) => {
        const y = (particle.y - time * particle.drift * 0.01) % (window.innerHeight + 30)
        const x = particle.x + Math.sin(time * 0.00035 + particle.phase) * 18
        const alpha = 0.08 + ((Math.sin(time * 0.001 + index) + 1) / 2) * 0.12
        context.beginPath()
        context.fillStyle = index % 5 === 0 ? `rgba(255, 104, 74, ${alpha + 0.08})` : `rgba(18, 18, 18, ${alpha})`
        context.arc(x, y < -10 ? y + window.innerHeight + 30 : y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    frame = requestAnimationFrame(draw)
    cleanupInteraction = () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
    }
  }

  if (finePointer && !reduceMotion && cursorRing.value && cursorDot.value) {
    const ring = cursorRing.value
    const dot = cursorDot.value
    const label = cursorLabel.value
    let pointerX = -100
    let pointerY = -100
    let ringX = pointerX
    let ringY = pointerY
    const move = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      const target = event.target.closest('a, button, [data-cursor]')
      ring.classList.toggle('is-active', Boolean(target))
      label.textContent = target?.dataset.cursor || (target?.tagName === 'A' ? 'Open' : 'View')
    }
    const animate = () => {
      ringX += (pointerX - ringX) * 0.14
      ringY += (pointerY - ringY) * 0.14
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(animate)
    }
    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(animate)
    cleanupInteraction = () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }
})

onBeforeUnmount(() => cleanupInteraction?.())
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-[#121212]/80 backdrop-blur-sm">
    <div class="bg-[#f3f0e8] border border-black max-w-lg w-full relative p-7 md:p-11 shadow-[8px_8px_0_#d7ff3f]">
      <button @click="closePopup" aria-label="Close promotion" class="absolute top-4 right-4 w-9 h-9 border border-black rounded-full flex items-center justify-center hover:bg-[#ff684a] hover:text-white transition-colors"><svg viewBox="0 0 20 20" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke-linecap="round"/></svg></button>
      <p class="font-mono text-[10px] uppercase tracking-[.2em] text-black/55 mb-7">The Vasu edit / 01</p>
      <h2 class="font-display text-5xl md:text-6xl tracking-[-.08em] leading-[.86] mb-6">Something<br /><span class="text-[#ff684a]">good is coming.</span></h2>
      <p class="text-sm leading-relaxed text-black/65 max-w-sm mb-8">A curated edit of gifts and lifestyle pieces for people who notice the details. First drop, soon.</p>
      <router-link @click="closePopup" to="/shop" class="inline-flex items-center gap-3 bg-[#121212] text-[#f3f0e8] rounded-full px-6 py-3 text-xs uppercase tracking-[.16em] font-bold hover:bg-[#ff684a] transition-colors">Explore the store <svg viewBox="0 0 16 16" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
defineProps({ isVisible: Boolean })
const emit = defineEmits(['update:isVisible'])
onMounted(() => { const hasSeenPromo = localStorage.getItem('vasu_promo_v1'); if (!hasSeenPromo && new Date() < new Date('2026-12-31')) setTimeout(() => emit('update:isVisible', true), 1500) })
const closePopup = () => { emit('update:isVisible', false); localStorage.setItem('vasu_promo_v1', 'true') }
</script>

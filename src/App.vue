<template>
  <div class="min-h-screen flex flex-col">
    <NavBar @open-promo="isPromoOpen = true" />
    <router-view class="flex-grow" />
    <Footer />
    <PromoPopup :is-visible="isPromoOpen" @update:is-visible="isPromoOpen = $event" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import PromoPopup from '@/components/PromoPopup.vue'

const isPromoOpen = ref(false)
</script>

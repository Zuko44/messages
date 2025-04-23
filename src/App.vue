<script lang="ts" setup>
import MessageCarousel from './components/MessageCarousel.vue';
import MessageList from './components/MessageList.vue';
import MessageForm from './components/MessageForm.vue';
</script>

<template>
  <main class="app-container">
    <MessageCarousel />
    <MessageList />
    <MessageForm />
  </main>
</template>
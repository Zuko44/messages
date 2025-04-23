<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useMessageStore } from '../store/messages';

const store = useMessageStore();
const currentMessage = ref<{ id: number; content: string } | null>(null);
const index = ref(0);
let intervalId: number | null = null;

const rotate = () => {
  const visible = store.visibleMessages;
  if (visible.length === 0) {
    currentMessage.value = null;
    return;
  }

  if (index.value >= visible.length) {
    index.value = 0;
  }

  currentMessage.value = visible[index.value];
  index.value = (index.value + 1) % visible.length;
};

watch(
  () => store.visibleMessages,
  (visible) => {
    if (!visible.length) {
      currentMessage.value = null;
      return;
    }

    const stillVisible = visible.some(m => m.id === currentMessage.value?.id);
    if (!stillVisible) {
      rotate();
    }
  },
  { deep: true }
);

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (!store.isQueueActive) return;
    rotate();
  }, 5000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

function hideCurrent() {
  if (currentMessage.value) {
    const visible = store.visibleMessages;
    const currentId = currentMessage.value.id;

    const currentIndex = visible.findIndex(msg => msg.id === currentId);

    store.hideMessage(currentId);

    index.value = currentIndex % store.visibleMessages.length;
    rotate();
  }
}
</script>

<template>
  <div class="carousel-container">
    <div v-if="currentMessage" class="carousel-message">
      <button @click="hideCurrent">×</button>
      <span>{{ currentMessage.content }}</span>
    </div>
    <div v-else class="carousel-empty">Нет сообщений для отображения</div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-container {
  background-color: #E4F0ED;
  padding: 16px 20px; 
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px; 
  max-width: 601px;
  margin: 24px auto;
}

.carousel-message {
  flex: 1;
  display: flex;
  gap: 12px; 
  align-items: center;
  font-weight: 500;
  font-size: 14px;

  button {
    color: #198754;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
}

.carousel-empty {
  font-size: 14px;
  font-style: italic;
  color: #6c757d;
}
</style>

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Message } from '../types/Message';

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([]);
  const hiddenIds = ref<number[]>([]);
  const isQueueActive = ref(true);

  const visibleMessages = computed(() =>
    messages.value.filter((m) => !hiddenIds.value.includes(m.id))
  );

  function addMessage(content: string) {
    const message: Message = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
    };
    messages.value.push(message);
  }

  function hideMessage(id: number) {
    if (!hiddenIds.value.includes(id)) {
      hiddenIds.value.push(id);
    }
  }

  return {
    messages,
    hiddenIds,
    isQueueActive,
    visibleMessages,
    addMessage,
    hideMessage
  };
});
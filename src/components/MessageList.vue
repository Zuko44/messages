<script lang="ts" setup>
import { useMessageStore } from '../store/messages';

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

const store = useMessageStore();
</script>

<template>
  <div class="message-list-container">
    <ul class="message-list">
      <li
        v-for="message in store.messages"
        :key="message.id"
        class="message-item"
      >
        <span v-if="store.hiddenIds.includes(message.id)" class="message-x">×</span>
        <div class="message-content">
          <span>{{ message.content }}</span>
          <time class="message-time">{{ formatDate(message.timestamp) }}</time>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.message-list-container {
  max-width: 601px;
  background: #F6F8FA;
  border-radius: 6px; 
  padding: 16px; 
  max-height: 307px;
  overflow-y: auto;
  margin: 24px auto;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-item {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px; 
  word-break: break-word;
  color: #212529;
}

.message-x {
  color: #000;
  font-size: 20px; 
  line-height: 1;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-time {
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
}
</style>

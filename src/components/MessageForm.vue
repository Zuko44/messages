<script lang="ts" setup>
import { ref } from 'vue';
import { useMessageStore } from '../store/messages';

const store = useMessageStore();
const newMessage = ref('');

function submitForm() {
  if (newMessage.value.trim()) {
    store.addMessage(newMessage.value.trim());
    newMessage.value = '';
  }
}
</script>

<template>
  <div class="message-form-container">
    <form @submit.prevent="submitForm" class="form">
      <fieldset class="form-fieldset">
        <legend>Новое сообщение</legend>
        <input
          v-model="newMessage"
          type="text"
          class="form-input"
          required
        />
      </fieldset>
      <button type="submit" class="form-button">ОТПРАВИТЬ</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.message-form-container {
  max-width: 601px;
  margin: 24px auto;
}

.form {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  .form-fieldset {
    all: unset;
    flex: 1;
    border: 1px solid #DEE2E8;
    border-radius: 8px;
    padding: 14px 12px;
    position: relative;

    legend {
      font-size: 12.8px;
      color: #6c757d;
      padding: 0 8px;
      margin-left: 8px;
      background: #fff;
      position: absolute;
      top: -9.6px;
      left: 12px;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 14px;
    }
  }

  .form-button {
    width: 183px;
    height: 50px;
    padding: 15px 12px;
    font-size: 16px;
    color: white;
    background: linear-gradient(to right, #056E4F, #11A679);
    border: none;
    border-radius: 8px;
    flex-shrink: 0;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.2s ease;

    &:hover {
      background: linear-gradient(to right, #157347, #218838);
    }
  }
}

@media (max-width: 425px) {
  .form {
    flex-direction: column;
    align-items: stretch;

    .form-button {
      width: 100%;
    }
  }
}
</style>
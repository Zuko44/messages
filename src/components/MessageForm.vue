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
  margin: 16px auto;
}

.form {
  display: flex;
  gap: 8px; 
  align-items: center;
  flex-wrap: wrap;

  .form-fieldset {
    border: 1px solid #ced4da;
    border-radius: 8px; 
    padding: 12px; 
    padding-top: 20px;
    position: relative;
    margin: 0;
    flex: 1 1 auto;

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
    width: 182.4px; 
    height: 50px; 
    padding: 15px 12px; 
    font-size: 16px; 
    color: white;
    background: linear-gradient(to right, #056E4F, #11A679);
    border: none;
    border-radius: 8px; 
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.2s ease;

    &:hover {
      background: linear-gradient(to right, #157347, #218838);
    }
  }
}

@media (max-width: 370px) {
  .form {
    flex-direction: column;
    align-items: stretch;

    .form-button {
      width: 100%;
    }
  }
}
</style>
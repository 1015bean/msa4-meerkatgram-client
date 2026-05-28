<script setup>
// 자식 컴포넌트 props 보내줌: 부모들 편하신대로 가져다 쓰세요~

const props = defineProps({
  'type': String,
  'placeholder': String,
  'readonly': Boolean,
  'required': Boolean,
});

// v-model로 들어온 데이터를 다시 부모(Login컴포넌트)로 보냄
const model = defineModel();
</script>

<template>
  <input
    :type="props.type"
    :readonly="props.readonly"
    :required="props.required"
    :placeholder="props.placeholder"
    v-model="model"
  >
</template>

<style scoped>
input {
  width: 300px;
  height: 85px;
  font-size: 24px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
</style>

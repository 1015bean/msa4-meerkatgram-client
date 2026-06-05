<script setup>
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
</script>

<template>
  <div 
  class="container"
  v-if="authStore.isLoggedIn && authStore.userInfo"
  >
  <div class="profile-box">
    <div 
    class="bg-image-circle profile"
    :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
    ></div>
  </div>
  
  <div class="info-box">
    <div class="nick">{{ authStore.userInfo.nick }}</div>
    <div class="write-count">posts {{ authStore.userInfo.countPosts }}</div>
    <div class="redirect-box">
      <div 
      class="bg-image-square redirect-icon-posts-index"
      style="background-image: url('/icons/gallery.png');"
      ></div>
      <div 
      class="bg-image-square redirect-icon-posts-create"
      style="background-image: url('/icons/plus-sign.png');"
      ></div>
      <div 
      class="bg-image-square redirect-icon-posts-info"
      style="background-image: url('/icons/person.png');"
      ></div>
    </div>
    
  </div>
</div>
<hr>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.redirect-box {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  gap: 10px;
}

</style>

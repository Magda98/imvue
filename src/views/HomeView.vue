<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";
const user = useUserStore();

onMounted(() => {
  if (window.location.href.indexOf("access_token")) {
    user.getAccessToken();
  }
});
</script>

<template>
  <main>
    <button @click="user.getAccessTokenUrl">Zaloguj</button>
  </main>
</template>

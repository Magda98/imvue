<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  item: {
    link: string;
    views: number;
    id: string;
  };
}>();
</script>

<template>
  <div class="image">
    <img :src="props.item.link" referrerpolicy="no-referrer" />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/base.scss";
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-elevation;
  border-radius: 5px;
  padding: 20px;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    display: block;
  }
}
</style>

<script setup lang="ts">
import { defineProps } from "vue";
import { useImagesStore } from "../stores/images";

const images = useImagesStore();

function handleClick(index: number) {
  images.page = index;
  images.getUserImages();
}

function prev() {
  if (images.page > 0) {
    images.page -= 1;
    images.getUserImages();
  }
}

function next() {
  if (images.page < props.maxPages) {
    images.page += 1;
    images.getUserImages();
  }
}

interface Props {
  items: number;
  pages: Array<number>;
  maxPages: number;
  currentPage: number;
}

const props = defineProps<Props>();
</script>

<template>
  <ul class="pagination">
    <li @click="prev" class="pag prev">&lt;</li>
    <li
      class="pag"
      :class="{ active: props.currentPage === index }"
      v-for="(num, index) in props.pages"
      :key="index"
      @click="handleClick(index)"
    >
      {{ num }}
    </li>
    <li @click="next" class="pag next">&gt;</li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/assets/style/base.scss";

.pagination {
  list-style: none;
  display: flex;

  .pag {
    margin: 0 5px;

    &.active {
      color: $primary-light;
    }
  }
}
</style>

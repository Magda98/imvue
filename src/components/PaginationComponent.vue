<script setup lang="ts">
import { defineProps, ref } from "vue";

const currentPage = ref(0);

function handleClick(index: number) {
  currentPage.value = index;
  props.callback(currentPage.value);
}

function prev() {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    props.callback(currentPage.value);
  }
}

function next() {
  if (currentPage.value < props.maxPages - 1) {
    currentPage.value += 1;
    props.callback(currentPage.value);
  }
}

interface Props {
  pages: Array<number>;
  maxPages: number;
  callback: (p: number) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <ul class="pagination">
    <li @click="prev" class="pag prev">&lt;</li>
    <li
      class="pag"
      :class="{ active: currentPage === index }"
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
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  font-size: 16px;

  .pag {
    margin: 0 5px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: $primary-light;
    }

    &.active {
      color: $primary-light;
    }

    &.next,
    &.prev {
      margin: 0 10px;
    }
  }
}
</style>

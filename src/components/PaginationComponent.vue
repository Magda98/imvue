<script setup lang="ts">
function handleClick(index: number) {
  props.callback(index);
}

function prev() {
  if (props.currentPage > 0) {
    props.callback(props.currentPage - 1);
  }
}

function next() {
  if (props.currentPage < props.maxPages - 1) {
    props.callback(props.currentPage + 1);
  }
}

interface Props {
  pages: Array<number>;
  maxPages: number;
  currentPage: number;
  callback: (p: number) => void;
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

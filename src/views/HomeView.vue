<script setup lang="ts">
import { ref } from "vue";
import { useImagesStore } from "../stores/images";
import VueEasyLightbox from "vue-easy-lightbox";
import ImageComponent from "@/components/ImageComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

const images = useImagesStore();
const currentIndex = ref(0);
const visible = ref(false);

function showImg(index: number) {
  currentIndex.value = index;
  visible.value = true;
}

function handleHide() {
  visible.value = false;
}
</script>

<template>
  <div>
    <div class="image-list">
      <div
        v-for="(item, index) in images.userImages"
        :key="item.id"
        @click="() => showImg(index)"
      >
        <ImageComponent :item="item"></ImageComponent>
      </div>
    </div>
    <PaginationComponent
      :pages="images.getPagesCount"
      :max-pages="images.getMaxPagesCount"
      :callback="images.getUserImages"
    ></PaginationComponent>
    <div>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="images.getImagesUrlArray"
        :index="currentIndex"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}
</style>

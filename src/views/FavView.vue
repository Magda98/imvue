<script setup lang="ts">
import { ref } from "vue";
import { useImagesStore } from "../stores/images";
import VueEasyLightbox from "vue-easy-lightbox";
import ImageComponent from "@/components/ImageComponent.vue";

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
        v-for="(item, index) in images.userFavImages"
        :key="item.id"
        @click="() => showImg(index)"
      >
        <ImageComponent :item="item"></ImageComponent>
      </div>
    </div>
    <div>
      <vue-easy-lightbox
        :move-disabled="true"
        :visible="visible"
        :imgs="images.getFavUrlArray"
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

  @media only screen and (max-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>

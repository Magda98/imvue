<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useImagesStore } from "../stores/images";
import VueEasyLightbox from "vue-easy-lightbox";
import ImageComponent from "@/components/ImageComponent.vue";

const user = useUserStore();
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

onMounted(() => {
  if (window.location.href.indexOf("access_token")) {
    user.getAccessToken();
  }

  if (user.token) {
    images.getUserImages();
  }
});
</script>

<template>
  <div>
    <div class="image-list">
      <div
        v-for="(item, index) in images.userImages"
        :key="index"
        @click="() => showImg(index)"
      >
        <ImageComponent :item="item"></ImageComponent>
      </div>
    </div>
    <div v-if="user.userImages">
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

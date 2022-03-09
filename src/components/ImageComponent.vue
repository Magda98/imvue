<script setup lang="ts">
import { defineProps } from "vue";
import HeartIcon from "./icons/HeartIcon.vue";
import HeartIconOutline from "./icons/HeartIconOutline.vue";
import TrashIcon from "./icons/TrashIcon.vue";
import { useImagesStore } from "../stores/images";

const images = useImagesStore();

function handleClick(event: MouseEvent) {
  event.stopPropagation();
  images.togleFavouriteImage(props.item.id);
}

function handleClickDetele(event: MouseEvent) {
  event.stopPropagation();
  images.deleteImage(props.item.id);
}

interface Props {
  item: {
    link: string;
    views: number;
    id: string;
    favorite: boolean;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <div class="image-card">
    <img :src="props.item.link" referrerpolicy="no-referrer" />
    <div class="actions">
      <button
        v-if="images.getFavArray.includes(props.item.id)"
        class="btn-primary-outline"
        @click="handleClick"
      >
        <HeartIcon></HeartIcon>
      </button>
      <button v-else @click="handleClick" class="btn-primary-outline">
        <HeartIconOutline></HeartIconOutline>
      </button>
      <button @click="handleClickDetele" class="btn-primary-outline">
        <TrashIcon></TrashIcon>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/base.scss";
.image-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $bg-elevation;
  border-radius: 5px;
  padding: 20px;

  .actions {
    display: flex;
    margin-top: 10px;

    .btn-primary-outline {
      margin: 0 10px;
    }

    svg {
      width: 25px;
      margin: 0 10px;
      fill: $primary-light;
    }
  }

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    display: block;
  }
}
</style>

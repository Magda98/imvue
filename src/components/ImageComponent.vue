<script setup lang="ts">
import HeartIcon from "./icons/HeartIcon.vue";
import HeartIconOutline from "./icons/HeartIconOutline.vue";
import TrashIcon from "./icons/TrashIcon.vue";
import { useImagesStore } from "../stores/images";
import { ref } from "vue";

const images = useImagesStore();
const modal = ref(false);

function handleClick(event: MouseEvent) {
  event.stopPropagation();
  images.togleFavouriteImage(props.item.id);
}

function handleClickDetele(event: MouseEvent) {
  event.stopPropagation();
  modal.value = true;
}

function handleDeleteAgree(event: MouseEvent) {
  event.stopPropagation();
  images.deleteImage(props.item.id);
  modal.value = false;
}

function handleDeleteDiscard(event: MouseEvent) {
  event.stopPropagation();
  modal.value = false;
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
  <div v-if="modal" class="overlay"></div>
  <div v-if="modal" class="modal">
    <div modal-inner>
      <h3 class="text">Delete image?</h3>
      <div class="actions">
        <button @click="handleDeleteAgree" class="btn">YES</button>
        <button @click="handleDeleteDiscard" class="btn">NO</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/base.scss";

.overlay {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 12;
  margin: 0 auto;
  padding: 20px 55px;
  background-color: $bg-elevation;
  border-radius: 5px;

  .actions {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
}

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

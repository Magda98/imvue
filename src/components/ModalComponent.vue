<script setup lang="ts">
import { useModalStore } from "../stores/modal";
import { ref } from "vue";
import { useImagesStore } from "../stores/images";
import { useSnackbarStore } from "../stores/snackbar";
import CloseIcon from "./icons/CloseIcon.vue";

const image = ref("");

function uploadImage(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) createFile(file);
}

function handleDrop(event: DragEvent) {
  event.stopPropagation();
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  console.log(file);
  if (file) createFile(file);
}

function createFile(file: File) {
  if (!file.type.match("image.*")) {
    snackbar.show("You must add an correct image before upload", "error");
    return;
  }
  var reader = new FileReader();

  reader.onload = function (e) {
    image.value = e.target?.result as string;
    console.log(image.value);
  };
  reader.readAsDataURL(file);
}

async function handleSubmit(event: Event) {
  event.preventDefault();
  if (image.value) {
    await images.postImage(image.value.slice(22, -1));
    image.value = "";
    modal.showModal = false;
  } else {
    snackbar.show("You must add an image before upload", "error");
  }
}

const modal = useModalStore();
const images = useImagesStore();
const snackbar = useSnackbarStore();
</script>

<template>
  <div
    class="overlay"
    v-if="modal.showModal"
    @click="modal.showModal = false"
  ></div>
  <div class="modal" v-if="modal.showModal">
    <button class="close btn" @click="modal.showModal = false">
      <CloseIcon />
    </button>
    <h2 class="text">Add image to gallery</h2>
    <div class="preview">
      <img v-if="image" :src="image" alt="" class="img" />
    </div>
    <form @submit="handleSubmit" class="upload-form">
      <div @dragover.prevent @drop="handleDrop" id="drop-area">
        <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          @change="uploadImage"
        />
        <label for="image" class="btn">Drop or Select a file:</label>
      </div>
      <button type="submit" class="btn">Upload</button>
    </form>
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
  width: 50%;
  min-height: 200px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 12;
  margin: 0 auto;
  padding: 20px 55px;
  background-color: $bg-elevation;
  border-radius: 5px;

  @media only screen and (max-width: 991px) {
    padding: 10px 25px;
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 15px;
    width: 90%;
  }
  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      background-color: $bg-elevation;
      display: block;
      border: 0;
    }
  }

  #image {
    display: none;
  }

  .button {
    display: inline-block;
    padding: 10px;
    background: #ccc;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .button:hover {
    background: #ddd;
  }

  #drop-area {
    border: 2px dashed #ccc;
    border-radius: 20px;
    width: 100%;
    font-family: sans-serif;
    margin: 30px auto;
    padding: 50px;
  }
  #drop-area.highlight {
    border-color: purple;
  }
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

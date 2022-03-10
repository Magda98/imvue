<script setup lang="ts">
import { useSnackbarStore } from "../stores/snackbar";
import XIcon from "./icons/XIcon.vue";

const snackbar = useSnackbarStore();
</script>

<template>
  <div class="snackbar" v-if="snackbar.showSnackbar">
    <div class="snackbar-inner">
      <div class="text">{{ snackbar.message }}</div>
      <div class="action">
        <button class="btn" @click="snackbar.close()"><XIcon></XIcon></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/base.scss";

.snackbar {
  position: fixed;
  overflow: hidden;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;

  .snackbar-inner {
    display: inline-flex;
    align-items: center;
    position: relative;

    min-width: 288px;
    max-width: 568px;
    min-height: 48px;

    padding: 14px 24px;
    margin: 4px 4px 8px 4px;

    border-radius: 2px;
    background-color: $bg-elevation;

    box-shadow: 0 1px 3px rgba(black, 0.12), 0 1px 2px rgba(black, 0.24);

    .btn {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
}
</style>

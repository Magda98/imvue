<script setup lang="ts">
import { useSnackbarStore } from "../stores/snackbar";
import ErrorIcon from "./icons/ErrorIcon.vue";
import SuccessIcon from "./icons/SuccessIcon.vue";
import CloseIcon from "./icons/CloseIcon.vue";

const snackbar = useSnackbarStore();
</script>

<template>
  <div class="snackbar" v-if="snackbar.showSnackbar">
    <div class="snackbar-inner">
      <div class="text">{{ snackbar.message }}</div>
      <div class="icon">
        <ErrorIcon class="error" v-if="snackbar.status === 'error'"></ErrorIcon>
        <SuccessIcon
          class="success"
          v-if="snackbar.status === 'success'"
        ></SuccessIcon>
      </div>
      <button class="btn close" @click="snackbar.close()">
        <CloseIcon />
      </button>
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

    padding: 24px 48px;
    margin: 4px 4px 8px 4px;

    border-radius: 2px;
    background-color: $bg-elevation;

    box-shadow: 0 1px 3px rgba(black, 0.12), 0 1px 2px rgba(black, 0.24);

    .icon {
      margin-left: auto;
      margin-right: 5px;

      svg {
        width: 20px;
        height: 20px;
        margin-left: 15px;
      }
      .error {
        fill: #b71c1c;
      }

      .success {
        fill: #388e3c;
      }
    }

    .btn {
      position: absolute;
      right: 5px;
      top: 5px;
      border: none;
      background-color: transparent;
      fill: $primary-light;
      transition: background-color 0.3s;
      padding: 5px 10px;

      svg {
        width: 10px;
      }

      &:hover {
        background-color: rgba($primary-light, 0.2);
      }
    }
  }
}
</style>

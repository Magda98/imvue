<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";
import { onMounted } from "vue";
import { useImagesStore } from "./stores/images";
import ModalComponent from "./components/ModalComponent.vue";
import { useModalStore } from "./stores/modal";
import PlusIcon from "./components/icons/PlusIcon.vue";
import SnackBarComponent from "./components/SnackbarComponent.vue";

const user = useUserStore();
const images = useImagesStore();
const modal = useModalStore();

onMounted(async () => {
  const url = window.location.hash.substring(1);
  const hasAccesToken = new URLSearchParams(url).has("access_token");

  if (hasAccesToken) {
    user.getAccessToken();
  } else if (user.token?.length) {
    await user.setAccessToken();
    images.getUserImages();
    images.getImagesCount();
    images.getAllFav();
  }
});
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <nav v-if="user.userInfo" class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/fav">Fav</RouterLink>
      </nav>
      <div class="user-info" v-if="user.userInfo">
        <div class="user-info-inner">
          <div class="user-avatar">
            <img referrerpolicy="no-referrer" :src="user.userInfo.avatar" />
          </div>
          <a
            class="user-name"
            :href="`https://imgur.com/user/${user.userInfo.url}`"
            target="_blank"
          >
            {{ user.userInfo.url }}
          </a>
        </div>
        <button @click="user.logout" class="btn">Wyloguj</button>
      </div>
      <div v-else>
        <button class="btn" @click="user.getAccessTokenUrl">Zaloguj</button>
      </div>
    </div>
  </header>
  <main class="container" v-if="user.userInfo"><RouterView /></main>
  <main class="container" v-else>
    <h2 class="text-center">Zaloguj się aby korzystać z aplikacji 😎</h2>
  </main>
  <button
    v-if="user.userInfo"
    @click="modal.showModal = true"
    class="btn primary floating"
  >
    <PlusIcon />
  </button>
  <SnackBarComponent></SnackBarComponent>
  <ModalComponent></ModalComponent>
</template>

<style lang="scss">
@import "@/assets/style/base.scss";

.vel-btns-wrapper {
  height: 100%;
}

.container {
  max-width: 80%;
  width: 100%;
  margin: 140px auto 50px auto;
  @media only screen and (max-width: 1700px) {
    max-width: 90%;
  }
}

.text-center {
  text-align: center;
}

.btn.floating {
  position: fixed;
  z-index: 10;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 991px) {
    right: 25px;
    bottom: 25px;
  }
}

.nav {
  display: flex;
  justify-content: flex-end;

  .router-link-exact-active {
    color: $primary-light;
  }

  a {
    display: block;
    padding: 10px 20px;
    font-weight: 600;
    text-transform: uppercase;
    transition: color 0.3s;

    &:hover {
      color: $primary-light;
    }
  }
}

.header {
  background-color: $bg-elevation;
  box-shadow: 0 3px 5px rgba(27, 27, 27, 0.3);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;

  .header-inner {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 20px 0;

    @media only screen and (max-width: 768px) {
      width: 95%;
    }
  }
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;

  .user-info-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 0 20px;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  .user-name {
    color: $text;
    margin: 0 10px;
    @media only screen and (max-width: 530px) {
      display: none;
    }
  }

  .user-avatar {
    img {
      width: 50px;
      height: auto;
      display: block;
      border-radius: 5px;
    }
  }
}
</style>

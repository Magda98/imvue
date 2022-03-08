<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const user = useUserStore();
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <nav class="nav">
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
        <button class="btn">Wyloguj</button>
      </div>
      <div v-else>
        <button class="btn" @click="user.getAccessTokenUrl">Zaloguj</button>
      </div>
    </div>
  </header>
  <main class="container"><RouterView /></main>
</template>

<style lang="scss">
@import "@/assets/style/base.scss";

.container {
  max-width: 80%;
  width: 100%;
  margin: 140px auto 50px auto;
}

.nav {
  display: flex;
  justify-content: flex-end;

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
  }

  .user-name {
    color: $text;
    margin: 0 10px;
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

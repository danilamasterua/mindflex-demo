<script setup lang="ts">
import LoginBlock from "@/components/LoginBlock.vue";
import {useRouter} from "vue-router";
import {onCursorBehind, onCursorEnd} from "@/ts/floating-ui/Notification";

const router = useRouter();

function closeNotification(): void {
  let notificationBlock = document.getElementById("notification");
  if (notificationBlock) {
    notificationBlock.classList.remove("show");
  }
}
</script>

<template>
  <header>
    <div class="logo">
      <img alt="Logo Brain" src="/src/assets/img/logo_big.png">
      <a href="#" @click="router.push('/')"><i>MindFlex</i></a>
    </div>
    <login-block />
  </header>

  <RouterView />

  <div id="notification_anchor"></div>
  <div id="notification"
       class="floating-tooltip shadow fade"
       @mouseover="onCursorBehind()"
       @mouseleave="onCursorEnd()"
  >
    <div class="d-flex justify-content-between text-white">
      <h5>Сповіщення</h5>
      <button class="btn btn-sm btn-link text-white" @click="closeNotification()">
        <i class="bi bi-x"></i>
      </button>
    </div>
    <div class="bg-white rounded shadow p-2" id="notification_content"></div>
  </div>
</template>

<style scoped>
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    height: 10vh;
  }
  .logo{
    display: flex;
    align-items: center;
  }
  .logo a{
    font-size: 30px;
    text-decoration: none;
  }
  .logo img{
    width: 50px;
    height: 50px;
    margin: 5px;
  }
  #notification_anchor{
    position: absolute;
    left: 50%;
    top: 0;
  }
  #notification{
    min-width: 300px;
    max-width: fit-content;
    background-color: var(--bs-primary);
  }
  #notification:hover{
    background-color: #4b91ff;
    cursor: pointer;
  }
</style>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {User} from "@/ts/model/User";
import DashboardContent from "@/components/DashboardContent.vue";
import UserCard from "@/components/UserCard.vue";

const currentUser = ref({} as User)
let isLoaded = ref(false)

onMounted(()=>{
  currentUser.value = JSON.parse(localStorage.getItem("user"))
  isLoaded.value = true
})

</script>

<template>
  <div class="container-fluid vh-75" v-if="isLoaded">
    <div id="dashboard" class="row">
      <div class="col-3">
        <UserCard :current-user="currentUser"/>
      </div>
      <div id="dashboard_right" class="col-9 rounded shadow bg-light bg-opacity-50">
        <DashboardContent :current-user="currentUser"/>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>
  #dashboard_right{
    max-height: 85vh;
    overflow: hidden;
  }
  #dashboard{
    padding-right: 10px;
  }
</style>
<script setup lang="ts">

import type {User} from "@/ts/model/User";
import {onMounted, ref} from "vue";

const props = defineProps<{
  currentUser: User
}>()
let currentUser = ref({} as User)
let isLoaded = ref(false);
onMounted(()=>{
  currentUser.value = props.currentUser;
  isLoaded.value = true
})

</script>

<template>
      <div v-if="isLoaded" class="bg-white p-2 rounded shadow border">
        <table class="table">
          <tbody>
          <tr>
            <td>Логін</td>
            <td>{{ currentUser.login }}</td>
          </tr>
          <tr>
            <td>E-Mail</td>
            <td>{{ currentUser.email }}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary">
          <i class="bi bi-pencil"></i>
          Змінити пароль
        </button>
      </div>
</template>

<style scoped>

</style>
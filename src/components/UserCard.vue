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
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePwdModalForm">
          <i class="bi bi-pencil"></i>
          Змінити пароль
        </button>
        <div class="modal fade" id="changePwdModalForm" tabindex="-1" aria-labelledby="changePwdModalFormLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="changePwdModalFormLabel">Змінити пароль</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <label class="form-label" for="old-password-input">Старий пароль</label>
                <input class="form-control" type="password" id="old-password-input">
                <label class="form-label" for="new-password-input">Новий пароль</label>
                <input class="form-control" type="password" id="new-password-input">
                <label class="form-label" for="new-password-repeat-input">Повторіть пароль</label>
                <input class="form-control" type="password" id="new-password-repeat-input">
              </div>
              <div class="modal-footer d-flex justify-content-end">
                <button class="btn btn-primary">
                  Зберегти
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>

</style>
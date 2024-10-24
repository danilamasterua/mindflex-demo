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
  isLoaded.value = true;
})

</script>

<template>
  <div v-if="isLoaded">
    <div>
      <div class="d-flex justify-content-between">
        <div class="bg-light rounded p-2 shadow-sm w-50 mx-1">
          <div>
            <h5>Середній час виконання завдань</h5>
          </div>
          <div class="bg-white rounded border shadow-sm p-2 d-flex justify-content-between">
            <div class="bg-light rounded p-2 shadow-sm w-50 mx-1 text-center">
              <div>
                <h5>Тиждень</h5>
              </div>
              <div class="bg-white rounded border p-2">
                <h1>{{ currentUser.statistic.avgTimeWeekly }}</h1>
                <h6>Хвилин</h6>
              </div>
            </div>
            <div class="bg-light rounded p-2 shadow-sm w-50 mx-1 text-center">
              <div>
                <h5>Місяць</h5>
              </div>
              <div class="bg-white rounded border p-2">
                <h1>{{ currentUser.statistic.avgTimeMonthly }}</h1>
                <h6>Хвилин</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-light rounded p-2 shadow-sm w-50 mx-1">
          <div>
            <h5>Виконані завдання</h5>
          </div>
          <div class="bg-white rounded border shadow-sm p-2 d-flex justify-content-between">
            <div class="bg-light rounded p-2 shadow-sm w-50 mx-1 text-center">
              <div>
                <h5>Тиждень</h5>
              </div>
              <div class="bg-white rounded border p-2">
                <h1>{{ currentUser.statistic.weeklyProgress }}</h1>
                <h6>Завдань</h6>
              </div>
            </div>
            <div class="bg-light rounded p-2 shadow-sm w-50 mx-1 text-center">
              <div>
                <h5>Місяць</h5>
              </div>
              <div class="bg-white rounded border p-2">
                <h1>{{ currentUser.statistic.monthlyProgress }}</h1>
                <h6>Завдань</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-primary rounded p-2 shadow-sm mx-1 my-2" v-if="!currentUser.isTodayTaskEnded">
        <div class="bg-white rounded border shadow-sm p-2">
          <h3>Виконайте щоденне завдання</h3>
          <p>Не зупиняйтеся, продовжуйте поліпшувати свою пам'ять</p>
          <RouterLink class="btn btn-primary" to="/game">Розпочати завдання</RouterLink>
        </div>
      </div>
      <div class="bg-light rounded p-2 shadow-sm mx-1 my-2" v-else>
        <div class="bg-white rounded border shadow-sm p-2">
          <h3>Ви вже виконали завдання на сьогодні</h3>
          <p>Втім ніколи не пізно покращити свій результат</p>
          <router-link class="btn btn-light" to="/game">Розпочати завдання</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
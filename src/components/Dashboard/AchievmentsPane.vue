<script setup lang="ts">

import type {User} from "@/ts/model/User";
import {onMounted, ref} from "vue";
import Achievement from "@/components/Dashboard/AchievementComponents/Achievement.vue";
import UserRating from "@/components/Dashboard/AchievementComponents/UserRating.vue";

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
  <div v-if="isLoaded">
    <div class="d-flex justify-content-between">
      <div class="bg-light rounded p-2 shadow w-50 mx-1">
        <div>
          <h5>Ваші досягнення</h5>
        </div>
        <div class="bg-white rounded border shadow-sm p-2" style="height: 50vh; overflow-y: auto">
          <div v-if="currentUser.statistic.achievements.length > 0" class="bg-light rounded p-2 border my-1" v-for="achievement in currentUser.statistic.achievements" :key="achievement.name">
            <Achievement :achievement="achievement"/>
          </div>
          <div v-else>
            <p>Нажаль тут поки нічого немає, продовжуйте проходити завдання і заробляйте досягнення</p>
          </div>
        </div>
      </div>
      <div class="bg-light rounded p-2 shadow w-50 mx-1 mh-100">
        <div>
          <h5>Рейтинг користувачів</h5>
        </div>
        <div class="bg-white rounded border shadow-sm p-2" style="height: 50vh; overflow-y: auto; scrollbar-width: none;">
          <UserRating :currentUser="currentUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
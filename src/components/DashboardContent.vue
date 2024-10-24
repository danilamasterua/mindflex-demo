<script setup lang="ts">

import type {User} from "@/ts/model/User";
import {onMounted, ref} from "vue";
import PreferencesPane from "@/components/Dashboard/PreferencesPane.vue";
import AchievmentsPane from "@/components/Dashboard/AchievmentsPane.vue";
import StatisticPane from "@/components/Dashboard/StatisticPane.vue";

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
    <ul class="nav nav-underline mx-2" id="dashboard-tabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active"
                id="statistic-tab"
                data-bs-toggle="tab"
                data-bs-target="#statistic-pane"
                type="button" role="tab"
                aria-controls="statistic-pane"
                aria-selected="true">Статистика</button>
      </li>
      <li class="nav-item">
        <button class="nav-link"
                id="achievements-tab"
                data-bs-toggle="tab"
                data-bs-target="#achievements-pane"
                type="button" role="tab"
                aria-controls="achievements-pane"
                aria-selected="false">Досягнення та рейтинг
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link"
                id="preferences-tab"
                data-bs-toggle="tab"
                data-bs-target="#preferences-pane"
                type="button" role="tab"
                aria-controls="preferences-pane"
                aria-selected="false">Персоналізація</button>
      </li>
    </ul>
    <div class="tab-content rounded my-2" id="dashboard-tabs-content">
      <div class="tab-pane fade show active" id="statistic-pane" role="tabpanel" aria-labelledby="statistic-pane" tabindex="0">
        <StatisticPane :current-user="currentUser"/>
      </div>
      <div class="tab-pane fade" id="achievements-pane" role="tabpanel" aria-labelledby="achievements-pane" tabindex="0">
        <AchievmentsPane :current-user="currentUser"/>
      </div>
      <div class="tab-pane fade" id="preferences-pane" role="tabpanel" aria-labelledby="preferences-pane" tabindex="0">
        <PreferencesPane :current-user="currentUser"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import Logic from "@/ts/model/Game_Pairs/Logic";
import GP_Stage_Memorization from "@/components/Game_Pairs/GP_Stage_Memorization.vue";
import GP_Stage_GamePlay from "@/components/Game_Pairs/GP_Stage_GamePlay.vue";
import GP_Stage_Remembering from "@/components/Game_Pairs/GP_Stage_Remembering.vue";
import type {User} from "@/ts/model/User";
import {useRouter} from "vue-router";

const router = useRouter()

let origPairs: [[string, string], [string, string]][] = []
let isLoaded = ref(false)
let stage = ref(1)

onMounted(()=>{
  origPairs = Logic.genRandomPairs()
  console.log(origPairs)
  isLoaded.value = true
})

function onEndTask(){
  const user: User = JSON.parse(localStorage.getItem("user"))
  user.statistic.weeklyProgress = user.statistic.weeklyProgress + 1;
  user.isTodayTaskEnded = true;
  localStorage.setItem("user", JSON.stringify(user));
  router.push("/dashboard");
}

</script>

<template>
  <div class="bg-light bg-opacity-75 rounded p-2 shadow mx-1" v-if="isLoaded">
    <GP_Stage_Memorization v-if="stage === 1" :orig-pairs="origPairs" @endStageOne="stage++"/>
    <GP_Stage_GamePlay v-else-if="stage === 2" @endStageTwo="stage++"/>
    <GP_Stage_Remembering v-else-if="stage === 3" :orig-pairs="origPairs" @endTask="onEndTask"/>
  </div>
  <div v-else>
    <div class="d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
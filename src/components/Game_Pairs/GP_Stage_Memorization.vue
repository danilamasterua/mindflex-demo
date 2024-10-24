<script setup lang="ts">

import {onMounted, ref} from "vue";

const props = defineProps<{
  origPairs: [[string, string], [string, string]][]
}>()
const emit = defineEmits(['endStageOne'])
let timer = null
let timerTime = ref(30)

onMounted(()=>{
  proceedTimer()
})

function goToNextStage(){
  emit('endStageOne')
}

function proceedTimer(){
  timer = setInterval(()=>{
    if(timerTime.value!==0) {
      timerTime.value--;
    } else {
      clearInterval(timer)
      goToNextStage()
    }
  }, 1000)
}

</script>

<template>
  <div class="d-flex justify-content-between">
    <h5><b>Запам'ятайте пари</b></h5>
    <h5>
      <b> {{ timerTime }} сек</b>
    </h5>
  </div>
  <div class="bg-white rounded border shadow-sm p-2 d-flex justify-content-center">
    <div class="bg-light rounded p-2 shadow d-flex justify-content-center mx-2" v-for="pair in props.origPairs">
      <div class="bg-white rounded border shadow-sm p-2">
        <img class="d-inline-flex" :src="pair[0][1]" :alt="pair[0][0]" style="width: 150px" />
        <img class="d-inline-flex" :src="pair[1][1]" :alt="pair[1][0]" style="width: 150px" />
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-end my-2">
    <button class="btn btn-primary" @click="goToNextStage">Далі</button>
  </div>
</template>

<style scoped>

</style>
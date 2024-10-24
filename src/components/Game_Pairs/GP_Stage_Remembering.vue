<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps<{
  origPairs: [[string, string], [string, string]][]
}>()
const emit = defineEmits(["endTask"])
let firstColumn = ref([] as string[[string, string]])
let lastColumn = ref([] as string[[string, string]])
let isLoaded = ref(false)
let pairs = ref([] as [[string, string], [string, string]][])
let timer = null
let time = ref(0 as number)

onMounted(()=>{
  let origPairs = props.origPairs
  for (let i=0; i<origPairs.length; i++) {
    firstColumn.value[i] = origPairs[i][0]
    lastColumn.value[i] = origPairs[i][1]
    pairs.value[i] = []
    pairs.value[i][0] = origPairs[i][0]
    pairs.value[i][1] = ["", ""]
  }
  lastColumn.value = shuffleArray(lastColumn.value)
  startTimer()
  isLoaded.value = true
})

function checkCorrectness(){
  let check = true
  let errorIndex = 0;
  for (errorIndex = 0; errorIndex < pairs.value.length; errorIndex++) {
    let pair = pairs.value[errorIndex]
    let origPair = props.origPairs[errorIndex]
    if (pair[1][0]!==origPair[1][0]){
      check = false
      break
    }
  }
  if(check){
    alert("Pairs correct")
    emit("endTask")
  } else {
    alert("Pair incorrect at index " + (errorIndex+1) + ".")
  }
}

function shuffleArray<T>(array: T[]): T[] {
  // Створюємо копію масиву, щоб не змінювати оригінальний масив
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Вибираємо випадковий індекс від 0 до i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Міняємо місцями елемент з випадковим індексом і поточний елемент
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}

function startTimer(){
  timer = setInterval(() => {
    time.value = time.value + 1
  }, 1000)
}

function formatTimer(){
  let minutes = Math.floor(time.value/60);
  let seconds = time.value % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

onUnmounted(()=>{
  clearInterval(timer)
})

</script>

<template>
  <div v-if="isLoaded">
    <div class="d-flex justify-content-between">
      <h5><b>Згадайте пари</b></h5>
      <h5><b>{{ formatTimer() }}</b></h5>
    </div>
    <div class="bg-white rounded border shadow-sm p-2 rounded p-2 shadow">
      <div class="bg-light rounded p-2 shadow d-flex justify-content-center my-1">
        <div class="bg-white rounded border shadow-sm p-2 d-flex flex-row justify-content-center">
          <div v-for="(card, index) in firstColumn" :key="index">
            <div class="mx-1">
              <div>{{ index+1 }}.</div>
              <img :src="card[1]" :alt="card[0]" style="width: 100px">
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light rounded p-2 shadow d-flex justify-content-center my-1">
        <div class="bg-white rounded border shadow-sm p-2 d-flex flex-row justify-content-center">
          <div v-for="(card, index) in pairs" :key="index">
            <div class="mx-1">
              <div>{{ index+1 }}.</div>
              <select class="form-select" v-model="pairs[index][1]">
                <option v-for="(card, index) in lastColumn" :key="index" :value="card">{{ index+1+firstColumn.length }}</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary" @click="checkCorrectness()">Перевірити</button>
        </div>
      </div>
      <div class="bg-light rounded p-2 shadow d-flex justify-content-center my-1">
        <div class="bg-white rounded border shadow-sm p-2 d-flex flex-row justify-content-center">
          <div class="mx-1" v-for="(card, index) in lastColumn" :key="index">
            <div>
              <div>{{ index+1+firstColumn.length }}.</div>
              <img :src="card[1]" :alt="card[0]" style="width: 100px">
            </div>
          </div>
        </div>
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

</style>
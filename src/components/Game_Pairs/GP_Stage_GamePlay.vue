<script setup lang="ts">
import {TTTGame} from "@/ts/model/TicTacToe/TTTGame";
import {onMounted, ref} from "vue";
import {showNotification} from "@/ts/floating-ui/Notification";

const emit = defineEmits(['endStageTwo'])

const game = ref({} as TTTGame)
let timer = null
let time = ref(300);

let cheatCode = ref("" as string);

onMounted(()=>{
  game.value = new TTTGame()
  proceedTimer()
})

function onMove(i: number, j: number) {
    if (!game.value.isDraw()) {
      game.value.makeMove(i, j);
      if (!game.value.isDraw()) {
        game.value.aiMove();
        let winner = game.value.whoIsWinner();
        if(winner !== undefined) {
          showNotification(`Переможець - ${winner === '' ? '' : (winner === 'X' ? '&#x274C;' : '&#x2B55;') }`);
          game.value.restoreGame()
        }
      } else {
        showNotification("Поле заповнене, перезавантажуємось")
        game.value.restoreGame();
      }
    } else if (game.value.isDraw()){
      showNotification("Поле заповнене, перезавантажуємось")
      game.value.restoreGame();
    }
}

function proceedTimer(){
  timer = setInterval(()=>{
    if(time.value!==0) {
      time.value--;
    } else {
      clearInterval(timer)
      emit("endStageTwo")
    }
  }, 1000)
}

function formatTime(){
  let minutes = Math.floor(time.value/60);
  let seconds = time.value % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

function proceedCheatCode(){
  if (cheatCode.value === "nst"){
    emit("endStageTwo")
  }
}

window.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "F9") {
    document.getElementById("cheatForm").style.display = "block";
  }
})

</script>

<template>
  <div class="d-flex justify-content-between">
    <h5><b>Гра "Хрестики-нулики"</b></h5>
    <h5><b>{{ formatTime() }}</b></h5>
  </div>
  <div class="bg-white rounded border shadow-sm p-2 d-flex justify-content-center">
    <table class="table table-bordered" style="width: 250px">
      <tbody>
        <tr v-for="(row, rowIndex) in game.board" :key="rowIndex">
          <td class="align-middle-center" v-for="(cell, cellIndex) in row" :key="cellIndex" style="width: 40px; height: 40px;">
            <button class="btn" @click="onMove(rowIndex, cellIndex)" style="width: 39px; height: 39px">
              {{ cell === '' ? '' : (cell === 'X' ? '&#x274C;' : '&#x2B55;') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-between my-2">
    <small>Поточний гравець - {{ game.currentPlayer === '' ? '' : (game.currentPlayer === 'X' ? '&#x274C;' : '&#x2B55;')  }}</small>
    <button class="btn btn-primary" @click="game.restoreGame">Розпочати заново</button>
  </div>
  <div id="cheatForm" style="display: none;">
    <div class="d-flex">
      <input v-model="cheatCode">
      <button @click="proceedCheatCode">Proceed</button>
    </div>
  </div>
</template>

<style scoped>

</style>
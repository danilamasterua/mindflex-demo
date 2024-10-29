<script setup lang="ts">
import {computed, onMounted, onUpdated, ref} from "vue";
import type {Statistic} from "@/ts/model/Statistic";
import DataSource from "@/ts/DataSource";
import type {User} from "@/ts/model/User";

const props = defineProps<{
  currentUser: User
}>()
let userStatistic = ref([] as [string, Statistic][])
let isLoaded = ref(false);
onMounted(()=>{
  userStatistic.value = DataSource.getStatisticInfo();
  userStatistic.value.push([props.currentUser.login, props.currentUser.statistic]);
  isLoaded.value = true;
})

enum TimeRange {MONTH, WEEK}
enum Field {TIME, TASK_COUNT}

let timeRange = ref(TimeRange.MONTH)
let field = ref(Field.TASK_COUNT)

let userStatisticSorted = computed(() => {
  let userStatisticList: [string, number][] = [];
  for (let i = 0; i < userStatistic.value.length; i++) {
    userStatisticList[i] = ["", 0];
    userStatisticList[i][0] = userStatistic.value[i][0];
    switch (field.value){
      case Field.TIME:
        switch (timeRange.value){
          case TimeRange.MONTH:
            userStatisticList[i][1] = userStatistic.value[i][1].avgTimeMonthly;
            break;
          case TimeRange.WEEK:
            userStatisticList[i][1] = userStatistic.value[i][1].avgTimeWeekly;
            break;
        }
        break;
      case Field.TASK_COUNT:
        switch (timeRange.value){
          case TimeRange.MONTH:
            userStatisticList[i][1] = userStatistic.value[i][1].monthlyProgress;
            break;
          case TimeRange.WEEK:
            userStatisticList[i][1] = userStatistic.value[i][1].weeklyProgress;
            break;
        }
    }
  }
  return userStatisticList.sort((a,b) => a[1] - b[1]);
});

</script>

<template>
  <div v-if="isLoaded" id="rating-table">
    <div class="d-flex justify-content-between">
      <select class="form-select mx-1" v-model="timeRange">
        <option :value="TimeRange.MONTH">Місяць</option>
        <option :value="TimeRange.WEEK">Тиждень</option>
      </select>
      <select class="form-select mx-1" v-model="field">
        <option :value="Field.TIME">Сер. час виконання</option>
        <option :value="Field.TASK_COUNT">К-сть вик. завдань</option>
      </select>
    </div>
    <div class="m-1" style="max-height: 40vh; overflow-y: auto; scrollbar-width: none;">
      <table class="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Користувач</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, index) in userStatisticSorted" :key="index"
              :class="{'table-primary': val[0]===currentUser.login}"
              :id="val[0]===currentUser.login ? 'current-user-row' : undefined"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ val[0] }}
            </td>
            <td>
              {{ val[1] }}
            </td>
          </tr>
        </tbody>
      </table>
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
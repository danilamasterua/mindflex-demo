<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
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
  if (!isLoaded.value) return [];

  // Фільтрація статистики на основі TimeRange
  const filteredStatistic = userStatistic.value.filter(([login, statistic]) => {
    if (timeRange.value === TimeRange.MONTH) {
      return statistic.monthlyProgress > 0; // Вибір для місяця
    } else {
      return statistic.weeklyProgress > 0; // Вибір для тижня
    }
  });

  // Вибір поля для сортування
  const sortByField = (a: [string, Statistic], b: [string, Statistic]) => {
    const statA = a[1];
    const statB = b[1];

    switch (field.value) {
      case Field.TASK_COUNT:
        return statA.weeklyProgress - statB.weeklyProgress; // Сортування за weeklyProgress
      case Field.TIME:
        return statA.avgTimeWeekly - statB.avgTimeWeekly; // Сортування за avgTimeWeekly
      default:
        return 0; // Якщо поле не розпізнано, не змінюємо порядок
    }
  };

  // Повертаємо відсортований масив
  return filteredStatistic.sort(sortByField);
});


</script>

<template>
  <div v-if="isLoaded">
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
    <div class="m-1">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Користувач</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userStatisticSorted" :key="index">
            <td>
              <div v-if="currentUser.login === user[0]">
                <i class="bi bi-person-circle"></i>
              </div>
              <div v-else>
                {{ index+1 }}
              </div>
            </td>
            <td>{{ user[0] }}</td>
            <td>
              <a v-if="field === Field.TIME && timeRange === TimeRange.WEEK">{{user[1].avgTimeWeekly}}</a>
              <a v-else-if="field === Field.TIME && timeRange === TimeRange.MONTH">{{user[1].avgTimeMonthly}}</a>
              <a v-else-if="field === Field.TASK_COUNT && timeRange === TimeRange.WEEK">{{ user[1].weeklyProgress }}</a>
              <a v-else-if="field === Field.TASK_COUNT && timeRange === TimeRange.MONTH">{{ user[1].monthlyProgress }}</a>
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
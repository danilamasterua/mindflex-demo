<script setup lang="ts">

import type {User} from "@/ts/model/User";
import {computed, onMounted, ref} from "vue";
import {Hobie, PsychoState, Sex, WorkPlace} from "@/ts/model/Preferences";
import {setFloatingElementDisplayNone, showTooltip} from "@/ts/floating-ui/Tooltip";

const props = defineProps<{
  currentUser: User
}>();
let currentUser = ref({} as User);
let isLoaded = ref(false);

onMounted(()=>{
  currentUser.value = props.currentUser;
  isLoaded.value=true;
})

let formattedBirthday = computed({
  get(){
    return currentUser.value.preferences.birthday
  },
  set(value){
    currentUser.value.preferences.birthday = Number.parseInt(value);
  }
})
let currentUserAge = computed(()=>{
  const today = new Date();
  const birthday = currentUser.value.preferences.birthday;

  const todayYear = today.getFullYear();
  return todayYear - birthday;
})

</script>

<template>
  <div class="bg-light shadow p-2 rounded" v-if="isLoaded">
    <table class="table">
      <tbody>
        <tr id="birthday_pref_row">
          <td class="col-2 align-middle">
            <button class="btn btn-sm btn-link"
                    id="birthday_tooltip_btn"
                    aria-describedby="birthday_tooltip"
                    @mouseover="showTooltip('birthday_tooltip_btn', 'birthday_tooltip')"
                    @mouseleave="setFloatingElementDisplayNone('birthday_tooltip')"
            >
              <i class="bi bi-question-circle"></i>
            </button>
            <div class="floating-tooltip bg-light shadow" id="birthday_tooltip" role="tooltip" style="display: none;">
              <h5>Вік</h5>
              <div class="bg-white rounded p-2 shadow">
                Молодшим користувачам підходять більш інтерактивні та ігрові завдання, що підтримують їх увагу,<br>
                Старші користувачі можуть потребувати більш спокійних і<br>
                аналітичних вправ для підтримки когнітивної активності.
              </div>
            </div>
            <b>Рік народження</b>
          </td>
          <td class="col-5 align-middle">
            <input class="form-control" type="number" v-model="formattedBirthday">
          </td>
          <td class="col-5 align-middle">
            ({{ currentUserAge }} років)
          </td>
        </tr>
        <tr id="sex_pref_row">
          <td class="align-middle">
            <button class="btn btn-sm btn-link"
                    id="sex_tooltip_btn"
                    aria-describedby="sex_tooltip"
                    @mouseover="showTooltip('sex_tooltip_btn', 'sex_tooltip')"
                    @mouseleave="setFloatingElementDisplayNone('sex_tooltip')"
            >
              <i class="bi bi-question-circle"></i>
            </button>
            <div class="floating-tooltip bg-light shadow" id="sex_tooltip" role="tooltip" style="display: none;">
              <h5>Стать</h5>
              <div class="bg-white rounded p-2 shadow">
                Згідно з дослідженнями, жінки мають більшу продуктивність у багатозначності,
                ніж чоловіки, тому складність відповідних завдань напряму залежить від статі.
              </div>
            </div>
            <b>Стать</b>
          </td>
          <td class="align-middle">
            <select class="form-select" v-model="currentUser.preferences.sex">
              <option :value="Sex.MALE">Чоловік</option>
              <option :value="Sex.FEMALE">Жінка</option>
              <option :value="Sex.UNDEFINED">Не вказано</option>
            </select>
          </td>
          <td class="col-5 align-middle">

          </td>
        </tr>
        <tr id="hobie_pref_row">
          <td class="align-middle">
            <button class="btn btn-sm btn-link"
                    id="hobie_tooltip_btn"
                    aria-describedby="hobie_tooltip"
                    @mouseover="showTooltip('hobie_tooltip_btn', 'hobie_tooltip')"
                    @mouseleave="setFloatingElementDisplayNone('hobie_tooltip')"
            >
              <i class="bi bi-question-circle"></i>
            </button>
            <div class="floating-tooltip bg-light shadow" style="display: none;" id="hobie_tooltip" role="tooltip">
              <h5>Захоплення</h5>
              <div class="bg-white rounded p-2 shadow">
                Захоплення користувача визначають можливу тематику завдань
              </div>
            </div>
            <b>Захоплення</b>
          </td>
          <td class="align-middle">
            <select class="form-select" v-model="currentUser.preferences.hobie">
              <option :value="Hobie.MONEY">Нумізматика</option>
              <option :value="Hobie.CARDS">Карткові ігри</option>
              <option :value="Hobie.UNDEFINED">Не вказано</option>
            </select>
          </td>
          <td class="align-middle">

          </td>
        </tr>
        <tr id="psycho_pref_row">
          <td class="align-middle">
            <button class="btn btn-sm btn-link"
                    id="psycho_tooltip_btn"
                    aria-describedby="psycho_tooltip"
                    @mouseover="showTooltip('psycho_tooltip_btn', 'psycho_tooltip')"
                    @mouseleave="setFloatingElementDisplayNone('psycho_tooltip')"
            >
              <i class="bi bi-question-circle"></i>
            </button>
            <b>Психологічний стан</b>
            <div class="floating-tooltip bg-light shadow" id="psycho_tooltip" role="tooltip" style="display: none;">
              <h5>Психологічний стан</h5>
              <div class="bg-white rounded p-2 shadow">
                Психологічний стан користувача має значний вплив на ефективність тренування пам'яті,
                оскільки стрес або тривога можуть заважати концентрації та сприйняттю інформації.
                У спокійному і позитивному стані люди зазвичай демонструють кращі результати,
                тому завдання, які створюються з урахуванням емоційного фону, можуть бути більш мотивуючими і результативними.
              </div>
            </div>
          </td>
          <td class="align-middle">
            <select class="form-select" v-model="currentUser.preferences.psychoState">
              <option :value="PsychoState.NORMAL">Нормальний</option>
              <option :value="PsychoState.POSITIVE">Позитивний</option>
              <option :value="PsychoState.DEPRESSIVE">Депресивний</option>
            </select>
          </td>
          <td class="align-middle">
          </td>
        </tr>
        <tr id="workplace_pref_row">
          <td class="align-middle">
            <button class="btn btn-sm btn-link"
                    id="workplace_tooltip_btn"
                    aria-describedby="workplace_tooltip"
                    @mouseover="showTooltip('workplace_tooltip_btn', 'workplace_tooltip')"
                    @mouseleave="setFloatingElementDisplayNone('workplace_tooltip')"
            >
              <i class="bi bi-question-circle"></i>
            </button>
            <b>Сфера діяльності</b>
            <div class="floating-tooltip bg-light shadow" style="display: none;" id="workplace_tooltip" role="tooltip">
              <h5>Сфера діяльності</h5>
              <div class="bg-white rounded p-2 shadow">
                Люди, що працюють в аналітичних або технічних сферах,
                можуть краще впоратися зі складними задачами на логіку та числа,<br>
                тоді як ті, хто працює в креативних галузях,
                можуть віддати перевагу завданням, що розвивають образне мислення і асоціативну пам'ять.
              </div>
            </div>
          </td>
          <td class="align-middle">
            <select class="form-select" v-model="currentUser.preferences.workPlace">
              <option :value="WorkPlace.UNDEFINED">Не вказано</option>
              <option :value="WorkPlace.IT">Інформаційні технології</option>
              <option :value="WorkPlace.PUBLIC_HEALTH">Здоров'я</option>
            </select>
          </td>
          <td class="align-middle">

          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary">Зберегти</button>
  </div>
</template>

<style scoped>

</style>
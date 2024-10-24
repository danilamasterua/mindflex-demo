<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import DataSource from "@/ts/DataSource";
import {User, UserBuilder} from "@/ts/model/User";
import router from "@/router";
import {StatisticBuilder} from "@/ts/model/Statistic";
import {showNotification} from "@/ts/floating-ui/Notification";
import Modal from 'bootstrap/js/src/modal'

let login = ref('');
let password = ref('');

let regData = {
  login: ref(''),
  email: ref(''),
  password: ref(''),
  passwordConfirm: ref('')
};

let loggedIn = ref(false);
let currentUser = ref({} as User);

onMounted(() => {
  if (localStorage.getItem('user')) {
    loggedIn.value = true;
    currentUser.value = JSON.parse(localStorage.getItem('user'));
  }
});

let isRegFormValid = computed(() => {
  return (regData.login.value !== '' &&
      regData.email.value !== '' &&
      regData.password.value !== '' &&
      regData.passwordConfirm.value !== '') &&
      (regData.password.value === regData.passwordConfirm.value);
});

function proceedLogin() {
  if(login.value === '' || password.value === '') {
    alert('Поля не можуть бути порожніми');
  } else {
    let user = DataSource.proceedLogin(login.value, password.value)
    console.log(user)
    if (user) {
      loggedIn.value = true;
      localStorage.setItem('user', JSON.stringify(user));
      currentUser.value = JSON.parse(localStorage.getItem('user'));
      showNotification("Вхід успішний")
      router.push("/dashboard");
    } else {
      showNotification("Неправильний логін, або пароль");
    }
  }
}

function proceedRegistration() {
  if (regData.password.value !== regData.passwordConfirm.value || (regData.password.value === '' && regData.passwordConfirm.value === '')) {
    alert('Паролі не співпадають або поля порожні');
  } else {
    let user: User = new UserBuilder()
        .setLogin(regData.login.value)
        .setEmail(regData.email.value)
        .setPassword(regData.password.value)
        .setStatistic(new StatisticBuilder().build())
        .build()
    cleanRegData()
    if (DataSource.proceedRegister(user)){
      alert("Registration successfully")
    } else {
      alert("Registration failed")
    }
  }
}

function onExit() {
  localStorage.removeItem('user');
  loggedIn.value = false;
  showNotification("Виконано вихід")
  router.push({path:'/'})
}

function cleanRegData(){
  regData.login.value = '';
  regData.email.value = '';
  regData.password.value = '';
  regData.passwordConfirm.value = '';
}
</script>

<template>
  <div v-if="!loggedIn" class="btn-group">
    <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#login-form-modal">
      <i class="bi bi-box-arrow-in-right"></i>
      Вхід
    </button>
    <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registration-form-modal">Реєстрація</a>
  </div>
  <div v-else>
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-person-circle"></i>
      {{ currentUser.login }}
    </button>
    <ul class="dropdown-menu">
      <li>
        <button class="dropdown-item" @click="router.push({path: '/dashboard'})">Панель користувача</button>
      </li>
      <li>
        <button class="dropdown-item" @click="onExit">Вихід</button>
      </li>
    </ul>
  </div>
  <div class="modal fade" id="login-form-modal" tabindex="-1" aria-labelledby="login-form-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="login-form-label">Вхід</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="form-label" for="login">Email або Логін:</label>
          <input class="form-control" type="email" id="login" v-model="login">
          <label class="form-label" for="password">Пароль:</label>
          <input class="form-control" type="password" id="password" v-model="password">
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="proceedLogin" data-bs-dismiss="modal">Увійти</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="registration-form-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Реєстрація</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cleanRegData"></button>
        </div>
        <div class="modal-body">
          <label class="form-label" for="reg_login">Логін: *</label>
          <input class="form-control" id="reg_login" v-model="regData.login.value">
          <label class="form-label" for="reg_email">Email: *</label>
          <input class="form-control" type="email" id="reg_email" v-model="regData.email.value">
          <div class="d-flex justify-content-between">
            <div>
              <label class="form-label" for="reg_password">Пароль: *</label>
              <input class="form-control" type="password" id="reg_password" v-model="regData.password.value">
            </div>
            <div>
              <label class="form-label" for="reg_password_confirm">Підтвердження паролю: *</label>
              <input class="form-control" type="password" id="reg_password_confirm" v-model="regData.passwordConfirm.value">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <small>* - Обов'язкове поле</small>
          <button class="btn btn-primary" data-bs-dismiss="modal" @click="proceedRegistration" :disabled="!isRegFormValid">Зареєструватися</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
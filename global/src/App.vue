<template>
  <div class="wrap">
    <input type="text" class="search_input" v-model="inputValue" @input="searchUser(inputValue)">
    <div class="card_wrap">
      <div class="card" v-for="(user,index) of users">
        <div class="card__title">
          <p>{{ user.name }}</p>
        </div>
        <div class="card__body">
          <p>
            <font-awesome-icon :icon="['fas', 'mobile-screen']"
                               style="color: #432EAB; width: 24px; padding-right: 10px"/>
            {{ user.phone }}
          </p>
          <p>
            <font-awesome-icon :icon="['fas', 'envelope']" style="color: #432EAB; width: 24px; padding-right: 10px"/>
            {{ user.email }}
          </p>
          <button
              type="button"
              class="btn"
              @click="showModal(user,index)"
          >
            Open Modal!
          </button>
          <modal
              v-if="isModalVisible"
              @close="closeModal"
          >
            <template v-slot:header>
              <p>{{name }}</p>
            </template>
            <template v-slot:body_phone>
              <p>{{ phone }}</p>
            </template>
            <template v-slot:body_mail>
              <p>{{ mail }}</p>
            </template>
            <template v-slot:body_date>
              <p>{{ date }}</p>
            </template>
            <template v-slot:body_profession>
              <p>{{ profession }}</p>
            </template>
            <template v-slot:body_job>
              <p>{{ sub_job }}</p>
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import modal from './components/modal.vue';


let users = ref([])
let isModalVisible = ref(false)
let name = ref('')
let mail = ref('')
let phone = ref('')
let date = ref('')
let profession = ref('')
let sub_job = ref('')

let inputValue = ref('')
let searchUser = async (value) => {
  const res = await axios.get(`http://127.0.0.1:3000?term=${value}`)
  users.value = res.data
}

let showModal = (user, index) => {
  isModalVisible.value = true;
  name.value = users.value[index].name
  mail.value = user.email
  phone.value = user.phone
  date.value = user.hire_date
  profession.value = user.position_name
  sub_job.value = user.department
}
let closeModal = function () {
  isModalVisible.value = false;
}

async function getUsers() {
  const res = await axios.get('http://127.0.0.1:3000')
  users.value = res.data
}

getUsers()
</script>

<style>
@font-face {
  font-family: "Proxima Nova";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Proxima-nova"), url("/fonts/ProximaNova-Bold.woff2") format("woff2"), url("/fonts/ProximaNova-Bold.woff") format("woff");
}

@font-face {
  font-family: "Proxima Nova light";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Proxima-nova-light"), url("/fonts/ProximaNova-Light.woff") format("woff");
}

.wrap {
  margin: 0 auto;
  max-width: 1400px;
}

.search_input {
  width: 100%;
  border-radius: 24px;
  border: 1px solid var(--Blueberry, #D4DEFE);
  height: 50px;
  font-family: "Proxima Nova";
  font-size: 24px;
  padding-left: 5%;
}

.card_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 33%;
  max-width: 357px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
  padding: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.card__title {
  color: #262C40;
  text-align: center;
  /* H2 */
  font-family: Proxima Nova;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
}
</style>

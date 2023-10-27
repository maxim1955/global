<template>
  <div class="wrap">
    <div class="search">
      <input type="text" class="search_input" v-model="inputValue" @input="searchUser(inputValue)">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM16.1457 16.8545C12.8078 19.8256 7.69007 19.7109 4.48959 16.5104C1.17014 13.191 1.17014 7.80905 4.48959 4.48959C7.80905 1.17014 13.191 1.17014 16.5104 4.48959C19.7115 7.69065 19.8256 12.8097 16.8529 16.1475L21.4605 20.7551C21.6558 20.9504 21.6558 21.267 21.4605 21.4622C21.2653 21.6575 20.9487 21.6575 20.7534 21.4622L16.1457 16.8545Z"
              fill="#432EAB"/>
      </svg>
    </div>

    <div class="card_wrap" @click.self="showModal(user,index)">

      <div class="card" v-for="(user,index) of users" ref="root" @click.self="showModal(user,index)">
        <div class="card__title">
          <p>{{ user.name }}</p>
        </div>
        <div class="card__body">
          <p class="card__body_block">
            <span class="card__body_icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17 1H7C6.44775 1 6 1.44922 6 2V2.5H18V2C18 1.70312 17.8701 1.4375 17.6641 1.25391C17.4873 1.09375 17.2549 1 17 1ZM5 2.5V3.5V18.5V19.5V22C5 23.1055 5.89551 24 7 24H17C17.6602 24 18.2456 23.6797 18.6099 23.1875C18.855 22.8555 19 22.4453 19 22V19.5V18.5V3.5V3V2C19 0.894531 18.1045 0 17 0H7C6.5498 0 6.13428 0.148438 5.7998 0.398438C5.31396 0.761719 5 1.34375 5 2V2.5ZM6 3.5V18.5H18V3.5H6ZM6 22V19.5H18V22C18 22.5508 17.5522 23 17 23H7C6.69092 23 6.41455 22.8594 6.23145 22.6367C6.08691 22.4648 6 22.2422 6 22ZM13 21C13 21.5508 12.5522 22 12 22C11.4478 22 11 21.5508 11 21C11 20.4492 11.4478 20 12 20C12.5522 20 13 20.4492 13 21Z"
                    fill="#432EAB"/>
            </svg>
            </span>

            <span class="card__body_text">
              {{ user.phone }}
            </span>

          </p>
          <p class="card__body_block">
            <span class="card__body_icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M23 7V17C23 17.5523 22.5523 18 22 18L2 18C1.44772 18 0.999999 17.5523 0.999999 17L1 7C1 6.89068 1.01754 6.78546 1.04996 6.687L10.4171 14.351C11.338 15.1045 12.6624 15.1045 13.5833 14.351L22.9501 6.68727C22.9825 6.78565 23 6.89078 23 7ZM22.1891 6.01786L12.9501 13.5771C12.3975 14.0292 11.6029 14.0292 11.0504 13.5771L1.81123 6.01779C1.87236 6.00611 1.93547 6 2 6L22 6C22.0647 6 22.1279 6.00614 22.1891 6.01786ZM22 5C23.1046 5 24 5.89543 24 7V17C24 18.1046 23.1046 19 22 19L2 19C0.895429 19 0 18.1046 0 17V7C0 5.89543 0.895432 5 2 5H22Z"
                    fill="#432EAB"/>
            </svg>
            </span>
            <span class="card__body_text">
              {{ user.email }}
            </span>

          </p>
          <div class="">
            <Transition :duration="{enter: 500 , leave: 500}" name="nested">
              <modal
                  v-if="isModalVisible"
                  class="outer"
                  @close="closeModal"
              >
                <template v-slot:header>
                  <p>{{ name }}</p>
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
            </Transition>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import modal from './components/modal.vue';

const root = ref(null);
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

  console.log(user)
  isModalVisible.value = true;
  name.value = user.name
  mail.value = user.email
  phone.value = user.phone
  date.value = user.hire_date
  profession.value = user.position_name
  sub_job.value = user.department
}
let closeModal = function (event) {
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
  display: flex;
  flex-direction: column;
  max-width: 1125px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.search {
  display: inline-flex;
  border: 1px solid #D4DEFE;
  border-radius: 24px;
  padding: 10px;
  width: 98%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  margin-top: 64px;
}

.search_input {
  font-family: "Proxima Nova";
  font-size: 24px;
  border: none;
  width: 100%;
  color: #8189A3;
}

.search_input:focus {
  outline: none;
}

.card_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.card {
  width: 33%;
  max-width: 309px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
  padding: 24px;
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  align-items: start;
  max-height: 314px;
  height: 28vw;
}

.card__title {
  color: #262C40;
  text-align: center;
  font-family: Proxima Nova;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
  padding-bottom: 24px;
}

.card__body_block {
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: start;
  padding-bottom: 16px;

}
.card__body_icon{
  width: 24px;
}

.card__body_text {
  width: 100%;
  padding-left: 14px;
  color: #8189A3;
  font-family: Proxima Nova;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}

.btn {
  width: 100%;
  border-radius: 10px;
  border: 1px solid green;
  padding: 10px;

}

.btn:hover {
  color: white;
  background: green;
  cursor: pointer;
}

.nested-enter-active {
  transition: all 0.5s ease;
}

/* delay leave of parent element */
.nested-leave-active {
  transition: all 1s ease;
  transform: translateX(100vw);
}

.nested-enter-from {
  transform: translateY(100vw);
  opacity: 0;
}


</style>

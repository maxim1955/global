<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal"
         role="dialog"
         aria-labelledby="modalTitle"
         aria-describedby="modalDescription"
    >
      <header
          class="modal-header"
          id="modalTitle"
      >
        <slot name="header">
          Евгения Савченко
        </slot>
        <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" style="" class="close_modal"/>
        </button>
      </header>
      <section
          class="modal-body"
          id="modalDescription"
      >
        <div class="body__item">
          <div class="body__inner">
            <p class="body_subtitle">Телефон:</p>
            <span class="slot_item">
                <slot name="body_phone">
              I'm the default body!
            </slot>
              </span>
          </div>
        </div>

        <div class="body__item">
          <div class="body__inner">
            <p class="body_subtitle">Почта:</p>
            <span class="slot_item">
                <slot name="body_mail">
                  I'm the default body!
                </slot>
              </span>
          </div>


        </div>
        <div class="body__item">
          <div class="body__inner">
            <p class="body_subtitle">Дата:</p>
            <span class="slot_item">
                <slot name="body_date">
              I'm the default body!
            </slot>
              </span>
          </div>

        </div>
        <div class="body__item">

          <div class="body__inner">
            <p class="body_subtitle">Должность:</p>
            <span class="slot_item">
                <slot name="body_profession">
              I'm the default body!
            </slot>
              </span>
          </div>

        </div>
        <div class="body__item">

          <div class=" body__inner">
            <p class="body_subtitle">Подразделение:</p>
            <span class="slot_item">
                <slot name="body_job">
              I'm the default body!
            </slot>
              </span>
          </div>
        </div>
      </section>
      <footer class="modal-footer">
        <p class="footer__title">Дополнительная информация:</p>
        <span class="slot_item slot_item__footer">
            <slot name="footer" class="slot_item__footer">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, harum?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, harum?
          </slot>
          </span>
      </footer>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['close'])
let close = function () {
  console.log('close')
  emit('close')
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(133, 129, 129, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  border-radius: 5%;
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.modal-header {
  justify-content: space-between;
  color: #262C40;
  font-size: 24px;
  font-weight: 700;
padding: 24px 24px 40px 24px;

}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.body__item {
  font-size: 18px;
  font-family: "Proxima Nova light";
  font-weight: 400;
}

.body__inner {
  display: flex;
  align-items: center;
  padding-bottom: 14px;
}

.slot_item {
  color: #8189A3;
  font-family: "Proxima Nova light";
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  line-height: 24px;
  padding-left: 40px;
  width: 100%;
}

.body_subtitle {
  width: 50%;
  font-weight: 600;
}

.footer__title {
  padding-bottom: 14px;
  font-size: 18px;
  font-family: "Proxima Nova light";
  font-weight: 600;
  color: #262C40;
}
.slot_item__footer{
  padding-left: 1%;
  width: 100%;
  padding-bottom: 48px;
}
.close_modal {
  font-size: 30px;
  color: #262C40;
  padding: 5px;
}

.close_modal:hover {
  color: #8189A3  !important;
  cursor: pointer;
  border: 2px solid;
  border-radius: 10px;
  padding: 5px;
}
</style>

<template>
  <div class="notes">
    <transition-group
      name="notice"
      tag="div"
      class="notes-wrap d-flex flex-wrap align-items-center"
      
    >
      <div
        class="each"
        ref="group"
        v-for="note in receivedFromServer"
        :key="note.time+note.text"
        
      >
        <transition name="delete">
            <div class="delete" @click="choosen($event)">Удалить</div>
        </transition>
        <transition name="update">
            <div class="update" @click="choosen($event)">Обновить</div>
        </transition>
        
        <span>{{note.text}}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ["receivedFromServer"],                                                                    //Получаемые пропсы
  data() {
    return {
      notesList: [],
      show:false,
      lastChoosen:Number
    };
  },
  methods: {
    choosen(e) {
      const target = !!Array.from(e.target.parentNode.children).indexOf(e.target);                  //Достаем индекс кликнутого элемента
      const index = Array.from(this.$refs.group).indexOf(e.target.offsetParent);       //Достаем индекс активной записки
      this.$emit("choosen", { index, target });                                                     //Отправляем родителю
    },
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arizonia&display=swap");                      /* Импортируем шрифт */

.notes-wrap {
  width: 100%;
}

.each {
  cursor: pointer;
  padding: 14px;
  margin: 5px;
  font-size: 2em;
  width: calc(30% - 5px);
  word-break: break-word;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: white;
  transition: 
    transform 0.4s, 
    color 0.2s;
  position: relative;
  overflow: hidden;
  font-family: "Arizonia", cursive;
  box-shadow: 5px 5px 5px #8080807a;
}

.each:hover,
.each:active {
  transform: scale(1.1);
  z-index: 11;
  color: white;
}

.delete,
.update {
  position: absolute;
  height: 100%;
  width: 0%;
  top: 0;
  opacity: 0;
  transition: 
    left 0.4s, 
    right 0.4s, 
    opacity 0.5s,
    width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
    font-size 0.3s;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Arizonia", cursive;
}

.delete {
  left: 0%;
  background-color: #ff1b1b69;
}

.update {
  right: 0%;
  background-color: #00dcffc2;
}

.each:hover .delete,
.each:active .delete {
  opacity: 1;
  width: 50%;
}

.each:hover .update,
.each:active .update {
  opacity: 1;
  width: 50%;
}

.delete:hover,
.update:hover {
  text-shadow: 1px 1px 5px black;
  font-size: 18px;
}

                                                                            /* Блок transition */

.notice-enter-active,
.notice-leave-active {
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.notice-enter,
.notice-leave-to {
  transform: scale(0);
  box-shadow: 0px 0px 0px #8080807a;
}
                                                                            /* Конец блока transition */

@media screen and (max-width:500px){
    .each{
        width: 100%;
        font-size: 1.5em;
    }
}
</style>
<template>
  <div class="container">
    <app-bar :count="noticesFromServer.length"/>
    <app-input :count="noticesFromServer.length" @newNotice="toPush($event)" :toChange="noticeToChange"/>
    <app-notes :receivedFromServer="noticesFromServer" @choosen="action($event)"/>
  </div>
</template>

<script>
import Notes from '~/components/Notes.vue'
import Input from '~/components/InputField.vue'
import StatusBar from '~/components/StatusBar.vue'

export default {
  async asyncData({$axios}) {         //При написании данного задания были использованны axios, и fetch на случай не использования axios в компании
     const notices = await $axios.$get('https://api.jsonbin.io/b/5ed629767741ef56a5667e17/5',{
       headers:{
       "secret-key" : "$2b$10$KOUZGg5Q5shdJYgU0mTAm.NlBasckrjEuUyvAkZgfqDCMtu/UQqna",
       "Content-Type" : "application/json",
       }
    }).catch(err=>{ throw new Error(err) })
    return {noticesFromServer:notices.list}
  },
  components: {
    appNotes:Notes,
    appInput:Input,
    appBar:StatusBar
  },
  data(){
    return{
      noticesFromServer:Object,
      noticeToChange:Object,
    }
  },
  methods:{
    toPush(newData){
      const RECEIVED_FROM_SERVER = this.noticesFromServer;          //Все данные полученные с сервера
      if(newData.index>=0){
        const TO_CHANGE = this.noticeToChange;                        //Содержит данные которые передавались дочернему компоненту (не обновленные)
        if(RECEIVED_FROM_SERVER[newData.index] && RECEIVED_FROM_SERVER[newData.index].text === TO_CHANGE.text){ 
          //Проверка на случай удаления записки во время редактирования
          RECEIVED_FROM_SERVER[newData.index].text = newData.text;
          RECEIVED_FROM_SERVER[newData.index].time = newData.time;
        }else{
          let noIndex = {                                           //Если удаленно, просто пересобираем полученные данные и пушим
            text:newData.text,
            time:newData.time
          }
          RECEIVED_FROM_SERVER.push(noIndex);
        }
      }else if(newData){
        RECEIVED_FROM_SERVER.push(newData)
      }
      let body = {
        list:RECEIVED_FROM_SERVER
        
      }
      fetch("https://api.jsonbin.io/b/5ed629767741ef56a5667e17",{
            method:"PUT",
            headers: {
                "secret-key" : "$2b$10$KOUZGg5Q5shdJYgU0mTAm.NlBasckrjEuUyvAkZgfqDCMtu/UQqna",
                "Content-Type" : "application/json",
                "versioning" : "false"
            },
            body:JSON.stringify(body)
      })
      .catch(err=>{ throw new Error(err) })
      },
    action(event){            // Получаем выбранное действие из компонента Notes
      if(event.target){       // Редактирование
        this.noticeToChange = {
          text:this.noticesFromServer[event.index].text,
          index:event.index,
        }
      }else{                  //Удаление локально и с вызовом функции отправки запроса
        this.noticesFromServer.splice(event.index,1);
        this.toPush(false);
      }
    }
    },
}

</script>

<style>

</style>

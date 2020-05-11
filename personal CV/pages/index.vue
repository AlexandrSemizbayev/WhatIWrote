<template>
<div class="container">

  


  <div class="voiceMail">
    <div id="sendMessage" v-if="!allowRec" @click="allow">Отправить голосовое сообщение</div>
    <div id="err" v-if="err">
        <a :href="link" target="_blank"> Для отправки голосовых сообщений - измените настройки доступа к микрофону </a>
      </div>
    <div class="isAllowedToRec" v-if="isAllowedToRec">
      <div id="start" ref="start" v-if="!recording && !submit && !isUploaded && !sending " @click="rec">Нажать для записи</div>
      <div id="stop" ref="stop" v-if="recording && !submit && !isUploaded" @click="rec('submit')">Достаточно</div>
      <div id="submit" ref="submit" v-if="submit && !isUploaded" title="Отправить" @click="sendMessage">
        <img src="@/assets/submit.svg" alt="Отправить" style="width:20%;padding: 5px 0;">
      </div>
      <audio ref="play" :src="path" v-if="submit && !isUploaded">
        
      </audio>
      <div class="play" v-if="submit && !isUploaded" title="Воспроизведение" @click="$refs.play.play()">
        <img src="@/assets/play.svg" alt="Воспроизведение"  style="width:40%;padding: 5px 0;">
      </div>
      <div id="rerec" ref="rerec" v-if="submit && !isUploaded" @click="rec(false)" title="Перезаписать">
        <img src="@/assets/off.svg" alt="Перезаписать" style="width:20%">
      </div>

      <div class="sending" v-if="sending">
        Отправляю
      </div>

      <div class="sent" v-if="isUploaded && !submit" style="color:#54e94b">
        Отправлено
      </div>
    </div>
  </div>

   <div class="me">
      <img src="@/assets/51.jpg" alt="Well,here i am" id="image" ref="image" @click="show">
      <transition name="show">
        <div class="preview" v-if="isShowed" @click="show"></div>
      </transition>
      <div class="field" :class="fallDown?'fallDown':''">
        <div class="name">
          <span>
            Александр Семизбаев
          </span>
        </div>
        <div class="phone">
          <a href="tel:77772798347">+7(777)279-83-47</a>
        </div>
      </div>
    </div>

  <div id="wrap">

   

    <div class="part" v-for="data in datas" :key="data.name">
      <div class="head">
        <h3>
          {{ data.name }}
        </h3>
        </div>
        
        
        
      <div class="description" v-for="(descr,ind) in data.description" :key="ind" :class="descr.match(/\.job/g)?'pad':''">
        <span style="color:#ff5364;" v-if="descr.match(/\.pw|kz/g)"> Ссылка : <a :href="descr"  target="_blank" >  {{ descr }}</a> </span>
        <span v-else-if="descr.match(/\.job/g)" class="job">
          {{ descr.replace('.job','') }}
        </span>
        <span v-else-if="descr.match(/\.point/g)" style="color:var(--blue); font-weight:700;letter-spacing:1px;">{{ descr.replace(/\.point/,'') }}</span>
        <span v-else-if="descr.match(/\.lang/g)" class="lang">{{ descr.replace(/\.lang.\d+/,'') }}</span>
        <span v-else-if="descr.match(/\.about/g)">{{ descr.replace(/\.about/,' &#x1F60F;') }}</span>
        <span v-else-if="descr.match(/\.red/g)" style="color:#ff5364;">
        {{ descr.match(/^\w+/gm)[0] }} :
        <a :href="descr.match(/https\W+\w+\.\w+\W+.+[^\.red]/gm)" target="_blank">
         {{ descr.match(/https\W+\w+\.\w+\W+.+[^\.red]/gm)[0] }}
        </a>
         </span>
         
        <span v-else>{{descr}}</span>
        <div v-if="descr.match(/\.lang/g)" class="progress" :style="{'width':descr.match(/\d+$/g)+'%','position':'relative'}">
          <div :style="{'width':width+'px','height':'4px'}" style="background-color:grey;z-index: -1;position: absolute;"></div> 
        </div>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pageLoaded : false,
      allowRec : false,
      isAllowedToRec:false,
      err:false,
      link:'',
      recording:false,          
      submit:false,             //Чекер отправки
      path:'',                  //Локальный путь к записи
      isShowed:false,           //Предпросмотр галереи
      fallDown:false,
      mediaRecorder : undefined,
      voice : [],
      width:0,
      sending:false,
      isUploaded:false,
      datas:[
        {
          name:'Образование',
          description:[
            'АГПК (политехнический колледж) 1304000 Вычислительная техника и программное обеспечение, Техник-программист',
            'Год окончания: 2010'
          ]
        },
        {
          name:'Курсы',
          description:[
            'Sprachkurse für Ausländer in Deutschland. Sprachschule DiD München',
            'Geekbrains - Frontend разработка (HTML,CSS,JS)'
          ]
        },
        {
          name:'Языки',
          description:[
            'HTML5.lang.60',
            'CSS3.lang.70',
            'Javascript ES6/ES7.lang.50',
            'jQuery.lang.55',
            'Vue/Nuxt.js.lang.20',
            'Laravel.lang.5',


            'Немецкий - C1.lang.65',
            'Английский - B1.lang.40',
            'Русский - родной.lang.100'
          ]
        },
        {
          name:'Опыт работы',
          description:[
          `Июнь 2019 — март 2020.point`,
          `WowLab.job`,
           ` Frontend-разработчик`,
           `Доработка действующего сайта с внедрением требуемого функционала.`,
          `Декабрь 2019 — февраль 2020.point`,
            `Orzu.job`,
            `https://www.projectapi.pw/`,
            `Frontend-разработчик`,
              `Доработка существующего функционала, редизайн страниц, интеграция Firebase для SMS-верификации при регистрации и восстановлении пароля. Исправление багов , адаптация функционала на стороне сервера (Laravel)`,
              `Технологии, инструменты: JavaScript, HTML5, CSS3, jQuery, Photoshop, MySQL, Laravel;`,
          `Февраль 2019 — май 2019.point`,
            `teleport-store.job`,
            `Frontend-разработчик`,
            `Разработка front-end для E-commerce платформы, разработка front-end для сайтов партнеров компании. Тесное взаимодействие с back-end разработчиками.;`,
            `Технологии, инструменты: JavaScript, HTML5, CSS3, jQuery, Photoshop;`,
          `Январь 2018 — январь 2019.point`,
            `pozitiv-studio.job`,
            `http://www.pozitiv-studio.kz`,
            `Администратор сайта`,
            `Администрирование и доработка сайта работающего на системе управления контентом (CMS) Joomla;`,
            `Технологии, инструменты: JavaScript, HTML5, CSS3, jQuery, Photoshop;`
          ]
        },
        {
          name:'О себе',
          description:[
            'Junior-Frontend-разработчик, ищу команду в которой будет профессиональный рост',
            'Ответственный, автономный, гибкий в плане обучения'
          ]
        },
        {
          name:'Contacts',
          description:[
            'GitHub : https://github.com/AlexandrSemizbayev.red',
            'Whatsapp : https://wa.me/77772798347.red',

          ]
        }
      ]
    }
  },
  methods:{
    sendMessage(){
      let data = {
        timeSend:(new Date()).toJSON(),
        src:'',
      }
      this.sending = true;
      this.submit = false;       
      new Promise((res,rej)=>{
        res(this.$fireDb.ref('messages').push(data).then(response=>{
          this.$fireStorage.ref().child(response.key).put(this.blob).then(ans=>{
            this.$fireStorage.ref().child(ans.ref.fullPath).getDownloadURL().then((src)=>{
              this.$fireDb.ref('messages').child(response.key).update({src});
                this.sending = false;
                this.isUploaded = true;
                setTimeout(()=>{
                  this.isUploaded = false;
                },2000)
            })
          })
        }))
      })
    },

    allow(){
      if(process.client){
      this.isUploaded = false;
      let self = this;

      function checkMic(){
        navigator.permissions.query({name:'microphone'}).then(function(result) {      //Проверка доступа к микрофону
          if (result.state == 'granted') {
            self.isAllowedToRec = true;
          } else if (result.state == 'prompt') {
          } else if (result.state == 'denied') {
            self.err = true;
            self.link = 'https://www.google.com/search?q=%D0%BA%D0%B0%D0%BA+%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C+%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8+%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0+%D0%BA+%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%84%D0%BE%D0%BD%D1%83&oq=%D0%BA%D0%B0%D0%BA+%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C+%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8+%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0+%D0%BA+%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%84%D0%BE%D0%BD%D1%83&aqs=chrome..69i57.15359j0j1&sourceid=chrome&ie=UTF-8';
            mic();
          }
            result.onchange = function() {
          };
        });
      }
    
    navigator.mediaDevices.getUserMedia({ audio: true}).then(stream => { //Собственно сам микрофон
        checkMic();
        self.mediaRecorder = new MediaRecorder(stream)
        self.mediaRecorder.addEventListener("dataavailable",function(event) {
            self.voice=[];
            self.voice.push(event.data);
            self.mediaRecorder.addEventListener("stop", function() {
              const voiceBlob = new Blob(self.voice, {
                type: 'audio/mp3'
              });
              self.blob = voiceBlob;
            self.path = URL.createObjectURL(voiceBlob);
            self.$nextTick();
        })
        });
    
        
        
    }).catch(err=>{
      checkMic();
    });

    }
      this.allowRec = true;
    },
    show(){
      this.isShowed = !this.isShowed;
    },
    rec(){
      if(this.mediaRecorder.state == 'recording' && typeof arguments[0] != 'string'){
          this.path='';
          this.voice = [];
          this.mediaRecorder.stop();
        } else if( this.mediaRecorder.state == 'inactive' && typeof arguments[0] != 'string') {
            this.mediaRecorder.start()
      }
      this.recording = !this.recording;
      if(typeof arguments[0] == 'string'){
        this.submit = true;
        this.mediaRecorder.stop();
      } else {
        this.submit = false;
      } 
      if( typeof arguments[0] == 'boolean' ) {
        this.recording = false;
        this.mediaRecorder.stop();
      }
    },
    resize(){
      if(process.client)  this.width = document.querySelectorAll('.description')[0].offsetWidth;
    }
  },
  mounted(){
    let self = this;
    setTimeout(function(){
      self.fallDown = true;
    },1000);
    this.resize();
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
}
</script>

<style scoped>

.container{
  padding:1em;
}

#wrap{
  width:80%;
  position: relative;
  margin:1em auto;
  display: flex;
  flex-wrap: wrap;
}

a{
  font-size: 1.2em;
  color:var(--blue);
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0px;
  transition: all .5s;
}

a:hover{
  letter-spacing: 2px;
}

.voiceMail{
  position: fixed;
  z-index: 2;
  min-height:40px;
  width: 30%;
  right:0;
  bottom:0;
  border-radius: 20px 0 0 0px;
  background-color: #0000002b;
  display: flex;
  animation: slide 3s;
}

@keyframes slide {
  from{
    right:-200%;
    border-radius: 50px 0 0 50px;
  }
  to{
    right:0%;
    border-radius: 20px 0 0 0px;
  }
}

#sendMessage{
  position: relative;
  display: flex;
  align-items: center;

}

#sendMessage::before{
  position: absolute;
  content: '';
  width: 60px;
  height: 40px;
  background-image: url(~@/assets/voice.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: -40px;
}

#start,
#stop{
  width: 100%;
  height: 100%;
}

.voiceMail *{
  color:var(--blue);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition:transform .5s,border-radius .5s;
}

  #sendMessage:hover,
  #start:hover,
  #stop:hover,
  #submit:hover,
  .play:hover,
  #rerec:hover{
    cursor: pointer;
    transform: scale(1.1);
  }

  #sendMessage,
  #start,
  #stop,
  #submit,
  .play,
  #rerec{
    position: relative;
  }
  
  #submit::before,
  .play::before,
  #rerec::before{
    position: absolute;
    opacity: 0;
    top:2em;
    padding:1em;
    transition: opacity .3s, top .2s , color .2s;
  }
  #submit::before{
    content:'Отправить';
  }
  .play::before{
    content:'Воспроизвести';
  }

  #rerec::before{
    content: 'Перезаписать';
  }

  #submit:hover::before,
  .play:hover::before,
  #rerec:hover::before{
    position: absolute;
    opacity: 1;
    top:-2em;
  }

.me{
  width: 200px;
  height: 300px;
}

.preview{
  position: fixed;
  background-image: url(~@/assets/51.jpg);
  width: 100%;
  height: 100%;
  background-size: 500px 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #101010c7;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  z-index: 5;
}

img#image{
  position: relative;
  width: 100%;
  z-index: 1;
  background-color: #e4e5ea;
}

.field{
  z-index: 0;
  opacity: 0;
  transform: translateY(-100%);
  transition: transform .3s,opacity .3s,background-color 1s;
}

.fallDown{
  opacity: 1;
  transform: translateY(0%);
  background-color: var(--blue);
}

.field *{
  color:white;
  text-align: center;
}

.field a,
#err a{
  margin: 0;
}

.field a:hover,
#err a:hover{
  letter-spacing: 1px;
  transform: scale(1.1);
}

.part{
  width: 50%;
  padding: .5em;
  margin:.1em 0;
  display: flex;
  flex-wrap: wrap;
}

.head{
  padding:.5em;
  color: var(--blue);
  margin-left: 0;
}

.description{
  padding-left: .5em;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  color:#767676;
}

.pad{
  padding:14px;
  overflow: hidden;
  margin-top: 7px;
  margin-bottom: 14px;
}

.job{
  letter-spacing: 2px;
  font-size: 1.5em;
  padding: 3px 14px;
  background-color: grey;
  color:#323232;
}

.progress{
  width: 40%;
  margin-left: 0;
  margin-top: 10px;
  background-color: var(--blue);
  height: 4px;
  box-shadow: 0 0 10px 0 var(--blue);
}

.show-enter-active,
.show-leave-active{
  width: 100%;
  height: 100%;
  transition: width .5s,height .3s;
}

.show-leave-to,
.show-enter{
  width: 0;
  height: 1px;
}

@media screen and (max-width:1100px){
  #wrap{
    width: 100%;
  }
}

@media screen and (max-width:950px){

  #wrap{
    margin-bottom: 3em;
  }

  .voiceMail{
    width: 50%;
  }
}

@media screen and (max-width:650px){
  .part{
    width: 100%;
  }

  a{
    word-break: break-word;
  }

  .voiceMail{
    width: 100%;
    border-radius: 0;
  }
  #wrap{
    margin-bottom: 5em;
  }
}

</style>
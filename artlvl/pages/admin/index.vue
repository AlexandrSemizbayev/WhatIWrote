<template>
    <div class="wrapper">
        <div class="logOut btn" @click="logOut" v-if="logged">
                logOut
            </div>
        <div class="login" v-if="!logged">
            <!-- <form>
                <input type="text" placeholder="Логин">
                <input type="text" placeholder="Пароль">
                <input type="submit">
            </form> -->
            <div class="log btn" @click="loginAsAdmin" ref="logIn" :class="isDenied?'denied':''">
                {{ loginMessage }}
            </div>

            
        </div>
        <div class="choice" v-if="logged">
            <ul>
                <li @click="choosen('front',$event)">Первый блок</li>
                <li @click="choosen('services',$event)">Услуги</li>
                <!-- services -->
                <li @click="choosen('gallery',$event)">Галерея</li>
                <li @click="choosen('feedback',$event)">Отзывы</li>
                <li @click="choosen('contacts',$event)">Контакты</li>
            </ul>
            <transition name="svg">

            <svg id="svg" viewbox="0 0 200 200" v-if="showBar">
  <defs>
  </defs>
  <circle r="80" cx="100" cy="100"
          fill="none" stroke-width="12"
          stroke="#ccc"
          stroke-dasharray="502,4 502,4"
          stroke-linecap="round">
  </circle>
  <circle r="80" cx="100" cy="100"
          fill="none" stroke-width="12"
          :stroke="color"  stroke-dashoffset="-45"
          :stroke-dasharray="numAsPercent"
          stroke-linecap="round">
  </circle>
  <text x="100" y="125" font-family="Arial" font-size="70"
        text-anchor="middle" :fill="percentColor">
    {{percent}}
  </text>
  <g>
    <circle r="24" cx="175" cy="120"
            fill="#F3F5F6" stroke-width="0"
            stroke="#F3F5F6">
    </circle>
    <circle r="20" cx="175" cy="120"
            :fill="color" stroke-width="0"
            :stroke="color">
    </circle>
    <text x="175" y="126" font-family="Arial" font-size="18"
          text-anchor="middle" fill="#fff">
      %
    </text>
  </g>
</svg>

</transition>
        </div>
        <transition-group name="form"  mode="out-in" style="width:80%" v-if="logged">
            <div v-if="categories.front" key="front">
                <form @submit.prevent="submit('front')" ref="form">
                    <span>Текст над фото</span>
                    <input type="text" name="descr" v-model="frontData.descr"/>
                    <span style="width:100%;">Главное фото</span>
                    <div class="btn" @click="hiddenInput('cover')">
                        <span>Загрузить обложку</span>
                    </div>
                    <input type="file" name="cover" ref="cover" @change="file" />
                    <transition name="picture">
                    <div class="preview-to-upload" v-if="generalImage != ''">
                        <img :src="generalImage" alt="Обложка">
                    </div>
                    </transition>
                    <input type="submit" ref="submit" :value="submitText">
                </form>
            </div>
            <!-- mode="out-in" -->
            <form v-if="categories.services && !afterCatsFieldData" key="serviceCats" @submit.prevent="getCat('services',$event)" ref="formServicesCats" id="catSearch">
                <input type="text">
                <input type="submit">
            </form>
            <form v-if="categories.services && afterCatsFieldData" key="service" @submit.prevent="submit('services')" ref="formServices">
                <span>Название</span>
                <input type="text" name="name" ref="name" v-model="currentData.name"/>
                <input type="text" name="id" style="display:none;"/>
                <span>Описание</span>
                <!-- <textarea type="text" name="descr" v-model="currentData.src">   
                    
                </textarea> -->
                <input type="text" name="descr" class="description" v-model="currentData.descr"/>
                <span>Тип</span>
                <input type="text" name="type" v-model="currentData.type"/>
                <span style="width:100%;">Обложка</span>
                <div class="btn" @click="hiddenInput('cover')">
                    <span>Загрузить обложку</span>
                </div>
                <input type="file" name="cover" ref="cover" @change="file" />
                <transition name="picture">
                <div class="preview-to-upload" v-if="generalImage != ''">
                    <img :src="generalImage" alt="Обложка">
                </div>
                </transition>
                <input type="submit" ref="submit" :value="submitText">

            </form>
        <!-- </transition> -->
        <!-- <transition name="form" mode="in-out"> -->
            <div v-if="categories.gallery" key="gallery">
            <form @submit.prevent="submit('gallery')" ref="form">
                <span>Название</span>
                <input type="text" name="name" ref="name" v-model="name"/>
                <input type="text" name="id" style="display:none;"/>
                <span>Описание</span>
                <input type="text" name="descr" class="description"/>
                <span>Тип</span>
                <input type="text" name="type"/>
                <span style="width:100%;">Обложка</span>
                <div class="btn" @click="hiddenInput('cover')">
                    <span>Загрузить обложку</span>
                </div>
                <input type="file" name="cover" ref="cover" @change="file" />
                <transition name="picture">
                <div class="preview-to-upload" v-if="generalImage != ''">
                    <img :src="generalImage" alt="Обложка">
                </div>
                </transition>
                <span style="width:100%;">Фото для галереи</span>
                <div class="btn" @click="hiddenInput('multiple')">
                    <span>Наполнение галереи</span>
                </div>
                <input type="file" name="picList" ref="picList" @change="multipleFiles" multiple/>
                <div class="preview-to-upload multiple-upload">
                    <div class="each-preview-to-upload" v-for="image in uploadGallery" :key="image">
                    <img :src="image" alt="Обложка">
                    </div>
                </div>
                <input type="submit" ref="submit" :value="submitText">
            </form>
                <div class="available gal-av">
                    <ul>
                        <li v-for="part in receivedGallery" :key="part.name">
                            <div class="eachPart">
                                {{part.name}}

                                <div class="delete" @click="deleteGal('gallery',$event)">
                                    Удалить
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="categories.feedback" key="feedback">
                <form @submit.prevent="submit('feedback')" ref="form">
                    <span>Имя</span>
                    <input type="text" name="name"/>
                    <span>Отзыв</span>
                    <input type="text" name="review"/>
                    <span>Источник отзыва</span>
                    <input type="text" name="source"/>
                    <span style="width:100%;">Ссылка на аватар</span>
                    <input type="text" name="src" v-model="avatarSrc"/>
                    <transition name="picture">
                    <div class="preview-to-upload" v-if="avatarSrc">
                        <img :src="avatarSrc" alt="Обложка">
                    </div>
                    </transition>
                    <!-- https://sun9-53.userapi.com/impg/c853424/v853424834/1c13f9/v3VAvUEwLfw.jpg?size=400x0&quality=90&sign=d742df8866056fcbdd358816073e2ed1 -->
                    <!-- <div class="btn" @click="hiddenInput('cover')">
                        <span>Загрузить аватар</span>
                    </div>
                    <input type="file" name="cover" ref="cover" @change="file" />
                    <transition name="picture">
                    <div class="preview-to-upload" v-if="generalImage != ''">
                        <img :src="generalImage" alt="Обложка">
                    </div> -->
                    <!-- </transition> -->
                    <input type="submit" ref="submit" :value="submitText">
                </form>
                <!-- <div class="available gal-av">
                    <ul>
                        <li v-for="part in receivedGallery" :key="part.name">
                            <div class="eachPart">
                                {{part.name}}

                                <div class="delete" @click="deleteGal('gallery',$event)">
                                    Удалить
                                </div>
                            </div>

                        </li>
                    </ul>
                </div> -->
            </div>

            <div v-if="categories.contacts" key="contacts">
                <form @submit.prevent="submit('contacts')" ref="form">
                    <span>Телефон</span>
                    <input type="text" name="phone" v-model="contactFields.phone"/>
                    <span>E-mail</span>
                    <input type="text" name="mail" v-model="contactFields.mail"/>
                    <span>Instagram</span>
                    <input type="text" name="instagram" v-model="contactFields.instagram"/>
                    <span>Vk</span>
                    <!-- <div class="btn" @click="hiddenInput('cover')">
                        <span>VK QR</span>
                    </div> -->
                    <input type="text" name="vk" v-model="contactFields.vk"/>
                    <div class="btn" @click="hiddenInput('whatsapp')">
                        <span>Whatsapp QR</span>
                    </div>
                    <input type="file" name="whatsappQR" @change="file" ref="whatsapp"/>
                    <div class="btn" @click="hiddenInput('vk')">
                        <span>VK QR</span>
                    </div>
                    <input type="file" name="vkQR" @change="file" ref="vk"/>
                    <div class="btn" @click="hiddenInput('instagram')">
                        <span>Instagram QR</span>
                    </div>
                    <input type="file" name="instagramQR" @change="file" ref="instagram"/>
                    <!-- <input type="file" name=""> -->
                    <!-- <transition name="picture">
                    <div class="preview-to-upload" v-if="avatarSrc">
                        <img :src="avatarSrc" alt="Обложка">
                    </div>
                    </transition> -->


                    <!-- https://sun9-53.userapi.com/impg/c853424/v853424834/1c13f9/v3VAvUEwLfw.jpg?size=400x0&quality=90&sign=d742df8866056fcbdd358816073e2ed1 -->
                    <!-- <div class="btn" @click="hiddenInput('cover')">
                        <span>Загрузить аватар</span>
                    </div>
                    <input type="file" name="cover" ref="cover" @change="file" />
                    <transition name="picture">
                    <div class="preview-to-upload" v-if="generalImage != ''">
                        <img :src="generalImage" alt="Обложка">
                    </div> -->
                    <!-- </transition> -->
                    <input type="submit" ref="submit" :value="submitText">
                </form>
            </div>


        </transition-group>
    </div>
</template>

<script>


let key = 'geheimnisvolleenigma';
let abc = 'abcdefghijklmnopqrstuvwxyzäöüß@.';

class cipher {
constructor(key, abc){
  let aInd = {};
  let bInd = {};
  let sInd = {};
  this.encode = function (str) { return this.code(str,'encode') };
  this.decode = function (str) { return this.code(str,'decode') };
  this.code=function(str,argument){
    let output = '';
    this.setIndex(abc,aInd);
    this.setIndex(key,bInd);
    this.setIndex(str,sInd);
    let countKey=0;
    for(let each in str){
      let res;
      if(aInd[key.charAt(countKey)] == undefined || key.charAt(countKey) == ''){ countKey=0 }
      argument == 'encode' ? res = aInd[key.charAt(countKey)]+aInd[str.charAt(each)] : res = aInd[str.charAt(each)] + Object.keys(aInd).length - aInd[key.charAt(countKey)]
      
      countKey++;
      
      if(res>=0){  
        while(res>Object.keys(aInd).length-1){ 
          res = res - Object.keys(aInd).length 
        }
        output += Object.keys(aInd)[res];
      }else{
        if(str[each].match(/\W|\s|\d/gm)){
          output += str[each];
        }else{
          output = str;
          break
        }
      }
    }
    return output;    
  }
  this.setIndex=function (src,variable){ src.split('').map((val,index)=>{ variable[val] = index }) }
  }
  }
  
//   let ent = new cipher(key,abc);
//   ent.decode(a)
//   console.log(ent.encode('bayernummer1@gmail.com'))
//   let a = ent.encode('bayernummer1@gmail.com');
//   console.log(ent.decode(a))





import * as fb from 'firebase'
export default {
    data(){
        return{
            categories:{
                front:false,
                services:false,
                servicesCats:false,
                gallery:false,
                feedback:false,
                contacts:false,
            },
            name:'',
            descr:'',
            type:'',
            field:Object,
            receivedGallery:null,
            generalImage:'',
            cover:null,
            uploadGallery:[],
            uploaded:0,                 //Каунтер загруженных изображений   //Multiple
            galleryImagesLength:0,      //Общее количество выбраных файлов для загрузки //Multiple
            showBar:false,              //Показ полосы загрузки
            color:'orangered',          //Цвет полосы загрузки
            percentColor:'white',       //Цвет цифр в навбаре загрузки
            submitText:'Поделиться',    //Текст кнопки отправки
            lastChoosen:null,           //Активный элемент навигации
            currentData:null,           //Совпадение данных с инпутом
            frontData:{                 //Поле главной фотографии
                descr:''
            },
            wholeReceivedData:null,     //Все полученные данные
            afterCatsFieldData:false,   //Допуск к полям редактирования
            logged:false,                //TODO change to true when done
            loginMessage:'Войти',
            isDenied:false,             //Допуск при совпадении почты
            key:null,                   //Ключ полученный с сервера (для редактирования )
            avatarSrc:'',               //Ссылка на аватар в отзывах
            contactFields:{
                phone:'',
                mail:'',
                instagram:'',
                vk:'',
                vkQR:'',
                whatsappQR:'',
                instagramQR:''
            },
            requiredMail:'he.izzbu@z.1jkqnqrlcuq',
        }
    },
    methods:{

        cipher(){
            let ent = new cipher(key,abc);
            return ent.decode(this.requiredMail);
        },

        loginAsAdmin(){
        let self = this;
         var provider = new fb.auth.GoogleAuthProvider();
         let mail = self.cipher();
         if(localStorage.getItem('logged') != true || localStorage.getItem('user') != mail){
         fb.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;              //Think about use of token
            var user = result.user;
            if(user.email === mail){
                localStorage.setItem('logged',true);
                localStorage.setItem('user',mail)
                self.isDenied = false;              //Чистка на случай изменения состояния
                self.logged = true;
                self.loginMessage = 'Войти';
            }else{
                self.loginMessage = `Привет ${user.email}`;
                self.isDenied = true;               //Выпадающее оповещение при не совпадении
            }
            
            // ...
            }).catch(function(error) {
            console.error(error.code);      //Prints a code of occured error
         });
         }else if(localStorage.logged == true && localStorage.user == this.requiredMail){
            self.isDenied = false;
            self.logged = true;
         }
            
        },
        logOut(){
            let self = this;
            fb.auth().signOut().then(function() {
            self.logged = false;
            }).catch(function(error) {
                console.error(error);           // An error happened.
            });
        },
        choosen(arg,e){
            if(this.lastChoosen == null){
                this.lastChoosen = e.target;
            }else{
                this.lastChoosen.classList.remove('active');
                this.lastChoosen = e.target;    //активный элемент выбора категорий
            }
            this.afterCatsFieldData = false;    //Допуск к полям редактирования выключен
            this.lastChoosen.classList.add('active');
            let cats = Object.keys(this.categories);
            
                for(let cat of cats){
                    if(this.categories[cat])
                    this.categories[cat]=false;
                }
                this.currentData = null;
                this.categories[arg] = true;
                this.afterCatsFieldData = false;    //Закрываем доступ к форме и предлагаем выбор категории
                if(arg=='gallery' || arg == 'front' || arg == 'contacts'){
                    this.getCatsFromFb(arg,{value:'allow'})
                }
        },
        getCat(arg,e){                              // arg хранит в себе название таблицы к которой будет делаться запрос  && при помощи e будет получаться доступ к введеному значению
            let target = e.target[0];
            this.getCatsFromFb(arg,target);
        },
        getCatsFromFb(table,target){
            if(target.value.length>0){
                let lCase = target.value.toLowerCase();
                if(!this.wholeReceivedData){
                    let a = new Promise((res,rej)=>{
                        res( fb.database().ref(`${table}`).once('value') )
                    }).then(val=>{
                        return val.val();
                    }).then(result=>{
                        if(table != 'gallery'){
                            if(table == 'front'){
                                this.frontData = Object.values(result)[0];
                            }else if(table == 'contacts'){
                                this.contactFields = Object.values(result)[0];
                            }else{
                                this.wholeReceivedData = result;
                            }
                            this.mapping(result,target);
                        }else{
                            this.receivedGallery = result;
                        }
                        
                    }).catch(err=>{
                        console.error(err);
                    });
                } else {
                    this.mapping(this.wholeReceivedData,target);
                }
            }
        },
        mapping(result,target){                         //Добавляет единицу категории к редактированию
            for(let cell in result){
                if(result[cell].type == target.value){
                    this.currentData = result[cell];    //temporary data of choosen category
                    
                    this.key = cell;        //Цепляем ключ       
                }else if(this.categories.front || this.categories.contacts){
                    this.key = cell;        //Цепляем ключ 
                }
            }
            if(this.categories.services){
                this.afterCatsFieldData = true;             //Allow access to form 
            }
        },
        submit(table){                        //arg == table
            this.submitText = 'Отправляем';
            this.$refs.submit.disabled=true;
            this.showBar = true;
            let form = this.$refs.form;
            if(table == 'services'){
                form=this.$refs.formServices;
            }
            let obj = {
                src:'',
                gallery:[]
            };
            let formData = new FormData();
            for(let input of form){                 //Collecting text data by name and value to obj
                if(input.type == 'text'){
                    obj[input.name]=input.value;
                } else if ( input.type == 'file'){
                    if(input.multiple){
                        let multiple = input.files;
                        for(let each of multiple){
                            formData.append('gallery',each)
                        }
                    } else {
                        formData.append(input.name,input.files[0])
                    }
                }
            }
            this.avatarSrc='';
            this.upload(table,obj,form);                // form is responding for an actual form in $refs
        },
        upload(table,obj,form){
            let key="";
            let self = this;
            let galleryField=[];
            const pushData = new Promise((res,rej)=>{
                
                if(this.key == null){
                    res(fb.database().ref(table).push(obj))
                } else {
                    let updates = {};
                    updates[`/${table}/` + this.key] = obj;
                    res(fb.database().ref().update(updates))
                }
                
            }).then(ans=>{
                if(table != 'feedback'){
                    if(ans != undefined){
                        key = ans.key;
                    }
                    if(self.key != null){
                        key = this.key;
                    }
                    if(table == 'contacts'){
                        this.uploaded = 0;
                        let counterOfFiles=0;
                        let filesToUpload = [];
                        let sources = [];
                        for(let input of this.$refs.form){
                            if(input.type=='file' && input.files[0] != undefined){
                                counterOfFiles++;
                                filesToUpload.push(input.files[0]);
                            }
                        }
                        if(counterOfFiles>0){
                            this.galleryImagesLength = counterOfFiles;
                            for(let i=0; i<counterOfFiles; i++){
                                fb.storage().ref().child(`${table}/${key}${i}.png`).put(filesToUpload[i]).then(antwort=>{
                                        fb.storage().ref().child(antwort.ref.fullPath).getDownloadURL().then((src)=>{
                                            this.uploaded++;
                                            sources.push({src});
                                            if( this.uploaded == counterOfFiles ){
                                                this.galleryImagesLength = 0;
                                                this.color = '#78c7f5';
                                                fb.database().ref(table).child(key).update({src:sources});
                                            setTimeout(()=>{
                                                this.showBar = false;
                                                this.clearFields(form);
                                            },3000)
                                            }
                                            
                                        })
                                }).catch(err=>{
                                    console.err(err);
                                })
                            }
                            return true;
                        }
                    }
                    fb.storage().ref().child(`${table}/${key}.jpg`).put(this.$refs.cover.files[0]).then(antwort=>{
                        fb.storage().ref().child(antwort.ref.fullPath).getDownloadURL().then((src)=>{
                            fb.database().ref(table).child(key).update({src});
                        })
                    }).then(()=>{
                        let pics ;
                        if(table=='gallery'){
                            pics = this.$refs.picList.files;
                        
                        if(pics.length<=0 && table == 'gallery') { 
                            this.submitText = ' Не удалось загрузить Галерею '
                            fb.storage().ref().child(`${table}/${ans.key}.jpg`).delete().then(del=>{
                                console.log('deleted')
                            }).catch(err=>{
                                console.error(err);
                            });
                            fb.database().ref(table).child(key).remove();
                        } else if(table == 'gallery'){
                            this.galleryImagesLength = pics.length;
                            for(let i=0;i<pics.length;i++){
                                fb.storage().ref().child(`${table}/${ans.key}${i}.jpg`).put(pics[i]).then(antwort=>{
                                    fb.storage().ref().child(antwort.ref.fullPath).getDownloadURL().then((gallery)=>{
                                    galleryField.push(gallery);
                                    this.uploaded++;
                                    if(this.uploaded==pics.length){
                                        this.color = '#78c7f5';
                                        fb.database().ref(table).child(key).update({gallery:galleryField});
                                        setTimeout(()=>{
                                            this.showBar = false;
                                            this.clearFields(form);
                                        },3000)
                                    }
                                    }).catch(err=>{
                                        this.submitText = ' Не удалось загрузить Галерею '
                                    });
                                })
                            }
                        }
                        } else {
                            this.color = '#78c7f5';
                            this.uploaded = 1;
                            this.galleryImagesLength = 1;
                            setTimeout(()=>{
                                this.showBar = false;
                                this.uploaded = 0;
                                this.galleryImagesLength = 0;
                                this.clearFields(form);
                            },3000)
                        }
                    })

                    if(table == 'services'){
                        this.currentData = null;           //Совпадение данных с инпутом обнуляем по причине обновления данных на сервере
                        this.wholeReceivedData = null;     //Сбрасываем все полученные данные так как они обновились
                        this.afterCatsFieldData = false;   //Допуск к полям редактирования тоже обнуляется
                    }
                }else{
                    this.color = '#78c7f5';
                            this.uploaded = 1;
                            this.galleryImagesLength = 1;
                            setTimeout(()=>{
                                this.showBar = false;
                                this.uploaded = 0;
                                this.galleryImagesLength = 0;
                                this.clearFields(form);
                            },3000)
                }
            }).catch(err=>{
                        this.submitText = 'Аватар не загружен';
                        console.error(err);
                        fb.database().ref(table).child(key).remove();
                        this.$refs.submit.disabled = false;
                    });
                    
        },
        file(e){
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload=(e)=>{
                this.generalImage = reader.result;
            }
            this.cover = reader.readAsDataURL(file);
        },
        multipleFiles(e){
            let files = e.target.files;
        let self = this;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;                //Only pics

            var picReader = new FileReader();
            
            picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                    self.uploadGallery.push(picFile.result);
            });
            picReader.readAsDataURL(file);
        }
        },
        hiddenInput(e){
            if(e=='cover'){
                this.$refs.cover.click();
            }else if(e == 'multiple'){
                this.$refs.picList.click();
            }else{
                this.$refs[e].click();
            }
        },
        clearFields(form){
            this.generalImage = null;
            this.uploadGallery = [];
            for(let input of form){
                if(input.type == 'text'){
                    input.value='';
                } else if ( input.type == 'file'){
                    input.files=undefined;
                }
            }
            this.$refs.submit.disabled=false;
            this.submitText="Отправлено"
            let self = this;
            setTimeout(function(){
                self.submitText = "Отправить"
            },2000);
        },
        deleteGal(table,evnt){
            
            let eachPart = document.querySelectorAll('.eachPart');                  //Берем все элементы данной категории
            let index = Array.from(eachPart).indexOf(evnt.target.parentNode);       //Собираем все в массив и находим индекс актуального элемента
            let key = Object.keys(this.receivedGallery)[index];                     //Достаем ключ идентичный ключу в базе для данной галереи
                let len;
                if(this.receivedGallery[key].gallery != undefined){
                     len = this.receivedGallery[key].gallery.length;                     //Узнаем количество фотографий в конкретной галерее
                }else{
                    len = this.receivedGallery[key].gallery=''
                }
            
            let deletePart = new Promise((res,rej)=>{
                res(fb.database().ref(table).child(key).remove())                   //Удаляем выбранную галерею из базы (database)
                    }).then(()=>{
                    fb.storage().ref().child(`${table}/${key}.jpg`).delete();       //Удаляем обложку из базы (storage)
                }).then(()=>{
                    for(let i=0;i<len;i++){                                         //Удаляем все фотографии из базы (storage)
                        fb.storage().ref().child(`${table}/${key}${i}.jpg`).delete();
                    }
                    eachPart[index].display='none';
                })
            }
    },
    mounted(){
        if(localStorage.getItem('logged') == 'true' && localStorage.getItem('user') == this.requiredMail){
            this.isDenied = false;
            this.logged = true;
         }
    },
    computed:{
        percent(){
            let per = 100 * this.uploaded / this.galleryImagesLength;
            if(per>=0 && per<=100){
                return Math.floor(per);
            } else {
                return 0;
            }
            
        },
        numAsPercent(){
            return 502.4 / 100 * (100 * this.uploaded / this.galleryImagesLength) +' 502.4';
        }
    }
}
</script>

<style scoped>

*{
    margin: 0 auto;
    box-sizing: border-box;
}

body{
    margin:0;
}

.choice{
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width:20%;
    background-color: black;
    z-index: 2;
}

.choice>ul{
    padding:0;
}

.choice>ul>li{
    padding:14px;
    list-style-type:none;
    font-size: 1.5em;
    transition: all .5s;
    cursor:pointer;
    border:1px solid black;
    border-radius: 5px;
    margin:7px auto;
    color:white;
    transform:scale(.9);
    letter-spacing: 2px;
    /* background-color: #ffc804; */
}
.choice>ul>li:hover{
    transform:scale(1);
    background-color: orangered;
}

.active{
    transform:scale(1) !important;
    background-color: orangered !important;
}


svg{
    width: 200px;
    height: 200px;
    /* position: fixed;
    left: 0;
    top: calc( 50% - 100px); */

}

.wrapper{
    display: flex;
    justify-content: center;
    background-color: #1d1d1d !important;
    min-height: 100vh;
    margin:-8px;
}

form{
    width: 50% !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 20%;
}
form>input{
    width: 100%;
    /* height: 4em; */
    padding: 7px;
    font-size: 2em;
    outline: none;
    border-radius:10px;
}

form>span{
    width: 20%;
    margin-left:0;
    padding: 14px 0 14px 0;
    color:white;
}

input[type="submit"]{
    border: 1px solid white;
    /* font-size: 2em; */
    color:white;
    height: auto;
    background-color: transparent;
    transition:background-color .5s;
    margin:10px auto;
}

input[type="submit"]:hover{
    background-color: orangered;
    /* #78c7f5 */
}

textarea[name="descr"]{
    width: 100%;
    /* height:5em; */
    outline: none;
    border-radius:10px;
    font-size: 2em;
}

.preview-to-upload{
    /* width: 100%; */
    margin: 1em !important;
    width: 50%;
    height: 200px;
}

.multiple-upload{
    height:auto;
    display: flex;
    flex-wrap: wrap;
    width:100%;
}

.preview-to-upload>img,
.each-preview-to-upload>img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.each-preview-to-upload{
    width: 50%;
    height: 200px;
}

.multiple-upload>.each-preview-to-upload{
    margin-left:0;
    margin-top: .5em;
}

.btn{
    padding:14px;
    background-color: orangered;
    margin:7px;
    border-radius: 10px;
    box-shadow: 5px 5px 1px #00000091;
    font-size: 20px;
    letter-spacing: 2px;
    color:white;
    transition: box-shadow .1s;
    height:48px;
    width: 50%;
}

.btn:nth-last-child(){
    transform: translateX(100%);
}

.btn:active{
    box-shadow: 0px 0px 5px 5px #00000091;
    
}

.btn,
.btn>span{
    cursor:pointer;
}

input[type="file"]{
    display: none;
}

.eachPart{
    width: 30%;
    margin-right: 30%;
    margin-bottom:5px;
    margin-top:5px;
    color:white;
    height:100%;
    display:flex;
    transition: transform .2s,background-color .5s;
    padding:14px;
    border-radius: 10px;
}

.eachPart:hover{
    transform:scale(1.1);
    background-color: orangered;
}

.eachPart:hover .delete{
    color:white;
}

.delete{
    margin-right: 5px;
    padding: 5px;
    color:orangered;
    cursor:pointer;
}

.picture-enter-active,
.picture-leave-active,
.form-enter-active,
.form-leave-active{
    /* width: 100%; */
    /* width: 50%; */
    padding-right:0;
    transition: all .5s;
    /* transition: opacity .5s,padding .5s; */
}

/* .form-enter-active,
.form-leave-active{
    padding: 0;
} */

.picture-enter,
.picture-leave-to,
.form-enter,
.form-leave-to{
    opacity: .5;
    padding-right:200%;
    /* margin-left:auto; */
    /* height: 0%; */
    /* width: 50%; */
}


.svg-enter-active,
.svg-leave-active{
    /* width: 100%; */
    transition: opacity 1s, transform 1s;
}

.svg-enter,
.svg-leave-to{
    opacity: .5;
    transform:scale(.2);
}

#catSearch{
    margin-top: 40vh;
}

.logOut{
    position: fixed;
    width: 150px;
    text-align: center;
    text-shadow: 3px 4px 3px black;
    right: 40px;
    top: 40px;
}

.login{
    width: 20%;
    text-align: center;
    height: auto;
    position: fixed;
    top: 45%;
    left: 40%;
    right: 40%;
}

.log{
    width: 100%;
    height: auto;
    word-break: break-word;
    position: relative;
    transition: transform 2s;
}

 .denied::before{                    /* Окно запрета */
    position: absolute;
    width: 100%;
    height: 100%;
    left:0;
    top:0;
    border-radius: 10px;
    background-color: transparent;
    color:red;
    border:1px solid white;
    content:'А почта-то не та';
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    transform:translate(0px, 110%) rotateX(0deg);
    animation: dropDown 2.5s linear;
}

@keyframes dropDown{
    from{
        transform:translate(0px, 0) rotateX(180deg) scale(.5);
        }
    /* 10%{
        transform:translate(0px, 0) rotateX(180deg) scale(1.5);
    } */
    20%,41%,60%,100%{
        transform:translate(0px, 110%) rotateX(0deg) scale(1);
    }
    
    30%{
        transform:translate(0px, 85%) rotateX(45deg) rotateY(10deg);
    }
    45%{
        transform:translate(0px, 85%) rotateX(-45deg) rotateY(10deg);
    }
}

</style>
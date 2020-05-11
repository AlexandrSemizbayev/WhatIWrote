<template>
   <div class="body-wrapper" >
    
    <app-loader v-if="!allowPage"></app-loader>
     <nav>
            <img src="~/assets/logo.png" alt="" class="logo">
     </nav>

<div class="wrapper flex" :class="[isAllowed?'':'none']">
    	
		<div class="front-image flex aife" :style="{'background-image':'url('+front.src+')'}" ref="front">
			<h2 class="header-text uCase">{{ front.descr }}</h2>
		</div>
		<div class="scroll-down flex" @click="scrollDown($event)" ref="scroll">
			<span class="text-big uCase">
				scroll down to see more
			</span>
			<div class="row-down"></div>
		</div>

    <app-serve @catsList="receivedFromCats($event)"></app-serve>
    
    <app-portfolio :catsList="catsList" @portfolio="port = $event"></app-portfolio>
		<app-contacts></app-contacts>

    <div class="last-image"  ref="last">
      <transition name="lastImage">
      
      
      <div style="height:100%;width:100%" class="camera" v-if="lastImage">

      
      </div>
      </transition>  
      <!-- @mouseenter="show" @mouseleave="hide" -->
      
      <div class="comment" ref="comment" v-show="allowComment">
        К Вашим услугам
        </div>
    </div>

    </div>

  <nuxt/>
   </div>
</template>

<script>
// import wholeData from './data'
// import db from '../../data/databaseRequest'
import loader from '~/components/loader.vue';
import service from '~/components/services.vue';
import portfolio from '~/components/portfolio.vue';
import contacts from '~/components/contacts.vue';

export default {
  data(){
    return {
      showed:false,
      catsList:{},
      port:false,          //TODO CHANGE IN PROD
      list:false,          //TODO CHANGE IN PROD
      allowPage:false,      //TODO CHANGE IN PROD
      allowFront:false,
      front:{
        first:{
        src:'',
        descr:''
        }
      },
      lastImage:false,
      showedImage:false,
      allowComment:false,
    };
  },
  methods:{
    scrollDown(e){
      const SCROLL = parseInt(window.getComputedStyle(e.currentTarget).margin) + e.currentTarget.getBoundingClientRect().height;
      let totalScroll = SCROLL + this.$refs.front.clientHeight;
      window.scroll({
        top: totalScroll,
        behavior: 'smooth'
      });
    },
    receivedFromCats(e){
        this.catsList = e; 
        this.list = true;
    },
    scroll(){
      let y = window.scrollY + window.innerHeight;
      let dHeight = document.documentElement.offsetHeight;
      let lastEl = this.$refs.last.offsetHeight/2;
      let timeOut;
      if(y>dHeight-lastEl && !this.showedImage){         //if scroll is bigger than document height - height of last element height
        this.showedImage = true;
        this.lastImage = true;
        let self = this;
        timeOut = setTimeout(function(){
          if(!self.allowComment){
          self.allowComment = true;
          let animations = [
          'fallDown 5s linear',
          'snitch 10s cubic-bezier(0.5, 0.7, .3, 0.5)',
          'changeWidth 5s cubic-bezier(0.1, 0.5, 0.1, 1)'
          ]
          let randomAnimation = Math.floor(Math.random()*animations.length);
          self.$refs.comment.style.animation = animations[randomAnimation];
          console.log(self.$refs.comment.style.animation);
          }
        },3000);
      }else if(y<dHeight-lastEl && this.showedImage){
        this.showedImage = false;
        this.lastImage = false;
        clearTimeout(timeOut);
          this.allowComment=false;
      }
    },
  },
  created(){
    if(process.client){
      window.addEventListener('scroll',this.scroll);
    }
    
  },
  destroyed(){
      window.removeEventListener('scroll',this.scroll);
  },
  mounted(){
    new Promise(res=> {
      res(this.$fireDb.ref('front').once('value'))
      }).then(ans=>{
      let response = Object.values(ans.val());
      this.front = response[0];
      this.$forceUpdate();
      this.allowFront = true;
    }).catch(err=>{
      console.log(err);
    })
  },
  computed:{
    isAllowed(){
      if(this.port && this.list && this.allowFront){
        this.allowPage = true;
        return true;
      } else {
        return false;
      }
    },
  },
  components:{
    appServe:service,
    appContacts:contacts,
    appPortfolio:portfolio,
    appLoader:loader
  }

}
</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap');*/
/*@import url('https://fonts.googleapis.com/css?family=Baloo+Chettan+2|Montserrat&display=swap');*/

@import url(~/assets/style.css);

.lastImage-enter-active,
.lastImage-leave-active{
    background-position: 50% 50%;
    transition: background-position 1s;
}

.lastImage-enter,
.lastImage-leave-to{
    background-position: -200% 50%;
}


</style>


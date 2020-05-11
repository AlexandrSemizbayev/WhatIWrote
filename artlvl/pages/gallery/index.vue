<template>
    <div>           
        
        <div class="wrapper flex port-wr" @mousemove="showUndercats($event)">
            
            <app-loader v-if="!allowPage"></app-loader>
                {{$route.params.id}}
            <div class="close" v-if="isPreviewing" @click="close"></div>
             <div class="bgb  contrast08"></div>

             <transition>
             
                <div class="preview" 
                     ref="preview" 
                     v-if="isPreviewing" 
                     :style="{'background-image': 'url(' + images[previewIndex]+')'}">
                    
                </div>

            </transition>

                <nav>
                    <router-link to="/">
                        <img src="~/assets/logo.png" alt="Арт Лэвл" class="logo">
                    </router-link>
                </nav>
            <div class="images-wrap contrast08">

                <div class="title flex" :class="[hiddenText?hideText:'']">
                    <h2>
                        {{ title }}
                    </h2>
                    <span class="description">
                        {{ description }}
                    </span>
                </div>

                <div class="gallery-wrap flex" 
                     ref="gallery" 
                     :style="{opacity:opacity}">
                        <transition-group name="gal" tag="div" class="gallery flex">
                        
                        <div class="each-pic" 
                             :id="index" 
                             v-for="(image,index) in images" 
                             :key="image+index" 
                             :style="{backgroundImage:'url('+image+')'}" 
                             @click="showPic($event)" 
                             @mouseover="hideUndercats">
                        </div>

                        </transition-group>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loader from '~/components/loader.vue'
export default {
    data(){
        return {
            title:'Test',
            description:'text to test',
            images:[],
            isPreviewing:false,
            previewIndex:Number,
            hiddenText:false,
            hideText:'hideText',
            opacity:1,
            allowPage:false,
            timeOut:function(){},
        };
    },
    methods:{
        showPic(e){
            let id = e.target.id;
            this.previewIndex = e.target.id;
            this.isPreviewing = true;
            this.hiddenText = true;
            this.opacity=0;
            this.$refs.gallery.classList.add('faded');
        },
        showUndercats(e){
            if(this.isPreviewing && !this.pause){
            if(this.opacity < 1){  
                this.opacity = 1
            }
            else{
                
                this.pause = true;
                this.timeOut = setTimeout(()=>{
                    this.opacity = 0
                    this.pause=false;
                },2000)   
            }
            }else if(!this.pause){
                if(this.opacity!=1){
                    this.opacity = 1;
                }
                
            }
        },
        hideUndercats(){
            clearTimeout(this.timeOut);
            this.pause = false;
        },
        close(){
            this.isPreviewing = false;
            this.hiddenText = false;
            this.opacity=1;
            this.$refs.gallery.classList.remove('faded');
        }
    },
    mounted(){
        
        if (document.readyState == "complete") {
            this.allowPage = true;
        }
        // const UID = this.$router.history.current.params.Uid;
        // const UID = this.$router.params.prodId;
        // const data = this.$router.history.current.params.data;
        
        // console.log(UID,data);
        // console.log(this.$router.params.toRoute);
        if(this.$router.params != undefined){
            const data = this.$router.params.toRoute;
            // Object.values(data).map(obj=>{
            //     if(obj.name == UID){    
            //         this.title = obj.name;
            //         this.description = obj.descr;
            //         this.images = obj.gallery;
            //         console.log(this.title)
            //     }
                this.title = data.name;
                this.description = data.descr;
                this.images = data.gallery;
            // })
        } else {
            window.history.go(-1);
            // this.allowPage = true;
        }
    },
    components:{
        appLoader:loader
    }
}
</script>

<style scoped>
@import url(~/assets/style.css);

.faded .each-pic{
    opacity: .4;
}

.faded .each-pic:hover{
    opacity: 1;
}

.port-wr{
    background-color: var(--isDark);
    width: 100%;
    min-height: 100vh;
    position: relative;
}

.bgb{
    width: 100%;
    height: 100%;
    background-color: var(--isDark);
    position: absolute;
}

.preview{
    width: 80%;
    height: 80vh;
    top:10vh;
    background-color: var(--isDark);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: fixed;
}

.close{
    height: 50px;
    width: 50px;
    position: fixed;
    background-color: var(--dark-grey);
    left:calc(90% + 10px);
    top:calc(40vh - 50px);
    border-radius:50%;
    z-index: 1000;
}

.close:before,
.close:after{
    width: 100%;
    height: 100%;
    position: absolute;
    content:'';
    top:30%;
    left:calc(50% - 1px);
    height: 40%;
    width: 2px;
    background-color: #fff;
    transition: transform .5s;
}

.close:before{
    transform:rotate(45deg);
}
.close:after{
    transform:rotate(-45deg);
}

.close:hover:before{
    transform:rotate(-45deg);
}

.close:hover:after{
    transform:rotate(45deg);
}

nav{
    width: 100%;
    transition: transform .5s;
}

nav:hover{
    transform: scale(1.1);
}

.contrast08{
    filter: contrast(.8);
}

.title{
    transition: opacity .5s;
}

.title>*{
    width: 100%;
    padding: 1em;
}

.title>h2{
    font-size: 1em;
    text-align: left;
}

.title>span{
    font-size: .5em;
    text-align: right;
    width: 50%;
    margin-right: -25%;
    text-decoration-line: underline;
    text-underline-position: under;
    letter-spacing: 4px;
}

.hideText{
    opacity: 0;
}

.gallery-wrap{
    width: 100%;
    transition: opacity .5s;
}

.gallery{
    justify-content: left !important;
    width: 80%;
}

.each-pic{
    width: 240px;
    height: 240px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 1%;
    filter: sepia(.2) brightness(.6);
    box-shadow: inset 0 0 20px 20px black;
    border-radius: 20%;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: filter .5s , box-shadow .5s , border-radius .5s , transform .5s , clip-path .5s , -webkit-clip-path .5s , opacity .5s;;
}

.each-pic:hover{
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    filter: sepia(0) brightness(1) contrast(1.2);
    transform:scale(1.1);
    box-shadow: inset 0 0 0px 0px transparent;
    border-radius: 0px;
}

.gal-enter-active,
.gal-enter-leave{
    transition: transform 1s , margin-left .5s , clip-path 2s;
}

.gal-enter,
.gal-leave-to{
    transform: scale(.5);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    margin-left:100%;
}

</style>
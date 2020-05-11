<template>
    <!-- <div> -->
        <transition name="pop-up">
        
        
        <div class="fix flex" v-if="allowShow">
            <div class="close" @click="close">
                
            </div>
            <ul @click="choosenCat($event)">
            <li class="list" v-for="cat in catsList" :key="cat.type" >
                {{cat.type}}

            </li>
            </ul>
        <!-- <span>test</span> -->
        </div>
        </transition>
    <!-- </div> -->
</template>

<script>
export default {
    props:['allowShow','catsList'],
    data(){
        return {}
    },
    methods:{
        close(){
            console.log(this.catsList)
            this.$emit('close');
        },
        choosenCat(e){
            let choosenIndex = Array.from(e.currentTarget.children).indexOf(e.target);
            this.$emit('choosen',{
                index:choosenIndex,
                text:e.target.innerText
            });
            this.$emit('close');
        }
    },
    
}
</script>

<style scoped>
    .fix{
        width: 100%;
        height: 80%;
        background-color: var(--isDark);
        align-content: center;
        position: absolute;
        z-index: 2;
        overflow: hidden;
        top:10%;
        opacity: 1;
        box-shadow: 0px 0px 10em 10em var(--isDark);
        transition: opacity .5s;
    }

    .fix-active{
        display: flex;
        opacity: 1;
        z-index: 2;
    }

    .close{
        height: 50%;
        width: 50px;
        background-color: var(--dark-grey);
        position: absolute;
        right: 0;
        top:25%;
        transform: translateY(-30px);
        z-index: 2;
        border-radius: 50px 0 0 50px ;
        transition: background-color .5s;
    }

    .close:before,
    .close:after{
        position: absolute;
        content: '';
        width: 1px;
        height: 10%;
        left:45%;
        top:45%;
        background-color: var(--light);
        transition: transform .5s,color .5s;
    }

    .close:before{
        transform: rotate(45deg);
    }

    .close:after{
        transform: rotate(-45deg);
    }

    .close:hover{
        background-color: var(--isDark);
    }

    .close:hover:before{
        transform: rotate(-45deg);
        color: var(--dark-grey);
    }

    .close:hover:after{
        transform: rotate(45deg);
        color: var(--dark-grey);
    }

    .pop-up-enter-active,
    .pop-up-leave-active{
        opacity: 1s;
    }

    .pop-up-enter,
    .pop-up-leave-to{
        opacity: 0;
    }

    .list:hover{
        transform: scale(1.1) translateX(0);
    }
</style>
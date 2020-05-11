<template>
    <div>
        <div class="portfolio flex">
			<app-cats :allowShow="allowShow" :catsList="catsList" @close="allowShow=false" @choosen="search($event)"></app-cats>
			<span class="title">Портфолио</span>
			<div class="cats-more flex" @click="showFields">
				<div class="scroll-down flex">
					<span class="text-big uCase">
						Все категории
					</span>
					<div class="row-down"></div>
				</div>
			</div>
			<div class="portfolio-tiles flex">
                <div class="each-tile flex" v-for="tile of tiles" :key="tile[1].name"  @click="goTodetail(tile[1].name)">
					<img :src="tile[1].src" :alt="tile[1].name" class="tile-img">
					<div class="tile-descr flex">
						<span class="descr-name">{{ tile[1].name }}</span>
						<span class="descr-text">{{ tile[1].descr.substr(0,100) }}...</span>
						<span class="type">{{ tile[1].type }}</span>
					</div>
                </div>
                <!-- {{tiles}} -->
			</div>
            <div class="pagination flex" ref="pages" @click="pagination($event)">
				<div class="pages" v-for="n in pagination_count" :key="n" ref="eachPage">{{ n }}</div>
			</div>
		</div>
    </div>
</template>

<script>
// import db from '../../data/databaseRequest'
import Gallery from '@/pages/gallery/index.vue'
import cats from './port_cats.vue';
// import axios from 'axios';
export default {
    props:['catsList'],
    data(){
        return{
            received:{},
            tiles:[],
            index:0,
            TILES_COUNT:4,
            pagination_count:0,
            allowShow:false
        }
    },
    methods:{
        pagination(e){
            let parentNode = e.currentTarget.children
            for(let page of parentNode){
                page.style.color='var(--light)';
            }
            let index = Array.from(parentNode).indexOf(e.target);
            parentNode[index].style.color = 'var(--hover-color)';
            let ArrOfObj = Object.entries(this.received);
            this.tiles = Object.entries(this.received).slice(index*4,(index*4)+4)
            this.index = index;
            this.$forceUpdate();
        },
        showFields(){
            this.allowShow = !this.allowShow;
        },
        search(evnt){
            this.tiles = Object.entries(this.received).filter( el =>{
                return el[1].type.indexOf(evnt.text) != -1;
            })
            this.pagination_count = Math.floor(Object.entries(this.tiles).length/this.TILES_COUNT);
            this.$forceUpdate();
        },
        goTodetail(prodId) {
            // this.$router.push({name:'gallery',params:{Uid:prodId,data:this.received}})
            let toRoute = {};
            for(let item in this.received){
                if(this.received[item].name == prodId){
                    toRoute = this.received[item];
                    console.log(toRoute)
                }
            }
            console.log(this.received,prodId);
            this.$router.params = {
                prodId,
                toRoute,
            }
            console.log(this.$router.params);
            this.$router.push("/gallery/" ,toRoute)
        },
        portfolio(table){
            new Promise((resolve,reject)=>{
                    // resolve(this.$store.getters.portfolio(table));   
                    // resolve(db.database(table))
                    resolve(this.$fireDb.ref(table).once('value'))
            }).then(result=>{
                // console.log('result port')
                this.received = result.val();
                this.tiles = Object.entries(this.received).slice(0,4);
                this.pagination_count = Math.floor(Object.entries(this.received).length/this.TILES_COUNT);    
            }).then(()=>{
                let self = this;
                const wait = function(){
                    try{
                        self.$refs.eachPage[0].style.color = 'var(--hover-color)';
                        clearInterval(interval);
                    }catch(err){}
                };
                let interval = setInterval(wait,400);
                this.$emit('portfolio',true);
        })
        }
    },
    created(){
        this.portfolio('gallery');
    },
    components:{
        appCats:cats
    }
}
</script>





































                
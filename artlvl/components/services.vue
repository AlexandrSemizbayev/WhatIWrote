<template>
    
        <div class="services flex">
			
			<span class="title">Услуги</span>

			<div class="left-block flex aic">
				<ul ref="ul">
					<li class="list" @click="getIndex($event)" v-for="item in info" :key="item.type">{{ item.type }}</li>
				</ul>
			</div>

			<div class="right-block flex" :style="{backgroundImage:'url('+currentImage+')'}" @mouseenter="inside($event)" @mouseleave="inside($event)">
				<div class="description">
					<!-- <span>Александр умеет писать текста на века.Александр умеет писать текста на века.Александр умеет писать текста на века.Александр умеет писать текста на века.</span> -->
					<span>{{description}}</span>
				</div>
			</div>

		</div>
    
</template>

<script>
console.clear();
// import db from '../../data/databaseRequest'
export default {
	data(){
		return {
			currentIndex:0,
			currentImage:'',
			nodes : Object ,
			info:{
				
			},
			isOver:false,
			description:'',
		}
	},
	created(){
		
		
	},
	mounted(){
		let self = this;
		// fetch('https://api.myjson.com/bins/o8zam')
		new Promise(res=>{
			// res(db.database('services'));
			res(this.$fireDb.ref('services').once('value'))
		})
		// .then(response=>{
				
		// 		return response.json();
		// 	})
			.then(result=>{
				// console.log(self,this)
				self.info=result.val();
				
				
			}).then(()=>{
				self.nodes = self.$refs.ul.children;
				this.$emit('catsList',this.info);
				// console.log(this.nodes)
				self.setImage()
			}).catch(err=>{
				console.error(err);
			})

			
			
	},
	methods:{
		inside(event){
			this.isOver = ! this.isOver;
			if(this.isOver){
				event.currentTarget.classList.add('right-block-filter')
			} else {
				event.currentTarget.classList.remove('right-block-filter')
			}
		},
		getIndex(e){
			let index = Array.from(this.nodes).indexOf(e.target)
			this.currentIndex = index;
			this.setImage();
		},
		setImage(){
			// console.log(Object.entries(this.info)[this.currentIndex][1].descr);
			this.description = Object.entries(this.info)[this.currentIndex][1].descr;
			let image = Object.keys(this.info)[this.currentIndex]
			this.currentImage = this.info[image].src;
			this.resetUnderline();
			
		},
		resetUnderline(){
			for(let i=0; i<this.nodes.length;i++){
				this.nodes[i].classList.remove('underline');
			}
			this.nodes[this.currentIndex].classList.add('underline');
		},
		atStart(){
			
		}

	},
	computed: {
		getImage(){
			
			return this.info[this.currentIndex].image;
		}
	},

}
</script>









// EXAMPLE

// Object Info

// repo:{
// 					name:'Репортаж',
// 					descr:'Александр умеет писать текста на века.Александр умеет писать текста на века.Александр умеет писать текста на века.Александр умеет писать текста на века.',
// 					image:'https://sun9-59.userapi.com/c626331/v626331000/4b5a7/5rClKf91S8E.jpg'
// 				},
// 				studio:{
// 					name:'Студия',
// 					descr:'Lorem200 0 0 0 00 0000 ',
// 					image:'https://sun9-47.userapi.com/c837737/v837737189/5352e/fNr_oV2Nhrw.jpg'
// 				},
// 				babys:{
// 					name:'Младенцы',
// 					descr:'Никто не помнит события своих первых месяцев,почему бы не создать напоминалку?',
// 					image:'https://sun9-63.userapi.com/c626221/v626221000/5acb5/r677LCa4faQ.jpg'
// 				},
// 				creative:{
// 					name:'Креатив',
// 					descr:'Тут пока будет кот, потом возможно клоун, а если поискать подольше то еще что нибудь',
// 					image:'https://sun9-61.userapi.com/c626331/v626331000/4b8a0/HHGIrWWOTHo.jpg'
// 				},
// 				outside:{
// 					name:'Вне стен',
// 					descr:'Иногда мы выходим на улицу',
// 					image:'https://sun9-29.userapi.com/c841034/v841034195/5ccf3/RpK325c5IKI.jpg'
// 				}


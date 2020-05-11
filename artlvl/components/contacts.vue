<template>
    <div>
        <div class="contacts flex">
			<div class="feedback flex">
				<span class="title">Отзывы</span>
				<div class="each-feedback" v-for="each of feedback" :key="each.name">
					<div class="top flex top-underline">
						<img :src="each.src" :alt="each.name" class="avatar">
						<div class="feedback-text">
							<span>{{each.review}}</span>
						</div>
					</div>
					<div class="bottom flex">
					<a :href="each.source" target="_blank" class="link-to-feedback">
						Источник
					</a>
					<span class="feedback-name">{{each.name}}</span>
					</div>
				</div>





				<!-- <div class="each-feedback">
					<div class="top flex top-underline">
						<img src="https://sun9-54.userapi.com/c852228/v852228739/1ce994/Behw9-518o8.jpg" alt="" class="avatar">
						<div class="feedback-text">
							<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id omnis, harum quam, repudiandae at odio reprehenderit hic atque minus cupiditate consequuntur, molestiae, fugiat modi in dolores dignissimos eius quae velit.</span>
						</div>
					</div>
					<div class="bottom flex">
					<a href="https://facebook.com" target="_blank" class="link-to-feedback">
						Источник
					</a>
					<span class="feedback-name uCase">dawg</span>
					</div>
				</div>








				<div class="each-feedback">
					<div class="top flex top-underline">
						<img src="https://sun9-54.userapi.com/c852228/v852228739/1ce994/Behw9-518o8.jpg" alt="" class="avatar">
						<div class="feedback-text">
							<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id omnis, harum quam, repudiandae at odio reprehenderit hic atque minus cupiditate consequuntur, molestiae, fugiat modi in dolores dignissimos eius quae velit.</span>
						</div>
					</div>
					<div class="bottom flex">
					<a href="https://facebook.com" target="_blank" class="link-to-feedback">
						Источник
					</a>
					<span class="feedback-name uCase">dawg</span>
					</div>
				</div>










				<div class="each-feedback">
					<div class="top flex top-underline">
						<img src="https://sun9-54.userapi.com/c852228/v852228739/1ce994/Behw9-518o8.jpg" alt="" class="avatar">
						<div class="feedback-text">
							<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id omnis, harum quam, repudiandae at odio reprehenderit hic atque minus cupiditate consequuntur, molestiae, fugiat modi in dolores dignissimos eius quae velit.</span>
						</div>
					</div>
					<div class="bottom flex">
					<a href="https://facebook.com" target="_blank" class="link-to-feedback">
						Источник
					</a>
					<span class="feedback-name uCase">dawg</span>
					</div>
				</div> -->

			</div>



			<div class="contact flex">
				<span class="title">Связь с нами</span>
					<div class="contact-tile-wrap aic flex">


						<div class="contact-tile">
							<span class="contact-type">
								Телефон
							</span>

							<a href="tel:77772798347" class="additional-info-to-type">
								+7(777)-279-83-47
							</a>
						</div>


						<div class="contact-tile">
							<span class="contact-type">
								E-mail
							</span>

							<a href="mailto:example@gmail.com" class="additional-info-to-type">
								example@gmail.com
							</a>
						</div>

						<div class="contact-tile">
							<span class="contact-type">
								Instagram
							</span>

							<a href="https://instagram.com" class="additional-info-to-type">
								@art_level
							</a>
						</div>

						<div class="contact-tile">
							<span class="contact-type">
								vKontakte
							</span>

							<a href="https://vk.com" class="additional-info-to-type">
								VK
							</a>
						</div>

						<div class="lazy">
							<span>Облегчить задачу</span>
						</div>

					</div>
			</div>
		</div>
    </div>
</template>

<script>
// import db from '../../data/databaseRequest'
export default {
	data(){
		return{
			feedback:{
				each:{
				name:'',
				source:'',
				descr:'',
				avatar:''
				}
			},
			contacts:{

			}
		}
	},
	methods:{
		receivedFeedback(table){
			new Promise(res=>{
				// res(db.database(table))
				res(this.$fireDb.ref(table).once('value'))
			}).then(ans=>{
				this.feedback=ans.val();
				// console.log(ans.val());
			})
		}
	},
    created(){
		this.receivedFeedback('feedback')
	}
}
</script>
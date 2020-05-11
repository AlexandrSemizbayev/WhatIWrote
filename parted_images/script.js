new Vue({
    el:'#app',
    data:{
        message:'test',
        len:[],
        points:0,
        children :'',
        rotationPointX:0,
        rotationPointY:0,
        stopRotation:false,
        imageSrc:[],
        currentImageIndex:0,
        parentImage : new Image(),
        startPoint:[0,10,20,30,40,50,60,70,80,90],
        allowNext:true
    },
    created:function(){

        fetch('https://api.myjson.com/bins/bm9xe').then(ans=>{
            return ans.json();
        }).then(res =>{
            this.imageSrc=res;
            this.imageSource();
        }).catch(err=>{
            console.error(err);
        })

    },
    mounted:function(){
        this.children = this.$refs.wrap.children;
    },
    methods:{

        removeImage:function(){
            let wrap = this.$refs.wrap;
            for(let i=0;i<wrap.children.length;i++){
                wrap.children[i].classList.remove('unrotate');
            }
            let self = this;
            setTimeout(function(){
                wrap.innerHTML = '';
                if(self.imageSrc.length>self.currentImageIndex+1){
                    self.currentImageIndex++;
                }else{
                    self.currentImageIndex=0;
                }

                self.imageSource();
            },1000)


        },

        imageSource:function(){
            console.log(this.imageSrc)
            this.parentImage.src=this.imageSrc[this.currentImageIndex];
            let self = this;
            this.parentImage.onload=function(e){
                console.log(this.width,this.height)
                if(this.width<window.innerWidth-(window.innerWidth/10) && this.width*2<=window.innerWidth && this.height*2<=window.innerHeight){

                    this.width=this.width+(this.width/2);
                    this.height=this.height+(this.height/2);
                }
                self.createElements(this.width,this.height);
            }
        },

        createElements:function(w,h){
            const ELEMENTS_ON_BOARD = 100;
            const EACH_ELEMENT_H_W = 10;
            let checkedWidth = w-(w%EACH_ELEMENT_H_W);
            let checkedHeight = h-(h%EACH_ELEMENT_H_W);
            let top=0;
            let left=0;
            this.$refs.wrap.style.width=checkedWidth+'px';
            this.$refs.wrap.style.height=checkedHeight+'px';
            console.log(checkedWidth/EACH_ELEMENT_H_W);
            for(let i=0;i<ELEMENTS_ON_BOARD;i++){
                if( i % 10 == 0 && i!=0){
                    top+=11.2;
                    left=0;
                }

                this.$refs.wrap.innerHTML+=`
                    <div class="image-part" style="
                    height:${checkedHeight/EACH_ELEMENT_H_W}px;
                    width:${checkedWidth/EACH_ELEMENT_H_W}px;
                    background-position-x:${left}%;
                    background-position-y:${top}%;
                    background-image:url(${this.imageSrc[this.currentImageIndex]})
                    "></div>`;
                left+=11.2;
            }
            setTimeout(this.split,1000);
        },
        lastPreparation:function(){
            setTimeout(this.split,1000);
        },
        split:function(){
            let self = this;
            let ch = this.$refs.wrap.children;
                for(let k=0;k<this.startPoint.length;k++){
                    ch[this.startPoint[k]].classList.add('unrotate');
                    this.startPoint[k]++;
                }
                if(this.startPoint[this.startPoint.length-1] >= ch.length-1){
                    this.startPoint = [0,10,20,30,40,50,60,70,80,90];
                }else{
                    setTimeout(function(){
                        self.split();
                    },400);

                }
        },
    }
})
Vue.directive('scroll', {
    inserted: function (el, binding) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener('scroll', f)
        }
      }
      window.addEventListener('scroll', f)
    }
  })



let header = new Vue({
    el: 'header',
    data:{
        ul:'',
        burgerClick:false,
        IPHONE_5_SIZE:320,
    },
    mounted:function(){
            this.ul=this.$refs.ul;

        
    },
    methods: {

        burger:function(e){
            console.log(e);
            

            if(!this.burgerClick){
                e.target.classList.add('bahandi-active');
                document.querySelector('body').style.overflow="hidden";
                this.ul.style.left=0;
                this.ul.style.width='100%';
                this.burgerClick = true;
                
                
            } else {
                e.target.classList.remove('bahandi-active');
                document.querySelector('body').style.overflow="auto";
                this.ul.style.left = '200%';
                this.ul.style.width='0%';
                this.burgerClick = false;
            }


        },

        ulClick: function (e,ind) {
            let nodes = Array.prototype.slice.call(this.ul.children);
            let index = ind;
            if(index == undefined){
                index = nodes.indexOf(e.target);
            }
            
            let choosen = document.querySelector('.whole-wrapper').children[index];
            let margin = parseInt(getComputedStyle(document.querySelector('.inner-wrapper')).marginTop);
            if(index >= 0){
                if(e.type == 'click'){
                    this.isClicked(index,margin)
                }  

                for(let curEl of nodes){
                    curEl.style.borderBottom="1px solid transparent";
                }
                nodes[index].style.borderBottom="1px solid var(--general-fill)";
            }
        },
        isClicked:function(index,margin){
            window.scrollTo({
                top:document.querySelector('.whole-wrapper').children[index].offsetTop+(margin),
                behavior:'smooth'
            });
        },
        handleScroll: function (evt, el) {
            if (window.scrollY > 50 && window.innerWidth > this.IPHONE_5_SIZE) {
            this.ul.classList.add('darker')
            }else{
                this.ul.classList.remove('darker')
            }
            return window.scrollY > 100
          }
    },

})

let wrapper = new Vue({
    el:'.whole-wrapper',
    data:{
        child : '',
        count : 0,
        firstTime : true,
        margin : parseInt(getComputedStyle(document.querySelector('.inner-wrapper')).marginTop)
    },
    created:function(){
        
    },
    mounted:function(){
        window.scrollTo({top:window.scrollY-10,behavior:'smooth'});
        this.child = Array.prototype.slice.call(this.$refs.wrapper.children);
                if(this.count==0){
                    this.child[this.count].style.transform="scale(1.1)";    
                }
    },
    methods:{
        handleScroll:function(evt,el){
            // Todo
            if(window.scrollY - this.margin  > (this.child[this.count].offsetTop-(window.innerHeight/2))){
                if(this.child[this.count+1]!= undefined){
                    if(window.scrollY - this.margin  >= (this.child[this.count+1].offsetTop)-window.innerHeight/2){
                        this.count++;
                        this.child[this.count].style.transform="scale(1)";
                        if(this.child[this.count+1]!=undefined) this.child[this.count+1].style.transform="scale(.5)";
                    }
                }
            }else {
                if(this.child[this.count-1]==undefined || this.count<0){
                    this.count=0;
                    this.child[this.count-1].style.transform="scale(.5)";
                }else{
                    this.count--;
                    this.child[this.count+1].style.transform="scale(.5)";
                }
            }
            header.handleScroll(evt,el);
            header.ulClick(evt,this.count);
    },
    show:function(e){
         for (const iterator of e.currentTarget.parentNode.children) {          //ver.1 to get an .descr
            if(iterator.classList[0]=='descr') iterator.classList.add('show-descr');
        }
        this.$refs.descr.classList.remove('away');
    },
    close:function(e){
        this.$refs.descr.classList.add('away');                                 //ver.2 to get an .descr
        let timeOut = parseFloat(
                        getComputedStyle(this.$refs.descr)
                        .transition
                        .match(/\d.{1,2}/gm)[0])*1000;
        let self = this;
        setTimeout(function(){
            self.$refs.descr.classList.remove('show-descr');
        },timeOut);
    
    }
}
})

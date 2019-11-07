/**
 * Created by alexandersemizbayev on 11/5/19.
 */

window.onload=function() {

        window.scrollTo(0,0);

    var container = new Vue({
        el: '.container',
        data: {
            currentPoint: 0,
            show:false,
            vals:[],
        },
        methods: {
            moveTo:function(arg){
                scrollTo(arg);
                this.currentPoint = Math.floor(window.scrollY/document.querySelector('.background').clientHeight);
            },
            log:function(e){
                var a = Array.prototype.slice.call(document.querySelector('.list-header').children).indexOf(e.target);
                this.moveTo(a);
            },
            sandwich:function(){
                this.show = !this.show;
            }
        },
    })
    let argument=0;
    function scrollTo(arg){
        if(arg!=argument || arg==0){
            if(arg>argument){
                // window.scrollTo(0,(arg*window.innerHeight)+(window.innerHeight/2));
                window.scrollTo(0,arg*window.innerHeight);
            }else{
                if(arg==0){
                    // window.scrollTo(0,(arg*window.innerHeight)+(window.innerHeight/2));
                    window.scrollTo(0,arg*window.innerHeight);
                }else{
                    // window.scrollTo(0,window.scrollY-(window.innerHeight/2));
                    window.scrollTo(0,window.scrollY-(window.innerHeight));
                }

            }
            toggle(arg,argument);

            argument=arg;
        }

    }

    function toggle(arg1,arg2){
        var elements =document.querySelectorAll('.block');

        if(arg1!=arg2){
        elements[arg1].classList.add('sticky')
        elements[arg1].classList.remove('inherit')
        elements[arg2].classList.add('inherit');
        elements[arg2].classList.remove('sticky')
        }
        argument=arg1;
    }
    window.addEventListener('scroll',function(e){
            container.currentPoint = Math.floor(window.scrollY/document.querySelector('.background').clientHeight);
            var elementsBlock = document.querySelectorAll('.block');
            if(container.currentPoint>0) {
    //             scrollTo(container.currentPoint);
    //             elementsBlock[container.currentPoint-1].style.transform = 'scale(0)';
                //             elementsBlock[container.currentPoint-1].style.opacity = '0.5';
    //             elementsBlock[container.currentPoint].style.transform='scale(1)';
    //                         elementsBlock[container.currentPoint].style.opacity='1';
                toggle(container.currentPoint,argument);
                if(elementsBlock[container.currentPoint+1]){
                    toggle(container.currentPoint,argument);
    //                 elementsBlock[container.currentPoint+1].style.transform = 'scale(0)';
    //                         elementsBlock[container.currentPoint+1].style.opacity= '0.5';
                }
    //
            }else if(container.currentPoint==0){
    //             scrollTo(container.currentPoint);
                   toggle(container.currentPoint,argument);
    //             elementsBlock[container.currentPoint+1].style.transform = 'scale(0)';
    //                         elementsBlock[container.currentPoint+1].style.opacity = '0.5';
    //             elementsBlock[container.currentPoint].style.transform='scale(1)';
    //                             elementsBlock[container.currentPoint].style.opacity='1';
            }
    //
    })
    var block = document.getElementsByClassName('block');
    for(var j=0;j<block.length;j++){

            container.vals.push(block[j].getAttribute('value'));

                                                            // console.log(block[j].getAttribute('value'));

        document.getElementsByClassName('block')[j].addEventListener('click',function(e){
            var path = Object.values(e.path)
            var cor;
            for(p in path){
                var o = Object.values(path)[p]
                    // console.log(p)
                if(/block/.test(path[p].classList)&&/inherit/.test(path[p].classList)){          //На всякий случай проверяем на класс block
                    // console.log(p)
                    scrollTo(container.currentPoint+1)
                    // console.log('works')
                    //     console.log('inherit');
                    //         path[p].classList.add("fixed");
                    //         path[p].classList.remove("inherit");
                    //         console.log(path[p].classList);

                }else if(/block/.test(path[p].classList)&&/sticky/.test(path[p].classList)){
                    // console.log(container.currentPoint);
                    argument-=container.currentPoint
                    scrollTo(container.currentPoint);
                }
            }

            // // console.log(path)
            // console.log(cor);
            // var check = /inherit/.test(e.target.classList);
            // if(check){
            // console.log(e.target);
            // }
        })
    }


}
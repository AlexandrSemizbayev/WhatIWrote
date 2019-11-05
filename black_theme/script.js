/**
 * Created by alexandersemizbayev on 11/5/19.
 */

window.onload=function() {

        window.scrollTo(0,0);

    var container = new Vue({
        el: '.container',
        data: {
            currentPoint: 0,
        },
        methods: {
            moveTo:function(arg){
                scrollTo(arg);
                this.currentPoint = Math.floor(window.scrollY/document.querySelector('.background').clientHeight);
            }
        },
    })
    let argument=0;
    function scrollTo(arg,el){
        if(arg!=argument){
            if(arg>argument){
                window.scrollTo(0,(arg*window.innerHeight)+(window.innerHeight/2));
            }else{
                window.scrollTo(0,window.scrollY-(window.innerHeight/2));
            }
            toggle(arg,argument);

            argument=arg;
        }

    }

    function toggle(arg1,arg2){
        document.querySelectorAll('.block')[arg1].classList.add('sticky')
        document.querySelectorAll('.block')[arg1].classList.remove('inherit')
        document.querySelectorAll('.block')[arg2].classList.add('inherit');
        document.querySelectorAll('.block')[arg2].classList.remove('sticky')
    }
    window.addEventListener('scroll',function(e){
            container.currentPoint = Math.floor(window.scrollY/document.querySelector('.background').clientHeight);
            if(container.currentPoint>0) {
                scrollTo(container.currentPoint,document.querySelectorAll('.block'));
                document.querySelectorAll('.block')[container.currentPoint-1].style.transform = 'scale(0)';
                document.querySelectorAll('.block')[container.currentPoint].style.transform='scale(1)';
                if(document.querySelectorAll('.block')[container.currentPoint+1]){
                    scrollTo(container.currentPoint);
                    document.querySelectorAll('.block')[container.currentPoint+1].style.transform = 'scale(0)';
                }

            }else if(container.currentPoint==0){
                scrollTo(container.currentPoint);
                document.querySelectorAll('.block')[container.currentPoint+1].style.transform = 'scale(0)';
                document.querySelectorAll('.block')[container.currentPoint].style.transform='scale(1)';
            }

    })

}
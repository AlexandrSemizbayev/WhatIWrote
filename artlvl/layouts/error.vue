<template>
    <div id="wrap">
        
        <div class="background">
            
            <img src="~/assets/cat2.png" alt="" class="cat">
            <!-- <img src="~/assets/akte.png" alt="" class="akte"> -->
            
        
            <!-- <img src="~/assets/err1.png" alt="" class="error-pic"> -->
            <!-- <div class="delo"></div> -->
        </div>
        <div class="error-text">
                <h1 id="message">Страница не доступна</h1>
                
                <nuxt-link to="/" id="link">
                    Назад на сайт
                </nuxt-link>
            </div>
        <h3 id="error">4o4</h3>
    </div>
</template>

<style scoped>
    #wrap{
        background-color: #fff !important;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
        min-width: 100%;
        min-height: 100vh;
        /* animation: night 6s linear infinite reverse; */
    }
    .error-text{
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        width: 50%;
        /* left: 5%; */
        right: 0;
        bottom: 10%;
    }
    .error-text>*{
        color:grey;
        /* width: 100%;
        text-align: center; */
        width: 51%;
        text-align: right;
    }

    #link{
        color:black;
        text-decoration: underline;
        padding: 14px;
        transition:color .5s, transform .5s,letter-spacing .5s;
    }

    #link:hover{
        color:#4e83d4;
        transform: scale(1.1);
        letter-spacing: 2px;
    }

    .background{
        position: absolute;
        /* width: 50%;
        height: 80vh; */
        width: 550px;
        height: 550px;
        top:10vh;
        z-index: 1;
        /* overflow: hidden; */
        /* border:1px solid black; */
        border-radius: 50%;
        background-image: url(https://kipmu.ru/wp-content/uploads/skrvrzvksvos.jpg);
        background-position: center;
        background-size: 200%;
        background-repeat: no-repeat;
        /* animation: bg 16s linear; */
        
    }
    #error{
        position: absolute;
        /* width: auto; */
        /* z-index: 4; */
        color: black;
        left: 80%;
        height: 100px;
        width: 100px !important;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5em;
        background-image: url(https://static.euronews.com/articles/stories/04/43/33/48/602x338_cmsv2_be630909-e970-55e4-b041-d6dc1deae8c6-4433348.jpg);
        background-position: center;
        background-size: 350%;
        background-repeat: no-repeat;
        filter: brightness(1.2) contrast(1.2);
        animation: err 6s linear infinite;
    }

    .cat{
        width: 200px;
        top: 35%;
        bottom: 35%;
        left: calc(50% - 100px);
        /* right: 0; */
        object-fit: contain;
        position: absolute;
        z-index: 2;
        animation: cat 6s cubic-bezier(0.175, 0.82, 0.165, 1) infinite;
    }
/* @keyframes bg {
    from{
        box-shadow: inset 0px 0px 10px 0px black;
    }
    to{
        box-shadow: inset 0px 0px 150px 500px black;
    }
    
} */

    /* .akte{
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: contain;
    } */

    /* .cat::before{
        position: absolute;
        content:'';
        width: 50%;
        height: 50%;
        background-image: url(~@/assets/akte.png);
        z-index: 1;
        background-size: contain;
        background-repeat: no-repeat;
    } */

    /* .delo{
        background-image: url(~@/assets/akte.png);
        z-index: 1;
        background-size: contain;
        background-repeat: no-repeat;
        width: 200px;
        height: 200px;
    } */

    /* .error-pic{
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        object-fit: contain;
    } */

    @keyframes err {
        from,to{
            left:70%;
            top:10%;
            z-index: 2;
            filter: brightness(1.2) contrast(1.2);
            transform: scale(1);
            /* opacity: 1; */
            color:transparent;
        }
        25%{
            transform: scale(1.2);
            color:white;
            box-shadow: 10px 10px 10px black;
        }
        50%{
            left:20%;
            top:50%;
            /* bottom:10%; */
            z-index: 2;
            transform: scale(1);
            /* opacity: 1; */
            box-shadow: 0px 0px 0px black;
        }
        55%,95%{
            z-index: 0;
            filter: brightness(.8) contrast(.8);
            /* opacity: 0; */
        }
        
    }

    @keyframes cat{
        /* 0%,10%,20%,30%{ */
            /* transform: rotate(5deg); */
        /* } */
        /* 0%,5%,15%,25%{ */
            /* transform: rotate(-5deg); */
        /* } */
        0%{
            transform:translateX(-100%) translateY(0%) scale(1) rotateX(0deg) rotateZ(5deg);
        }
        25%{
            transform:translateX(0%) translateY(-15%) scale(1) rotateX(0deg) rotateZ(-5deg);
        }
        49.9%{
            transform:translateX(100%) translateY(0%) scale(1) rotateX(0deg) rotateZ(5deg);
        }
        50%{
            transform:translateX(100%) translateY(0%) scale(-1) rotateX(180deg) rotateZ(-5deg);
        }
        75%{
            transform:translateX(0%) translateY(-15%) scale(-1) rotateX(180deg) rotateZ(5deg);
        }
        100%{
            transform:translateX(-100%) translateY(0%) scale(-1) rotateX(180deg) rotateZ(-5deg);
        }

    }

    @media screen  and (max-width: 1024px){
        .background{
            width: 500px;
            height: 500px;
        }

    @keyframes err {
        from,to{
            left:70%;
            top:-10%;
            z-index: 2;
            filter: brightness(1.2) contrast(1.2);
            transform: scale(1);
            /* opacity: 1; */
            color:transparent;
        }
        25%{
            transform: scale(1.2);
            color:white;
            box-shadow: 10px 10px 10px black;
        }
        50%{
            left:20%;
            top:70%;
            /* bottom:10%; */
            z-index: 2;
            transform: scale(1);
            /* opacity: 1; */
            box-shadow: 0px 0px 0px black;
        }
        55%,95%{
            z-index: 0;
            filter: brightness(.8) contrast(.8);
            /* opacity: 0; */
        }
        
    }
    }

    @media screen and (max-width: 535px){
        #wrap{
            max-width: 100%;
            overflow: hidden;
        }

        .background{
            width: 350px;
            height: 350px;
        }

        .cat{
            width: 150px;
            left: calc(50% - 75px);
        }

        #error{
            height: 80px;
            width: 80px !important;
        }

        @keyframes err {
        0%, 100% {
            left: 100%;
            top: 250px;
            z-index: 2;
            -webkit-filter: brightness(1.2) contrast(1.2);
            filter: brightness(1.2) contrast(1.2);
            transform: scale(1);
            /* opacity: 1; */
            color: transparent;
        }
        25% {
            transform: scale(1.2);
            color: white;
            box-shadow: 10px 10px 10px black;
        }
        50% {
            left: -10%;
            top: 200px;
            /* bottom: 10%; */
            z-index: 2;
            transform: scale(1);
            /* opacity: 1; */
            box-shadow: 0px 0px 0px black;
        }
        55%, 95% {
            z-index: 0;
            -webkit-filter: brightness(.8) contrast(.8);
            filter: brightness(.8) contrast(.8);
            /* opacity: 0; */
        }
        }
    }
    @media screen and (max-width: 450px){ 
        .error-text{
            width: 100%;
        }

        .error-text>*{
            width: 100%;
            text-align: center;
        }
        @keyframes err {
        0%, 100% {
            left: 120%;
            top: 250px;
            z-index: 2;
            -webkit-filter: brightness(1.2) contrast(1.2);
            filter: brightness(1.2) contrast(1.2);
            transform: scale(1);
            /* opacity: 1; */
            color: transparent;
        }
        25% {
            transform: scale(1.2);
            color: white;
            box-shadow: 10px 10px 10px black;
        }
        50% {
            left: -30%;
            top: 200px;
            /* bottom: 10%; */
            z-index: 2;
            transform: scale(1);
            /* opacity: 1; */
            box-shadow: 0px 0px 0px black;
        }
        55%, 95% {
            z-index: 0;
            -webkit-filter: brightness(.8) contrast(.8);
            filter: brightness(.8) contrast(.8);
            /* opacity: 0; */
        }
        }
    } 

    @media screen and (max-width: 365px){ 
        .background{
            height: 300px;
            width: 300px;
        }

        .cat{
            width: 30%;
            left: 40%;
        }


    }
</style>
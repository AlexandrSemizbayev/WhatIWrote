<template>
    <div class="load" ref="load">
      <div class="preload">
            <p class="preload-center-loading text">
                За<span class="text">г</span>ру<span class="text">з</span><span class="text">к</span>а
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.load{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--isDark);
}

.preload{
    width: 100%;
    height: 100vh;
    background-color: #0c0c0c;
    position:absolute;
    z-index:2000;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    font-size:2em;
}

.preload-center-loading{
    color:white;

    text-shadow: 0 80px 0 var(--hover-color);
}

.preload-center-loading>span:nth-child(1){
    -webkit-animation:low 4s ease-in-out infinite;
    animation:low 4s ease-in-out infinite;
}

.preload-center-loading>span:nth-child(2){
    -webkit-animation:low 4.1s ease-in-out infinite;
    animation:low 4.1s ease-in-out infinite;
}

.preload-center-loading>span:nth-child(3){
    -webkit-animation:low 4.2s ease-in-out infinite;
    animation:low 4.2s ease-in-out infinite;
}

@-webkit-keyframes low{
    6%,8%,36%,39%{

        opacity:1;
        color:var(--light);
        text-shadow: 0 0 15px var(--light), 0 0 0px #00dcff, 0 0 6px;
    }

    5%,7%,35%,37%{
        opacity:0.4;
        color:var(--grey);
        text-shadow:none;
    }
}

@keyframes low{
    6%,8%,36%,39%{

        opacity:1;
        color:var(--light);
        text-shadow: 0 0 15px var(--light), 0 0 0px #00dcff, 0 0 6px;
    }

    5%,7%,35%,37%{
        opacity:0.4;
        color:var(--grey);
        text-shadow:none;
    }
}
</style>
<template>
    <div>
        <h1>Ошибочка</h1>
        <p>Ку! Нет такой страницы</p>
        <nuxt-link to="/">Вернуться к заданию</nuxt-link>
    </div>
</template>

<style scoped>
    *{
        text-shadow: 1px 1px 2px black;
        color:white;
    }

    div{
        background-image: url(https://i.ytimg.com/vi/z9qOOfVipdw/hqdefault.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        text-align: center;
    }

    p,h1{ 
        width: 100%;
        
    } 
</style>
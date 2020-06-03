<template>
    <div class="progress mt-2 mb-2">
      <div class="progress-bar" role="progressbar" :style="{'width': progress}" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{count}}/10</div>
    </div>
</template>

<script>
export default {
    props:{
        count:{
            type:Number,
            default:0
        }
    },
    computed:{
        progress(){ return this.count * 10 + '%' }
    }
}
</script>

<style>
    .progress{
        height: 40px;
        transition: height .4s;
    }

    @media screen and (max-width:500px){
        .progress{
            height: 30px;
        }
    }

</style>
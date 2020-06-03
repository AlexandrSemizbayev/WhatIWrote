<template>
  <div class="field d-flex justify-content-center flex-wrap">
    <textarea name cols="30" rows="10" v-model="text" placeholder="Начните писать,прямо сейчас!"></textarea>
    <transition name="hidden-btn">
      <button
        :disabled="isAllowed"
        class="btn btn-primary"
        @click="addNotice"
        v-if="text.length"
      >{{isAllowed?'Для добавления новых цитат удалите одну из добавленных': 'Добавить запись'}}</button>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    toChange: {}
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    addNotice() {
      let body = {
        time: Date.now()
      };
      body.text = this.text;
      if (this.toChange.text) body.index = this.toChange.index;
      this.$emit("newNotice", body);
      this.toChange.text = "";
      this.text = "";
    }
  },
  watch: {
    toChange: function(newValue, oldValue) {
      if(typeof newValue !== "function"){
        this.text = newValue.text
      }else{
        this.toChange = Object;
      }
    }
  },
  computed: {
    isAllowed() {
      if (this.count >= 10) {
        return this.toChange.text ? false : true ;
      }
    }
  }
};
</script>

<style>
textarea {
  width: 50%;
  margin: 0 25%;
  transition: width .5s;
}

button {
  margin: 14px auto;
}

.hidden-btn-enter-active,
.hidden-btn-leave-active {
  transition: 
    opacity 0.5s cubic-bezier(0.47, 0, 0.745, 0.715),
    margin-top 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
  z-index: -1;
}

.hidden-btn-enter,
.hidden-btn-leave-to {
  opacity: 0;
  margin-top: -2em;
  z-index: -1;
}

@media screen and (max-width: 500px){
    textarea{
        width: 95%;
        margin:0 auto;
    }
}
</style>
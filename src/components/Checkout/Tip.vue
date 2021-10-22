<template>
  <div class="tip">
    <span><i class="bi bi-cash-coin"></i></span>
    <h4>Send your Hero a Tip!</h4>
    <input @keyup="oneDot" autofocus="true"  v-model="tip" inputmode="numeric" placeholder="Enter amount" max="1000">
    <button class="btn-save" @click="save">Next</button>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: ['tipVal'],
  data () {
    return{
      tip: this.tipVal || '0'
    }
  },
  methods: {
    oneDot(ev){

      if (ev >= '0' && ev <= '9')
      this.tip = this.tip+ev.key
      this.tip = this.tip.replace(/\D/g,'');
      var position = this.tip.length-2;
      if (position>=1)
        this.tip  = [this.tip.slice(0, position),'.', this.tip.slice(position)].join('');
    },
    save(){
      this.$emit('save', this.tip)
    }
  },
  watch: {
    tip(newVal, oldVal){

    }
  }
};
</script>

<style lang="scss" scoped>
.tip {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  i{
    font-size: 2rem;
    color: #1e852b;
  }
  input{
    border: none;
    background: none;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    &:focus{
      outline: none;
    }
  }
  .btn-save{
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    height: 44px;
    width: 115px;
    padding-inline: 16px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #1e852b;
    background-color: #1e852b;
    color: #fff;
    font-weight: 600;
    &:focus{
      outline: none;
    }
  }
}
</style>

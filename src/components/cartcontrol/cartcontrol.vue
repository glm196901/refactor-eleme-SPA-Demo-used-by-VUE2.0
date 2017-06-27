<template>
    <!--增加 减少图标 进行对数量的 增加和减少-->
    <div class="cartcontrol">
      <transition name="fade">
        <transition name="inner">
        <div class="cart-decrease" v-show='food.count>0'
           @click.stop.prevent="decreaseCart($event)">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
        </transition>
      </transition>
      <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
      <!--由于pc端click 在点击时候会触发两次所以需要进行一个判断 event._constructed 然后 return即可-->
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<script type='text/ecmascript-6'>
  // 由于在 vue 无法一个创建处得来的对象的数据变化，所以要引入vue 中的一个set方法来对新创建的对象数据改变进行监听
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(e) {
        if (!e._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count++;
        }
        this.$emit('add', e.target);
      },
      decreaseCart(e) {
        if (!e._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "cartcontrol.styl"
</style>

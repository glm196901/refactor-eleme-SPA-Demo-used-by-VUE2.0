<template>
    <div class="shopCart">
      <!--@click="toggleList($event) 内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法-->
      <div class="content" @click="toggleList($event)">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalPrice>0}">
              <span class="icon-shopping_cart"
                    :class="{'highlight':totalPrice>0}">
              </span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
          <div class="description">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <!--在css中建立class 把style写进去 然后 通过v-bind:class="" 来改变数据进行dom变换 利用VUE的计算属性-->
          <div class="pay" v-bind:class="payClass">
            {{payDesc}}
          </div>
        </div>
        <div class="ball-container">
            <transition-group name="dropMethod"  tag="div" @before-enter="beforeEnter" @enter="Enter" @after-enter="afterEnter">
              <div v-show="ball.show" v-for="ball in balls" class="ball" :key="ball">
                <div class="inner inner-hook">
                </div>
              </div>
            </transition-group>
        </div>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [{
            count: 1,
            price: 10
          }];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      pay() {
        if (this.totalPrice < this.minPrice) {
          return 0;
        }
        alert(`请支付￥${this.totalPrice}元`);
      },
      dropMethod(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      Enter(el) {
//      let rf = el.offestHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "shopcart.styl"
</style>

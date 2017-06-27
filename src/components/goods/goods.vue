<template>
    <div class="goods">
      <!--运用了滚动条的api-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="item in goods" class="menu-item">
            <span class="text border-1px" :class="{'current':currentIndex === index}" @click="seleceMenu(index, $event)">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="content">
                    <div class="cartControl-wrapper">
                      <cartcontrol :food="food" @add="_drop"></cartcontrol>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
                :main-price="seller.minPrice"></shopcart>
    </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  //  import data from '../../../static/data.json';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('static/data.json').then((res) => {
        if (res.data.goods) {
          this.goods = res.data.goods;
          this.$nextTick(function() {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }
      ).catch((err) => {
        console.log(err);
      });
    },
    mounted() {
      this.$on('add', () => {
        console.log('加载完毕');
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {click: true});
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = -Math.round(pos.y);
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _drop(target) {
        this.shopcart.dropMethod(target);
        console.log('连通');
      }
    },
    components: {
      shopcart,
      cartcontrol
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    }
  };
</script>



<style lang='stylus' rel='stylesheet/stylus'>
  @import "goods.styl"
</style>

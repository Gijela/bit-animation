<template>
  <div v-if="showAnimationBox">
    <div class="animationBox" ref="beanDemo">
      <transition-group tag="div" name="fade" class="bitOuter" @after-leave="onAfterLeave">
        <div v-for="(item, index) in needReceiveBean" :key="item" class="bit"
          @click="receiveOne(item, index)" :data-index="index"
          :style="{ '--translate-x': `${translateXValues[index]}px` }"
        >
          <div class="outer">
            <img v-if="item % 2" :src="require('./images/fadeIcon.png')" class="fadeIcon" />
            <img :src="require('./images/beanIcon.png')" class="bitIcon bitAnimation" />
            <p> 豆子 * {{ item }}</p>
          </div>
        </div>
      </transition-group>
      <div class="btn" @click="receiveAll">一键领取</div>
    </div>

    <!-- 修饰的【方块】 -->
    <div class="square"></div>
  </div>
</template>

<script>
import { pxBase375ToPxBaseViewPort } from './utils/index'

export default {
  props: {
    needReceiveBean: Array, // 待领取豆子数据
    hasNext: Boolean, // 是否还有下一批豆子需要领取
  },
  data() {
    return {
      calTranslateX: false, // 是否计算过偏移量 translateX
      translateXValues: [], // 对应的偏移值
      showAnimationBox: true,
      loading: false,
    }
  },
  methods: {
    pxBase375ToPxBaseViewPort,
    receiveOne(item, index) {
      if (this.loading) return
      this.loading = true
      this.$emit('receiveBean', [index]) // 调接口领取豆子
    },
    receiveAll() {
      if (this.loading) return
      this.loading = true

      // 去掉translate-x，会使用 transition-group 的默认偏移
      for (let i = 0; i < this.translateXValues.length; i++) {
        this.$set(this.translateXValues, i, 0)
      }
      // 确保在更新 this.translateXValues 数组后，再执行接口调用的逻辑
      this.$nextTick(() => {
        this.$emit('receiveBean', this.needReceiveBean) // 调接口领取豆子
        this.loading = false
      })
    },
    onAfterLeave() {
      this.loading = false
      
      // 判断是否需要获取新的一批豆子
      if (!this.needReceiveBean.length && this.hasNext) {
        setTimeout(() => {
          this.$emit('getBean') // 调接口获取新的一批豆子数据
          this.calTranslateX = false // 重新计算偏移值
        }, 1000);
      } else if (!this.needReceiveBean.length && !this.hasNext) {
        setTimeout(() => {
          this.showAnimationBox = false
        }, 1000)
      }
    },
  },
  watch: {
    needReceiveBean: {
      immediate: true,
      deep: true,
      handler(newV, oldV) {
        // 计算偏移值, 单个领取不会触发计算
        if (!this.calTranslateX) {
          this.translateXValues = this.needReceiveBean.map((item, index) =>
            index === 0 ? this.pxBase375ToPxBaseViewPort(26) : index * this.pxBase375ToPxBaseViewPort(-52),
          )
          this.calTranslateX = true
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.animationBox {
  width: 350px;
  height: 86px;
  background: linear-gradient(360deg, #ffffff 0%, #f7f3ff 100%);
  opacity: 1;
  margin: auto;
  border-radius: 8px;

  display: flex;
  align-items: center;

  .bitOuter {
    min-height: 70px;
    margin-left: 7px;
    padding-top: 10px;

    width: 262px;
    white-space: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none; // 隐藏滚动条
    }
  }

  .outer {
    position: relative;

    .fadeIcon {
      position: absolute;
      left: 26px;
      top: -4px;
      width: 43px;
      height: 14px;
    }
  }

  .bitAnimation {
    position: relative;
    animation: up-to-down 1.5s linear infinite alternate;

    @keyframes up-to-down {
      0% {
        transform: translateY(0);
      }

      35.71% {
        transform: translateY(-5px);
      }

      71.42% {
        transform: translateY(0);
      }

      92.85% {
        transform: translateY(1px);
      }

      100% {
        transform: translateY(0);
      }
    }
  }

  .bit {
    display: inline-block;
    min-width: 52px;
    padding: 0 5px;
    text-align: center;

    .bitIcon {
      width: 40px;
      height: 40px;
    }

    p {
      width: auto;
      min-width: 52px;
      height: 14px;
      font-size: 10px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 14px;
      margin-top: -4px;
    }
  }

  .btn {
    width: 72px;
    height: 30px;
    background: linear-gradient(90deg, #ff589a 0%, #ff8248 68%, #ffa307 100%);
    opacity: 1;
    border-radius: 8px;

    position: absolute;
    right: 28px;

    // 字体样式
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
}

.square {
  width: 12px;
  height: 12px;
  background: linear-gradient(153deg, #f7f3ff 0%, #f7f3ff 100%);
  opacity: 1;
  border-top: 1px solid;
  border-left: 1px solid;
  border-image: linear-gradient(135deg,
      rgba(208.7012779712677, 184.94171530008316, 250.28041005134583, 1),
      rgba(170.64575761556625, 125.14020502567291, 250.28041005134583, 0)) 1 1;

  position: absolute;
  left: 47px;
  top: 78px;
  transform: rotate(45deg);
}

// 1. 声明过渡效果
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}

// 2. 声明进入和离开的状态
.fade-leave-to {
  opacity: 0;
  transform: translate(var(--translate-x), -40px);
}

// 3. 确保离开的项目被移除出了布局流以便正确地计算移动时的动画效果。
.fade-leave-active {
  position: absolute;

  .fadeIcon,
  p:nth-of-type(1) {
    display: none;
  }
}
</style>

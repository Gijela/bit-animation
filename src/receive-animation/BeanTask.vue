<template>
  <div :class="[$style.beanInfoTop]">
    <!-- 豆子 -->
    <div :class="$style.bean">
      <div>
        <div :class="$style.num">
          <scrollNumber :number="beanInfo.myBxBeansCount" :class="$style.n" :h="pxBase375ToPxBaseViewPort(18)"></scrollNumber>
          <span>豆子</span>
        </div>

        <div :class="$style.exchange" @click="handleGoExchange">
          收支/兑换记录
          <img :src="require('./images/arrowRight.png')" />
        </div>
      </div>
      <div :class="[$style.borderCenter]"></div>
    </div>

    <!-- 签到/任务赚豆 -->
    <div :class="$style.task">
      <img :src="require('./images/bean.png')" :class="$style.beanIcon" />
      <div :class="$style.right">
        <div :class="$style.sign">
          <div :class="$style.signBox">
            签到/任务赚豆
            <div v-if="beanInfo.subject" :class="$style.subject"> {{ beanInfo.subject }} </div>
          </div>
        </div>
        <div :class="$style.desc" @click="goTask">
          <span>{{ formatHead(beanInfo.subhead) }}</span>
          <img v-if="beanInfo.subhead" :src="require('./images/arrowRight.png')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pxBase375ToPxBaseViewPort } from './utils/index'
import scrollNumber from './scrollNumber.vue'

export default {
  props: {
    beanInfo: Object,
  },
  components: {
    scrollNumber,
  },
  methods: {
    pxBase375ToPxBaseViewPort,
    handleGoExchange() {
      alert('点击了豆子区域')
    },
    goTask() {
      alert('点击了任务区域')
    },
    formatHead(item) {
      if (Object.is(Number(item), NaN)) {
        return item
      }
      return `今日签到+${item}豆子`
    },
  },
}
</script>

<style lang="scss" module>
.beanInfoTop {
  display: flex;
  justify-content: center;

  .bean,
  .task {
    background-color: white;
  }

  .bean {
    width: 141px;
    height: 68px;
    // border-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-left: 12px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .num {
      height: 21px;
      font-size: 12px;
      font-weight: 600;
      color: #111111;
      display: flex;
      align-items: center;
      font-family: PingFang SC-Medium, PingFang SC;
      // justify-content: center;
      // margin-top: 12px;

      .n {
        font-weight: 600;
        font-size: 18px;
        margin-right: 2px;
      }
    }

    .exchange {
      font-size: 12px;
      color: #999;
      margin-top: 3px;
      display: flex;
      align-items: center;

      img {
        width: 16px;
        height: 16px;
      }

      // justify-content: center;
    }

    .borderCenter {
      width: 1px;
      height: 28px;
      background: #d8d8d8;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      margin-left: 5px;
    }
  }

  .task {
    width: 198px;
    height: 68px;
    // border-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    .beanIcon {
      width: 40px;
      height: 40px;
    }

    .right {
      margin-left: 8px;

      .sign {
        font-size: 15px;
        font-weight: 600;
        color: #111111;
        position: relative;

        .signBox {
          display: inline-flex;
          position: relative;
        }

        .subject {
          position: absolute;
          top: 0;
          display: block;
          // left: 100%;
          right: 0;
          transform: translate(75%, -50%);
          height: 16px;
          border-radius: 8px;
          background: #fe3a3a;
          font-size: 10px;
          font-weight: 600;
          line-height: 16px;
          text-align: center;
          color: #ffffff;
          padding: 0 5px;
        }
      }

      .desc {
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
        margin-top: 4px;
        height: 16px;
        line-height: 16px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
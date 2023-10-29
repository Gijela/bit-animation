<template>
  <div>
    <!-- 领取豆子动画 + 豆子变化总数动画 -->
    <ReceiveAnimation 
      :hasNext="hasNext"
      :needReceiveData="needReceiveData"
      :beanInfo="beanInfo"
      @getNewBeanData="getBeanData"
      @receiveBeanApi="receiveBeanApi"
      @updateBeanNum="updateBeanNum"
    />
  </div>
</template>

<script>
import ReceiveAnimation from './receive-animation/index.vue'

export default {
  components: { 
    ReceiveAnimation 
  },
  data() {
    return {
      // 测试数据
      hasNext: true,
      needReceiveData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      beanInfo: {
        myBxBeansCount: 10000,
        subject: "待领取",
        subhead: 50
      },
    }
  },
  methods: {
    // 手动 mock 接口
    // 1. 获取待领取豆子数据接口
    getBeanData() {
      if (this.hasNext) {
        this.needReceiveData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
    },
    // 2. 领取豆子接口。 mock: arr 保存的是数组的索引
    receiveBeanApi(arr) {
      // 获取最新豆子总数。
      // ps: 因为是 mock 的方式，更新逻辑要先于领取逻辑，否则领取完成之后就会不能取到需要加的豆子数目
      this.updateBeanNum(arr)

      // 单个领取
      if (arr.length === 1) {
        this.needReceiveData.splice(arr[0], 1);
      }
      // 全部领取
      if (arr.length > 1) {
        // 响应式清空数组
        this.needReceiveData.splice(0, this.needReceiveData.length); 
      }
    },
    // 3. 获取豆子总数接口
    updateBeanNum(arr) {
      // 调接口获取最新的豆子数，这里使用的是手动 mock 的方法
      if (arr.length > 1) {
        let sum = 0
        arr.forEach(item => { sum += item })
        this.beanInfo.myBxBeansCount += sum;
      } else if (arr.length === 1) {
        this.beanInfo.myBxBeansCount += this.needReceiveData[arr[0]];
      }
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background: pink;
}
</style>
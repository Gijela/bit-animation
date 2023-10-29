<template>
  <div class="beanInfo">
    <BeanTask :beanInfo="beanInfo" />
    <Animation
      :hasNext="hasNext"
      :needReceiveBean="needReceiveData"
      @addBeanNum="updateBeanNum"
      @receiveBean="receiveBeanApi"
      @getBean="getBeanData"
    />
  </div>
</template>

<script>
import BeanTask from "./BeanTask.vue";
import Animation from "./Animation.vue";

export default {
  props: {
    hasNext: Boolean, // 是否有下一批豆子
    needReceiveData: Array, // 待领取的豆子
    beanInfo: Object, // 个人豆子信息
  },
  components: {
    BeanTask,
    Animation,
  },
  methods: {
    // 获取新的一批待领取豆子数据
    getBeanData() {
      this.$emit('getNewBeanData')
    },
    // 领取豆子接口。 mock: arr 保存的是数组的索引
    receiveBeanApi(arr) {
      this.$emit('receiveBeanApi', arr)
    },
    // 获取豆子总数接口
    updateBeanNum(arr) {
      this.$emit('updateBeanNum', arr)
    },
  },
};
</script>

<style>
.beanInfo {
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  position: relative;
}
</style>

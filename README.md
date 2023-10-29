# h5领取动画

## 需求
1. 在领取豆子的时候需要做一个动画，豆子移动到总豆子数的位置。
2. 支持单个领取，全部领取(如果后续还有豆子，需要重新刷新豆子)

## 完成情况
[已完成]，组件路径是 `src/receive-animation/index.vue` 
在线体验链接：https://bit-animation.vercel.app/
ps: **需要按 f12 打开控制台，然后选择手机端才可以正常显示**

## 属性
- hasNext: boolean, 是否有下一批待领取豆子
- needReceiveData: string[], 待领取豆子的数据
- beanInfo: Object, 个人豆子信息

## 接口
- getNewBeanData: Function, 获取待领取豆子数据的接口
- receiveBeanApi: Function, 领取豆子的接口
- updateBeanNum: Function, 获取豆子总数目接口

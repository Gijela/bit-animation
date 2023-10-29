# (动画)豆子领取 + (动画)豆子增加总数

## 属性
- hasNext: boolean, 是否有下一批待领取豆子
- needReceiveData: string[], 待领取豆子的数据
- beanInfo: Object, 个人豆子信息

## 接口
- getNewBeanData: Function, 获取待领取豆子数据的接口
- receiveBeanApi: Function, 领取豆子的接口
- updateBeanNum: Function, 获取豆子总数目接口
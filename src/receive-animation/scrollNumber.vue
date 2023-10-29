<template>
  <div style="display: flex; align-items: center">
    <div v-for="(item, index) in numberToArray" :key="index" :class="['number', { sign: ignoreStr.includes(item) }]" :style="numStyle">
      <div class="scroll-container" :style="{ ...animateStyle(item) }" v-bind="$attrs">
        <div v-for="(v, i) in numberBox" :key="i" class="scroll-single" :style="{ color: color }">
          {{ v }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberBox: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', '-', ':', ' '],
      ignoreStr: ['.', ' ', '-', ':'],
      numberToArray: [],
    }
  },
  props: {
    number: {
      type: [Number, String],
      default: 0,
    },
    h: {
      type: Number, // 数字高度
      default: 24,
    },
    color: {
      type: [String],
    },
    customStyle: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    animateStyle(item) {
      const index = item.trim().length === 0 ? 9999 : this.numberBox.findIndex((i) => item == i) // eslint-disable-line
      return { transform: `translate(0,-${index * this.height}px)` }
    },
  },
  computed: {
    numStyle({ height }) {
      return {
        ...this.customStyle,
        height: `${height}px`,
        fontSize: `${height}px`,
        lineHeight: `${height}px`,
      }
    },
    height() {
      return Math.floor(this.h)
    },
  },
  watch: {
    number: {
      immediate: true,
      deep: true,
      handler(n) {
        this.numberToArray = n.toString().split('')
      },
    },
  },
}
</script>

<style>
.number {
  overflow: hidden;
}
.number.sign {
  width: 12px;
  margin: 0 4px;
}
.scroll-container {
  display: flex;
  flex-direction: column;
  transform: translate(0, 0);
  transition: all 0.6s;
}
.scroll-single {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1;
  overflow: hidden;
}
</style>

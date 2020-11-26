<template>
  <view class="l-badge" @click="handleTap">
    <slot></slot>
    <block v-if="show">
      <view v-if="dot" class="l-badge-dot l-class l-self-class"></view>
      <view v-else :class="[`l-badge-content-${shape}`]" class="l-badge-content l-class l-self-class">{{finalCount}}
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: 'LBadge',
  props: {
    // 红点模式
    dot: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: 'horn',
      validator(value) {
        return ['horn', 'circle'].indexOf(value) !== -1
      },
    },
    value: {
      type: String,
      default: '0'
    },
    mode: {
      type: String,
      default: 'number',
      validator(value) {
        return ['number', 'text'].indexOf(value) !== -1
      },
    },
    // 数字最大值
    maxCount: {
      type: Number,
      default: 99,
    },
    // 数字形式
    numberType: {
      type: String,
      default: 'overflow',
      validator(value) {
        return ['overflow', 'limit', 'ellipsis'].indexOf(value) !== -1
      },
    },
    show: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      finalCount: 0,
    }
  },
  watch: {
    value: {
      handle() {
        this.setFinalCount()
      },
    }
  },
  methods: {
    handleTap() {
      this.$emit('lintap')
    },
    setFinalCount() {
      if (isNaN(Number(this.value)) || (this.mode === 'text')) {
        this.finalCount = this.value
        return
      }
      this.switchType()
    },
    switchType() {
      switch (this.numberType) {
        case 'overflow':
          this.finalCount = Number(this.value) > Number(this.maxCount) ? `${this.maxCount}` : this.value
          break
        case 'ellipsis':
          this.finalCount = Number(this.value) > Number(this.maxCount) ? '...' : this.value
          break
        case 'limit':
          this.finalCount = Number(this.value) > 999 ? (Number(this.value) >= 9999 ? Math.floor(this.value / 10000 * 100) / 100 + 'w' : Math.floor(this.value / 1000 * 100) / 100 + 'k') : this.value
          break
        default:
          this.finalCount = Number(this.value)
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";

$red: #ff474b;

.l-badge {
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;

  &-content {
    max-width: 650rpx;
    left: 70%;
    background-color: $red;
    color: #ffffff;
    position: absolute;
    font-size: 20rpx;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    box-sizing: border-box;
    z-index: 10;
    letter-spacing: .5rpx;

    &-horn {
      height: 28rpx;
      min-width: 54rpx;
      padding: 0 8rpx;
      border-radius: 14rpx 14rpx 14rpx 0;
      line-height: 28rpx;
      top: -10rpx;
    }

    &-circle {
      height: 32rpx;
      min-width: 32rpx;
      padding: 0 10rpx;
      border-radius: 16rpx;
      line-height: 32rpx;
      top: -10rpx;
    }
  }

  &-dot {
    height: 16rpx;
    width: 16rpx;
    transform: translateX(50%);
    border-radius: 50%;
    background-color: $red;
    position: absolute;
    top: -4rpx;
    right: 0;
  }
}

</style>

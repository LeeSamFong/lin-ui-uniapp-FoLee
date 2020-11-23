<template>
  <view style="display: flex;">
    <view class="l-tag" :class="tagClass" :style="tagStyle" @click="handleTap">
      <view :class="innerClass" :style="innerStyle">
        <l-icon v-if="icon" :name="icon" :style="lIconStyle"
                :size="iconSize" :color="iconColor"></l-icon>
        <image v-if="image" :src="image" :style="imageStyle"
               :class="[imageClass,]"></image>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
import LIcon from '../../icon'

export default {
  name: 'LTag',
  components: {
    LIcon,
  },
  props: {
    // 标签标识
    name: String,
    cell: Object,
    // 标签颜色
    type: {
      type: String,
      default: 'touch',
      validator(value) {
        return ['reading', 'touch'].indexOf(value) !== -1
      },
    },
    bgColor: String,
    fontColor: String,
    disable: Boolean,
    // 标签形状
    shape: {
      type: String,
      default: 'square',
      validator(value) {
        return ['square', 'circle'].indexOf(value) !== -1
      },
    },
    // 是否为选中态
    select: Boolean,
    // 是否镂空
    plain: Boolean,
    // 标签大小
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['large', 'medium', 'mini', 'super-mini'].indexOf(value) !== -1
      },
    },
    location: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].indexOf(value) !== -1
      },
    },
    icon: String,
    iconSize: {
      type: String,
      default: '20'
    },
    iconColor: {
      type: String,
      default: '#3683D6'
    },
    image: String,
    iconStyle: {
      type: String,
      default: 'size:20;color:#3683D6'
    },
    height: Number
  },
  computed: {
    tagClass() {
      return {
        'l-tag-touch': this.type === 'touch',
        [`l-tag-plain-${this.size}`]: this.plain,
        [`l-tag-${this.size}`]: !this.plain,
        'l-tag-disable': this.disable,
        'select l-select-class': this.select,
        'l-class': !this.select,
        'l-tag-plain': this.plain,
        [`l-tag-${this.size}-${this.shape}`]: true,
      }
    },
    tagStyle() {
      const style = {}

      if (this.height) {
        const height = isNaN(this.height) ? this.height : this.height + 'rpx'
        style['line-height'] = height
        style['height'] = height
      }
      if (this.plain) {
        style.color = this.fontColor
        style['border-color'] = this.fontColor
      } else {
        style['background-color'] = this.bgColor
        style.color = this.fontColor
      }

      return style
    },
    innerClass() {
      return {
        'content': this.location === 'left',
        'content-l': this.location !== 'left',
      }
    },
    innerStyle() {
      const style = {}
      if (this.iconName) {
        style['line-height'] = '0'
      }
      return style
    },
    lIconStyle() {
      const style = {}
      if (this.location === 'left') {
        style['margin-right'] = '5rpx'
      } else {
        style['margin-left'] = '5rpx'
      }
      return style
    },
    imageStyle() {
      const style = {}

      if (this.location === 'left') {
        style['margin-right'] = '5rpx'
      } else {
        style['margin-left'] = '5rpx'
      }

      return style
    },
    imageClass() {
      return {
        [`tag-image-${this.size}`]: true,
      }
    },
  },
  methods: {
    handleTap() {
      if (this.disable) {
        return
      }

      const options = {
        name: this.name,
        cell: this.cell,
        select: this.select,
      }
      this.$emit('lintap', options)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.l-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: $theme-color;

  &-touch {
    min-width: 80rpx;
  }

  // Size
  &-super-mini {
    height: 32rpx;
    font-size: 20rpx;
  }

  &-mini {
    height: 42rpx;
    font-size: 20rpx;
  }

  &-medium {
    height: 50rpx;
    font-size: 24rpx;
    letter-spacing: 2rpx;
  }

  &-large {
    height: 60rpx;
    font-size: 24rpx;
    letter-spacing: 2rpx;
  }

  // Shape
  &-super-mini-square {
    border-radius: 2rpx;
    padding: 0 6rpx;
  }

  &-mini-square {
    border-radius: 2rpx;
    padding: 0 12rpx;
  }

  &-medium-square {
    border-radius: 2rpx;
    padding: 0 16rpx;
  }

  &-large-square {
    border-radius: 2rpx;
    padding: 0 18rpx;
  }

  &-super-mini-circle {
    border-radius: 16rpx;
    padding: 0 12rpx;
  }

  &-mini-circle {
    border-radius: 21rpx;
    padding: 0 16rpx;
  }

  &-medium-circle {
    border-radius: 25rpx;
    padding: 0 20rpx;
  }

  &-large-circle {
    border-radius: 30rpx;
    padding: 0 24rpx;
  }

  &-plain {
    background-color: #ffffff;
    color: $theme-color;
    border: 2rpx solid $theme-color;

    &-super-mini {
      height: 28rpx;
      font-size: 20rpx;
    }

    &-mini {
      height: 38rpx;
      font-size: 20rpx;
    }

    &-medium {
      height: 46rpx;
      font-size: 24rpx;
      letter-spacing: 2rpx;
    }

    &-large {
      height: 56rpx;
      font-size: 24rpx;
      letter-spacing: 2rpx;
    }
  }

  &-disable {
    background-color: $disabled-color;
    color: #ffffff;
    border-color: $disabled-color;
  }

}

.select {
  background-color: $theme-color;
  color: #ffffff;
  // border: 2rpx solid @theme-color;
}

.content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.content-l {
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}

.tag-image {
  &-mini {
    width: 20rpx;
    height: 20rpx;
  }

  &-large {
    width: 24rpx;
    height: 24rpx;
  }
}
</style>

<template>
  <view>
    <label class="l-label-class" @click.stop="handleTap">
      <block v-if="special">
        <view class="special-container" :class="lClass">
          <slot></slot>
        </view>
      </block>
      <block v-else>
        <view class="l-btn" :class="[lBtnClass, lClass]"
              :style="lBtnStyle"
              :hover-class="hoverClass"
              :hover-stop-propagation="hoverStopPropagation"
              :hover-start-time="hoverStartTime"
              :hover-stay-time="hoverStayTime">
          <view v-if="loading" class="l-btn-loading" :class="loadingClass"></view>
          <l-icon v-if="icon"
                  :l-class="[lIconClass, `margin-${size}`]"
                  :l-font-class="LIconFontClass"
                  :name="icon"
                  :color="iconColor"
                  :size="iconSize"></l-icon>
          <slot></slot>
        </view>
      </block>
    </label>

    <button style="position: absolute; top: -999px; left: -999px;"
            v-if="openType"
            :id="name"
            :lang="lang"
            :form-type="formType"
            :open-type="openType"
            :app-parameter="appParameter"
            :hover-stop-propagation="hoverStopPropagation"
            :hover-start-time="hoverStartTime"
            :hover-stay-time="hoverStayTime "
            :session-from="sessionFrom"
            :send-message-title="sendMessageTitle"
            :send-message-path="sendMessagePath"
            :send-message-img="sendMessageImg"
            :show-message-card="showMessageCard"
            @contact="openTypeEvent"
            @getuserinfo="openTypeEvent"
            @getphonenumber="openTypeEvent"
            @opensetting="openTypeEvent">
    ></button>
  </view>
</template>

<script>
import LIcon from '../../icon'

export default {
  name: 'LButton',
  components: {
    LIcon,
  },
  props: {
    name: {
      type: String,
      default: 'lin',
    },
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['warning', 'success', 'error', 'default'].indexOf(value) !== -1
      },
    },
    plain: Boolean,
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'large', 'mini', 'long'].indexOf(value) !== -1
      },
    },
    shape: {
      type: String,
      default: 'circle',
      validator(value) {
        return ['square', 'circle', 'semicircle'].indexOf(value) !== -1
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    special: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },

    // 微信原生接口
    width: [Number, String],
    height: Number,
    icon: String,
    image: String,
    bgColor: String,
    iconColor: String,
    iconSize: String,
    openType: String,
    appParameter: String,
    lang: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      default: 20,
    },
    hoverStayTime: {
      type: Number,
      default: 70,
    },
    sessionFrom: {
      type: String,
      default: '',
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    formType: String,

    // 外部样式类
    lClass: [String, Object],
    lLabelClass: [String, Object],
    lHoverClass: [String, Object],
    lImgClass: [String, Object],
    lIconClass: [String],
    LIconFontClass: [String],
  },
  computed: {
    lBtnClass() {
      return {
        [`l-btn-${this.size}`]: true,
        [`l-btn-${this.type}`]: true,
        [`l-btn-${this.shape}`]: true,
        [`l-btn-${this.shape}-${this.size}`]: true,
        [`l-btn-plain-${this.type}`]: this.plain,
        'l-btn-disabled': this.disabled,
      }
    },
    lBtnStyle() {
      const style = {}

      const height = isNaN(this.height) ? this.height : this.height + 'rpx'

      style['min-width'] = isNaN(this.width) ? this.width : this.width + 'rpx'
      style.height = height
      style['line-height'] = height
      if (this.size === 'long') {
        style['border-radius'] = '0'
      }
      style['background-color'] = this.bgColor

      return style
    },
    hoverClass() {
      const hoverClass = {
        'btn-hover': !this.disabled,
      }

      if (this.lHoverClass && typeof this.lHoverClass === 'object') {
        Object.assign(hoverClass, this.lHoverClass)
      } else if (typeof this.lHoverClass === 'string') {
        hoverClass[`${this.lHoverClass}`] = true
      }

      // 将所有hoverClass组装成字符串格式
      let hoverClassStr = ''
      for (const key in hoverClass) {
        if (!hoverClass[key]) {
          continue
        }
        hoverClassStr += `${key} `
      }

      return hoverClassStr
    },
    loadingClass() {
      const loadingClass = {
        [`margin-${this.size}`]: !!this.size,
      }
      if (this.plain) {
        loadingClass[`l-btn-loading-${this.type}`] = true
      }
      return loadingClass
    },
  },
  methods: {
    // button点击事件
    handleTap() {
      if (this.disabled || this.loading) return false
      this.$emit('lintap', {})
    },
    openTypeEvent(data) {
      this.$emit(data.type, data.detail);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/mixins.scss";

.btn-hover::before {
  @include active();
}

.special-container{
  display: flex;
}

.l-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 28rpx;
  position: relative;
  color: #fff;
  padding: 0 12rpx;
  box-sizing: border-box;

  // img-size
  &-img {
    &-mini {
      width: $btn-height-mini / 2;
      height: $btn-height-mini / 2;
    }
    &-medium {
      width: $btn-height / 2;
      height: $btn-height / 2;
    }
    &-large {
      height: $btn-height-large / 2;
      width: $btn-height-large / 2;
    }
  }

  // Size
  &-long {
    border-radius: 0;
    height: 88rpx;
    width: 100%;
  }
  &-medium {
    height: $btn-height;
    min-width: $btn-width;
  }
  &-large {
    height: $btn-height-large;
    min-width: $btn-width-large;
  }
  &-mini {
    height: $btn-height-mini;
    min-width: $btn-width-mini;
    font-size: $size-font-mini;
  }

  //Type
  &-default{
    background-color: $default-color;
  }

  &-success {
    background-color: $success-color;
  }

  &-warning {
    background-color: $warning-color;
    color: #333333;
  }

  &-error {
    background-color: $error-color;
  }


  // Shape
  &-square {
    border-radius: 0;
  }
  &-semicircle {
    border-radius: $btn-circle-size;

    &-large {
      border-radius: $btn-circle-size-large;
    }
    &-mini {
      border-radius: $btn-circle-size-mini;
    }
  }
  &-circle {
    border-radius: $btn-circle-size / 5;

    &-large {
      border-radius: $btn-circle-size-large / 5;
    }
    &-mini {
      border-radius: $btn-circle-size-mini / 5;
    }
  }

  // Plain
  &-plain {
    &-default {
      background-color: #fff;
      color: $default-color;
      border: 2rpx solid $default-color;
    }

    &-success {
      background-color: #fff;
      color: $success-color;
      border: 2rpx solid $success-color;
    }
    &-error {
      background-color: #fff;
      color: $error-color;
      border: 2rpx solid $error-color;
    }
    &-warning {
      background-color: #fff;
      color: $warning-color;
      border: 2rpx solid $warning-color;
    }
  }

  // Loading
  &-loading {
    opacity: 0.6;
    display: inline-block;
    vertical-align: middle;
    width: 24rpx;
    height: 24rpx;
    background: transparent;
    border-radius: 50%;
    border: 4rpx solid $btn-loading-color;
    border-color: $btn-loading-color $btn-loading-color $btn-loading-color transparent;
    animation: btn-spin 0.6s linear;
    animation-iteration-count: infinite;
    &-default {
      border: 4rpx solid $default-color;
      border-color: $default-color $default-color $default-color transparent;
    }
    &-success {
      border: 4rpx solid $success-color;
      border-color: $success-color $success-color $success-color transparent;
    }
    &-error {
      border: 4rpx solid $error-color;
      border-color: $error-color $error-color $error-color transparent;
    }
    &-warning {
      border: 4rpx solid $warning-color;
      border-color: $warning-color $warning-color $warning-color transparent;
    }
  }

  // Disabled
  &-disabled {
    opacity: 0.8;
  }
}

.icon {
  display: flex !important;
}

.margin {
  &-mini {
    margin-right: 10rpx
  }
  &-medium {
    margin-right: 18rpx
  }
  &-large {
    margin-right: 24rpx
  }
  &-long {
    margin-right: 24rpx
  }
}

@keyframes btn-spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>

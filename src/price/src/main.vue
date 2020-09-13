<template>
  <view class="price-container"
        :class="containerClass"
        :style="containerStyle"
  >
    <!-- unit -->
    <text class="l-unit-class" :style="unitStyle">{{unit}}</text>
    <!-- count -->
    <text class="l-value-class" :style="valueStyle">{{priceInteger}}
      <text class="l-dot-class">{{priceDecimal ? '.' : ''}}</text>
      <text class="l-decimal-class">{{priceDecimal ? priceDecimal : ''}}</text>
    </text>
  </view>
</template>

<script>
export default {
  name: "LPrice",

  props: {
    unit: {
      type: String,
      default: '￥'
    },
    size: {
      type: String,
      default: '28'
    },
    color: {
      type: String,
      default: '#333333'
    },
    bold: {
      type: String,
      default: '500'
    },
    unitColor: String,
    unitSize: String,
    unitBold: String,
    value: {
      type: [String, Number],
      default: '0.00'
    },
    mode: {
      type: String,
      default: 'number',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['number', 'text'].indexOf(value) !== -1
      },
    },
    valueColor: String,
    valueSize: String,
    valueBold: String,
    deleted: Boolean,
    delColor: String,
    reserveDigit: {
      type: Number,
      default: 2
    },
    autofix: Boolean,
  },

  data() {
    return {
      // 价格整数部分
      priceInteger: {
        type: String,
        default: '0'
      },
      // 价格小数部分
      priceDecimal: {
        type: String,
        default: '00'
      },

    }
  },

  computed: {
    containerClass() {
      return {
        'price-del': this.deleted,
        'l-deleted-class': this.deleted,
      }
    },

    containerStyle() {
      let style = {}

      style.color = this.delColor ? this.delColor : this.color

      return style
    },

    unitStyle() {
      let style = {}

      style.color = this.unitColor ? this.unitColor : this.color
      style['font-size'] = (this.unitSize ? this.unitSize : this.size) + 'rpx'
      style['font-weight'] = this.unitBold ? this.unitBold : this.bold

      return style
    },

    valueStyle() {
      let style = {}

      style.color = this.valueColor ? this.valueColor : this.color
      style['font-size'] = (this.valueSize ? this.valueSize : this.size) + 'rpx'
      style['font-weight'] = this.valueBold ? this.valueBold : this.bold

      return style
    },

  },

  watch: {
    value: {
      handler() {
        this.reserveNumber()
      },
    }
  },

  mounted() {
    this.reserveNumber()
  },

  methods: {
    reserveNumber() {
      this.priceInteger = null
      this.priceDecimal = null

      const countToNumber = Number(this.value)
      const isText = isNaN(Number(countToNumber)) || this.mode === 'text'
      if (!isText && this.autofix) {
        const result = countToNumber.toFixed(this.reserveDigit)
        const price = result.toString().split('.')
        this.setPrice(price)
      } else {
        // const price = this.value.split('.')
        const price = this.value.toString().split('.')
        this.setPrice(price)
      }

    },

    setPrice(price) {
      if (price.length === 1) {
        this.priceInteger = price[0]
      } else if (price.length === 2) {
        this.priceInteger = price[0]
        this.priceDecimal = price[1]
      } else {
        throw 'price 格式有误，请仔细检查！'
      }
    },

  },

}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.price-container {
  display: inline-block;
  text-align: center;
  color: $theme-color;
  font-size: 28rpx;
}

.price-del {
    text-decoration: line-through !important;
  }
</style>

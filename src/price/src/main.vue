<template>
  <view class="l-price" :class="deletedClass" :style="deletedStyle">
    <!-- unit -->
    <text class="l-unit-class" :style="unitStyle">{{unit}}</text>
    <!-- count -->
    <text class="l-value-class" :style="valueStyle"><text class="l-integer-class">{{priceInteger}}</text><text class="l-dot-class">{{priceDecimal ? '.' : ''}}</text><text class="l-decimal-class">{{priceDecimal ? priceDecimal : ''}}</text></text>
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
      default: '#3963BC'
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
      validator(value) {
        return ['number', 'text'].indexOf(value) !== -1
      }
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
    autofix: Boolean
  },
  data() {
    return {
      // 价格整数部分
      priceInteger: '0',
      // 价格小数部分
      priceDecimal: '00',
    }
  },
  computed: {
    deletedClass() {
      return {
        'price-del': this.deleted,
      }
    },
    deletedStyle() {
      const style = {}

      style.color = this.delColor ? this.delColor : this.color

      return style
    },
    unitStyle() {
      const style = {}

      style.color = this.unitColor ? this.unitColor : this.color
      style['font-size'] = `${this.unitSize ? this.unitSize : this.size}rpx`
      style['font-weight'] = this.unitBold ? this.unitBold : this.bold

      return style
    },

    valueStyle() {
      const style = {}

      style.color = this.valueColor ? this.valueColor : this.color
      style['font-size'] = `${this.valueSize ? this.valueSize : this.size}rpx`
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
      const isText = Number.isNaN(Number(countToNumber)) || (this.mode === 'text')
      if (!isText && this.autofix) {
        const result = countToNumber.toFixed(this.reserveDigit)
        const price = result.toString().split('.')
        this.setPrice(price)
      } else {
        const price = this.value.toString().split('.')
        this.setPrice(price)
      }
    },

    setPrice(price) {
      if (price.length === 1) {
        const [priceInteger] = price
        this.priceInteger = priceInteger
      } else if (price.length === 2) {
        const [priceInteger, priceDecimal] = price
        this.priceInteger = priceInteger
        this.priceDecimal = priceDecimal
      } else {
        throw new Error('price 格式有误，请仔细检查！')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.l-price {
  display: inline-block;
  text-align: center;
  color: $theme-color;
  font-size: 28rpx;
}

.price-del {
  text-decoration: line-through !important;
}
</style>

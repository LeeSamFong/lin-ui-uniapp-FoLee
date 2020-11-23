import LTag from './src/main'


LTag.install = (Vue) => {
    Vue.component(LTag.name, LTag)
}

export default LTag

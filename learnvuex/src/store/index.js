import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import moduleA from './modules/moduleA'


// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
// 看到弹幕上说
// state相当于组件的data
// getter相当于组件的computed
// mutation相当于组件同步的methods
// action相当于组件异步的methods

const state = {
  counter: 1000,
  students: [
    { id: 1, name: 'niko', age: 30 },
    { id: 2, name: 'daisy', age: 18 },
    { id: 3, name: 'ice', age: 9 },
    { id: 4, name: 'fire', age: 21 }
  ],
  info: {
    name: 'niko',
    age: 20,
    height: 1.67
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    a: moduleA
  }
})

// 3.导出store
export default store

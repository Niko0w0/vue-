import {
  INCREMENT
} from './mutations-types'

export default {
  // (生物物种的) 变异，突变; (形式或结构的) 转变，改变
  // 方法
  [INCREMENT](state) {
    state.counter++
  },
  decrement(state) {
    state.counter--
  },
  // incrementCount(state, count) {
  // state.counter += count; 
  // },
  incrementCount(state, payload) {
    state.counter += payload.count
  },
  addStudent(state, stu) {
    state.students.push(stu);
  },
  updateInfo(state) {
    // state.info.name = 'daisy'
    // 增加一个新的属性
    // Vuex的store中的state是响应式的，当state中的数据发生改变的时候，VUe组件会自动更新
    // 这要求我们必须遵守一些Vuex对应的规则
    // 提前在store中初始化号所需的属性
    // 所以下面的代码是无法在页面响应式地添加address这个属性的
    // state.info['addresss'] = 'Earth 地球'

    // set(要求改的对象/数组，索引值，修改后的值)
    Vue.set(state.info, 'address', 'Earth 地球')
    // 该方式也做不到响应式
    // delete state.info.age
    Vue.delete(state.info, 'age')

    // 这个方法会变成页面上修改了，但是devtools并没有监听到name的修改，所以异步函数不能放在mutation里面
    // 通常情况下，Vuex要求我们mutation中的方法必须是同步方法
    // 主要原因是当我们使用devtools时，devtools可以帮助我们捕捉mutation的快照，但是如果是异步操作，那么devtools将不能很好的追中这个操作什么时候会被完成
    // setTimeout(() => {
    //   state.info.name = 'niko'
    // },3000)
  }
}
export default {
  // action类似于mutation，但是是用来代替mutation进行异步操作的
  // aupdateInfo(context, payload) {
  //   setTimeout(() => {
  //     context.commit('updateInfo');
  //     // console.log(payload)
  //     // payload()
  //     console.log(payload.message);
  //     payload.success()
  //   },1000)
  // }

  aupdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updateInfo');
        console.log(payload)

        resolve('11111')
      }, 1000)
    })
  }
}
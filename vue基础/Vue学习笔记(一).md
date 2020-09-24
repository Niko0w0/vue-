## 一些之前Vue基础

### v-bind的基本使用

某些时候我们并不想将变量放在标签内容中，像这样`<h2>{{message}}</h2>`是将变量h2标签括起来，类似js的innerHTML。但是我们期望将变量`imgURL`写在如下位置，想这样`<img src="imgURL" alt="">`导入图片是希望动态获取图片的链接，此时的imgURL并非变量而是字符串imgURL。

如果要将其生效为变量，需要使用到一个标签`v-bind:`，像这样`<img v-bind:src="imgURL" alt="">`，而且这里也不能使用Mustache语法，类似`<img v-bind:src="{{imgURL}}" alt="">`，这也是错误的。
v-bind:`由于用的很多，vue对他有一个语法糖的优化写法也就是`:，如`<img :src="imgURL" alt="">`

### v-bind动态绑定class
#### v-bind动态绑定class(对象语法)

​	有时候我们期望对Dom元素的节点的class进行动态绑定，选择此Dom是否有指定class属性。例如，给h2标签加上`class="active"`，当Dom元素有此class时候，变红`<style>.active{color:red;}</style>`，在写一个按钮绑定事件，点击变黑色，再次点击变红色。

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-bind动态绑定class(对象语法)</title>
  <style>
    .active{
      color:red;
    }
  </style>
</head>
<body>
  <div id="app">

    <!-- 动态绑定class对象用法  -->
    <!-- 
    	<h2 :class="{key1:value1,key2:value2}">{{message}}</h2>
    	<h2 :class="{类名1:true,类名2:boolean}">{{message}}</h2> 
    -->
    <h2 class="title" :class="{active:isActive}">{{message}}</h2>
    <h2 class="title" :class="getClasses()">{{message}}</h2>
    <button @click="change">点击变色</button>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        active:"active",
        isActive:true
      },
      methods: {
        change(){
          this.isActive = !this.isActive
        },
        getClasses(){
          return {active:this.isActive}
        }
      },
    })
  </script>
</body>
</html>
```

​	定义两个变量`active`和`isActive`，在Dom元素中使用`:class={active:isActive}`，此时绑定的`class='active'`，isActive为true，active显示，定义方法change()绑定在按钮上，点击按钮`this.isActive = !this.isActive`，控制Dom元素是否有`class='active'`的属性。

#### v-bind动态绑定class(数组用法)

​	class属性中可以放数组，会依次解析成对应的class。

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-bind动态绑定class(数组用法)</title>
  <style>
  </style>
</head>
<body>
  <div id="app">
    <!-- 加上单引号当成字符串 -->
    <h2 class="title" :class="['active','line']">{{message}}</h2>
    <!-- 不加会被当成变量 -->
    <h2 class="title" :class="[active,line]">{{message}}</h2>
    <h2 class="title" :class="getClasses()">{{message}}</h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        active:"aaaa",
        line:'bbbb'
      },
      methods: {
        getClasses(){
          return [this.active,this.line]
        }
      },
    })
  </script>
</body>
</html>
```

1.   加上单引号的表示字符串
2.  不加的会当成变量
3.  可以直接使用方法返回数组对象

### v-bind动态绑定style

#### v-bind动态绑定style(对象语法)

```javascript
<!-- <h2 :style="{key(属性名):value(属性值)}">{{message}}</h2> -->
<!-- 加单引号，当成字符串解析 -->
<h2 :style="{fontSize:'50px'}">{{message}}</h2>
<!-- 不加单引号，变量解析 -->
<h2 :style="{fontSize:fontSize}">{{message}}</h2>
<h2 :style="getStyle()">{{message}}</h2>
```

#### v-bind动态绑定style(数组语法)

```javascript
  <div id="app">
    <h2 :style="[baseStyle]">{{message}}</h2>
    <h2 :style="getStyle()">{{message}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        baseStyle:{backgroundColor:'red'}
      },
      methods: {
        getStyle(){
          return [this.baseStyle]
        }
      },
    })
  </script>
```

​	类似绑定class，绑定style也是一样的。



## 一.计算属性的本质

### 1.1 计算属性的本质

- fullname:{set(),get{}}

在计算属性中其实是由这样两个方法setter和getter。

```javascript
      computed: {
        fullName:{
          //计算属性一般没有set方法，只读属性
          set:function(newValue){
            console.log("-----")
            const names = newValue.split(" ")
            this.firstName = names[0]
            this.lastName = names[1]
          },
          get:function(){
            return this.firstName + " " + this.lastName
          }
        }
      }
```

​	但是计算属性一般没有set方法，只读属性，只有get方法，但是上述中newValue就是新的值，也可以使用set方法设置值，但是一般不用。

**computed的getter/setter**

```javascript
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Vue计算属性的getter和setter</title>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <h1>计算属性：computed的getter/setter</h1>
            <h2>fullName</h2>
            {{fullName}}
            <h2>firstName</h2>
            {{firstName}}
            <h2>lastName</h2>
            {{lastName}}
        </div>
        <script>
            var app = new Vue({
                el:"#app",
                data:{
                firstName:"zhang",
                lastName:"san",
                },
                computed: {
                    fullName:{
                        get:function(){
                            return this.firstName+" "+this.lastName
                        },
                        set:function(value){
                            var list = value.split(' ');
                            this.firstName=list[0]
                            this.lastName=list[1]
                        }
                    }
                },
            });
        </script>
    </body>
    </html>
```



- 通过这种方式，我们可以在改变计算属性值的同时也改变和计算属性相关联的属性值。



### 1.2 计算属性和methods对比

- 计算属性再多次使用时，只会调用一次
- 它时缓存的



### 二. 事件监听

#### 2.1 事件监听基本使用 -> v-on基本使用

使用`v-on:click`给button绑定监听事件以及回调函数，@是`v-on:`的语法糖，也就是简写也可以使用`@click`。方法一般是需要写方法名加上()，在`@click`中可以省掉，如上述的`<button @click="increment">加</button>`。

#### 2.2 v-on参数问题

- btnClick()
- btnClick(event)
- btnClick(abc,event)->$event

如果我们需要event对象还需要传入其他参数，可以使用`$event`对象。

#### 2.3 v-on修饰符

- stop -> btn的click事件不会传播，不会冒泡到上层，调用`event.stopPropagation()`。
- prevent -> 调用`event.preeventDefault`阻止默认行为。
- enter -> 监听键盘事件
- once
- .native



### 三. 条件判断

#### 3.1v-if/v-else-if/v-else

#### 3.2 登录小案例

#### 3.3 v-show

- v-show和v-if区别

### 四.循环遍历

#### 4.1 遍历数组

#### 4.2 遍历对象

- value
- value,key
- value,key,index

#### 4.3 数组中那些方法是响应式的

#### 4.4 作业案例



### 五.图书建立



### 六. v-model的使用

#### 6.1 v-model的基本使用

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<div id="app">
  <input type="text" v-model="message">{{message}}
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: "hello"
    }
  })
</script>
</body>
</html>
```

​	v-model双向绑定，既输入框的value改变，对应的message对象值也会改变，修改message的值，input的value也会随之改变。无论改变那个值，另外一个值都会变化。



**v-model的原理**

- `v-model` -> `v-bind:value` `v-on:input`

```javascript
<div id="app">
    <input type="text" v-model="message">
    <input type="text" :value="message" v-on:input="valueChange">
    <input type="text" :value="message" @input="message = $event.target.value">
    {{message}}
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data :{
            message : 'hello'
        },
        methods :{
            valueChange(event){
                this.message = event.target.value;
            }
        }
    })
</script>
```



实现双向绑定需要是用v-bind和v-on，使用v-bind给input的value绑定message对象，此时message对象改变，input的值也会改变。但是改变input的value并不会改变message的值，此时需要一个v-on绑定一个方法，监听事件，当input的值改变的时候，将最新的值赋值给message对象。`$event`获取事件对象，target获取监听的对象dom，value获取最新的值。



#### 6.2 v-model和radio/checkbox/select

**v-model结合radio**

​	radio单选框的`name`属性是互斥的，如果使用v-model，可以不使用`name`就可以互斥。

```javascript
<div id="app">
    <label for="male">
        <input type="radio" id="male" name='sex' value="男" v-model="sex">男
    </label>
    <label for="female">
        <input type="radio" id="female" name='sex' value="女" v-model="sex">女
    </label>
    <h2>{{sex}}</h2>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data :{
            message : 'hello',
            sex : ''
        }
    })
</script>
```


v-model绑定`sex`属性，初始值为“男”，选择女后`sex`属性变成“女”，因为此时是双向绑定。

**v-model结合chechbox**

```javascript
<div id="app">
      <label for="license">
        <input type="checkbox" id="license" v-model="isAgree" />同意协议
      </label>
      <br />
      {{isAgree}}
      <button :disabled="!isAgree">下一步</button>
      <br />
      <label for="1">
        <input type="checkbox" value="篮球" id="1" v-model="hobbies" />篮球
      </label>
      <label for="2">
        <input type="checkbox" value="足球" id="2" v-model="hobbies" />足球
      </label>
      <label for="3">
        <input type="checkbox" value="乒乓球" id="3" v-model="hobbies" />乒乓球
      </label>
      <label for="4">
        <input type="checkbox" value="吃饭" id="4" v-model="hobbies" />吃饭
      </label>
      <br />
      {{hobbies}}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          message: "hello",
          isAgree: false,
          hobbies: [],
        },
      });
    </script>
```



1. checkbox结合v-model实现单选框，定义变量`isAgree`初始化为`false`，点击checkbox的值为`true`，`isAgree`也是`true`。
2. checkbox结合v-model实现多选框，定义数组对象`hobbies`，用于存放爱好，将`hobbies`与checkbox对象双向绑定，此时选中，一个多选框，就多一个true，`hobbies`就添加一个对象。

**v-model结合select可以单选也可以多选**

v-model结合select可以单选也可以多选

```javascript
<div id="app">
      <!-- 选择一个 -->
      <select name="abc" v-model="fruit">
        <option value="apple">apple</option>
        <option value="banana">banana</option>
        <option value="grape">grape</option>
      </select>
      <h3>{{fruit}}</h3>

      <!-- 选择多个 -->
      <select name="a" v-model="fruits" multiple>
        <option value="apple">apple</option>
        <option value="banana">banana</option>
        <option value="grape">grape</option>
      </select>
      <h3>{{fruits}}</h3>

      <label :for="item" v-for="item in originFruits">
        <input
          type="checkbox"
          :id="item"
          :value="item"
          v-model="hobbies"
        />{{item}}
      </label>
      <h2>{{hobbies}}</h2>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          fruit: "apple",
          fruits: [],
          originFruits: ["a", "b", "c", "d", "e"],
          hobbies: [],
        },
      });
    </script>
```




#### 6.3 修饰符

- lazy
- number
- trim

```javascript
<div id="app">
      <!-- 修饰符 -->
      <!-- 
        lazy 
        默认情况下，v-model实在input事件中同步输入框的数据的，也就是说一旦有数据发生改变对应的data中的数据就会自动发生改变
        lazy修饰符可以让数据再失去焦点或者回车时才会更新
    -->
      <input type="text" v-model.lazy="message" />
      {{message}}

      <br />
      <!-- 
        number 
        默认情况下，再输入框中无论我们输入的时字母还是数字，都会被当作字符串类型处理
        但是如果我们希望处理的是数字类型，那么最好直接将内容当作数字处理
        number修饰符可以让输入框中输入的内容自动转成数字类型
    -->
      <input type="number" v-model.number="age" />
      {{age}} {{typeof age}}

      <br />
      <!-- 
        trim
        如果输入的内容首尾有很多空格，通常我们希望将其取出
        trim修饰符可以过滤内容左右两边的空格
     -->
      <input type="text" v-model.trim="name" />
      {{name}}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          message: "hello",
          age: "",
          name: "",
        },
      });
    </script>
```



### 七.组件化开发

#### 7.1 认识组件化

```javascript
<div id="app">
      <!-- 3.使用组件 -->
      <my-cpn></my-cpn>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      // 1.创建组件构造器对象
      const cpnC = Vue.extend({
        template: `<div><h2>标题</h2><p>内容</p></div>`,
      });
      // 2.注册组件
      Vue.component("my-cpn", cpnC);

      const app = new Vue({
        el: "#app",
        data: {},
      });
    </script>
```



组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `my-cpn`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用： `<my-cpn></my-cpn>`。



#### 7.2 组建的基本使用

**创建组件构造器对象**

`template`中是组件的DOM元素内容。



**注册组件**

1. 全局注册，通过 `Vue.component `。
2. 局部注册，通过 `components:{cpnc:cpnc}`。



#### 7.3 全局组件和局部组件

**全局组件**，可以在多个vue实例中使用，类似于全局变量。使用`Vue.component('my-cpn', cpnc)`方式注册，直接使用`<my-cpn></my-cpn>`调用。`my-cpn`是全局组件的名字，`cpnc`是定义的组件对象。

**局部组件**，只能在当前vue实例挂载的对象中使用，类似于局部变量，有块级作用域。

==这部分我的全局组件没有运行成功，还在寻找原因，如果大家有找到错误部分的话敲我一下，谢谢啦~==

暂将目前代码附如下

```javascript
<my-cpn></my-cpn>
    <cpn></cpn>
    <div id="app">
      <my-cpn></my-cpn>
      <cpn></cpn>
    </div>

    <div id="app2">
      <my-cpn></my-cpn>
      <cpn></cpn>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      // 创建组件构造器
      const cpnC1 = Vue.extend({
        template: `<div><h2>全局</h2></div>`,
      });
      const cpnC2 = Vue.extend({
        template: `<div><h2>局部</h2></div>`,
      });

      // 注册组件(全局组件，意味着可以再多个Vue的示例下面使用)
      Vue.component("my-cpn", cpnC1);

      const app = new Vue({
        el: "#app",
        data: {},
        // 局部组件注册
        components: {
          cpn: cpnC2,
        },
      });
    </script>
```



#### 7.4 父组件和子组件



```javascript
<div id="app">
      <cpn2></cpn2>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      // 1.创建第一个组件
      const cpnC1 = Vue.extend({
        template: `
        <div>
            <h2>标题1</h2>
            <p>内容1</p>
        </div>
        `,
      });
      const cpnC2 = Vue.extend({
        template: `
        <div>
            <h2>标题2</h2>
            <p>内容2</p>
            <cpn1></cpn1>
        </div>
        `,
        components: {
          cpn1: cpnC1,
        },
      });
      const app = new Vue({
        el: "#app",
        data: {},
        components: {
          cpn2: cpnC2,
        },
      });
    </script>
```

上述代码中定义了两个组件对象`cpn1`和`cpn2`，在组件`cpn2`中使用局部组件注册了`cpn1`，并在`template`中使用了注册的`cpn1`，然后在vue实例中使用注册了局部组件`cpn2`，在vue实例挂载的div中调用了`cpn2`，`cpn2`与`cpn1`形成父子组件关系。

==注意：组件就是一个vue实例，vue实例的属性，组件也可以有，例如data、methods、computed等。==



#### 7.5 注册的语法糖

```javascript
    <div id="app">
      <!-- 使用组件 -->
      <my-cpn></my-cpn>
      <cpn></cpn>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      // 全局组件注册的语法糖
      // 1.创建组件构造器对象
      // const cpnC = Vue.extend();
      // 2.注册组件
      Vue.component("my-cpn", {
        template: `<div><h2>标题</h2><p>内容</p></div>`,
      });
      // 3.使用组件

      const app = new Vue({
        el: "#app",
        data: {},
        components: {
          cpn: {
            template: `<div><h2>标题2</h2><p>内容2</p></div>`,
          },
        },
      });
    </script>
```



注册组件时候可以不实例化组件对象，直接在注册的时候实例化。`{}`就是一个组件对象。

#### 7.6模板的分离写法

- script
- template

```javascript
<div id="app">
      <cpn></cpn>
    </div>
    <!-- 1.script类型，注意类型必须是text/x-template -->
    <!-- <script type="text/x-template" id="cpn">
    <div>
        <h2>标题</h2>
        <p>内容</p>
    </div>
</script> -->
    <template id="cpn">
      <div>
        <h2>{{title}}</h2>
        <p>内容</p>
      </div>
    </template>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      Vue.component("cpn", {
        template: "#cpn",
        data() {
          return {
            title: "abc",
          };
        },
      });
      const app = new Vue({
        el: "#app",
      });
    </script>
```



#### 7.7数据的存放

- 子组件不能直接访问父组件
- 子组件中又自己的date，而且必须是一个函数
- 为什么必须是一个函数

**组件中的数据存放问题**

```javascript
<div id="app">
      <cpn></cpn>
    </div>
    <!-- 1.script类型，注意类型必须是text/x-template -->
    <!-- <script type="text/x-template" id="cpn">
    <div>
        <h2>标题</h2>
        <p>内容</p>
    </div>
</script> -->
    <template id="cpn">
      <div>
        <h2>{{title}}</h2>
        <p>内容</p>
      </div>
    </template>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      Vue.component("cpn", {
        template: "#cpn",
        data() {
          return {
            title: "abc",
          };
        },
      });
      const app = new Vue({
        el: "#app",
      });
    </script>
```



**组件中的data为什么是函数**

这部分可以查看[Vue官方文档](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)，我觉得讲的很清楚，举的例子也很好玩，跟视频中老师的例子其实是一个

```javascript
<!-- 组件示例对象 -->
    <div id="app">
      <cpn></cpn>
      <cpn></cpn>
      <cpn></cpn>
    </div>

    <template id="cpn">
      <div>
        当前计数:
        <button @click="decrement">-</button>
        {{counter}}
        <button @click="increment">+</button>
      </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      Vue.component("cpn", {
        template: "#cpn",
        // 闭包，变量私有化
        data() {
          return {
            counter: 0,
          };
        },
        methods: {
          decrement() {
            this.counter--;
          },
          increment() {
            this.counter++;
          },
        },
      });

      const app = new Vue({
        el: "#app",
      });
    </script>
```



#### 7.8 父子组件的通信

​	v-bind是 不支持使用驼峰标识的，例如`cUser`要改成`c-User`。

- 父传子：props
- 子传父：$emit

**父传子**

==注意：类型是对象或者数组时，默认值必须是一个函数==

```javascript
<div id="app">
      <cpn v-bind:cmovies="movies" :cmessage="message"></cpn>
    </div>

    <template id="cpn">
      <div>
        {{cmovies}}
        <br>
        {{cmessage}}
      </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      // 父传子:props
      const cpnC = Vue.extend({
        template: `#cpn`,
        // props : ['cmovies', 'cmessage']
        props: {
          // 类型限制
          // cmovies : Array,
          // cmessage : String

          // 提供一些默认值
          cmessage: {
            type: String,
            default: "aaaaaaa", // 当没有传值时的默认值
            required: true, // 在使用时，cmessage是必传值
          },
          // 类型是对象或者数组时，默认值必须是一个函数
          cmovies: {
            type: Array,
            default() {
              return [];
            },
          },
        },
      });
      const app = new Vue({
        el: "#app",
        data: {
          message: "Hello",
          movies: ["1", "2", "3"],
        },
        components: {
          cpn: cpnC,
        },
      });
    </script>
```



**子传父**

```javascript
<div id="app">
      <cpn @itemclick="cpnClick"></cpn>
    </div>

    <template id="cpn">
      <div>
        <button v-for="item in categories" @click="btnClick(item)">
          {{item.name}}
        </button>
      </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      const cpn = {
        template: "#cpn",
        data() {
          return {
            categories: [
              { id: "aaa", name: "热门推荐" },
              { id: "bbb", name: "手机数码" },
              { id: "ccc", name: "家用家电" },
              { id: "ddd", name: "电脑办公" },
            ],
          };
        },
        methods: {
          btnClick(item) {
            // 发射
            this.$emit("itemclick", item);
          },
        },
      };
      const app = new Vue({
        el: "#app",
        components: {
          cpn,
        },
        methods: {
          cpnClick(item) {
            console.log("itemClick", item);
          },
        },
      });
    </script>
```



1.在子组件中定义一个方法`btnClick(item)`，使用`$emit`，'itemclick'是事件名，`item`是传过去的值。

```
      methods: {
        btnClick(item) {
          this.$emit('itemclick', item)
        }
      },
```

2.在子组件中监听点击事件并回调此方法

```
<div>
      <button v-for="(item, index) in categoties" :key="index" @click="btnClick(item)">{{item.name}}</button>
    </div>
```

3.在父组件中定义一个方法cpnClcik(item)

```
methods: {
	cpnClcik(item) {
		console.log('cpnClick'+item.name);
	}
},
```

4.并在父组件（vue实例）中调用`<cpn @itemclick="cpnClcik"></cpn>`（*不写参数默认传递btnClick的item* ），父组件监听事件名为`itemclick`的子组件传过来的事件。

```
<cpn @itemclick="cpnClcik"></cpn>
```



**组件间通信案例**

```javascript
<div id="app">
      <cpn
        :number1="num1"
        :number2="num2"
        @num1change="num1Change"
        @num2change="num2Change"
      ></cpn>
    </div>

    <template id="cpn">
      <div>
        <h2>props : {{number1}}</h2>
        <h2>data : {{dnumber1}}</h2>
        <input type="text" :value="dnumber1" @input="num1input" />
        <h2>props : {{number2}}</h2>
        <h2>data : {{dnumber2}}</h2>
        <input type="text" :value="dnumber2" @input="num2input" />
      </div>
    </template>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
      const cpn = {
        template: "#cpn",
        methods: {
          num1change(value) {
            this.num1 = parseInt(value);
          },
          num2change(value) {
            this.num2 = parseInt(value);
          },
        },
        props: {
          number1: Number,
          number2: Number,
        },
        data() {
          return {
            dnumber1: this.number1,
            dnumber2: this.number2,
          };
        },
        methods: {
          num1input(event) {
            this.dnumber1 = event.target.value;
            this.$emit("num1change", this.dnumber1);
          },
          num2input(event) {
            this.dnumber2 = event.target.value;
            this.$emit("num2change", this.dnumber2);
          },
        },
      };
      const app = new Vue({
        el: "#app",
        data: {
          num1: 1,
          num2: 2,
        },
        methods: {
          num1Change(value) {
            this.num1 = value;
          },
          num2Change(value) {
            this.num2 = value;
          },
        },
        components: {
          cpn,
        },
      });
    </script>
```





#### 7.9 项目

- npm install
- npm run serve




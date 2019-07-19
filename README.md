# vuex-from

### 描述
我们在表单中使用 `vuex` 时总会感觉到各种的不方便
* 每个属性都要指定一个 `mutation` 来更新
* 需要拆开 `v-model` 为 `:value` 和`@input`
* 界面中要单独声明一个更新的方法

这是让很多人放弃在表单中使用 `vuex`的原因，太笨太繁琐了

### vuex 默认的表单方案

```html

<template>
    <input :value="message" @input="updateMessage">
</template>

<script>
import {mapStates} from 'vuex'

export default {
    computed: {
    ...mapState({
        message: state => state.obj.message
    })
    },
    methods: {
        updateMessage (e) {
            this.$store.commit('updateMessage', e.target.value)
        }
    }
}
</script>
```

## vuex from 解决方案：

### 安装

```sh
npm install --save vuexfrom
```

### 代码设置

#### main.js

```js
import vuexform from 'vuexfrom'
import store from '@/store'

vuexform.install(store)
```

#### vuex store module 'customer.js'

```js
import {updateState} from 'vuexfrom'

export default {
    namespaced:true,
    state:{
        current:{
            name:'bowen',
            age:18
        }
    },
    mutations:{
        updateState
    }
}
```

###  一般映射

```html
<template>
    <div>
        <input v-model="name">
        <input v-model="age">
    </div>
</template>

<script>
import {mapFormStates} from 'vuexfrom'
export default {
    computed:{
        ...mapFormStates('customer', ['current'])        
    }
}
</script>
```

### 添加映射前缀

```html


<template>
    <div>
        <input v-model="cu_name">
        <input v-model="cu_age">
    </div>
</template>

<script>
import {mapFormStates} from 'vuexfrom'
export default {
    computed:{
        ...mapFormStates('customer', ['cu:current'])
    }
}
</script>
```



###  属性逐个映射

```html


<template>
    <div>
        <input v-model="cname">
        <input v-model="cage">
    </div>
</template>

<script>
import {mapFormStates} from 'vuexfrom'
export default {
    computed:{
        ...mapFormStates('customer', [{cname:'current.name', cage:'current.age'}])
    }
}
</script>
```

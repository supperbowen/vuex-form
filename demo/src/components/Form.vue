<template>
  <div class="hello">
    <div class="form-row">
      <label for="user_name">用户名</label>
      <input type="text" name="user_name" v-model="user_name" />
    </div>
    <div class="form-row">
      <label for="user_age">年龄</label>
      <input type="number" name="user_age" v-model="user_age" />
    </div>
  </div>
</template>

<script>
import { mapFormStates } from 'vuexfrom';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapFormStates('user', ['user:current'])
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

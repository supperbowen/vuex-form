<template>
  <div id="app">
    <div>
      <HelloForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    HelloForm: () => import('./components/Form.vue')  // 需要用异步加载的组件，包括在 vue-router 时
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <HelloForm />
  </div>
</template>

<script>
import HelloForm from "./components/Form.vue";

export default {
  name: "app",
  components: {
    HelloForm
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

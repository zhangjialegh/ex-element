<template>
  <div id="app">
    <Table />
    <Form />
  </div>
</template>

<script>
import Table from "@/components/Table";
import Form from "@/components/Form";
export default {
  name: "App",
  components: { Table, Form }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

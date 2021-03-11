<template>
  <div>
    <h1 style="color: darksalmon; background-color: bisque; padding: 10px; text-align: center;">  Happy Eating House </h1>
    <div class="navbar">
    <nav>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dash Boards</router-link></li>
    </nav>
  </div>
    <router-view></router-view>
    <!-- <PageContent v-bind:foodList = "itemsList"></PageContent> -->
  </div>
</template>

<script>
//import appheader from "./components/Header.js";
export default {
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid palevioletred;
    margin: 10px;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
</style>


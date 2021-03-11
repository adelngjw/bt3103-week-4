<template>
  <div class="lineChart">
    <h1 style="background-color:SkyBlue;">Line Chart</h1>
    <LineChart></LineChart>
  </div>
</template>

<script>
import LineChart from "./CallAPI.js";
export default {
  components: {
    LineChart
  }
};
</script>
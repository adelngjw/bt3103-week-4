<template>
  <div>
  <button id="dec" style="font-size: 20px;" v-on:click="minus()">-</button>
  <a style="padding: 10px;"> {{counter}} </a>
  <button id="inc" style="font-size: 20px;" v-on:click="add()">+</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
        }
    },
    props: {
        item: {
            type: Object,
        }
    },
    methods: {
        add: function() {
            if (this.counter < 10) {
            this.counter = this.counter + 1;
            } else {
                alert("You cannot buy more than 10 items.");
            }
            this.$emit("counter", this.item, this.counter); //for onCounter function
        },
        minus: function() {
            if (this.counter == 0) {
                return 0;
            } else {
                this.counter = this.counter - 1;
            }
            this.$emit("counter", this.item, this.counter);
        }
    }
}
</script>

<style scoped>
    button {
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
        background-color:rgb(230, 184, 191);
        color: rgb(255, 255, 255);
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 10px;
    }
</style>
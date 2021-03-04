<template>
    <div class="basket">
        <p> Menu : </p>
        <ul>
            <li v-for="item in cart" v-bind:key="item.index">
                {{ item[0] }} x {{ item[1] }} <!-- food item x qty -->
            </li>
        </ul>
        
        <button v-on:click="sendOrder"> Send Order </button>
        <p v-show="calculated" > Sub Total: $ {{subTotal}} </p>
        <p v-show="calculated"> Grand Total: $ {{grandTotal}} </p>
    </div>
</template>

<script>
    import database from "../firebase.js";
    export default {
        data() {
            return {
            subTotal: 0,
            calculated: false,
            multiplier: 1.07,
            }
        },
        props: {
            cart: {
                type: Array,
            }
        },
        methods: {
            findTotal: function() {
                this.subTotal = 0;
                this.cart.forEach(element => {
                    this.subTotal += (element[2] * element[1]) //price x qty
                })
                //for (let i = 0; i < this.cart.length; i++) {
                    //this.subTotal += (this.cart[i][2] * this.cart[i][1]) //price x qty
                //}
                this.calculated = true;
            },
            sendOrder: function() {
                var dishes = {
                    "Prawn Omelette": 0,
                    "Dry Beef Hor Fun": 0,
                    "Sambal KangKung": 0,
                    "Pork Fried Rice": 0,
                    "Mapo Tofu": 0,
                    "Cereal Prawn": 0,
                }
                this.cart.forEach(element => {
                    dishes[element[0]] = element[1];
                });
                database.collection('orders').add(dishes).then(() => {location.reload()});
            }
        },
        computed: {
            grandTotal: function() {
                return parseFloat(this.subTotal * 1.07).toFixed(2);
            }
        }
    }
</script>

<style>
</style>
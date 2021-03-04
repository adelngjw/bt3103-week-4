<template>
    <div>
        <div v-for="(count, name, index) in datapacket" v-bind:key="name">
            <p id="food" style="font-size:15px; color:brown;">{{name}}: {{count}}</p>
            <br>
            <input :id="index" 
                    placeholder=0 
                    type="number" 
                    min="0"/>
        </div>
        <br>
        <button v-on:click="updateOrder"> Update Order </button>
    </div>
</template>

<script>
    import database from "../firebase.js";
    export default {
        data() {
            return {
                datapacket: {},
            }
        },
        props: {
            doc_id: String,
        },
        methods: {
            fetchItems: function() {
                database.collection("orders").doc(this.doc_id).get().then(doc => {
                    this.datapacket = doc.data();
                });
            },
            updateOrder:function() {
            var temp = Object.assign({},this.datapacket)
            Object.entries(this.datapacket).forEach(([key], index) => {
                var count = document.getElementById(index).value;
                if (count != "") {
                temp[key] = parseInt(count);
                }
            });
            database.collection("orders").doc(this.doc_id).update(temp).then(() => {
                this.$router.push("orders");
            });
        }
        },
        created(){
            this.fetchItems();
        },
    }
</script>

<style scoped>
    button {
        width: 150px;
        height: 50px;
        background-color: #f7cac9;
        border-radius: 10px;
        padding: 10px;
    }
</style>
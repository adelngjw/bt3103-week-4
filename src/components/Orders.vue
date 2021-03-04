<template>
    <div class="orders">
        <ul>
            <li v-for="order in orders" v-bind:key="order.id">

                <button v-bind:id="order[0]" v-on:click="deleteItem($event)"> Delete </button>
                <button v-bind:id="order[0]" v-on:click="route($event)"> Modify </button>    

                <section>
                    <span v-for="(key,value) in order[1]" v-bind:key="value.id">
                    {{value + ": " + key}} <br>
                    </span>
                </section>
            </li>
        </ul>
        </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot) => {
                let item=[]
                    querySnapShot.forEach(doc=>{
                        item=[doc.id, doc.data()]
                        this.orders.push(item)
                    })
            })
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },
        route: function(event) {
            let id = event.target.getAttribute("id");
            this.$router.push({ name: "modify", params: {doc_id: id}});
        }
    },

    created() {
        this.fetchItems()
    },
}
</script>

<style scoped>

section {
    float: left;
    margin-left: 100px;
}

span {
    display: block;
    text-align: center;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 400px;
  display: inline-block;
  padding: 10px;
  border: 1px solid pink;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  float: right;
}

</style>
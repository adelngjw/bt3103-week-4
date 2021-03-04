<template>
    <div class="pageContent">
        <div id="itemsList">
            <ul>
            <li v-for="food in itemsList" v-bind:key="food.id">
                <h2 id="foodName">{{ food.name }}</h2>
                <img v-bind:src="food.imageURL" />
                <p id="price"> $ {{food.price}} </p>
                <QtyCounter v-on:counter="onCounter" v-bind:item="food"></QtyCounter>
            </li>
        </ul>
        </div>
        <basket id="shoppingBasket" v-bind:cart="itemsSelected"></basket>
    </div>
</template>

<script>
    import QuantityCounter from "./QuantityCounter";
    import Basket from "./Basket";
    import database from "../firebase.js";

    export default {
        components: {
            'QtyCounter': QuantityCounter,
            'Basket': Basket,
        },
        //props: {
            //foodList: {
                //type: Array
            //}

        //},
        data() {
            return {
                itemsSelected: [],//itemsSelected -> list of item names and its corresponding Quantity
                itemsList: [],
            };
        },
        methods: {
            fetchItems: function() {
                database.collection('menu').get().then((querySnapShot)=>{
                    let item={}
                    querySnapShot.forEach(doc=>{
                        item=doc.data()
                        item.show=false
                        this.itemsList.push(item)
                    })
                })
            },
            onCounter: function (item, count) {
                var arr = [...this.itemsSelected];
                if (this.itemsSelected.length == 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                    arr.push([item.name, count, item.price]);
                } else {
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];
                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name === item.name && count > 0) {
                            arr[i][1] = count;
                            break;
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        } else if (item_name === item.name && count == 0) {
                            arr.splice(i, 1);    
                            break;
                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                        } else if (item_name !== item.name && i == (this.itemsSelected.length - 1)) {
                            arr.push([item.name, count, item.price]);
                            break;
                        } else {
                            continue;
                        }
        }
      }
      this.itemsSelected = [...arr];
    },
        },
        created() {
            this.fetchItems()
        },
        
    }
</script>

<style scoped>
    #itemsList {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 82%;
}

</style>
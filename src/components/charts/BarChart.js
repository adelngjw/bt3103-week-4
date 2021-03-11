import { Bar } from 'vue-chartjs'
import database from '/Users/adelng/Desktop/BT3103/tasks/bt3103-week-4/src/firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Cereal Prawn", "Dry Beef Hor Fun", "Mapo Tofu", "Pork Fried Rice", "Prawn Omelette", "Sambal KangKung"],
            datasets: [{
                label: "",
                backgroundColor: ['IndianRed', 'Khaki', 'PaleTurquoise', 'DarkSeaGreen', 'PaleVioletRed', 'Thistle' ],
                data: []
              }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        var total = {
            "Cereal Prawn": 0,
            "Dry Beef Hor Fun": 0,
            "Mapo Tofu": 0,
            "Pork Fried Rice": 0,
            "Prawn Omelette": 0,
            "Sambal KangKung": 0,
        };
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            total["Cereal Prawn"] += parseInt(doc.data()["Cereal Prawn"]);
            total["Dry Beef Hor Fun"] += parseInt(doc.data()["Dry Beef Hor Fun"]);
            total["Mapo Tofu"] += parseInt(doc.data()["Mapo Tofu"]);
            total["Pork Fried Rice"] += parseInt(doc.data()["Pork Fried Rice"]);
            total["Prawn Omelette"] += parseInt(doc.data()["Prawn Omelette"]);
            total["Sambal KangKung"] += parseInt(doc.data()["Sambal KangKung"]);
        })
        for (var order in total) {
            this.datacollection.datasets[0].data.push(total[order]);
        }
        console.log("pushed?")
        console.log(this.datacollection.datasets[0].data)
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}
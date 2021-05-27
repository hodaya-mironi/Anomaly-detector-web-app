const express = require('express');
const anomalyDetection = require('../model/anomaly-detector.js');
const app = express();
var models; 
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/detect' , (req , res)=>{

   
})


app.listen(3000, function() {
   // const check = new AnomalyDetectionUtil();
    console.log("server listening on 3000");
    var list = [4, 5, 10];
    var a = new anomalyDetection.AnomalyDetectionUtil();
    console.log(a.average(list));
})


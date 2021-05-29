const express = require('express');
const anomalyDetection = require('./src/model/anomaly-detector.js');
const app = express();
const path= require('path');
var port = process.env.PORT || 8080; 
const bp = require('body-parser')
const fs = require('fs');
const cors = require('cors');
const { connectableObservableDescriptor } = require('rxjs/internal/observable/ConnectableObservable');
const { features } = require('process');
var models; 
var anomalyDetector;
app.use(express.static(path.join(__dirname + '/dist/anomaly-detection-web-app')));
app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({limit: '50mb', extended: true}));
var corsOptions = {
    origin:"https://localhost:8080"
}

app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname + '/dist/anomaly-detection-web-app')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
    // req.files.learn_file.data.toString()
});

app.get('/api/getFeatures', (req, res) => {
//var a = new sim
features = anomalyDetector.getFeatures();
res.json(features);
res.end();
}
);
app.post('/api/correlative' , (req, res) => {
    var correlativeData = anomalyDetector.showGraph(req?.body?.feature);
    res.json(correlativeData);
    res.end();
});

//Post Method for '/search' url
app.post('/api/detect', (req, res) => {

    if (req?.body?.chosenAlgorithm == "Regression"){
    anomalyDetector = new anomalyDetection.SimpleAnomalyDetector();
    }
    else{
        anomalyDetector = new anomalyDetection.HybridAnomalyDetector();
    }
    var features = anomalyDetector.learnNormal(req?.body?.normalString);
    var anomalies = anomalyDetector.detect(req?.body?.anomalyString);
    var response = Object.assign(features,anomalies);
    //console.log(anomalies);
    // console.log("req" + req.body?.normalString);
    //features = anomalyDetector.getFeatures();
    res.json(response);
    res.end();
    // res.end();
    // Input the JSON and put in string anomaly path and detect path
    // let normalStringName = req?.body?.NormalString;
    // let anomalyStringContent = req?.body?.anomalyString;
    // let alg = req?.body?.chosenAlgorithm;
    // if( alg === "Hybrid") {
    //     // do hybrid algo
    // } else {
    //     // do regression algo
    // }
    // // Put in string the chosen algorithm and activate him with the string converted
    // res.write('searching for ' + req.body.key + +':\n')
    // let key = req.body.key
    // if (req.files) {
    //     let file = req.files.text_file
    //     let result = model.searchText(key, file.data.toString())
    //     res.write(result)
    // }
    // res.end()
})

app.listen(port, function() {
    console.log("server listening on 8080");

})

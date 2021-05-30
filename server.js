const express = require('express');
const anomalyDetection = require('./src/model/anomaly-detector.js');
const app = express();
const path= require('path');
var port = process.env.PORT || 8080; 
const bp = require('body-parser')
const cors = require('cors');
app.use(express.static(path.join(__dirname + '/dist/anomaly-detection-web-app')));
app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({limit: '50mb', extended: true}));
var corsOptions = {
    origin:"https://localhost:8080"
}

var anomalyDetector; // The required anomaly detector.

app.use(cors(corsOptions));

// GET method for '/' url - getting the anomaly detection page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
});

/* POST Method for '/detect' url - Sending regular flight file, anomalous flight file and required anomaly detection algorithm
   and getting a list of all the anomalies and a list of all the features that have correlated features */
app.post('/api/detect', (req, res) => {

    // Initializing the required anomaly detector.
    if (req?.body?.chosenAlgorithm == "Regression"){
    anomalyDetector = new anomalyDetection.SimpleAnomalyDetector();
    }
    else{
        anomalyDetector = new anomalyDetection.HybridAnomalyDetector();
    }
    var features = anomalyDetector.learnNormal(req?.body?.normalString);
    var anomalies = anomalyDetector.detect(req?.body?.anomalyString);
    var response = Object.assign(features,anomalies); // Merging JSONs.
    res.json(response);
    res.end();
});

/* Post method for '/correlative' url - Getting the correlation data for the required feature -
the correlated feature, the anomalies, and all the points (without anomalies) */
app.post('/api/correlative' , (req, res) => {
    var correlativeData = anomalyDetector.showGraph(req?.body?.feature);
    res.json(correlativeData);
    res.end();
});

// Starting the server and listening to port, while waiting for clients.
app.listen(port, function() {
    console.log("server listening on 8080");
})

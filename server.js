const express = require('express');
const anomalyDetection = require('./src/model/anomaly-detector.js');
const app = express();
const path= require('path');
var port = process.env.PORT || 8080; 
const fs = require('fs');
const cors = require('cors');
const { connectableObservableDescriptor } = require('rxjs/internal/observable/ConnectableObservable');
var models; 
var anomalyDetector;
app.use(express.static(path.join(__dirname + '/dist/anomaly-detection-web-app')));
// app.use(express.static(path.join(__dirname + '/dist/anomaly-detection-web-app')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
    // req.files.learn_file.data.toString()
})

app.get('/api/features', (req, res) => {
}
);
app.post('/api/correlative' , (req, res) => {
});
var corsOptions = {
    origin:"https://localhost:8080"
}
app.use(cors(corsOptions));

//Post Method for '/search' url
app.post('/api/detect', (req, res) => {
    res.write("haiush michush");
    res.end();
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
   // const check = new AnomalyDetectionUtil();
    console.log("server listening on 8080");
    // var list1 = [4, 5, 10];
    // var list2 = [6, 8, 11];
    // var point = new anomalyDetection.Point(2, 4);
    // var point1 = new anomalyDetection.Point(3, 5);
    // var point2 = new anomalyDetection.Point(1, 6);
    // var line = new anomalyDetection.Line(3, 5);
    // var correlation = new anomalyDetection.CorrelatedFeatures();
    // correlation.setFeature1("Moria");
    // var myJSON = '{"name":"John", "age":31, "city":"New York"}';
    // var obj = JSON.parse(myJSON);
    // var x = "city";
    // console.log(obj[x]);
    // console.log(obj.city);
    // //return 0;
    // var a = new anomalyDetection.SimpleAnomalyDetector();
    // console.log(a.learnNormal("Moria,Yefet\n1,2\n3,5\n"));
    // console.log(a.detect("Moria,Yefet\n1,2\n3,4\n"));
})

[{
    feature1: 'A',
    feature2: 'B',
    timestep: 145
},
{
    feature1: 'A',
    feature2: 'B',
    timestep: 146
},{
    feature1: 'A',
    feature2: 'B',
    timestep: 148
},
]

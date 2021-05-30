const minEnclosingCircle = require('smallest-enclosing-circle');

class Point {
    // Data members.
    x;
    y;

    // Constructor
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Getters
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}

class Line {
    // Data members
    a;
    b;

    // Constructor
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    // Calculating f(x)
    f(x) {
        return this.a * x + this.b;
    }
}

// Utilities for anomaly detection - average, variance, covariance, pearson, linear regression and deviation.
class AnomalyDetectionUtil {
    // Average calculation.
    average(numbers) {
        var i=0;
        var sum = 0;
        var len = numbers.length;
        for (i = 0; i < len; i++) {
            sum = sum + parseFloat(numbers[i]);
        }
        return (sum / len);
    }
    
    // Variance calculation.
    variance(numbers) {
        var avg = this.average(numbers);
        var sum = 0, len = numbers.length;
        for (var i = 0; i < len; i++) {
            sum += Math.pow(parseFloat(numbers[i]), 2);
            
        }
        return sum / len - Math.pow(avg, 2);
    }

    // Covariance calculation.
    covariance(numbers1, numbers2) {
        var sum = 0, len = numbers1.length;
        for (var i = 0; i < len; i++) {
            sum += parseFloat(numbers1[i]) * parseFloat(numbers2[i]);
        }
        return (sum / len) - (this.average(numbers1) * this.average(numbers2));
    }

    // Pearson calculation.
    pearson(numbers1, numbers2) {
        if ((Math.sqrt(this.variance(numbers1)) == 0 || (Math.sqrt(this.variance(numbers2)) == 0))) {
            return 0;
        }
        return (this.covariance(numbers1, numbers2)) / ((Math.sqrt(this.variance(numbers1))) * (Math.sqrt(this.variance(numbers2))));
    }

    // Linear regression calculation.
    linearRegression(numbers1, numbers2) {
        var a = this.covariance(numbers1, numbers2) / this.variance(numbers1);
        var b = this.average(numbers2) - a * (this.average(numbers1));
        return new Line(a, b);
    }

    // Deviation calulction by point and regression line.
    deviation(p, l) {
        var x = p.getY() - l.f(p.getX());
        if (x < 0) {
            x = x * -1;
        }
            return x;
    }
}

class CorrelatedFeatures {
    // Data members/
    feature1; 
    feature2;
    correlation;
    regressionLine;
    x = 0;                  // x coordinate of the center of the smallest enclosing circle.
    y = 0;                  // y coordinate of the center of the smallest enclosing circle.
    threshold;
    isCircle = false;

    // Getters and setters.
    getFeature1() {
        return this.feature1;
    }
    getFeature2() {
        return this.feature2;
    }
    getCorrelation() {
        return this.correlation;
    }
    getRegressionLine() {
        return this.regressionLine;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getThreshold() {
        return this.threshold;
    }
    getIsCircle() {
        return this.isCircle;
    }
    setFeature1(feature) {
        this.feature1 = feature;
    }
    setFeature2(feature) {
        this.feature2 = feature;
    }
    setCorrelation(cor) {
        this.correlation = cor;
    }
    setRegressionLine(line) {
        this.regressionLine = line;
    }
    setX(x1) {
        this.x = x1;
    }
    setY(y1) {
        this.y = y1;
    }
    setThreshold(threshold) {
        this.threshold = threshold;
    }
    setIsCircle(circle1) {
        this.isCircle = circle1;
    }
 }

 class Circle {
     // Data members
     center;
     radius;
     static minCirc;

     // Constructor by center point and radius
     constructor(center, radius) {
         this.center = center;
         this.radius = radius;
     }

     // Distance between two points.
     distance(a, b) {
         let x2 = Math.pow(a.getX() - b.getX(), 2);
         let y2 = Math.pow(a.getY() - b.getY(), 2);
         return Math.sqrt(x2 + y2);
     }

     // Getters.
     getCenter() {
         return this.center;
     }
     getRadius() {
         return this.radius;
     }

 }

 // Class for reporting an anomaly.
 class AnomalyReport {
    // Data members/
   feature1; 
   feature2;
   timeStep;                // The timestep of the anomaly.

   // Constructor by two features and the timestep of the anomaly.
   constructor(feature1, feature2, timeStep) {
       this.feature1 = feature1;
       this.feature2 = feature2;
       this.timeStep = timeStep;
   }

   // Getters and setters.
   getFeature1() {
       return this.feature1;
   }
   getFeature2() {
       return this.feature2;
   }
   getTimeStep() {
       return this.timeStep;
   }
   setFeature1(feature) {
       this.feature1 = feature;
   }
   setFeature2(feature) {
       this.feature2 = feature;
   }
   setTimeStep(time) {
       this.timeStep = time;
   }
}

// Simple anomaly detector - detection by linear regression line.
 class SimpleAnomalyDetector {
    regFlight;              // The regular flight data.
    anomalousFlight;        // The anomalous flight data.
    cf;                     // List of correlated features.
    r;                      // List of anomalies.
    keys;                   // Features' list.
    // Constructor
    constructor() {
        this.regFlight = {};
        this.anomalousFlight = {};
        this.r = [];
        this.cf = [];
        this.keys = [];
    }

    // Learning the normal flight.
    learnNormal(fileContent) {
        let lines = fileContent.split("\r\n");
        this.keys = lines[0].split(",");            // The first line of the file is the features line.

        // Differentiate between similar features.
        for (let i = this.keys.length-1; i>=0;i--){
            for (let j = i-1;j>=0;j--){
                if (this.keys[i]==this.keys[j]){
                    this.keys[i]+='2';
                }
            }
        }

        for (let i = 0; i < this.keys.length; i++) {
            this.regFlight[this.keys[i]] = [];
        }

        // Parse the regular flight data into dictionary of features and lists of values.
        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (this.keys.length); j++) {
                this.regFlight[this.keys[j]].push(temp[j]);
            }
        }
        var util = new AnomalyDetectionUtil();


        // Calculating correlations between features.`
        for (var i = 0; i < this.keys.length; i++) {
            var maxPearson = 0.5;
            var correlation = new CorrelatedFeatures();
            var flag = 0;
            for (var k = 0; k<this.cf.length;k++){
                if (this.cf[k].getFeature2()==this.keys[i]){
                    flag = 1;
                }
            }
            if (flag == 0){
                for (var j = i+1; j < this.keys.length; j++) {
                    var p = Math.abs(util.pearson(this.regFlight[this.keys[i]], this.regFlight[this.keys[j]]));
                    if (p > maxPearson) {
                        maxPearson = p;
                        correlation.setFeature1(this.keys[i]);
                        correlation.setFeature2(this.keys[j]);
                        correlation.setCorrelation(p);
                        correlation = this.completeCorrelation(correlation, this.regFlight[this.keys[i]], this.regFlight[this.keys[j]]);
                    }
                } 
            }
            if (maxPearson != 0.5) {
                this.cf.push(correlation);
            }
            flag = 0;
        }
        
        // Finding all the features that has correlated feature.
        var featuresWithCorrelation=[];
        for (var i = 0; i<this.cf.length;i++){
            featuresWithCorrelation.push(this.cf[i].getFeature1());
            featuresWithCorrelation.push(this.cf[i].getFeature2());
        }

        // Creating features JSON.
        var features = {"features":featuresWithCorrelation};
        return features;
    }
    // Calculating correlation by linear regression line.
    completeCorrelation(correlation, numbers1, numbers2) {
        var util = new AnomalyDetectionUtil();
        var l = util.linearRegression(numbers1, numbers2);
        correlation.setRegressionLine(l);
        correlation.setThreshold(0);
        correlation.setIsCircle(false);
        for (var k = 0; k < numbers1.length; k++) {
            var deviation = util.deviation(new Point(numbers1[k], numbers2[k]), correlation.getRegressionLine());
            if (deviation > correlation.getThreshold()) {
                correlation.setThreshold(deviation);
            }
        }
    return correlation;

    // Detecting anomalies in anomalous flight.
    }
    detect(fileContent) {
        let lines = fileContent.split("\n");
        for (let i = 0; i < this.keys.length; i++) {
            this.anomalousFlight[this.keys[i]] = [];
        }

        // Parse the anomalous flight data into dictionary of features and lists of values.
        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (this.keys.length); j++) {
                this.anomalousFlight[this.keys[j]].push(temp[j]);
            }
        }

        // Detect anomalies in the anomalous flight.
        var columnLength = this.anomalousFlight[this.keys[0]].length;
        var util = new AnomalyDetectionUtil();
        for (var i = 0; i < this.cf.length; i++) {
            for (var j = 0; j<columnLength; j++) {
                var p = new Point(this.anomalousFlight[this.cf[i].getFeature1()][j], this.anomalousFlight[this.cf[i].getFeature2()][j]);
                this.createReport(p, this.cf[i], j);
           
            }
        }
        
        // Sorting anomalies in chronological order.
        this.r.sort(function (a,b){
            return a.getTimeStep()-b.getTimeStep();
        });

        // Creating anomalies JSON.
        var anomalies = {"anomalies":this.r};
        return anomalies;
    }

    // Detecting anomalies by linear regression line.
    createReport(p, correlation, index) {
        var util = new AnomalyDetectionUtil();
        if (util.deviation(p, correlation.getRegressionLine()) > correlation.getThreshold()) {
           var ar = new AnomalyReport(correlation.getFeature1(), correlation.getFeature2(), index + 1);
            this.r.push(ar);
        }
    }

    showGraph(feature){
        // Finding the correlation data of the required feature.
        for (var i = 0; i<this.cf.length;i++){
            if (this.cf[i].getFeature1()==feature){
                var feature2 = this.cf[i].getFeature2();
                break;
            }
            if (this.cf[i].getFeature2()==feature){
                var feature2 = this.cf[i].getFeature1();
                break;
            }
        }

        // Creating a list of all the points of the correlated features (without anomalies) and a list of all the anomalies betweeen them.
        var columnLength = this.anomalousFlight[this.keys[0]].length;
        var points = [];
        var anomalies = [];
        var flag = 0;
        for (var i = 0; i < columnLength; i++) {
                var p = new Point(parseFloat(this.anomalousFlight[feature][i]), parseFloat(this.anomalousFlight[feature2][i]));
                for (var j = 0;j<this.r.length;j++){
                    if ((((this.r[j].getFeature1()==feature) && (this.r[j].getFeature2()==feature2))||
                    ((this.r[j].getFeature1()==feature2) && (this.r[j].getFeature2()==feature)))
                     && (this.r[j].getTimeStep()+1==i)){
                    anomalies.push(p);
                    flag = 1;
                }
        }
        if (flag == 0){
            points.push(p);
        }
        flag = 0;
    }

    // Creating the graph's data JSON.
        var graph ={
            "feature2":feature2,
            "points":points,
            "anomalies":anomalies
        }
        return graph;
    }
}

/* Hybrid anomaly detector - detection by linear regression line for correlation greater than 0.
 and by smallest enclosing circle for correlation between 0.5 to 0.9. */
 class HybridAnomalyDetector extends SimpleAnomalyDetector {

    // Default constructor - calling the super class constructor.
     constructor() {
         super();
     }

     // Calculating correlation by smallest enclosing circle.
     completeCorrelation(correlation, numbers1, numbers2) {
         if (correlation.getCorrelation() >= 0.9) {
             super.completeCorrelation(correlation, numbers1, numbers2);
         }
         if ((correlation.getCorrelation() > 0.5) && (correlation.getCorrelation() < 0.9)) {
             correlation.setIsCircle(true);
             let points = [];
             for (var i = 0; i < numbers1.length; i++) {
                 points.push(new Point(parseFloat(numbers1[i]), parseFloat(numbers2[i])));
             }

            let c = minEnclosingCircle(points); // Finding the smallest enclosing circle.
             correlation.setX(c.x);
             correlation.setY(c.y);
             correlation.setThreshold(c.r);
         }
         return correlation;
     }

     /* Detecting anomalies by linear regression line for correlation greater than 0.
     and by smallest enclosing circle for correlation between 0.5 to 0.9. */
     createReport(p, correlation, index) {
         let c = new Circle();
        if (!correlation.getIsCircle()) {
            super.createReport(p, correlation, index);
        } else {
            if (c.distance(p, new Point(correlation.getX(), correlation.getY())) > 1.1 * correlation.getThreshold()) {
                var ar = new AnomalyReport(correlation.getFeature1(), correlation.getFeature2(), index + 1);
                this.r.push(ar);
            }
        }
    }
 }

module.exports = {Point, Line, AnomalyDetectionUtil, CorrelatedFeatures, Circle, SimpleAnomalyDetector, AnomalyReport, HybridAnomalyDetector};
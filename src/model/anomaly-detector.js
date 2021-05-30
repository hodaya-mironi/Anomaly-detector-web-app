const { compileNgModule } = require('@angular/compiler');
const { summaryFileName } = require('@angular/compiler/src/aot/util');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const { report } = require('process');
const readline = require('readline');
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

    // Default constructor
    /*constructor() {
        this.a = 0;
        this.b = 0;
    }*/

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

class AnomalyDetectionUtil {
    average(numbers) {
        var i=0;
        var sum = 0;
        var len = numbers.length;
        for (i = 0; i < len; i++) {
            sum = sum + parseFloat(numbers[i]);
        }
        return (sum / len);
    }

    variance(numbers) {
        var avg = this.average(numbers);
        var sum = 0, len = numbers.length;
        for (var i = 0; i < len; i++) {
            sum += Math.pow(parseFloat(numbers[i]), 2);
            
        }
        return sum / len - Math.pow(avg, 2);
    }

    covariance(numbers1, numbers2) {
        

        var sum = 0, len = numbers1.length;
        for (var i = 0; i < len; i++) {
            sum += parseFloat(numbers1[i]) * parseFloat(numbers2[i]);
        }
        return (sum / len) - (this.average(numbers1) * this.average(numbers2));
    }

    pearson(numbers1, numbers2) {
        if ((Math.sqrt(this.variance(numbers1)) == 0 || (Math.sqrt(this.variance(numbers2)) == 0))) {
            return 0;
        }

        return (this.covariance(numbers1, numbers2)) / ((Math.sqrt(this.variance(numbers1))) * (Math.sqrt(this.variance(numbers2))));
    }

    linearRegression(numbers1, numbers2) {
        var a = this.covariance(numbers1, numbers2) / this.variance(numbers1);
        var b = this.average(numbers2) - a * (this.average(numbers1));
        return new Line(a, b);
    }

    deviation(p, l) {
        var x = p.getY() - l.f(p.getX());
        if (x < 0) {
            x = x * -1;
        }
            return x;
    }

    deviation2(p, numbers1, numbers2) {
        var l = this.linearRegression(numbers1, numbers2);
        return this.deviation(p, l);
    }
}

class CorrelatedFeatures {
    // Data members/
    feature1; 
    feature2;
    correlation;
    regressionLine;
    x = 0;
    y = 0;
    threshold;
    isCircle = false;

    // Getters
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

     constructor(center, radius) {
         this.center = center;
         this.radius = radius;
     }
     distance(a, b) {
         let x2 = Math.pow(a.getX() - b.getX(), 2);
         let y2 = Math.pow(a.getY() - b.getY(), 2);
         return Math.sqrt(x2 + y2);
     }
     getCenter() {
         return this.center;
     }
     getRadius() {
         return this.radius;
     }

 }

 class AnomalyReport {
    // Data members/
   feature1; 
   feature2;
   timeStep;
   constructor(feature1, feature2, timeStep) {
       this.feature1 = feature1;
       this.feature2 = feature2;
       this.timeStep = timeStep;
   }
   // Getters
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

 class SimpleAnomalyDetector {
    cf;
    threshold;
    r = [];
    // Data members
    // Dictionary<string, List<double>> regFlight, anomalousFlight;
    regFlight;
    anomalousFlight;
    // List<List<double>> regFlightColumns, anomalousFlightColumns;
    regFlightColumns;
    anomalousFlightColumns;
    // List<string> keys;
    keys;
    //correlations = new Correlations();
    // Constructor
    constructor() {
        this.cf = [];
        // keys - List of string new
        this.keys = [];
        // new dictionary 
        this.regFlight = {};
        this.anomalousFlight = {};
        this.r = [];
    }
    learnNormal(fileContent) {
        let lines = fileContent.split("\n");
        this.keys = lines[0].split(",");
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
        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (this.keys.length); j++) {
                this.regFlight[this.keys[j]].push(temp[j]);
            }
        }
        var util = new AnomalyDetectionUtil();

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
        var featuresWithCorrelation=[];
        for (var i = 0; i<this.cf.length;i++){
            featuresWithCorrelation.push(this.cf[i].getFeature1());
            featuresWithCorrelation.push(this.cf[i].getFeature2());
        }
        var features = {"features":featuresWithCorrelation};
        return features;
    
    
}
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
    }
    detect(fileContent) {
        let lines = fileContent.split("\n");
        for (let i = 0; i < this.keys.length; i++) {
            this.anomalousFlight[this.keys[i]] = [];
        }

        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (this.keys.length); j++) {
                this.anomalousFlight[this.keys[j]].push(temp[j]);
            }
        }
        var columnLength = this.anomalousFlight["aileron"].length;
        var util = new AnomalyDetectionUtil();
        for (var i = 0; i < this.cf.length; i++) {
            for (var j = 0; j<columnLength; j++) {
                var p = new Point(this.anomalousFlight[this.cf[i].getFeature1()][j], this.anomalousFlight[this.cf[i].getFeature2()][j]);
                this.createReport(p, this.cf[i], j);
           
            }
        }
        this.r.sort(function (a,b){
            return a.getTimeStep()-b.getTimeStep();
        });
        var anomalies = {"anomalies":this.r};
        return anomalies;
    }
    createReport(p, correlation, index) {
        var util = new AnomalyDetectionUtil();
        if (util.deviation(p, correlation.getRegressionLine()) > correlation.getThreshold()) {
           var ar = new AnomalyReport(correlation.getFeature1(), correlation.getFeature2(), index + 1);
            this.r.push(ar);
        }
    }

    // getFeatures(){
    //     var features = {"features":this.keys};
    //     return features;
    // }

    showGraph(feature){
        for (var i = 0; i<this.cf.length;i++){
            if (this.cf[i].getFeature1()==feature){
                var feature2 = this.cf[i].getFeature2();
                var correlation = this.cf[i].getCorrelation();
            }
        }
        for (var i = 0; i<this.cf.length;i++){
            if (this.cf[i].getFeature2()==feature){
                var feature2 = this.cf[i].getFeature1();
                var correlation = this.cf[i].getCorrelation();
            }
        }
        var columnLength = this.anomalousFlight["aileron"].length;
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
        var graph ={
            "feature1":feature,
            "feature2":feature2,
            "correlation":correlation,
            "points":points,
            "anomalies":anomalies
        }
        return graph;
    }
}

 class HybridAnomalyDetector extends SimpleAnomalyDetector {
     constructor() {
         super();
     }
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


            let  c =     minEnclosingCircle(points);
             correlation.setX(c.x);
             correlation.setY(c.y);
             correlation.setThreshold(c.r);
         }
         return correlation;
     }

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



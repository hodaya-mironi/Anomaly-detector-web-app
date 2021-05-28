const { summaryFileName } = require('@angular/compiler/src/aot/util');
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
            sum = sum + parseInt(numbers[i]);
        }
        return (sum / len);
    }

    variance(numbers) {
        var avg = this.average(numbers);
        var sum = 0, len = numbers.length;
        for (var i = 0; i < len; i++) {
            sum += Math.pow(numbers[i], 2);
            
        }
        return sum / len - Math.pow(avg, 2);
    }

    covariance(numbers1, numbers2) {
        var sum = 0, len = numbers1.length;
        for (var i = 0; i < len; i++) {
            sum += numbers1[i] * numbers2[i];
        }
        return sum / len - this.average(numbers1) * this.average(numbers2);
    }

    pearson(numbers1, numbers2) {
        if ((Math.sqrt(this.variance(numbers1)) == 0 || (Math.sqrt(this.variance(numbers2)) == 0))) {
            return 0;
        }
        return this.covariance(numbers1, numbers2) / ((Math.sqrt(this.variance(numbers1))) * (Math.sqrt(this.variance(numbers2))));
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

//  class Correlations {
//      cf;
//      threshold = 0.9;
//      // Calculate threshold
//      findThreshold(numbers1, numbers2, regressionLine) {
//          max = 0; len1 = numbers1.length;
//          for (i = 0; i < len1; i++) {
//              d = Math.abs(numbers2[i] - regressionLine.f(numbers1[i]));
//              if (d > max) {
//                  max = d;
//              }
//          }
//          return max;
//      }
//      // Constructor for the correlations
//      Correlations(values) {
//          for (var key in values) {
//             maxCorrelationAttribute = null;
//             maxCorrelation = -1;
//             for (var otherKey in values) {
//                 if (key != otherKey) {
//                     p = Math.Abs(AnomalyDetectionUtil.pearson(values[key], values[otherKey]));
//                     if (p > maxCorrelation)
//                         {
//                             maxCorrelation = p;
//                             maxCorrelationAttribute = otherKey;
//                         }
//                 }
//             }
//             if (maxCorrelation > this.threshold) {
//                     correlatedFeatures = new CorrelatedFeatures();
//                     correlatedFeatures.setFeature1(key);
//                     correlatedFeatures.setFeature2(maxCorrelationAttribute);
//                     correlatedFeatures.setCorrelation(maxCorrelation);
//                     correlatedFeatures.setRegressionLine(AnomalyDetectionUtil.linearRegression(values[key], values[maxCorrelationAttribute]));
//                     maxX = values[key][0];
//                     minX = values[key][0];
//                     for (i = 1; i < values[key].length; i++)
//                     {
//                         if (values[key][i] > maxX)
//                         {
//                             maxX = values[key][i];
//                         }
//                         if (values[key][i] < minX)
//                         {
//                             minX = values[key][i];
//                         }
//                     }
//                     correlatedFeatures.setMinXY(new Point(minX, correlatedFeatures.getRegressionLine().f(minX)));
//                     correlatedFeatures.setMaxXY(new Point(maxX, correlatedFeatures.getRegressionLine().f(maxX)));
//                     correlatedFeatures.setThreshold(findThreshold(values[key],values[maxCorrelationAttribute],correlatedFeatures.getRegressionLine()));
//                     cf.Add(correlatedFeatures);
//             }
//          }
//      }
     
//  }

//  class LineAnomalyDetector {
//      // Data members
//     // Dictionary<string, List<double>> regFlight, anomalousFlight;
//     regFlight;
//     anomalousFlight;
//     // List<List<double>> regFlightColumns, anomalousFlightColumns;
//     regFlightColumns;
//     anomalousFlightColumns;
//     // List<string> keys;
//     keys;
//     correlations = new Correlations();
//     // Constructor
//     constructor() {
//         // keys - List of string new
//         var keys = [];
//         // new dictionary 
//         var regFlight = {};
//         var anomalousFlight = {};
//         // Lists
//         var regFlightColumns = [];
//         var anomalousFlightColumns = [];
//     }

//     learnNormal(fileContent) {
//         let lines = fileContent.split("\n");
//         let features = [];
//         features = lines[0].split(",");
//         let data = {}
//         for (let i = 0; i < features.length; i++) {
//             data[features[i]] = [];
//         }
//         for (let i = 1; i < (arr.length) - 1; i++) {
//             let temp = lines[i].split(',');
//             for (let j = 0; j < (features.length); j++) {
//                 // data[features[j]].Add(temp[j]);
//                 data[features[j]].push(temp[j]);
//             }
//         }
//         return data;
//     }

//     detect(CSVFileName) {

//     }
//     ////////////////////////////////////////
//     ///////////////////////////////////
//     ////////////////////////////////////////

//  }

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
         x2 = Math.pow(a.getX() - b.getX(), 2);
         y2 = Math.pow(a.getY() - b.getY(), 2);
         return Math.sqrt(x2 + y2);
     }
     getCenter() {
         return this.center;
     }
     getRadius() {
         return this.radius;
     }

 }

 class SimpleAnomalyDetector {
    cf;
    threshold;
    report = [];
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
        this.report = [];
    }
    learnNormal(fileContent) {
        
        let lines = fileContent.split("\n");
        this.keys = lines[0].split(",");
        for (let i = 0; i < this.keys.length; i++) {
            this.regFlight[this.keys[i]] = [];
        }
        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (this.keys.length); j++) {
                // data[features[j]].Add(temp[j]);
                this.regFlight[this.keys[j]].push(temp[j]);
            }
        }
        var util = new AnomalyDetectionUtil();
      //  var columnLength = this.regFlight['aileron'].length;
        for (var i = 0; i < this.keys.length; i++) {
            var maxPearson = 0.5;
            var correlation = new CorrelatedFeatures();
            for (var j = i + 1; j < this.keys.length; j++) {
                var p = util.pearson(this.regFlight[this.keys[i]], this.regFlight[this.keys[j]]);
                // console.log("p: " + p);
                // console.log("max: "+maxPearson);
                if (p > maxPearson) {
                    maxPearson = p;
                    correlation.setFeature1(this.keys[i]);
                    correlation.setFeature2(this.keys[j]);
                    correlation.setCorrelation(p);
                    correlation = this.completeCorrelation(correlation, this.regFlight[this.keys[i]], this.regFlight[this.keys[j]]);
                    // correlation.setRegressionLine(linearRegression(this.regFlight[keys[i]], this.regFlight[keys[j]]));
                    // correlation.setThreshold(0);
                    // for (k = 0; k < columnLength; k++) {
                    //     deviation = deviation(new Point(this.regFlight[keys[i]][k], this.regFlight[keys[j]][k]), correlation.getRegressionLine());
                    //     if (deviation > correlation.getThreshold()) {
                    //         correlation.setThreshold(deviation);
                    //     }
                    // }
                }
            } 
            if (maxPearson != 0.5) {
                this.cf.push(correlation);
            }
        }
        var features = {"features":this.keys};
        return features;
    }
    completeCorrelation(correlation, numbers1, numbers2) {
        var util = new AnomalyDetectionUtil();
        var l = util.linearRegression(numbers1, numbers2);
        correlation.setRegressionLine(l);
        correlation.setThreshold(0);
        for (var k = 0; k < numbers1.length; k++) {
            var deviation = util.deviation(new Point(numbers1[k], numbers2[k]), correlation.getRegressionLine());
            if (deviation > correlation.getThreshold()) {
                correlation.setThreshold(deviation);
            }
        }
    return correlation;
    }
    detect(fileContent) {
        return {'1':"aa"};
        let lines = fileContent.split("\n");
        for (let i = 0; i < keys.length; i++) {
            anomalousFlight[keys[i]] = [];
        }
        for (let i = 1; i < (lines.length) - 1; i++) {
            let temp = lines[i].split(',');
            for (let j = 0; j < (keys.length); j++) {
                anomalousFlight[keys[j]].push(temp[j]);
            }
        }
        
        columnLength = this.anomalousFlight[0].length;
        for (i = 0; i < this.cf.length; i++) {
            for (j = 0; columnLength; j++) {
                p = new Point(this.anomalousFlight[cf[i].getFeature1()][j], this.anomalousFlight[cf[i].getFeature2()][j]);
                // if (deviation(p, correlation.getRegressionLine()) > 1.1 * correlation.getThreshold()) {
                //     ar = new AnomalyReport(cf[i].getFeature1(), cf[i].getFeature2(), j + 1);
                //     report.push(ar);
                // }
                this.createReport(p, cf[i], j);
            }
        }
        //return report;
        return {'1':"aa"};
    }
    createReport(p, correlation, index) {
        if (deviation(p, correlation.getRegressionLine()) > 1.1 * correlation.getThreshold()) {
            ar = new AnomalyReport(correlation.getFeature1(), correlation.getFeature2(), index + 1);
            report.push(ar);
        }
    }

    getFeatures(){
        var features = {"features":this.keys};
        return features;
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

 class HybridAnomalyDetector extends SimpleAnomalyDetector {
     constructor() {
         super();
     }
     completeCorrelation(correlation, numbers1, numbers2) {
         if (correlation.getCorrelation() >= 0.9) {
             super.completeCorrelation(correlation, numbers1, numbers2);
         }
         if ((correlation.getCorrelation() > 0.5) && (correlation.getCorrelation() > 0.9)) {
             correlation.setIsCircle(true);
             let points = [];
             for (i = 0; i < numbers1.length; i++) {
                 points.push(new Point(numbers1[i], numbers2[i]));
             }
             let c = new minEnclosingCircle(points);
             correlation.setX(c.getCenter().getX());
             correlation.setY(c.getCenter().getY());
             correlation.setThreshold(c.getRadius());
         }
         return correlation;
     }

     createReport(p, correlation, index) {
        if (!correlation.getIsCircle()) {
            super.createReport(p, correlation, index);
        } else {
            if (distance(p, new Point(correlation.getX(), correlation.getY())) > 1.1 * correlation.getThreshold()) {
                ar = new AnomalyReport(correlation.getFeature1(), correlation.getFeature2(), index + 1);
                report.push(ar);
            }
        }
    }

 }

module.exports = {Point, Line, AnomalyDetectionUtil, CorrelatedFeatures, Circle, SimpleAnomalyDetector, AnomalyReport, HybridAnomalyDetector};



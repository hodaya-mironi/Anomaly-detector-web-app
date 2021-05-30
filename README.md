# AnomalyDetectionWebApp

## Table of contents
1. [ Features. ](#feat)  
2. [ Background. ](#back)  
3. [ Before Installation. ](#before)
4. [ Installation. ](#inst)
5. [ UML. ](#UML)
6. [ User stories video. ](#user)

<a name="feat"></a>
## Features
Firstly, the user uploads two CSV files:  
```
1. Normal file
2. Anomaly file  
```

The user can upload the files by two ways:  
```
1. Drag and drop
2. Upload from the browser of the file system  
```
The area to uplaod the files is:    
![image](https://user-images.githubusercontent.com/71708182/120105834-4d6f6080-c163-11eb-929c-01112285a43b.png)


After the uploading, the user needs to choose the type of algorithm he wants to activate on the files: Hybrid / Regression.  
The choose area is:   
![image](https://user-images.githubusercontent.com/71708182/120105886-7132a680-c163-11eb-8d92-f7e457708ffb.png)   
 After the upload, the area will be:   
 ![image](https://user-images.githubusercontent.com/71708182/120106105-6fb5ae00-c164-11eb-931e-d9a8d087cd15.png)   
 In any time, the user can unload a file that already has uploaded, by click on the `X` near the file name, and load new file (and detect again, if algorithm was chosen).    
*Until the user will detect again, the old data will be shown.   

-- The detect button is disabled until the user upload the twos files and choose detect algorithm.     
![image](https://user-images.githubusercontent.com/71708182/120105971-dab2b500-c163-11eb-81fc-5cb4b8be2cda.png)    
After the twos files were uploaded and algorithm was chosen, the detect button will become enable and the user can click on it to detect the anomalies:   
![image](https://user-images.githubusercontent.com/71708182/120106202-db981680-c164-11eb-8961-9c461b49c33e.png)

After the user clicke on the detect button, the view('app.component') will send a request to the controller ('server.js') , to send the data to the model ('anomalyDetector.js'),
and get back a response of all the anomalies, all the features that have anomalies with the correlative feature.   
Until the model send a response and the view get it from the controller, there will be a loader on the screen, to show the user that something is happening:     

![image](https://user-images.githubusercontent.com/71708182/120109956-574d8f80-c174-11eb-8695-ebe8a3582397.png)

After the response is get in the view, the data will be shown on the screen.   
There is a scroll list of all the anomalies in the files.   
In addition, there is a scroll list of all the features that have anomalies in relation to the correlative feature. In that list, the user can scroll and click on each of the features, and it will show a graph of the correct correlative points and of the abnormal points of this feature.   
![image](https://user-images.githubusercontent.com/71708182/120106597-57df2980-c166-11eb-9072-7e0a38f307f5.png)    
 

After we have done the algorithm detect there is a LOADER which basically it loads (spinner that rotates) until the display returns from the server and then we have two scroll zones down:  
```
1. All the anomalies points
2. Features that were anomalies - any feature that was anomalie in front of the correlative feature on it - appears in the graph shown  
```
<a name="back"></a>
## Background
This web application is a one-page application. There is no routing, and all the data appear in one page (even without dialogs).   
The application is built in 3 parts:
```
1. The model- the anomaly-detector.js. Do all the calculates with the input data.
2. The controller- The API- the server.js. Has GET and POST requests, and get those requests from the view, and do the write logic of the model,  and response ths data that recieved from the model.
3. The view- the user interface. It is an angular cli project. By the user requests, sends data (if needed) to the controller, gets response and shows it on the screen, as detailed above.
```

<a name="before"></a>
## Before Installation
Before you clone the repository, make sur you have `nodejs` installed in your computer, if it's not installed, Install `nodejs` in the link:  
[Download NodeJS](https://nodejs.org/en/download/)

<a name="inst"></a>
## Installation
1. Clone the repository from GitHub from the command line:  
```
git clone https://github.com/hodaya-mironi/Anomaly-detector-web-app/
```  
2. Run the command:  
```
cd Anomaly-detector-web-app
```
3. Install `NPM` packages:  
```
npm install  
```  
4. Install Angular CLI
```  
npm install -g @angular/cli
```  
5. Run the command:
```  
ng build --prod   
```     
thats command compile the angular project(the view).   
6. Run the command:
```  
node server.js
```
7. Open the browser `localhost:8080` by clicking [here](http://localhost:8080/)       
<a name="UML"></a>
## UML

<a name="user"></a>
## User Stories Video
...

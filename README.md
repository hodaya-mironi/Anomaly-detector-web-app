# AnomalyDetectionWebApp

## Table of contents
1. [ Features. ](#feat)  
2. [ Background. ](#back)  
3. [ Installation. ](#inst)
4. [ UML. ](#UML)
5. [ User stories video. ](#user)

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

After the uploading, the user needs to choose the type of algorithm he wants to activate on the files: Hybrid / Regression.  
-- The alolgorithm detect is not working until we choose files ()--  
Note that it is also possible in DRAG AND DROP that after the user uploads a file there is a `X` and you can click on it and it cancels the current file uploaded and you can load another file if we made a mistake in uploading the file.  
--picture of the x--  
After we have done the algorithm detect there is a LOADER which basically it loads (spinner that rotates) until the display returns from the server and then we have two scroll zones down:  
```
1. All the anomalies points
2. Features that were anomalies - any feature that was anomalie in front of the correlative feature on it - appears in the graph shown  
```
--picture of the scrolling with the graph--

<a name="back"></a>
## Background
This web application is a one-page...

<a name="inst"></a>
## Installation
1. Clone the repository from GitHub:  
```
git clone https://github.com/hodaya-mironi/Anomaly-detector-web-app/
```  

2. Install `NPM` packages:  
```
npm install  
```  

<a name="UML"></a>
## UML

<a name="user"></a>
## User Stories Video
...

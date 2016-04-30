"use strict";


var Cylon = require("cylon");
var faceDetected = false;
var turned = false;
Cylon.robot({
  connections: {
    attacknid: { adaptor: "attacknid", address: "8C:DE:52:35:21:B7" },
    opencv: { adaptor: "opencv" }
  },

  devices: {
    spider: { driver: "attacknid", connection: "attacknid" },
    //window: { driver: "window", connection: "opencv" },
    camera: {
      driver: "camera",
      connection: "opencv",
      camera: 0,
      haarcascade: "haarcascade_frontalface_alt.xml"
    }
  },

  work: function(my) {
    
    my.camera.once("cameraReady", function() {
      console.log("The camera is ready!");

      // We add a listener for the facesDetected event
      // here, we will get (err, image/frame, faces) params back in
      // the listener function that we pass.
      // The faces param is an array conaining any face detected
      // in the frame (im).
      my.camera.on("facesDetected", function(err, im, faces) {
        if (err) { console.log(err); }

        // We loop through the faces and manipulate the image
        // to display a square in the coordinates for the detected
        // faces.
        for (var i = 0; i < faces.length; i++) {
          var face = faces[i];
          im.rectangle(
            [face.x, face.y],
            [face.width, face.height],
            [255, 0, 0],
            2
          );
        }

        if (faces.length > 0)
        {
            faceDetected = true;
            var face = faces[0];
            console.log(face);
            if (my.spider.ready())
            {
              if (face.x < 10) {
                if (!turned) {
                        my.spider.turnleft();
                        turned = true;
                }
              }
              else if (face.x > 100) {
                if (!turned) {
                        my.spider.turnright();
                        turned = true;
                }
              } 
              else if (face.width > 60 && face.height > 60) 
              {
                my.spider.fire();
                faceDetected = false;
                turned = false;
              }
              else {
                my.spider.moveforward();
                turned = false;
              }
            }
         }
         else
         {
           faceDetected = false;
         }
        // The second to last param is the color of the rectangle
        // as an rgb array e.g. [r,g,b].
        // Once the image has been updated with rectangles around
        // the faces detected, we display it in our window.
        //my.window.show(im, 40);

        // After displaying the updated image we trigger another
        // frame read to ensure the fastest processing possible.
        // We could also use an interval to try and get a set
        // amount of processed frames per second, see below.
        my.camera.readFrame();
      });

      // We listen for frameReady event, when triggered
      // we start the face detection passing the frame
      // that we just got from the camera feed.
      my.camera.on("frameReady", function(err, im) {
        if (err) { console.log(err); }
        //im.resize(320,240);
        im.resize(160,120);
        my.camera.detectFaces(im);
        console.log("Face Detected:" + faceDetected)
      });

      my.camera.readFrame();
    });
    
    //every((1).seconds(), function() { console.log('move forward');
	//my.spider.forward(); });
  
   every((5).seconds(), function() { 
        if (!faceDetected)
        {
            var number = Math.random() * 2;
            if (number > 1)
              my.spider.turnright();
            else
              my.spider.turnleft();
        }
      });
  }
}).start();

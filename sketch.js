

// let video;
// let detector;
// let detections = [];
// let s;
// function setup() {
//   createCanvas(640, 480);
//   video =  createCapture({
//     audio: false,
//     video: {
//       facingMode: {
//         exact: "environment"
//       }
//     }
//   }, videoReady);

//   // video = createCapture( VIDEO, videoReady);
//   video.size(640, 480);
//   video.hide();
// }

// function videoReady() {
//   // Models available are 'cocossd', 'yolo'
//   detector = ml5.objectDetector('cocossd', modelReady);
// }

// function gotDetections(error, results) {
//   if (error) {
//     console.error(error);
//   }
//   detections = results;
//   detector.detect(video, gotDetections);
// }

// function modelReady() {
//   detector.detect(video, gotDetections);
//     alert("model loaded")
// }

// function draw() {
//   console.log("model running")
//   image(video, 0, 0);

//   for (let i = 0; i < detections.length; i += 1) {
//     const object = detections[i];
//     stroke(0, 255, 0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x, object.y, object.width, object.height);
//     noStroke();
//     fill(255);
//     textSize(24);
//     text(object.label, object.x + 10, object.y + 24);
//   }
// }



let video;
let label = "Loading...";
let classifier;
let modelURL = 'models/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  
  

  createCanvas(500, 520);
  // Create the video
  // video = createCapture(VIDEO);
  var constraints = {
    audio: false,
//     video: {
//       facingMode: {
//         exact: "environment"
//       }
//     }    
    
    video: {
      facingMode: "user"
    } 
  };
  video = createCapture(constraints, VIDEO);
   
  
  video.hide();

  // STEP 2: Start classifying  
  classifyVideo();
}
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  
  image(video, 0, 0);

  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji = "";
  if (label == "working") {
    emoji = "✔";
  } else if (label == "sleeping") {
    emoji = "❌";
  } else if (label == "idle") {
    emoji = "❌";
  } 

  // Drawing the emoji
  textSize(50);
  text(emoji, width -30 , height - 50 );
}
// STEP 3: Get the classification!
function gotResults(error, results) {
  
  if (error) {
    console.error(error);
    return;
  }
  // Storing the label and classifying again!
  label = results[0].label;
  classifyVideo();
}

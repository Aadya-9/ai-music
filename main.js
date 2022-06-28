song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("MHWGO.mp3");

}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("poseNet is Initialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristY=results[0].pose.rightWrist.y;
}
}
function draw(){
    image(video,0,0,600,500);
   
    song1_states= song1.isplaying();
    song2_states= song2.isplaying();

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing- harry potter theme song"
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing- 2nd song"
        }
    }
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

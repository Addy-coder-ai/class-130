UTmusic = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
lwscore = 0;
rwscore = 0;


function preload() {
    UTmusic = loadSound("lollolol.mp3");
}


function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("pls stop MODEL HAS BEEN LOADEDDDDDDDDDDDDD!")
}

function draw() {
    image(video, 0, 0, 500, 400);

    fill("#e9732a");
    stroke("#e9732a");

    if (lwscore > 0.2) {
        circle(lwx, lwy, 20);
        inNlwy = Number(lwy);
        removeD = floor(inNlwy * 2);
        volume = removeD / 1000;
        document.getElementById("Vo2").innerHTML = "volume = " + volume;
        UTmusic.setVolume(volume);

    }


    if (rwscore > 0.2) {
        circle(rwx, rwy, 20);
        //start of rampage  
        if (rwy > 0 && rwy <= 100) {
            document.getElementById("sped2").innerHTML = "Speed = 0.5X";
            UTmusic.rate(0.5);
        }

        else if (rwy > 100 && rwy <= 200) {
            document.getElementById("sped2").innerHTML = "Speed = 1X";
            UTmusic.rate(1);
        }

        else if (rwy > 200 && rwy <= 300) {
            document.getElementById("sped2").innerHTML = "Speed = 1.5X";
            UTmusic.rate(1.5);
        }

        else if (rwy > 300 && rwy <= 400) {
            document.getElementById("sped2").innerHTML = "Speed = 2X";
            UTmusic.rate(2);
        }

        else if (rwy > 400 && rwy <= 500) {
            document.getElementById("sped2").innerHTML = "Speed = 2.5X";
            UTmusic.rate(2.5);
        }

        // end of rampage
    }
}

function playMusic() {
    UTmusic.play();
    UTmusic.setVolume(1);
    UTmusic.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results + "NOTE:results has been deployed");
        lwscore = results[0].pose.keypoints[9].score;
        rwscore = results[0].pose.keypoints[10].score;

        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log(lwx + "results of lw x and y" + lwy);

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log(rwx + "results of rw x and y" + rwy);

    }


}

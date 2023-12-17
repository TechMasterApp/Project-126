var leftX = 0
var leftY = 0
var rightX = 0
var rightY = 0
var song = ""
var isPlaying = 0
var volume = 1
var rate = 1
var scoreLeft = 0
var scoreRight = 0

function preload() {
    song = loadSound("music.mp3")
    song = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(650, 500)
    canvas.position(525, 300)
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", acceptResult)
}

function draw() {
    image(video, 0, 0, 650, 500)
    fill("red")
    circle(leftX, leftY, 30)
    circle(rightX, rightY, 30)
    if (scoreLeft > scoreRight) {
        document.getElementById('song').innerHTML = "Song Name: Peter Pan"
    } else if (scoreRight > scoreLeft) {
        document.getElementById('song').innerHTML = "Song Name: Harry Potter"
    }
}

function playSong() {
    if (isPlaying == 0) {
        song.play()
        song.rate(rate)
        song.setVolume(volume)
        isPlaying = 1
    } else {
        song.pause()
        isPlaying = 0
    }
}

function modelLoaded() {

}

function acceptResult(result) {
    if (result.length > 0) {
        scoreLeft = result[0].pose.keypoints[9].score
        scoreRight = result[0].pose.keypoints[10].score
        if (scoreLeft > scoreRight) {
            song = loadSound("music.mp3")
        } else if (scoreRight > scoreLeft) {
            song = loadSound("music2.mp3")
        }
        leftX = result[0].pose.leftWrist.x
        leftY = result[0].pose.leftWrist.y
        rightX = result[0].pose.rightWrist.x
        rightY = result[0].pose.leftWrist.y
    }
}
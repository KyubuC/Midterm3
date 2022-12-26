var size = []
var facex = []
var facey = []
var song
var songIsplay = false
var amp
var vol=0
var m_x,m_y
var music_btn,mouse_btn,Speech_btn
var mosueIsplay=true
var myRec = new p5.SpeechRec();
var result

var colors = "d9f0ff-a3d5ff-83c9f4-6f73d2-7681b3-db5461-ffd9ce-593c8f-8ef9f3-171738".split("-").map(a=>"#"+a)
var colors_r = "000000-ffffff-494949-7c7a7a-ff5d73".split("-").map(a=>"#"+a)
var Posx = []
var Posy = []
var clrlist = []
var clrrlist =[]
var sizel = []

let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16

function preload(){
  song = loadSound("123 Hartmanners Youkaier Girler.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES)
    //music
    music_btn = createButton("音樂跳舞")
    music_btn.position(10, 10)
    music_btn.size(windowWidth/4, windowHeight/5);
    music_btn.style('background-color', 'black');
    music_btn.style('font-size', '20px');
    music_btn.style('color', 'white');
    music_btn.mousePressed(music_btn_pressed)
    
    mouse_btn = createButton("滑鼠跳動 彎曲無名指改變大小")
    mouse_btn.position(windowWidth/2.5-25,10)
    mouse_btn.size(windowWidth/4, windowHeight/5);
    mouse_btn.style('background-color', 'black');
    mouse_btn.style('font-size', '20px');
    mouse_btn.style('color', 'white');
    mouse_btn.mousePressed(mouse_btn_pressed)
  
    Speech_btn = createButton("語音辨識(跳舞/不要跳)")
    Speech_btn.position(windowWidth*4/5-75,10)
    Speech_btn.size(windowWidth/4, windowHeight/5);
    Speech_btn.style('background-color', 'black');
    Speech_btn.style('font-size', '20px');
    Speech_btn.style('color', 'white');
    Speech_btn.mousePressed(Speech_btn_pressed)


  for(var i=0;i<13;i++){
    //flower
    Posx.push(random(width))
    Posy.push(random(height))
    clrlist.push(colors[int(random(colors.length))])
    clrrlist.push(colors_r[int(random(colors_r.length))])
    sizel.push(random(0.5,1.5))
    let dat_tot = Posx.length
  
    //create flowers
    push()
    translate(Posx[i],Posy[i])
    drawFlower(clrlist[i],clrrlist[i],sizel[i])
    pop()
  }    

  //hand video
  video = createCapture(VIDEO);
  video.size(width, height);
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", (results) => 
  { predictions = results;})
  video.hide();
} 

function Speech_btn_pressed(){
  myRec.onResult = showResult;
  myRec.start();  
}

function showResult()
{
	if(myRec.resultValue==true) {
	     result = myRec.resultString
         if(myRec.resultString==="跳舞")
            {
              music_btn_pressed()
             }
         if(myRec.resultString==="不要跳")
            {
              mouse_btn_pressed()
             }
	}
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  //speech result
  push()
  textSize(50)
  fill(255,0,0)  
  text(result,1100,100);   
  pop()

  //inverse camera
translate(width, 0);
scale(-1, 1);

background("cyan");  
drawKeypoints(); //取得手指位置  
d= dist(pointerX8,pointerY8,pointerX4,pointerY4)//enlarge

//for flower spawn
for(var k=0;k<Posx.length;k++)
{
  r_Flower(clrlist[k], clrrlist[k],sizel[k],Posx[k],Posy[k])
}}

//See if 2nd finger is bent
function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);

  //bend 4th finger
  if(pointerY14<pointerY16){
    drawFlower(F_clr,F_clr_r,map(d,0,600,F_size,F_size+5))
    
    rotate(frameCount)
	}else
	{
		rotate(frameCount)
		drawFlower(F_clr,F_clr_r,F_size)
	}
	pop()
}

//point a flower
function R_draw(handX,handY)
{
  Posx.push(handX)
  Posy.push(handY)
  clrlist.push(colors[int(random(colors.length))])
  clrrlist.push(colors_r[int(random(colors_r.length))])
  sizel.push(random(0.5,1.5))
  let dat_tot = Posx.length
  push()
    translate(Posx[dat_tot-1],Posy[dat_tot-1])
    drawFlower(clrlist[dat_tot-1],clrrlist[dat_tot-1],sizel[dat_tot-1])
  pop()   
}

//draw the flower
function drawFlower(clr,clr_r,size = 1){ 
  push()
   scale (size)
    // fill(255,211,33) //中間的圓顏色
    
    if(!songIsplay){
      fill(clr_r)
      face = ellipse(0,0,100) //圓以中心點為座標點
      fill(255,0,0)
      eyeA = ellipse(-15,0,10,30) 
      eyeB = ellipse(15,0,10,30) 
      for(var j =0;j<16;j++){  
        fill(clr)
        
      beginShape()
      vertex(75,40)
      vertex(100,40)
      vertex(125,60)
      vertex(100,300)
      vertex(85,350)
      vertex(75,300)
      vertex(60,50)
      vertex(75,40)
      endShape(close)   
      
        rotate(PI/8) //PI代表180，
      }  
    }
    else{
      vol = amp.getLevel()
      fill(clr)
      face = ellipse(0,0,map(vol,0,1,0,4)*100) //圓以中心點為座標點
      fill(255,0,0)
      eyeA = ellipse(-15,0,10,map(vol,0,1,0,4)*50) 
      eyeB = ellipse(15,0,10,map(vol,0,1,0,4)*50) 
      for(var j =0;j<16;j++){  
        fill(clr_r)

        beginShape()
        vertex(75,map(vol,0,1,0,4)*40)
        vertex(map(vol,0,1,0,4)*100,40)
        vertex(125,map(vol,0,1,0,4)*60)
        vertex(map(vol,0,1,0,4)*100,300)
        vertex(map(vol,0,1,0,4)*85,350)
        vertex(75,map(vol,0,1,0,4)*300)
        vertex(map(vol,0,1,0,4)*60,50)
        vertex(75,map(vol,0,1,0,4)*40)
        endShape(close)   
         
        rotate(PI/8) //PI代表180，
      }  
      noStroke() 
    }
    ellipseMode(CORNER) //往後執行ellipse指令，以左上角為座標點
    
 pop()   
}


//press mouse button
function mouse_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  mosueIsplay = false
  amp=new p5.Amplitude()  

}
function music_btn_pressed(){
  song.pause()
  mosueIsplay = true
  songIsplay = false

}
//mouse is pressed
function mousePressed()
{
  if(!songIsplay){
    song.play()
    songIsplay = true
    amp=new p5.Amplitude()
  }
  else{
    song.pause()
    songIsplay = false
  } 
}

//keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {				
				pointerX8 = map(keypoint[0],0,640,0,width)
				pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = map(keypoint[2],0,480,0,height)
        console.log(pointerZ8)
        if(pointerZ8<-150)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) {   
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
		
      } else
      if (j == 14) {
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}
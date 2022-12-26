function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0) 

}


function draw() {
noFill()
background(0);
stroke(256-mouseX/10);
strokeWeight(mouseY/100)
var z = 100


for (let j = 0; j<height/50; j++){
  for(let k = 0; k<width/50; k++){
    stroke(255,mouseX/10,mouseY/5)
    a = ellipse(50+z*j,50+z*k,100+mouseX/5,100+mouseY/5)
    stroke(mouseY/10,mouseX/5,255)
    b = rect(50+z*j,50+z*k,50,50,45)
    c = rect(0+z*j,50+z*k,50,50)
    d = rect(50+z*j,0+z*k,50,50)
    e = rect(50+z*j,50+z*k,0,50)
    f = rect(25+z*j,25+z*k,50,50)
    g = rect(50+z*j,50+z*k,50,50,5*frameCount%50)
    i = rect(0+z*j,0+z*k,100,100,frameCount%50)

   
    }
  
  
}


}
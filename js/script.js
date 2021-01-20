'use strict';

let canvas = document.getElementById('game'),
    wrapper = document.getElementById('wrapper'),
    ctx = canvas.getContext('2d'),
    aster = [],
    ship = { x:270,y:300},
    fire = [],
    expl = [],
    bigExpl = {x: 0, y: 0,},
    score = 0,
    scoreArr =[],
    time = 0;
    

let backgr = new Image();
backgr.src = 'https://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg';

let astering = new Image();
astering.src = 'https://cdn1.iconfinder.com/data/icons/space-72/24/astronomy_asteroid_space_spacecraft_meteor_comet-512.png'

let shiping = new Image();
shiping.src = 'https://www.pngrepo.com/download/217230/spacecraft-spaceship.png';

let fireing = new Image();
fireing.src = 'https://image.flaticon.com/icons/svg/1461/1461857.svg';

let eplosing = new Image();
eplosing.src = 'https://www.seekpng.com/png/full/93-936091_drawn-explosions-sprite-explosion-sprite-sheet-doom.png';

let bigExplosing = new Image();
bigExplosing.src = 'https://www.seekpng.com/png/full/93-936091_drawn-explosions-sprite-explosion-sprite-sheet-doom.png';

let heart_1 = new Image();
heart_1.src = "https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_640.png";

let heart_2 = new Image();
heart_2.src = "https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_640.png";

let heart_3 = new Image();
heart_3.src = "https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_640.png";

    canvas.addEventListener('mousemove', function(event){
    ship.x = event.offsetX-25;
    ship.y = event.offsetY-13;
});

function timerLastImage(){
    let timerId = setInterval(LastImage, 40);
    setTimeout(() => { clearInterval(timerId); }, 2700);
};




/* let timerId = setInterval(showLastImage, 100);
setTimeout(() => { clearInterval(timerId); }, 2700); */
let count = 0;
backgr.onload = function (){
    game();
};

let test;
function game(){
    update();
    render();
    
   for(let i=0;i<aster.length;i++){
        
        if(Math.abs((aster[i].x + 30 )- (ship.x +15)) < 50  &&  Math.abs(aster[i].y - ship.y) < 25){

                count += 1;
                
                aster.splice(0,aster.length);
               
               
            
        }
    }
     if(count == 1) {
      heart_3.src = 'https://i.ya-webdesign.com/images/pixel-heart-png-8.png';
     
    }else if(count == 2){
        heart_2.src = 'https://i.ya-webdesign.com/images/pixel-heart-png-8.png';
    }
    else if(count == 3){
        timerLastImage();
        //score -= levelScore;
        return;
    }
    ;  
    
    requestAnimationFrame(game);
}


    

     function LastImage(){
        
        if(bigExpl.x > 7){bigExpl.y++; bigExpl.x = 0};
        if(bigExpl.y > 7) delete bigExpl.y;
        ctx.drawImage(backgr,0,0,600,600);
        for (let i=0; i<fire.length; i++) ctx.drawImage(fireing,fire[i].x ,fire[i].y,30,30);
        for (let i=0; i<aster.length; i++) ctx.drawImage(astering,aster[i].x,aster[i].y,50,50);
        for (let i=0; i<expl.length; i++) ctx.drawImage(eplosing, 256*Math.floor(expl[i].animx),248*Math.floor(expl[i].animy),256,248, expl[i].x, expl[i].y,100,100);
        for (let i=0; i<bigExpl.length; i++) ctx.drawImage(bigExplosing, 182*Math.floor(bigExpl[i].animx),132.4*Math.floor(bigExpl[i].animy),182,132.4, 0, 0,600,600);
        ctx.drawImage(bigExplosing, 256*Math.floor(bigExpl.x),256*Math.floor(bigExpl.y),256,256, 0, 0, 600, 600);
        
        bigExpl.x++;
        
    } 






function update(){
   

    for (let i=0; i<expl.length; i++){
        expl[i].animx += 0.7;
        if(expl[i].animx > 7){expl[i].animy++; expl[i].animx = 0};
        if(expl[i].animy > 7) expl.splice(i,1);
    }

   


time++

if(time%3 == 0) aster.push({
    x: Math.random()*600,
    y:-50,
    speedX: Math.random()*2-1,
    speedY: Math.random()*2+2,
    del:0,
});

if(time%10== 0 ){ 
    //fire.push({x: ship.x , y: ship.y - 30,speedY: 4, speedX :-0.5,});
   fire.push({x: ship.x +15, y: ship.y - 30,speedY: 4.1, speedX:0, });
    //fire.push({x: ship.x + 30, y: ship.y - 30,speedY: 4,speedX :0.5,});
};


for (let i=0; i<fire.length; i++){
    fire[i].y -= fire[i].speedY;
    //fire[i].x += fire[i].speedX;
    if (fire[i].y < 60 ) fire.splice(i,1);
 }
 


     for (let i=0; i<aster.length; i++){
    aster[i].x += aster[i].speedX;
    aster[i].y += aster[i].speedY;
    if (aster[i].x > 540 || aster[i].x == 0) aster[i].speedX = -aster[i].speedX ;
    if (aster[i].y > 600 ) aster.splice(i,1);

   

    for (let j=0; j<fire.length; j++){


        if(Math.abs((aster[i].x + 25 )- (fire[j].x +15)) < 50  &&  Math.abs(aster[i].y - fire[j].y) < 25){
             
            expl.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0})
            score += 1;
           
            aster[i].del = 1;
            fire.splice(j,1);
            break;
        }
        if(aster[i].del == 1) aster.splice(i,1);
     } 
 }



}

function render(){
    ctx.drawImage(backgr,0,0,600,600);
    ctx.drawImage(shiping,ship.x,ship.y,50,50);
    for (let i=0; i<fire.length; i++) ctx.drawImage(fireing,fire[i].x ,fire[i].y,30,30);
    for (let i=0; i<aster.length; i++) ctx.drawImage(astering,aster[i].x,aster[i].y,50,50);
    ctx.drawImage(heart_1, 0, 0, 60, 60);
    ctx.drawImage(heart_2, 60, 0, 60, 60);
    ctx.drawImage(heart_3, 120, 0, 60, 60);
    for (let i=0; i<expl.length; i++) ctx.drawImage(eplosing, 256*Math.floor(expl[i].animx),248*Math.floor(expl[i].animy),256,248, expl[i].x, expl[i].y,100,100);
    for (let i=0; i<bigExpl.length; i++) ctx.drawImage(bigExplosing, 182*Math.floor(bigExpl[i].animx),132.4*Math.floor(bigExpl[i].animy),182,132.4, 0, 0,600,600);
}





//the counter

let divCount = document.createElement('div');
divCount.className = 'counter';
divCount.innerHTML = `you score `;
document.body.append(divCount);
setInterval(() => {divCount.innerHTML = `Your score <span>${score}</span>`;}, 1);


//level
let levelScore = 0;
let divLevel = document.createElement('div');
divLevel.className = 'level';
divLevel.innerHTML = `Your level <span>${levelScore}</span>`;
document.body.append(divLevel);
let span = document.querySelector('span');
setInterval(() => {span.innerHTML = `${levelScore}`;}, 1);

//setInterval( () =>{if(score%20 == 0 && score>0) levelScore++;}, 100) ;


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var player1 = new GameObject();
var ball = new GameObject();     // ball varible
var keys = {};

// ball thingy shows 
ball.x = 200;
ball.y = 200;
ball.radius = 20;
ball.color = "magenta";

// ball vecolity?
ball.vx = 4;
ball.vy = 4;



// console.log(document.getElementById("canvas"));

// player line thijngy shows
player1.x = 20;
player1.y = canvas.height / 2 - 50;
player1.width = 20;
player1.height = 100;
player1.color = "blue";
player1.speed = 4;


// makes sure that when player presses a key, the system knows (dyslexia)
document.addEventListener("keydown", function(e) 
{
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) 
{
    keys[e.key] = false;
});


setInterval(animate, 1000 / 60);

function animate() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    //YAY THE BALL WORKS  BUUUTTTT it doesnt hit the slider // goes through it 
    
    // ball movement 
    ball.x += ball.vx; // keep messing up with putting x instead of v
    ball.y += ball.vy;


    //top bounding
    if (ball.y - ball.radius < 0)
    {
        ball.vy *= -1;
        ball.y = ball.radius;
    }

    //bottom bounding
    if (ball.y + ball.radius > canvas.height)
    {
        ball.vy *= -1;
        ball.y = canvas.height - ball.radius;
    }

    //right bounding
    if (ball.x + ball.radius > canvas.width)
    {
        ball.vx *= -1;
        ball.x = canvas.width - ball.radius;
    }


    // lose condition || left wall
    if (ball.x + ball.radius < 0)
    {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx *= -1;
    }



    //keys up and down for player
    if (keys["w"] && player1.y > 0)
    {
        player1.y -= player1.speed;
    }

    if (keys["s"] && player1.y + player1.height < canvas.height)
    {
        player1.y += player1.speed;
    }

    //player bounding
    if (player1.y < 0)
    {
        player1.y = 0;
    }
    
    if (player1.y + player1.height > canvas.height)
    {
        player1.y = canvas.height - player1.height;
    }


    //paddle collison but front only
    if (
    ball.x - ball.radius < player1.right() && 
    ball.x > player1.x &&
    ball.y + ball.radius > player1.top() &&
    ball.y - ball.radius < player1.bottom() &&
    ball.vx < 0 
    ) 
    {
    ball.vx *= -1;

    ball.x = player1.right() + ball.radius;
    }   

    player1.drawRect(context);
    ball.drawCircle(context); 
}
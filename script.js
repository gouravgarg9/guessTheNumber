const usernum = document.getElementById("usernum");
const wonlabel = document.getElementsByClassName("test")[0];
const actnum = document.getElementById("actnum");
const score = document.getElementById("score");
const nearness = document.getElementById("closeness");
const time = document.getElementById("time");

function blink(elem)
{
    elem.style.visibility = "hidden";
    elem.classList.remove("animated")
    setTimeout(()=>{
        elem.style.visibility = "visible";
        elem.classList.add("animated");
        },100);
}

const game = {
    num : Math.ceil(Math.random() * 100),
    iter : 0,
    highest : 0,
    curr : 100,
    near : 0,
    time : 61,
    work : true,

    anyevent : function()
    {
        blink(document.getElementById("happens"));
        blink(wonlabel);
        
        game.near = usernum.value - game.num;
        usernum.value = null;

        if(game.curr>=80)
        score.style.color = "green";
        else if(game.curr>=50)
        score.style.color = "orange";
        else
        score.style.color = "red";

        if(game.near > 10)
            nearness.innerHTML = 'Too High';
        else if(game.near > 0)
            nearness.innerHTML = 'High';
        else if (game.near == 0)
        nearness.innerHTML = 'Perfect';
        else if(game.near > -10)
        nearness.innerHTML = 'Low';
        else if(game.near < -10)
        nearness.innerHTML = 'Too Low';
    },

    resetgame : function ()
    {
        usernum.value = null;

        game.time = 61;
        game.curr = 100;
        game.iter = 0;
        game.num = Math.ceil(Math.random() * 100);
        game.work = true;
        game.near = 0;

        document.body.style.background = "black"; 
        
        score.style.color = "green";
        score.innerText = `${game.curr}`;
        
        nearness.innerHTML = "Figure it out"
        
        wonlabel.style.color = "white";
        wonlabel.innerHTML = "Start";
        
        actnum.style.color = "black";
        actnum.innerText = "?";
            
    },

    check : function ()
    {
        if(usernum.value == null)
            usernum.value = 0;
        if(usernum.value >100 || usernum.value < 1)
        {
            wonlabel.style.color = "white";
            wonlabel.innerHTML = 'Invalid</br> Input';
            
            usernum.value = null;  
            
            nearness.innerHTML = "Figure it out";
        }

        else if(game.num == usernum.value)
        {
            document.body.style.background = "green";
            game.pause();

            wonlabel.innerHTML = "You Won";
            wonlabel.style.color = "green";

            actnum.innerHTML = "&#x2713;";
            actnum.style.color = "green";

            if(game.curr > game.highest)
            {
                game.highest = game.curr;
                document.getElementById("highest").innerHTML = `${game.highest}`;
            }

            nearness.innerHTML = 'Perfect';
          
            score.style.color = "blue";
            score.innerHTML = `${game.curr}`;

            setTimeout(game.resetgame,3000);   
        }
        else
        {
            document.body.style.background = "black";

            actnum.innerHTML = "X";
            actnum.style.color = "red";
            
            wonlabel.innerHTML = "Try Again!"
            wonlabel.style.color = "red";
            
            game.iter++;
            score.innerText = `${game.curr}`;

            if(game.curr>80)
                game.curr -= 2;
            else if(game.curr > 50)
                game.curr -= 5;
            else
                game.curr -= 10;
            
            if(game.curr == 0)
            {
                document.body.style.background = "red";
                wonlabel.style.color = "red"
                wonlabel.innerHTML = "You Lose!<br> Start Again"; 
                game.pause();
                setTimeout(game.resetgame,3000);
            }

            game.anyevent();
        }
    },

    setTime : function()
    {
        if(game.work)
            game.time--;
        if(game.time < 0)
        {
            document.body.style.background = "darkgray";
            
            wonlabel.style.color = "white"
            wonlabel.innerHTML = "Time Over!<br> Start Again"; 
            
            setTimeout(game.resetgame,3000);
        }
        else
        {
            if(game.time > 40)
                time.style.color = "green";
            else if(game.time > 10)
                time.style.color = "orange";
            else{
                time.style.color = "red";
                blink(time);
            }
            time.innerHTML = `${game.time}`;
        }
    },
    
    pause : function (){
        game.work = false;
    }

};

document.getElementById("again").addEventListener("click",game.resetgame);
document.getElementById("checka").addEventListener("click",game.check);
setInterval(game.setTime,1000);

document.body.onload = document.getElementById("checka").click();
document.body.onload = game.resetgame;
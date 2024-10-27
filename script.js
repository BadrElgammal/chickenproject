var chickensDiv = document.querySelector('.chickens')

function createChicken(){
    var chicken = document.createElement('img')
    chickensDiv.append(chicken)
    chicken.setAttribute('src','./Images/Chicken.png')
    chicken.classList.add('chicken'); 
}

for(var x = 0; x < 60; x++){
    createChicken()
}

var rocket = document.querySelector('.rocket')
var verticalMove = 0
var horizontalMove = 0
var bullets = [];
window.addEventListener('keydown',function(e){
    if(e.code === 'ArrowUp'){
        verticalMove += 10
        rocket.style.bottom = verticalMove + 'px'
    }else if(e.code === 'ArrowDown'){
        verticalMove -= 10 
        if(verticalMove < 0){
            verticalMove = 0
        }
        rocket.style.bottom = verticalMove + 'px'
    }else if(e.code === 'ArrowRight'){
        horizontalMove += 10
        rocket.style.left = horizontalMove + 'px'
    }else if(e.code === 'ArrowLeft'){
        horizontalMove -= 10
        if(horizontalMove < 0){
            horizontalMove = 0
        }
        rocket.style.left = horizontalMove + 'px'
    }else if(e.code === 'Space'){
        var bullet = document.createElement('img')
        rocket.append(bullet)
        bullet.setAttribute('class','bullet')
        bullet.src = './Images/Bullet.png'
        bullets.push(bullet);
        var y = 0
        var bulletInterval = setInterval(() => {
            y +=10
            bullet.style.bottom = y + 'px'
            if (parseInt(bullet.style.bottom) > window.innerHeight) {
                clearInterval(bulletInterval);
                bullet.remove();
                bullets = bullets.filter(b => b !== bullet); // Remove bullet from array
            }
            checkCollision();
        }, 10);
    }
})
function checkCollision() {
    var chickens = document.querySelectorAll('.chicken');

    chickens.forEach(function (chicken) {
        var chickenRect = chicken.getBoundingClientRect();

        bullets.forEach(function (bullet) {
            var bulletRect = bullet.getBoundingClientRect();

            if (bulletRect.left < chickenRect.right &&
                bulletRect.right > chickenRect.left &&
                bulletRect.top < chickenRect.bottom &&
                bulletRect.bottom > chickenRect.top) {

                chicken.remove();
                bullet.remove();
                bullets = bullets.filter(b => b !== bullet); 
            }
        });
    });
}
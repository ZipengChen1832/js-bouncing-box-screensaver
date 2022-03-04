
const INIT_VELOCITY = 0.05;



class Box {
    constructor(boxElem){
        this.box = boxElem;
        this.reset();
    }
    
    get x() {
        return parseFloat(getComputedStyle(this.box).getPropertyValue("--x"));
    }

    set x(value){
        this.box.style.setProperty("--x",value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.box).getPropertyValue("--y"));
    }

    set y(value){
        this.box.style.setProperty("--y",value)
    }
    
    rect(){
        return this.box.getBoundingClientRect();
    }

    reset(){
        this.x = 50;
        this.y = 50;
        const angle = Math.random() * 2 * Math.PI;

        this.direction = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }

    update(delta,container){
        

        this.x += this.direction.x * delta * INIT_VELOCITY;
        this.y += this.direction.y * delta * INIT_VELOCITY;
        
        if(this.rect().top < container.rect().top){
            this.direction.y *= -1;
            this.y = container.rect().top + this.rect().height / 2;
            this.y = this.y / innerHeight * 100
        }
        
        if(this.rect().bottom > container.rect().bottom){
            this.direction.y *= -1;
            this.y = container.rect().bottom - this.rect().height / 2;
            this.y = this.y / innerHeight * 100
        }
        
        if(this.rect().left < container.rect().left){
            this.direction.x *= -1;
            this.x = container.rect().left + this.rect().width / 2;
            this.x = this.x / innerWidth * 100
        }
        
        if(this.rect().right > container.rect().right){
            this.direction.x *= -1;
            this.x = container.rect().right - this.rect().width / 2;
            this.x = this.x / innerWidth * 100
        }


    }
}



let delta;
let lastTime = 0;

const box0 = new Box(document.querySelector("#box0"));
const box1 = new Box(document.querySelector("#box1"));
const box2 = new Box(document.querySelector("#box2"));
const box3 = new Box(document.querySelector("#box3"));

function update(time){
    delta = time - lastTime;
    lastTime = time;
    box1.update(delta,box0);
    box2.update(delta,box1);
    box3.update(delta,box2);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);


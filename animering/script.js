
/********************************* Simulation **************************************/

const rPedal = 0.2;
const rWheel = 0.311;
const resistance = 60;
const gravityConstant = 9.82; 

let velocity = 0;
let angle = 0;
let volt = 0;
let current = 0;
let power = 0;

const h = 0.1;
const timeVec = []; 
for (let t = 0; t <= 10; t += h) {
    timeVec.push(t);
}

const angles = new Array(timeVec.length);
const velocities = new Array(timeVec.length);
const generatedPower = new Array(timeVec.length);

/* Euler method func */
function eulerMethod(a, v, theta, h) {
    const vnew = v + a * h;
    const thetanew = theta + v * h;
    return [vnew, thetanew];
}

/********************************* Animation **************************************/

const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const wheels = document.getElementsByClassName('wheel');
console.log(wheels[0]);

let t = 0;

function animateBike() {
    /* Clear the canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t+=h;

    /* User-defined values */
    const massIE = document.getElementById('massInput');
    const mass = massIE.value;

    const factorIE = document.getElementById('factorInput');
    const factor = factorIE.value / 10;

    console.log(factor);


    /* Calculate angular velocity */
    const appliedForce = factor * mass * gravityConstant / 2;
    const Torque = appliedForce * rPedal; 
    const MOInertia = mass * rWheel / 2;
    let angVel = Torque / MOInertia;
    
    if(t > 4){
        angVel = 0; //For realism
    }
    
    /* Calculate new angle & velocity */
    const [vnew, thetanew] = eulerMethod(angVel, velocity, angle, h);
    velocity = vnew;
    angle = thetanew;

    /* Calculate power output */
    current = Torque / resistance;
    volt = rWheel * velocity;
    power = current * volt;

    /* Wheel rotation */
    const angleDegrees = angle * (180 / Math.PI);
    const actwheel = wheels[0];
    actwheel.style.display = 'block';
    actwheel.style.transform = `rotate(-${angleDegrees}deg)`;

    /* Request the next animation frame */
    setTimeout(animateBike,100);
}

// Start the animation
animateBike();

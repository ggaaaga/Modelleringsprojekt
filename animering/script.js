
/********************************* Simulation **************************************/

const rPedal = 0.2;
const rWheel = 0.311;
const resistance = 60;
const gravityConstant = 9.82; 
const factor = 0.7;

let velocity = 0;
const b = 1.2; // friktionskonstant
let angle = 0;
let volt = 0;
let current = 0;
let power = 0;
let stopped = 'f'; //bool to see if pedaling has been stopped

/* Euler method func */
const h = 0.1; // Step size
function eulerMethod(a, v, theta, h) {
    const vnew = v + a * h;
    const thetanew = theta + v * h;
    return [vnew, thetanew];
}

/********************************* Animation **************************************/
const wheels = document.getElementsByClassName('wheel');

function toggle() {
    stopped = 't';
}

let time = 0;
function animateBike() {

    time++;

    /* Calculate angular velocity */
    const mass = 75;
    const friktionskraft = b * velocity;
    let appliedForce = 0;
    if(stopped === 'f') {
        appliedForce = factor * mass * gravityConstant / 2;
    }
    const totalForce = appliedForce - friktionskraft;
    const Torque = totalForce * rPedal; 
    const MOInertia = mass * rWheel / 2;
    let angAcc = Torque / MOInertia;
    console.log(angAcc);

    /* Calculate new angle & angular velocity */
    const [vnew, thetanew] = eulerMethod(angAcc, velocity, angle, h);
    velocity = vnew;
    if(velocity > 17){
        velocity = 17; //To stop velocity from being too high
    }
    angle = thetanew;
    document.getElementById('vel').textContent = `V: ${Math.ceil(velocity)} m/s`;
    
    /* Calculate power output */
    current = Math.abs(Torque) / resistance;
    volt = rWheel * velocity;
    power = current * volt;
    document.getElementById('pow').textContent = `Effect: ${power.toFixed(2)} Watts`;
    bulb(Math.floor(power));
    
    /* Wheel rotation */
    const angleDegrees = angle * (180 / Math.PI);
    const actwheel = wheels[0];
    actwheel.style.display = 'block';
    actwheel.style.transform = `rotate(${angleDegrees}deg)`;

     /* Request next animation frame, updated every 0.1 sec*/
     setTimeout(animateBike,100);
}

function bulb(power) {
    var bulbElement = document.querySelector('.bulb');
    var bulbSecondElement = document.querySelector('.bulb-inner');

    if (power > 1) { 
        bulbElement.style.backgroundColor = '#e6de0a';
        bulbSecondElement.style.backgroundColor = '#e6de0a';
        bulbElement.style.boxShadow = '0 0 10px #e6de0a';
        bulbSecondElement.style.boxShadow = '0 0 10px #e6de0a';

        switch (power){
            case 2:
                bulbElement.style.boxShadow = '0 0 20px #e6de0a';
                break;

            case 3: 
                bulbElement.style.boxShadow = '0 0 40px #e6de0a';
                break;
            case 4: 
                bulbElement.style.boxShadow = '0 0 70px #e6de0a';
                break;
        }

    } else {
        bulbElement.style.backgroundColor = '#ffffff'; 
        bulbSecondElement.style.backgroundColor = '#ffffff';
        bulbElement.style.boxShadow = '';
        bulbSecondElement.style.boxShadow = '';
    }
}

// Start the animation
animateBike();
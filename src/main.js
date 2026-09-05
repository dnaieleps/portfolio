/* CREATING THE STAR FIELD IN THE BACKGROUND OF THE ENTIRE PAGE */
const starField = document.getElementById("star-field");
const numStars = 1500; 

// for loop that creates all the stars in the background of the intro section
for(let i = 0; i < numStars; i++){ 
    const star = document.createElement('div'); // creates new div representing a star
    const starSize = Math.random() * 1.5 + 0.5; // randomizes star size every iteration
    star.classList.add('bg-star');              // adds 'bg-star' class to new star
    
    // sets random dimensions and position of current star
    star.style.width = `${starSize}px`;
    star.style.height = `${starSize}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 500}%`;

    starField.appendChild(star);   // appends new star to starField div element
}


/* MAKING A GLOW EFFECT FOLLOW THE CURSOR */
const follower = document.querySelector('#cursor-follower'); // grabs the variable with the id 'cursor-follower'
// adds event listener that tracks whenever the cursor moves, and makes the follower query copy its position (follow)
document.addEventListener('mousemove', (e) => {
    follower.style.left = e.clientX + 'px'; 
    follower.style.top = e.clientY + 'px';
});


/* MAKING THE CORE CLOUDS FOR THE GALAXY IN THE BACKGROUND OF THE PROJECTS SECTION */
const galaxy = document.getElementById("galaxy-container");

const numCores = 20;        // determines number of core clouds to make up the galaxy
let radialDistance = 5;     // determines distance from galactic center
let sizeScalar = 1.0;       // determines additional size scaling of clouds
let flipper = -1;           // determines which side of galaxy to be spawned

// for loop to create core clouds
for(let i = 0; i < numCores; i++) {
    const core = document.createElement('div');     // creates new div
    const coreSize = (Math.random() * 50) + 225;    // creates new random core cloud size from 225px to 275px
    core.classList.add('core');

    core.style.position = 'absolute';   // position: absolute
    core.style.borderRadius = '50%';    // border-radius: 50% (circular)
    core.style.filter = `blur(${Math.random() * 15 + 5}px)`     // blurs gradient for better blending

    core.style.width = `${(coreSize) * sizeScalar}px`;  // sets width of core cloud
    core.style.height = `${(coreSize) * sizeScalar}px`; // sets height of core cloud
    core.style.left = `${((window.innerWidth / 2) + (flipper * radialDistance)) - 350}px`;  // sets horizontal position 
    
    const verticalSpread = (Math.random() - 0.5) * 80 * sizeScalar;     // sets variation in vertical position along galaxy line
    core.style.top = `${verticalSpread - 60}px`;  // sets vertical position

    core.style.opacity = `${Math.random() * 50}%`;  // sets opacity of core cloud

    galaxy.appendChild(core);   // add cloud to galaxy div
    radialDistance += 7;        // how many pixels further away each core gets from the center of the galaxy per iteration
    sizeScalar -= 0.01;         // how much percent smaller each core gets as the core gets further from the galactic center
    flipper *= -1;              // alternating sides to spawn cores every iteration
}


/* MAKING THE PERIPHERAL CLOUDS FOR THE GALAXY IN THE BACKGROUND OF THE PROJECTS SECTION */
const numClouds = 75;   // how many peripheral clouds will make up the galaxy
radialDistance = 10;    // determines distance from galactic center
sizeScalar = 1.0;       // determines size scaling of clouds
flipper = -1;           // determines which side of galaxy to be spawned

// for loop to create peripheral clouds
for(let i = 0; i < numClouds; i++) {
    const cloud = document.createElement('div');    
    const cloudSize = (0.5 + Math.random()) * 150;
    const proportionToAnimate = 0.6;    // determines the proportion of how many peripheral clouds to animate (60%)
    cloud.classList.add('cloud');

    cloud.style.position = 'absolute';
    cloud.style.borderRadius = '50%';
    cloud.style.filter = `blur(${Math.random() * 15 + 5}px)`
    cloud.style.width = `${(Math.random() * (cloudSize * 2) + (cloudSize))}px`; // sets width of peripheral cloud, which is more elliptical than a core cloud
    cloud.style.height = `${(cloudSize) * sizeScalar}px`;
    cloud.style.left = `${((window.innerWidth / 2) + (flipper * radialDistance)) - 350}px`;   
    const verticalSpread = (Math.random() - 0.5) * 80; 
    cloud.style.top = `${verticalSpread + (verticalSpread * sizeScalar)}px`;
    cloud.style.opacity = `${Math.random() * 50}%`;

    galaxy.appendChild(cloud);  // add cloud to galaxy div

    // if statement to animate only a proportion of the peripheral clouds to move back and forth
    if (Math.random() < proportionToAnimate) {
        const driftDistance = (Math.random() * 150 + 50) * flipper;     // randomizes how far they drift (between 50px and 200px)
        const animationSpeed = Math.random() * 4000 + 8000;     // randomizes the animation speed (between 8 and 12 secs)

        // css animation block
        cloud.animate([
            { transform: 'translateX(0px)' },
            { transform: `translateX(${driftDistance}px)` },
            { transform: 'translateX(0px)' }
        ], {
            duration: animationSpeed,
            iterations: Infinity,
            easing: 'ease-in-out',
        });
    }

    radialDistance += 8;        // how many pixels further away each cloud gets from the center of the galaxy per iteration
    sizeScalar -= 0.01;         // how much percent smaller each cloud gets as the cloud gets further from the galactic center
    flipper *= -1;              // alternating sides to spawn clouds every iteration
}

galaxy.style.transform = "rotate(10deg)";   // tilting the galaxy by 10 degrees


/* */
const numRaysPerRotation = 4; 

for (let i = 0; i < numRaysPerRotation; i++) {
    const ray = document.createElement('div');
    ray.classList.add('skinny-ray');
    
    // Offset the skinny rays by dividing the angle by 2 so they sit between the fat rays
    const angle = (i * (360 / numRaysPerRotation)) + (180 / numRaysPerRotation);
    ray.style.transform = `rotate(${angle}deg)`;
    
    rayContainer.appendChild(ray);
}
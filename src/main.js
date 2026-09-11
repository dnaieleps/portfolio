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
        const driftDistance = (Math.random() * 100 + 100) * flipper;     // randomizes how far they drift (between 100px and 200px)
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


/* EVENT LISTENERS THAT DYNAMICALLY CHANGE THE CONNECTING CONSTELLATION LINES WITH WINDOW SIZE */
// function that dynamically fixes the connecting line's anchor points onto two other elements
function fixJobAnchors(object, anchor1, anchor2) {
    const xPos1 = anchor1.offsetLeft + (anchor1.offsetWidth / 2);   // setting first x position to be on anchor1's center
    const yPos1 = anchor1.offsetTop + (anchor1.offsetHeight / 2);   // setting first y position to be on anchor1's center
    const xPos2 = anchor2.offsetLeft + (anchor2.offsetWidth / 2);   // setting second x position to be on anchor2's center
    const yPos2 = anchor2.offsetTop + (anchor2.offsetHeight / 2);   // setting second y position to be on anchor2's center

    // using pythagorean theorem to calculate connector width and angle from anchor1
    const distance = Math.sqrt((xPos2 - xPos1)**2 + (yPos2 - yPos1)**2);
    const angle = Math.atan2(yPos2 - yPos1, xPos2 - xPos1) * (180 / Math.PI);

    // setting css style attributes based on defined variables
    object.style.left = `${xPos1}px`;
    object.style.top = `${yPos1}px`;
    object.style.width = `${distance}px`;
    object.style.transformOrigin = "0 50%"; 
    object.style.transform = `rotate(${angle}deg)`;
}

// retrieving elements of each job star
const nasa1 = document.getElementById('nasa1');
const moorpark1 = document.getElementById('moorpark1');
const moorpark2 = document.getElementById('moorpark2');
const nasa2 = document.getElementById('nasa2');
const aila = document.getElementById('aila');

// retrieving elements of each connecting line
const connector1 = document.getElementById('con1');
const connector2 = document.getElementById('con2');
const connector3 = document.getElementById('con3');
const connector4 = document.getElementById('con4');
const connector5 = document.getElementById('con5');

// adding connectors for every time the page first loads
window.addEventListener('load', () => {
    fixJobAnchors(connector1, nasa1, moorpark1)
    fixJobAnchors(connector2, nasa1, moorpark2)
    fixJobAnchors(connector3, moorpark1, nasa2)
    fixJobAnchors(connector4, moorpark2, nasa2)
    fixJobAnchors(connector5, nasa2, aila)
});
// updating connectors for every time the page's dimensions get resized
window.addEventListener('resize', () => {
    fixJobAnchors(connector1, nasa1, moorpark1)
    fixJobAnchors(connector2, nasa1, moorpark2)
    fixJobAnchors(connector3, moorpark1, nasa2)
    fixJobAnchors(connector4, moorpark2, nasa2)
    fixJobAnchors(connector5, nasa2, aila)
});


/* MAKING THE HOVER MECHANICS FOR THE JOB DESCRIPTIONS AND ICONS */
const jobs = document.querySelectorAll(".job")
jobs.forEach((job) => {     // loops through all elements with class 'job' and adds following event listeners
    const icon = job.querySelector(".job-icon");    // retrieves job icon from current job in loop
    const description = job.querySelector(".job-description-container");
    let hideTimeout;    // variable used to store time until job description fades out

    icon.addEventListener('mouseenter', () => {     // event listener for when icon is first hovered
        clearTimeout(hideTimeout);          // resets hideTimeout timer
        description.style.opacity = "0.8";
    });
    icon.addEventListener('mouseleave', () => {     // event listener for when cursor first leaves job icon
        hideTimeout = setTimeout(() => {    // starts hideTimeout timer which lasts 0.1s before fadeout begins
            description.style.opacity = "0";
        }, 100);
    });

    description.addEventListener('mouseenter', () => {  // event listener for when description is first hovered
        clearTimeout(hideTimeout);          // resets hideTimeout timer
    });
    description.addEventListener('mouseleave', () => {  // event listener for when cursor first leaves description
        description.style.opacity = "0";    // hides description
    });
});


/* ADDING COPY-PASTE FUNCTIONALITY TO ICONS ON CONTACT ME SECTION */
const email = document.getElementById('email'); 
const phone = document.getElementById('phone');
const linkbox = document.getElementById('linkbox');

email.addEventListener('click', () => {     // adding event listener to email icon to copy paste email to clipboard
    navigator.clipboard.writeText('danespiritu.business@gmail.com');    // copies email to clipboard

    // creating confirmation popup notifying that email was copied 
    const confirm = document.createElement('div');
    confirm.textContent = "Email copied!";
    confirm.classList.add('confirmation');

    confirm.style.position = 'absolute';
    confirm.style.pointerEvents = "none";
    confirm.style.top = `${linkbox.height + 10}px`;
    confirm.style.left = '50%';
    confirm.style.transform = 'translateX(-50%)';

    // animates confirm button to fade in and out within 1.5s
    confirm.animate(
        [{opacity: 1}, {opacity: 0}],
        {
            duration: 1500,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );

    linkbox.appendChild(confirm); 
    setTimeout(() => confirm.remove(), 1500);
});
phone.addEventListener('click', (e) => {    // adding event listener to phone icon to copy paste phone number to clipboard
    navigator.clipboard.writeText('+18188362471');      // copies phone # to clipboard

    // creating confirmation popup notifying that phone # was copied 
    const confirm = document.createElement('div');
    confirm.textContent = "Phone # copied!";
    confirm.classList.add('confirmation');

    confirm.style.position = 'absolute';
    confirm.style.pointerEvents = "none";
    confirm.style.top = `${linkbox.height + 10}px`;
    confirm.style.left = '50%';
    confirm.style.transform = 'translateX(-50%)';

    confirm.animate(
        [{opacity: 1}, {opacity: 0}],
        {
            duration: 1500,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );

    linkbox.appendChild(confirm); 
    setTimeout(() => confirm.remove(), 1500);
});


/* MAKING RESUME AND CV DOWNLOADABLE IN NAVBAR FROM CLICKING */
document.getElementById('resume').addEventListener('click', () => {
    const pdfUrl = './public/resume.pdf';

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Daniel_Espiritu_Resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('cv').addEventListener('click', () => {
    const pdfUrl = './public/cv.pdf';

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Daniel_Espiritu_CV.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
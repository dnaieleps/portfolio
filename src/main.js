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
    star.style.top = `${Math.random() * 450}%`;

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


/* MAKING THE COMET IN THE BACKGROUND OF THE EXPERIENCE SECTION */
const bigCometContainer = document.getElementById('big-comet-container');
const smallCometContainer = document.getElementById('small-comet-container');

// creating the main big rock that the big comet is "made of"
const bigRock = document.createElement('div');
bigRock.id = 'big-rock';
bigCometContainer.appendChild(bigRock);    // adding the big rock to the comet container

// creating the main small rock that the small comet is made of
const smallRock = document.createElement('div');
smallRock.id = 'small-rock';
smallCometContainer.appendChild(smallRock);

function generateStreaks(cometContainer, colorMin, numStreaks) {
    let counter = 0; 
    let distance = 15; 
    let flipper = -1;
    let proportionToAnimate = 0.8;

    for(let i = 0; i < numStreaks; i++) {
        const streak = document.createElement('div'); 
        streak.classList.add('streak');
        
        streak.style.width = `${Math.random() * 10 + 15}%`;
        streak.style.height = `${Math.random() * (cometContainer.offsetHeight/2) + (cometContainer.offsetHeight/1.5)}%`; // 200, 200
        streak.style.transform = `rotate(${-(i + 3) * flipper}deg)`;
        streak.style.transformOrigin = "left center";

        const firstColor = Math.floor(Math.random() * 60) + colorMin
        streak.style.backgroundColor = `hsl(${firstColor}, 80%, 50%)`;

        cometContainer.appendChild(streak);
        switch (counter) {
            case 0: 
                streak.style.left = `${((cometContainer.offsetWidth/2) - (streak.offsetWidth/2)) + (distance * flipper)}px`;
                counter += 1;
                break;
            case 1: 
                streak.style.left = `${((cometContainer.offsetWidth/2) - (streak.offsetWidth/2)) + (distance * flipper)}px`;
                counter = 0;
                distance += (cometContainer.offsetWidth/2 + cometContainer.offsetWidth * 0.5) / numStreaks;
                break;
        }
        
        if (Math.random() < proportionToAnimate) {
            streak.style.transformOrigin = 'left center';

            streak.animate([
                { scale: '1 1' },
                { scale: '1 0.6' },
                { scale: '1 1' }
            ], {
                duration: Math.random() * 3000 + 2000,
                iterations: Infinity,
                easing: 'ease-in-out',
            });

            streak.animate([
                { opacity: 0.2 },
                { opacity: `${Math.random() * 0.3 + 0.5}` },
                { opacity: 0.2 }
            ], {
                duration: Math.random() * 4000 + 1000,
                iterations: Infinity, 
                easing: 'ease-in-out',
            });
        }
        

        flipper *= -1;
    }
}

const numBigBlueStreaks = 15;       // number of blue streaks to be created for big comet
const numBigYellowStreaks = 15;     // number of yellow streaks to be created for big comet
const numBigRedStreaks = 2;         // number of red streaks to be created for big comet
generateStreaks(bigCometContainer, 180, numBigBlueStreaks);
generateStreaks(bigCometContainer, 10, numBigYellowStreaks);
generateStreaks(bigCometContainer, 0, numBigRedStreaks);

const numSmallBlueStreaks = 20; 
const numSmallYellowStreaks = 8;
generateStreaks(smallCometContainer, 180, numSmallBlueStreaks);
generateStreaks(smallCometContainer, 20, numSmallYellowStreaks);

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
    object.style.position = 'absolute';
    object.style.left = `${xPos1 - (anchor1.offsetWidth / 2)}px`;
    object.style.top = `${yPos1 - (anchor1.offsetHeight / 2) - 5}px`;
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
const jobConnector = document.getElementById('job-connector');

// retrieving elements of each connecting line
const connector1 = document.getElementById('con1');
const connector2 = document.getElementById('con2');
const connector3 = document.getElementById('con3');
const connector4 = document.getElementById('con4');
const connector5 = document.getElementById('con5');

// adding connectors for every time the page first loads
window.addEventListener('load', () => {
    fixJobAnchors(jobConnector, nasa1, aila);
});
// updating connectors for every time the page's dimensions get resized
window.addEventListener('resize', () => {
    fixJobAnchors(jobConnector, nasa1, aila);
});


/* MAKING THE HOVER MECHANICS FOR THE JOB DESCRIPTIONS AND ICONS */
const jobs = document.querySelectorAll(".job")
jobs.forEach((job) => {     // loops through all elements with class 'job' and adds following event listeners
    const icon = job.querySelector(".job-icon");    // retrieves job icon from current job in loop
    const descriptions = job.querySelectorAll(".job-description-container");
    let hideTimeout;    // variable used to store time until job description fades out

    icon.addEventListener('mouseenter', () => {     // event listener for when icon is first hovered
        clearTimeout(hideTimeout);          // resets hideTimeout timer
        descriptions.forEach((description) => {
            description.style.opacity = "0.8";
        });
    });
    icon.addEventListener('mouseleave', () => {     // event listener for when cursor first leaves job icon
        hideTimeout = setTimeout(() => {    // starts hideTimeout timer which lasts 0.1s before fadeout begins
            descriptions.forEach((description) => {
                description.style.opacity = "0";
            });
        }, 100);
    });

    descriptions.forEach((description) => {
        description.addEventListener('mouseenter', () => {  // event listener for when description is first hovered
        clearTimeout(hideTimeout);          // resets hideTimeout timer
        });

        description.addEventListener('mouseleave', () => {  // event listener for when cursor first leaves description(s)
            description.parentElement.querySelectorAll('.job-description-container').forEach((descriptionAgain) => {
                descriptionAgain.style.opacity = "0";   // hides description
            });
        });
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
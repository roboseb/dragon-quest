import shortsville from "../images/shortsvilleblank.png";
import key from "../images/key.png";
import landscape from "../images/landscape.png";
import blankscroll from "../images/blankscroll.png";

import {useState, useEffect} from 'react';
import FoundItems from "./FoundItems";

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDS-E029FsBskE3NfT39CFstbq9yQHeczU",
    authDomain: "dragon-quest-68f66.firebaseapp.com",
    projectId: "dragon-quest-68f66",
    storageBucket: "dragon-quest-68f66.appspot.com",
    messagingSenderId: "17256418710",
    appId: "1:17256418710:web:34c074b05338123b19a1b7"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




const SearchImage = () => {

    const [bValue, setBValue] = useState(null);
    const [foundKeyContext, setFoundKeyContext] = useState(null);

    const [widthSet, setWidthSet] = useState(false);

    const [timer, setTimer] = useState([0, 0, 0]);
    const [timerDisplay, setTimerDisplay] = useState(['00', '00', '00']);
    const [counter, setCounter] = useState(0);

    const [highlightOpacity, setHighlightOpacity] = useState(60);
    const [magSize, setMagSize] = useState(200);

    const [foundAmount, setFoundAmount] = useState(0);
    const [lastTime, setLastTime] = useState(null);


    const [itemArray, setItemArray] = useState([
        'sprag',
        'dig',
        'pug',
        'book',
        'swords', 'swords', 'swords', 'swords',
        'axes', 'axes',
        'shields', 'shields',
        'milk', 'milk', 'found', 'milk', 'milk', 'milk', 'milk',
        'burgers', 'found', 'burgers', 'burgers', 'burgers', 'burgers', 'burgers', 'burgers', 'burgers',
        'tarts', 'tarts', 'found', 'tarts', 'tarts', 'tarts', 'tarts', 'tarts', 'tarts',
        'snails', 'snails', 'snails', 'snails', 'snails', 'snails', 'snails', 'snails', 'snails', 'snails',
        'cones', 'cones', 'cones', 'cones', 'cones', 'cones', 'cones',
        'buckets', 'found', 'buckets', 'buckets', 'buckets', 'buckets', 'buckets', 'buckets', 'buckets',
        'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges', 'judges',
        'yabs', 'yabs', 'yabs',
        'puppets', 'puppets', 'puppets', 'puppets', 'puppets', 'puppets',
        'gloves', 'gloves', 'gloves', 'gloves', 'gloves',
        'key'
    ]);

    const [items, setItems] = useState({
        sprag: {found: 0, total: 1},
        dig: {found: 0, total: 1},
        pug: {found: 0, total: 1},
        book: {found: 0, total: 1},
        swords: {found: 0, total: 4},
        axes: {found: 0, total: 2},
        shields: {found: 0, total: 2},
        milk: {found: 0, total: 6},
        burgers: {found: 0, total: 8},
        tarts: {found: 0, total: 8},
        snails: {found: 0, total: 10},
        cones: {found: 0, total: 7},
        buckets: {found: 0, total: 8},
        judges: {found: 0, total: 22},
        yabs: {found: 0, total: 3},
        puppets: {found: 0, total: 6},
        gloves: {found: 0, total: 5},
        key: {found: 0, total: 1}
    });


    function magnify(imgID, zoom) {
        let img, glass, w, h, bw;
        img = document.getElementById(imgID);

        /* Create magnifier glass: */
        glass = document.createElement("div");
        glass.innerText = '+';
        glass.setAttribute("class", "img-magnifier-glass");

        /* Insert magnifier glass: */
        img.parentElement.insertBefore(glass, img);

        /* Set background properties for the magnifier glass: */
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;

        /* Execute a function when someone moves the magnifier glass over the image: */
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);

        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);

        function moveMagnifier(e) {

            var pos, x, y;
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;

            //Check for an items at the mouse position.
            updateSquare(x, y);

            /* Prevent the magnifier glass from being positioned outside the image: */
            if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
            if (x < w / zoom) { x = w / zoom; }
            if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
            if (y < h / zoom) { y = h / zoom; }
            /* Set the position of the magnifier glass: */
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /* Display what the magnifier glass "sees": */

            let size = glass.offsetWidth;

            let extraSize = size - 206;

            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw - extraSize/2) + "px -" + ((y * zoom) - h + bw  - extraSize/2) + "px";

            
        }

        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /* Get the x and y positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }

    let mainKeyContext;

    //Update test panel with info from image key.
    const updateSquare = (posX, posY) => {

        //Set original and computed reference dimensions.
        const refC = document.getElementById("mycanvas");
        const refImg = document.getElementById('magnifiedimg');

        //Set factors to multiply X and Y positions by.
        const xFactor = refC.width/refImg.width;
        const yFactor = refC.height/refImg.height;

        //Scale X and Y positions to match original key.
        const newX = posX * xFactor;
        const newY = posY * yFactor;

        const {
            data
        } = mainKeyContext.getImageData(newX, newY, 1, 1);


        setBValue(Math.round(data[2] / 255 * 100));

        const testSquare = document.getElementById('testsquare');
        testSquare.style.backgroundColor = `rgba(${data[0]},${data[1]},${data[2]},${data[3]})`;
    }

    window.onload = function() {
        const c = document.getElementById("mycanvas");
        mainKeyContext = c.getContext("2d");
        
        const img = document.getElementById('key');
        c.width = img.width;
        c.height = img.height;

        mainKeyContext.drawImage(img, 0, 0, img.width, img.height);

        //Toggle magnifier visibility on right click.
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleMagnifier();
        });

        //Set container sizes to image width.
        setRefWidth();

        //Set up context for drawing individual keys.
        const canvas = document.getElementById('keybox');
        setFoundKeyContext(canvas.getContext("2d"));

        //Start the timer.
        timerCycle();

        async function firebaseTest()  {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    first: "Cum",
                    last: "Sock",
                    born: 1815
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                });
            } catch (e) {
                console.error(e);
            }
        }

        //firebaseTest();
    }

    //Check to update found items.
    const updateItems = () => {

        const tempB = bValue;
        setBValue(0);

        //Do nothing if not clicking on an item.
        if (tempB - 1 < 0 || tempB - 1 > 99) return;

        //If it has not yet been found, update items and itemArray.
        if (itemArray[tempB - 1] !== 'found') {

            //Show an alert if the key has been found.
            if (tempB === 100) {
                alert('You got the key! Congrats!');
            }
            

            //Add the highlighted key for the found item.
            addKey(tempB);
            
            //Animate all found items except for the key (100).
            if (tempB !== 100) {
                animateFoundItem(itemArray[tempB - 1]);
            }
            

            const tempItems = items;
            tempItems[itemArray[tempB - 1]].found += 1;

            setItems(tempItems);

            const tempArray = itemArray;
            tempArray[tempB - 1] = 'found';

            //Update various variables.
            setItemArray(tempArray);
            setFoundAmount(foundAmount => foundAmount + 1);

            setLastTime(timer);
            console.log(lastTime);
        }
    }

    const animateFoundItem = (item) => {
        const domItem = document.getElementById(`${item}count`);

        const set2 = ['snails', 'cones', 'buckets', 'judges', 'yabs', 'puppets', 'gloves'];
        let className;

        if (set2.includes(item)) {
            className = 'itemfound2';
        } else {
            className = 'itemfound1';
        }

        domItem.classList.remove('itemfound1', 'itemfound2');
        void domItem.offsetWidth;
        domItem.classList.add(className);    
    }

    //Set reference width based on image width for various containers;
    const setRefWidth = () => {
        const magImg = document.getElementById('magnifiedimg');

        const root = document.querySelector(':root');
        root.style.setProperty('--imgwidth', magImg.width + 'px');
    }


    //Add singular found item key to show clicked items. 
    const addKey = (index) => {

        const c = document.getElementById("keybox");
        
        const img = new Image();
        img.src = require(`../images/keypieces/newkeys/${index}.png`);


        img.onload = () => {

            //Set canvas width based on image width if not yet set.
            if (widthSet === false) {
                c.width = img.width;
                c.height = img.height;

                setWidthSet(true);
            }

            //Add the key to the displayed canvas.
            foundKeyContext.drawImage(img, 0, 0, img.width, img.height);
        }
    }

    //Toggle elements of the landscape/menu button.
    const toggleLsFocus = () => {
        const lsImage = document.getElementById('lsimg');
        lsImage.classList.toggle('focused');

        const lsText = document.getElementById('lstext');
        lsText.classList.toggle('focused');
    }

    //Toggle visibility of the menu.
    const toggleMenu = () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('visible');
    }

    //Run the timer.
    const timerCycle = () => {

        let tempTimer = timer;
        tempTimer[2] += 1;

        //Condense sets of 60 seconds or minutes into minutes or hours.
        if (tempTimer[2] >= 60) {
            tempTimer[2] = 0;
            tempTimer[1] += 1;
        }

        if (tempTimer[1] >= 60) {
            tempTimer[1] = 0;
            tempTimer[0] += 1;
        }

        setTimer(tempTimer);

        let tempTimerDisplay = timerDisplay;

        //Add leading zero to single digit time counts.
        if (tempTimer[2] < 10 || tempTimer[2] === 0) {
            tempTimerDisplay[2] = '0' + tempTimer[2];
        } else {
            tempTimerDisplay[2] = tempTimer[2];
        }

        if (tempTimer[1] < 10 || tempTimer[1] === 0) {
            tempTimerDisplay[1] = '0' + tempTimer[1];
        } else {
            tempTimerDisplay[1] = tempTimer[1];
        }

        if (tempTimer[0] < 10 || tempTimer[0] === 0) {
            tempTimerDisplay[0] = '0' + tempTimer[0];
        } else {
            tempTimerDisplay[0] = tempTimer[0];
        }

        setTimerDisplay(tempTimerDisplay);

        //Force update on timer element.
        setCounter(counter => counter + 1);

        setTimeout(timerCycle, 1000);
    }

    const toggleHighlight = () => {
        const highlight = document.getElementById('keybox');
        highlight.classList.toggle('hidden');
    }

    //Increase opacity on clicked item highlights.
    const increaseHighlight = () => {
        let tempOpacity = highlightOpacity;
        tempOpacity += 10;

        //Clamp opacity to be between 0 an 100;
        if (tempOpacity < 0) tempOpacity = 0;
        if (tempOpacity > 100) tempOpacity = 100;

        const root = document.querySelector(':root');
        root.style.setProperty('--highlight-opacity', tempOpacity + '%');

        setHighlightOpacity(tempOpacity);
    }

    //Decrease opaity on clicked item highlights.
    const decreaseHighlight = () => {
        let tempOpacity = highlightOpacity;
        tempOpacity -= 10;

        const root = document.querySelector(':root');
        root.style.setProperty('--highlight-opacity', tempOpacity + '%');

        setHighlightOpacity(tempOpacity);
    }

    //Toggle magnifiying glass on or off.
    const toggleMagnifier = () => {
        const magnifier = document.querySelector('.img-magnifier-glass');
        magnifier.classList.toggle('hiddenmagnifier');
    }

    //Set magnifying glass shape to circle.
    const setMagToCircle = () => {
        const glass = document.querySelector('.img-magnifier-glass');
        glass.style.borderRadius = null;
    }

    //Set magnifying glass shape to square.
    const setMagToSquare = () => {
        const glass = document.querySelector('.img-magnifier-glass');
        glass.style.borderRadius = '0%';
    }

    //Increase size of the magnifying glass.
    const increaseMagSize = () => {
        let tempSize = magSize;
        tempSize += 50;

        //Limit magnifier size to 1000px;
        if (tempSize > 1000) {
            tempSize = 1000;
        }

        const root = document.querySelector(':root');
        root.style.setProperty('--magsize', tempSize + 'px');

        setMagSize(tempSize);
    }

    //Decrease size of the magnifying glass.
    const decreaseMagSize = () => {
        let tempSize = magSize;
        tempSize -= 50;

        //Ensure magnifier is at least 200px;
        if (tempSize < 200) {
            tempSize = 200;
        }

        const root = document.querySelector(':root');
        root.style.setProperty('--magsize', tempSize + 'px');

        setMagSize(tempSize);
    }

    const toggleUnderline = (e) => {
        e.target.classList.toggle('underlined');
    }

    //Create an alert for the player if they've found everything.
    useEffect(() => {
        if (foundAmount > 950      ) {
            alert('Congrats! You found everything, and I recommend you upload your score to the leaderboard!');
        }
    }, [foundAmount]);

    return (
        <div id='searchimgbox'>
            <canvas id='keybox'></canvas>

            <div id="magnifiedimgbox" onClick={updateItems}>
                
                <img 
                    id="magnifiedimg"
                    src={shortsville} 
                    alt=""
                    onLoad={() => magnify('magnifiedimg', 3)}    
                ></img>
                <canvas id='mycanvas'></canvas>
            </div>
            <img id='key' src={key} alt=""></img>

            <div id='testsquare'>
                Test Square
                <div>{bValue}</div>    
            </div>

            <FoundItems
                items={items}
            />


            <div id='menu'>
                <img id="blankscroll" src={blankscroll} alt=""></img>


                <div id="description">
                    This image is from a book called "Dragon Quest"
                    that I read as a kid. It's vastly more compelling
                    than Where's Waldo or any similar books, and so I
                    chose to convert it into this digital form. Below
                    are several options to enhance your experience.
                </div>

                <div id='timebox'>
                    <div id='score'>{foundAmount}/100</div>
                    <div id='currenttime'>{}{timerDisplay[0]}:{timerDisplay[1]}:{timerDisplay[2]}</div>
                    <button id='leaderboardsbtn'>{">:"}Open Leaderboard{":<"}</button>
                </div>

                <div id='clickedbox'>
                    <div id='clickedonoff'>
                        Highlight Found 
                        <div>
                            <div 
                                id='highlighttoggle'
                                className='option'
                                onClick={toggleHighlight}
                                onMouseEnter={toggleUnderline}
                                onMouseLeave={toggleUnderline}
                            >Toggle</div>
                        </div>

                    </div>
                    <div id='clickedopacity'>
                        Found Opacity
                        <div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={decreaseHighlight}> Down</div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline}  className='option' onClick={increaseHighlight}> Up</div>
                        </div>

                    </div>
                </div>

                <div id='magbox'>
                    <div id='magonoff'>
                        Magnifier
                        <div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={toggleMagnifier}>Toggle (right click)</div>
                        </div>
                        </div>
                        
                    <div id='magshape'>
                        Magnifier Shape
                        <div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={setMagToCircle}> Circle</div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={setMagToSquare}> Square</div>
                        </div>
                    </div>
                    <div id='magsize'>
                        Magnifier Size
                        <div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={decreaseMagSize}> Down</div>
                            <div onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} className='option' onClick={increaseMagSize}> Up</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                id='landscape'
                onMouseEnter={toggleLsFocus}
                onMouseLeave={toggleLsFocus}
                onClick={toggleMenu}
            >
                <img id="lsimg" src={landscape} alt=""></img>
                <div id="lstext">
                    <div>Show UI</div>
                </div>
            </div>
            
            <div id='leaderboard'>
                <h1>Leaderboards {lastTime}</h1>
                <button id='submitscorebtn'>Submit Score</button>
            </div>

        </div>
    )
}

export default SearchImage;
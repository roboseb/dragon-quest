import shortsville from "../images/shortsvilleblank.png";
import key from "../images/key.png";

import {useState, useEffect} from 'react';
import FoundItems from "./FoundItems";

const SearchImage = () => {

    const [bValue, setBValue] = useState(null);

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
            /* Prevent the magnifier glass from being positioned outside the image: */
            if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
            if (x < w / zoom) { x = w / zoom; }
            if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
            if (y < h / zoom) { y = h / zoom; }
            /* Set the position of the magnifier glass: */
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /* Display what the magnifier glass "sees": */
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

            updateSquare(x, y);
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

    let ctx;

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
        } = ctx.getImageData(newX, newY, 1, 1);


        setBValue(Math.round(data[2] / 255 * 100));

        const testSquare = document.getElementById('testsquare');
        testSquare.style.backgroundColor = `rgba(${data[0]},${data[1]},${data[2]},${data[3]})`;
    }

    window.onload = function() {
        const c = document.getElementById("mycanvas");
        ctx = c.getContext("2d");
        
        const img = document.getElementById('key');
        c.width = img.width;
        c.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        //Toggle magnifier visibility on right click.
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const magnifier = document.querySelector('.img-magnifier-glass');
            magnifier.classList.toggle('hiddenmagnifier');
        });
        //Set container sizes to image width.
        setRefWidth();
    }

    //Check to update found items.
    const updateItems = () => {


        //Do nothing if not clicking on an item.
        if (bValue - 1 < 0 || bValue - 1 > 99) return;


        //If it has not yet been found, update items and itemArray.
        if (itemArray[bValue - 1] !== 'found') {
            
            animateFoundItem(itemArray[bValue - 1]);

            const tempItems = items;
            tempItems[itemArray[bValue - 1]].found += 1;

            setItems(tempItems);

            const tempArray = itemArray;
            tempArray[bValue - 1] = 'found';

            setItemArray(tempArray);
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

        console.log(className);

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

    return (
        <div id='searchimgbox'>

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
            
            
            

        </div>
    )
}

export default SearchImage;
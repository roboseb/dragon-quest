import shortsville from "../images/shortsville.png";

const SearchImage = () => {

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
            // /* Prevent the magnifier glass from being positioned outside the image: */
            // if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
            // if (x < w / zoom) { x = w / zoom; }
            // if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
            // if (y < h / zoom) { y = h / zoom; }
            // /* Set the position of the magnifier glass: */
            // glass.style.left = (x - w) + "px";
            // glass.style.top = (y - h) + "px";
            // /* Display what the magnifier glass "sees": */
            // glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

            updateSquare(x, y)
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


    const updateSquare = (posX, posY) => {
        const {
            data
        } = ctx.getImageData(posX, posY, 1, 1);
        // console.log(data)
        console.log(posX, posY);
        // console.log(myImg.Height);

        const testSquare = document.getElementById('testsquare');
        testSquare.style.backgroundColor = `rgba(${data[0]},${data[1]},${data[2]},${data[3]})`;
    }

    window.onload = function() {
        const c = document.getElementById("mycanvas");
        ctx = c.getContext("2d");
 
        const img = document.getElementById('magnifiedimg');
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);
    }

    



    return (
        <div id='searchimgbox'>
            
            <img id='searchimg' src={shortsville} alt="how are you doing an image hunt if you can't see?"></img>

            <div id="magnifiedimgbox">
                <img 
                    id="magnifiedimg"
                    src={shortsville} 
                    alt=""
                    onLoad={() => magnify('magnifiedimg', 3)}    
                ></img>
            </div>

            <div id='testsquare'>Test Square</div>
            <canvas id='mycanvas'></canvas>
            
            

        </div>
    )
}

export default SearchImage;
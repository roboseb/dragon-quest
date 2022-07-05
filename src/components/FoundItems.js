import snails from "../images/snails.png";
import cones from "../images/cones.png";
import buckets from "../images/buckets.png";
import judges from "../images/judges.png";
import yabs from "../images/yabs.png";
import puppets from "../images/puppets.png";
import gloves from "../images/gloves.png";

import sprag from "../images/sprag.png";
import dig from "../images/dig.png";
import pug from "../images/pug.png";
import book from "../images/book.png";

import shield from "../images/shield.png";
import sword from "../images/sword.png";
import axe from "../images/axe.png";
import milk from "../images/milk.png";
import tart from "../images/tart.png";
import burger from "../images/burger.png";


const FoundItems = (props) => {
    
    //Show and item's count.
    const showText = (e) => {
        const div = e.target.parentElement.querySelector('div');
        div.classList.toggle('countsvisible');
    }

    //Hide an item's count.
    const hideText = (e) => {
        const div = e.target.parentElement.querySelector('div');
        div.classList.toggle('countsvisible');
    }

    return (
        <div id='founditemsbox'>
            <div 
                id='snailscount'
                className='countbox'
            >
                <img src={snails} alt=""></img>
                <div>{props.items.snails.total - props.items.snails.found} snails</div>
            </div>

            <div 
                id='conescount'
                className='countbox'
            >
                <img src={cones} alt=""></img>
                <div>{props.items.cones.total - props.items.cones.found} ice cream cones</div>
            </div>

            <div
                id='bucketscount'
                className='countbox'
            >
                <img src={buckets} alt=""></img>
                <div>{props.items.buckets.total - props.items.buckets.found} buckets</div>
            </div>

            <div
                id='judgescount'
                className='countbox'
            >
                <img src={judges} alt=""></img>
                <div>{props.items.judges.total - props.items.judges.found} judges</div>
            </div>

            <div 
                id='yabscount'
                className='countbox'
            >
                <img src={yabs} alt=""></img>
                <div>{props.items.yabs.total - props.items.yabs.found} yabs</div>
            </div>

            <div 
                id='puppetscount'
                className='countbox'
            >
                <img src={puppets} alt=""></img>
                <div>{props.items.puppets.total - props.items.puppets.found} puppets</div>
            </div>

            <div 
                id='glovescount'
                className='countbox'
            >
                <img src={gloves} alt=""></img>
                <div>{props.items.gloves.total - props.items.gloves.found} boxing gloves</div>
            </div>

            <div
                id='spragcount'
                className='scrollcount' 
            >
                <img src={sprag} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.sprag.total - props.items.sprag.found}</div>
            </div>

            <div
                id='digcount'
                className='scrollcount' 
            >
                <img src={dig} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.dig.total - props.items.dig.found}</div>
            </div>

            <div
                id='pugcount'
                className='scrollcount' 
            >
                <img src={pug} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.pug.total - props.items.pug.found}</div>
            </div>

            <div
                id='bookcount'
                className='scrollcount' 
            >
                <img src={book} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.book.total - props.items.book.found}</div>
            </div>

            <div
                id='shieldscount'
                className='scrollcount' 
            >
                <img src={shield} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.shields.total - props.items.shields.found}</div>
            </div>

            <div
                id='swordscount'
                className='scrollcount' 
            >
                <img src={sword} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.swords.total - props.items.swords.found}</div>
            </div>

            <div
                id='axescount'
                className='scrollcount' 
            >
                <img src={axe} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.axes.total - props.items.axes.found}</div>
            </div>

            <div
                id='milkcount'
                className='scrollcount' 
            >
                <img src={milk} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.milk.total - props.items.milk.found}</div>
            </div>

            <div
                id='tartscount'
                className='scrollcount' 
            >
                <img src={tart} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.tarts.total - props.items.tarts.found}</div>
            </div>

            <div
                id='burgerscount'
                className='scrollcount' 
            >
                <img src={burger} alt="" onMouseEnter={(e) => showText(e)} onMouseLeave={(e) => {hideText(e)}}></img>
                <div>{props.items.burgers.total - props.items.burgers.found}</div>
            </div>
        </div>
    )
}   

export default FoundItems;
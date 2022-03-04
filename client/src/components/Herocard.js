import React from 'react';
import './Header.css';
import ggl from '../Assets/ggl.png';
import fb from '../Assets/fb.png';
import amzn from '../Assets/amzn.png';

function Herocard() {
    return (
        <div className='hero_cont'>
            <div className='hcard'>
                <div className='df'>
                <span className='pt36'>GOOGL</span>
                <img className='mhw55' src={ggl} alt='oops!'/>
                </div>
                <div className='usd'>1515 USD</div>
            </div>
            <div className='hcard'>
                <div className='df'>
                <span className='pt36'>FB</span>
                <img className='mhw55' src={fb} alt='oops!'/>
                </div>
                <div className='usd'>266 USD</div>
            </div>
            <div className='hcard'>
               <div className='df'>
               <span className='pt36'>AMZN</span>
                <img className='mhw55' src={amzn} alt='oops!'/>
               </div>
               <div className='usd'>3116 USD</div>
            </div>
        </div>
    )
}

export default Herocard
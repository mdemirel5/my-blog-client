import React, {useState} from 'react';
import img1 from '../1.jpg';

const Personal = () => {
    const [visibility, setVisibility] = useState('visible');
    console.log(visibility);
    return(
        <div className="ui style accordion">
            <h2 style={{cursor: 'pointer'}}
            onClick={() => {visibility === 'visible' ? setVisibility('hidden'): setVisibility('visible')}}>Img1</h2>
            <img src={img1}
             style={{width: '40%', visibility: visibility}} />
        </div>
        
    );
};

export default Personal;
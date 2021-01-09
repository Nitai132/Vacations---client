import React from 'react';

const headLineStyle = {
    fontFamily:'Berkshire Swash',
        cursive: '',
        display: 'block',
        color: 'black',
        fontSize: '40px',
        bottom: '340px',
        position: 'relative',
        justifContent: 'center',
        textAlign: 'center'
}

export default function MainImage() {
    return (
        <div style={{height: '450px'}}>
            <img 
            src= "https://www.rd.com/wp-content/uploads/2020/01/GettyImages-1131335393-e1580493890249-scaled.jpg"
            height="450px"
            width="100%"
            />
            <h3 
            style={headLineStyle}
                >Nitai Vacations
            </h3>
        </div>
    )
};
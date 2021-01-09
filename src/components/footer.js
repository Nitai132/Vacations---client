import React from 'react';
import Typography from '@material-ui/core/Typography';

const FooterStyle = {
    backgroundColor: 'lightGrey', 
    width: '100%', 
    position: 'fixed',
    bottom: '0', 
    height: '30px',
    opacity: '0.8'

}


export default function Footer() {
    return (
      <div style={FooterStyle}>
        <Typography variant="body2" align="center" style={{paddingTop: '5px',}} >
            Copyright © Nitai Vacations 2020 (John Bryce)
        </Typography>
      </div>
    );
  }
  
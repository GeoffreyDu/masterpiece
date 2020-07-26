import React from 'react';

const footerStyle = {
    position: 'absolute',
    top: '95vh',
    textAlign: 'center',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.8em',
    color: '#B3B3B3'
}

const Footer = ()=> <div><p style={footerStyle}>Copyright 2019 - {new Date().getFullYear()} - All rights reserved</p></div>
    


export default Footer
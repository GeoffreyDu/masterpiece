import React from 'react';

const trans = 'translate(-50%)';

const footerStyle = {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: trans,
    fontSize: '0.8em',
    color: '#B3B3B3'
}

const Footer = ()=> <div><p style={footerStyle}>Copyright 2019 - {new Date().getFullYear()} - All rights reserved</p></div>
    


export default Footer
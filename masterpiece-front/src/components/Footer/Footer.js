import React from 'react';

const footerStyle = {
    textAlign: 'center',
}

const Footer = ()=> <div><p style={footerStyle}>Copyright (2019 - {(new Date().getFullYear())}) - All rights reserved</p></div>
    


export default Footer
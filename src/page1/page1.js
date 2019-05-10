import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Page1 extends Component {
    render() {
        return (<><h1>Página 1</h1>
        <nav> <Link to="/" >Ir al home</Link></nav>
        </>)
    }
}

export default Page1;
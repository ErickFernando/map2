import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <>
                <h1>Home</h1>
                <nav>
                    <div>
                        <Link to="/page1" >Página 1</Link>
                    </div>
                    <div>
                        <Link to="/page2" >Página 2</Link></div>
                </nav>
            </>);
    }
}

export default Home;
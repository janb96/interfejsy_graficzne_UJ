import React, {Component} from 'react';
import axios from 'axios';

class V10_simple extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

        
    }

    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <h1 className="display-1">REKLAMA</h1>
                </div>
                <div id="dol50">
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">OPERACJA W TRAKCIE</h1>
                    <h1 className="display-1">Proszę czekać</h1>
                </div>
            </div>
        );
    }
}

export default V10_simple;

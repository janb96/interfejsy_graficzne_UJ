import React, {Component} from 'react';
import axios from 'axios';

class V12_simple extends Component {

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
                <div className="container text-center">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">Zmiana PIN</h1>
                    <h1 className="display-1">Numer PIN został zmieniony</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">Zatwierdź</h1></button>
                </div>
            </div>
        );
    }
}

export default V12_simple;

import React, {Component} from 'react';
import axios from 'axios';

class V12 extends Component {

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
                    <div className="container">
                        <br/>
                        <br/>
                        <h1 className="display-1">Zmiana PIN</h1>
                        <h1>Numer PIN został zmieniony</h1>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default V12;

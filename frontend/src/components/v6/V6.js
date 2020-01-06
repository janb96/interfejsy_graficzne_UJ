import React, {Component} from 'react';
import axios from 'axios';

class V6 extends Component {

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
                    <h1 className="display-1">Saldo</h1>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input placeholder="Saldo konta" type="text" maxlength="4" id="saldo" disabled></input>
                            </div>
                        </div>
                        <div className="col-4">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1>Powrót</h1></button>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V6;

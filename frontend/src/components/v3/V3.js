import React, {Component} from 'react';
import axios from 'axios';

class V3 extends Component {

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
                <div id="reklama25">
                    <h1 className="display-1">REKLAMA</h1>
                </div>
                <div id="dol75">
                    <div className="container">
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">LEPSZA CZYTELNOŚĆ</h1></button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Aktywacja karty</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Wypłata</h1></button>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Zmiana PIN</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Saldo</h1></button>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1>Zakończ</h1></button>
                            </div>
                            <div className="col-6">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default V3;

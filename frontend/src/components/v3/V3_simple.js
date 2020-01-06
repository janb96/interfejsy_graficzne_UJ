import React, {Component} from 'react';
import axios from 'axios';

class V3_simple extends Component {

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
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Widok standardowy</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-1">Zakończ transakcje</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Aktywacja karty</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Wypłata środków <i class="fas fa-money-bill"></i></h1></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Zmiana kodu PIN</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Saldo konta <i class="fas fa-chart-line"></i></h1></button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default V3_simple;

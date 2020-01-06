import React, {Component} from 'react';

class V11_simple extends Component {

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
                    <br/>
                    <h1 className="display-1">TRANSAKCJA ZREALIZOWANA</h1>
                    <br/>
                    <br/>
                    <h3 className="display-3">Wyjmij kartę i pobierz gotówkę</h3>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V11_simple;

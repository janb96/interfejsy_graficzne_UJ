import React, {Component} from 'react';

class V11 extends Component {

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
                    <h2 className="display-2">TRANSAKCJA ZREALIZOWANA</h2>
                    <br/>
                    <h4 className="display-4">Wyjmij kartę i pobierz gotówkę</h4>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V11;

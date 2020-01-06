import React, {Component} from 'react';

class V8 extends Component {

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
                    <h1 className="display-1">WYPŁATA</h1>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <input type="number" min="0.01" step="0.01" max="100000" placeholder="Podaj kwotę" />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1>Anuluj</h1></button>
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

export default V8;

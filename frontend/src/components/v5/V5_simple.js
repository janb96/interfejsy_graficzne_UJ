import React, {Component} from 'react';

class V5_simple extends Component {

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
                    <h1 className="display-1">Zmiana PIN</h1>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">Nowy PIN</h1>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input placeholder="Kod PIN" type="password" maxLength="4" id="pwd"></input>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h1 className="display-1">Powtórz PIN</h1>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input placeholder="Powtórz kod PIN" type="repeat-password" maxLength="4" id="pwd"></input>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-3">Anuluj</h1></button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-3">Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V5_simple;

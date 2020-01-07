import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";

class V5 extends Component {

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
                    <h1 className="display-1">Zmiana PIN</h1>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Nowy PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input placeholder="Kod PIN" type="password" maxLength="4" id="pwd"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Powtórz PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input placeholder="Powtórz kod PIN" type="password" maxLength="4" id="pwd"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.props.history.goBack}><h1>Anuluj</h1></button>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <Link to={'/v12'}><button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(V5);

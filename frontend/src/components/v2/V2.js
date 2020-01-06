import React, {Component} from 'react';
import axios from 'axios';

class V2 extends Component {

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
                    <h1 className="display-1">Wprowadź kod PIN</h1>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input placeholder="Kod PIN" type="password" maxlength="4" id="pwd"></input>
                            </div>
                        </div>
                        <div className="col-4">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                            <button type="button" className="btn btn-danger btn-lg btn-block">Cofnij</button>
                        </div>
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-success btn-lg btn-block">Zatwierdź</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V2;
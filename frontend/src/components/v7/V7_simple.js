import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class V7 extends Component {

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
                <div className="container text-center">
                    <br/>
                    <h1 className="display-1">Wypłata środków</h1>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <Link to={'/v10-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">50 zł</h1></button></Link>
                        </div>
                        <div className="col-6">
                            <Link to={'/v10-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">100 zł</h1></button></Link>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <Link to={'/v10-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">200 zł</h1></button></Link>
                        </div>
                        <div className="col-6">
                            <Link to={'/v10-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">500 zł</h1></button></Link>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <Link to={'/v3-simple'}><button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-1">Anuluj</h1></button></Link>
                        </div>
                        <div className="col-6">
                            <Link to={'/v8'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Inna kwota</h1></button></Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default V7;

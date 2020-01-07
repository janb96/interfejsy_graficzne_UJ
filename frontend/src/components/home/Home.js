import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Home extends Component {

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
                <div id="reklama75">
                    <h1 className="display-1">REKLAMA</h1>
                </div>
                <div id="dol25">
                    <h1 className="display-1">Wprowadź kartę</h1>
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-6">
                            <Link to={'/v2'}>
                                <button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Language</h1></button>
                            </Link>
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

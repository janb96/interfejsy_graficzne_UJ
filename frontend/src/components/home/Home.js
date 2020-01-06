import React, {Component} from 'react';
import axios from 'axios';

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
                    <br/>
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-warning btn-lg btn-block">Language</button>
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

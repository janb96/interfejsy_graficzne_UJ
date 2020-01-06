import React, {Component} from 'react';

class V9_simple extends Component {

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
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">POTWIERDZENIE</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-1">NIE</h1></button>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">TAK</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V9_simple;

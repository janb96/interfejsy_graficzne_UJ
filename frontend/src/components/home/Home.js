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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        1 it works
                    </div>
                    <div className="col-4">
                        2 it works
                    </div>
                    <div className="col-4">
                        3 it works
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

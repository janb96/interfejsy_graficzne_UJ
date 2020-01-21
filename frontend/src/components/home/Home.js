import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            url:""
        };
    }

    async componentDidMount() {

        let imgResponse = await axios.get("http://localhost:4000/advert");
        let addUrl = imgResponse.data.payload.link;
        this.setState({url: addUrl});
        
    }

    render() {
        return (
            <div id="root">
                <div id="reklama75">
                    <img src={this.state.url}></img>
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

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

class V8 extends Component {

    constructor() {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: ""
        };
    }

    async componentDidMount() {
        let token = this.state.token;
        console.log(token);
        let imgResponse = await axios.get(
            "http://localhost:4000/advert/personalized", 
            {
                withCredentials: true,
                headers: {
                    'x-access-token': token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        let addUrl = imgResponse.data.payload.link;
        this.setState({url: addUrl});

    }

    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <h1 className="display-1">WYPŁATA</h1>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <input type="number" min="0.01" step="0.01" max="100000" placeholder="Podaj kwotę" /> PLN
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <Link to={'/v3'}><button type="button" className="btn btn-danger btn-lg btn-block"><h1>Anuluj</h1></button></Link>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <Link to={'/v10'}><button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V8;

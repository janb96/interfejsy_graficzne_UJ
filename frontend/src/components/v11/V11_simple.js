import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

class V11_simple extends Component {

    constructor() {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: ""
        };
        window.sessionStorage.removeItem("token");

    }

    async componentDidMount() {
        let token = this.state.token;
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
                <div id="reklama25">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol75">
                    <br/>
                    <h1 className="display-1">TRANSAKCJA ZREALIZOWANA</h1>
                    <br/>
                    <br/>
                    <h3 className="display-3">Wyjmij kartę i pobierz gotówkę</h3>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Link to={'/'}><button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">Zatwierdź</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V11_simple;

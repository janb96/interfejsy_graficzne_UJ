import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

class V11 extends Component {

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
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <br/>
                    <h2 className="display-2">TRANSAKCJA ZREALIZOWANA</h2>
                    <br/>
                    <h4 className="display-4">Wyjmij kartę i pobierz gotówkę</h4>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <Link to={'/'}><button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V11;

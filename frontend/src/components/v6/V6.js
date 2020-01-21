import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from "react-router-dom";

class V6 extends Component {

    constructor() {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: "",
            payload: ""
        };
    }

    async componentDidMount() {
        let token = this.state.token;
        let imgResponse = await axios.get(
            "http://localhost:4000/advert/personalized",
            {
                withCredentials: true,
                headers: {
                    'x-access-token': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        let addUrl = imgResponse.data.payload.link;
        this.setState({url: addUrl});

        let cardId = window.sessionStorage.getItem("cardId");

        let balance = await axios.get(
            "http://localhost:4000/client/balance",
            {
                withCredentials: true,
                headers: {
                    'x-access-token': token,
                    'cardId': cardId,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        if(balance.status ==200)
        {
            this.setState({"payload": balance.data.payload + " pln"});
        }



        console.log(balance);
    }

    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <br/>
                    <h1 className="display-1">Saldo</h1>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input placeholder="Saldo konta" type="text" id="saldo" value={this.state.payload} disabled></input>
                            </div>
                        </div>
                        <div className="col-4">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.props.history.goBack}><h1>Powrót</h1></button>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(V6);

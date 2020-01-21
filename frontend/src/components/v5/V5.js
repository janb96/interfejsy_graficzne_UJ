import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";

class V5 extends Component {

    constructor(props) {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: ""
        };
        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }
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
                    <h1 className="display-1">Zmiana PIN</h1>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Nowy PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input placeholder="Kod PIN" type="password" maxLength="4" id="pwd"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Powtórz PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input placeholder="Powtórz kod PIN" type="password" maxLength="4" id="pwd"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.props.history.goBack}><h1>Anuluj</h1></button>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <Link to={'/v12'}><button type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(V5);

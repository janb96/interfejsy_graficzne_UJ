import React, {Component} from 'react';
import axios from 'axios/index';
import {Link} from "react-router-dom";
import swal from 'sweetalert';

class V15 extends Component {


    constructor(props) {
        super();
        this.state = {
            err: props.location.state.errMsg,
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
                    <div className="container">
                        <br/>
                        <br/>
                        <h1 className="display-1">Aktywacja karty</h1>
                        <h1>{this.state.err}</h1>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                            </div>
                            <div className="col-6">
                                <Link to={'/v3'}><button type="button" className="btn btn-success btn-lg btn-block"><h1>Wróc</h1></button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default V15;

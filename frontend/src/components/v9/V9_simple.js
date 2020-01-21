import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";

class V9_simple extends Component {

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
                <div id="reklama25">
                    <img src={this.state.url}></img>
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
                                <Link to={'/v3-simple'}><button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-1">NIE</h1></button></Link>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <Link to={'/v3-simple'}><button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">TAK</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V9_simple;

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from 'sweetalert';

class V3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: ""
        };

        this.unlog = this.unlog.bind(this);
        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }
    }

    async componentDidMount() {
        let token = this.state.token;
        console.log(this.state.token);
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

        try {
            let addUrl = imgResponse.data.payload.link;
            this.setState({url: addUrl});
        } catch (err){
            console.log(err);
        }
    }

    unlog()
    {
        window.sessionStorage.removeItem("token");
        this.props.history.push('/');

    }

    render() {
        return (
            <div id="root">
                <div id="reklama25">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol75">
                    <div className="container">
                        <br/>
                        <br/>
                        <Link to={'/v3-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">LEPSZA CZYTELNOŚĆ</h1></button></Link>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <Link to={'/v4'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Aktywacja karty</h1></button></Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/v7'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Wypłata</h1></button></Link>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <Link to={'/v5'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Zmiana PIN</h1></button></Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/v6'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1>Saldo</h1></button></Link>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-6">
                                <button onClick={this.unlog} type="button" className="btn btn-danger btn-lg btn-block"><h1>Zakończ</h1></button>
                            </div>
                            <div className="col-6">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default V3;
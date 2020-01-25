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
            url: "",
            pinCode: "",
            pinCode2: ""
        };
        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }

        this.handlePinChange = this.handlePinChange.bind(this);
        this.handlePin2Change = this.handlePin2Change.bind(this);

        this.patchData = this.patchData.bind(this);
    }

    handlePinChange(event){
        this.setState({pinCode: event.target.value});
    }

    handlePin2Change(event){
        this.setState({pinCode2: event.target.value});
    }

    async patchData(){

        let token = this.state.token;
        console.log(token);
        
        if( this.state.pinCode != this.state.pinCode2 ) {
            swal("Podane kody pin nie są takie same");
        } else {

            axios.defaults.headers.post['x-access-token'] = token;
            axios.defaults.headers.post['Accept'] = "application/json";
            axios.defaults.headers.post['Content-Type'] = "application/json";
            axios.defaults.withCredentials = true;

            let response = await axios.post(
                "http://localhost:4000/client/card/pin", 
                {
                    newPinCode: this.state.pinCode
                }
            ).then(r=>{
                    this.props.history.push('/v12');
                }
            ).catch(r=>{
                if(r.response != undefined) {
                    let promise = swal(r.response.data.payload);
                }
            });
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

        console.log(this.state.pinCode);
        console.log(this.state.pinCode2);

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
                                    <input placeholder="Kod PIN" onChange={this.handlePinChange} type="password" maxLength="4" id="pwd"></input>
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
                                    <input placeholder="Powtórz kod PIN" onChange={this.handlePin2Change} type="password" maxLength="4" id="pwd"></input>
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
                                <button type="button" onClick={this.patchData} className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(V5);

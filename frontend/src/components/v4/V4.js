import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

class V4 extends Component {

    constructor(props) {
        super();

        this.handleChangePin1 = this.handleChangePin1.bind(this);
        this.handleChangePin2 = this.handleChangePin2.bind(this);

        this.activateCard = this.activateCard.bind(this);


        this.state = {
            pinCode1: "",
            pinCode2: "",
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

    async activateCard()
    {
        //let pinCode1 = this.state.pinCode1;
        //let pinCode2 = this.state.pinCode2;

        let token = this.state.token;
        console.log(token);

        if( this.state.pinCode1 != this.state.pinCode2 ) {
            swal("Podane kody pin nie są takie same");
        } else {

            axios.defaults.headers.post['x-access-token'] = token;
            axios.defaults.headers.post['Accept'] = "application/json";
            axios.defaults.headers.post['Content-Type'] = "application/json";
            axios.defaults.withCredentials = true;

            let response = await axios.post(
                "http://localhost:4000/client/card/activate",
                {
                    newPinCode: this.state.pinCode1
                }
            ).then(r=>{
                    this.props.history.push('/v14');
                }
            ).catch(r=>{
                if(r.response != undefined) {
                    this.props.history.push({
                        pathname:"/v15",
                        state:{
                            errMsg: r.response.data.payload
                        }
                    });
                }
            });
        }
    }

    handleChangePin1(event){
        this.setState({pinCode1: event.target.value});
    }
    handleChangePin2(event){
        this.setState({pinCode2: event.target.value});
    }

    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <h1 className="display-1">Aktywacja karty</h1>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Nowy PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input onChange={this.handleChangePin1} placeholder="Kod PIN" type="password" maxLength="4" id="pwd"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h4 className="display-4">Powtórz PIN</h4>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input onChange={this.handleChangePin2} placeholder="Powtórz kod PIN" type="password" maxLength="4" id="pwd"></input>
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
                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.activateCard}><h1>Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(V4);

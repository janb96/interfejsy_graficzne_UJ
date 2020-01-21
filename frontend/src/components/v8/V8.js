import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";

class V8 extends Component {

    constructor(props) {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: "",
            price: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.payout = this.payout.bind(this);

        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }
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

    handleChange(event){
        this.setState({price: event.target.value});
    }

    payout()
    {
        const data = {
            amount: this.state.price
        };
        let token = window.sessionStorage.getItem("token");
        let cardId = window.sessionStorage.getItem("cardId");

        console.log(token);
        console.log(cardId);


        fetch('http://localhost:4000/atm/withdraw', {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'cardId': cardId,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(r=>r.json())
            .then(r=> {
                if(r.payload == true)
                {
                    //swal("Transakcja pomyślnie zaakceptowana");
                    this.props.history.push('/V10');

                }
                else
                {
                    swal("Błąd wypłaty - spróbuj ponownie później");
                }
            });
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
                        <input  onChange={this.handleChange}  type="number" min="0.01" step="0.01" max="100000" placeholder="Podaj kwotę" /> PLN
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
                                <button type="button" onClick={this.payout} className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V8;

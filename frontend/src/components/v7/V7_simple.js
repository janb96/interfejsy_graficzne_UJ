import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from 'sweetalert';

class V7 extends Component {

    constructor(props) {
        super();
        this.state = {
            token: window.sessionStorage.getItem("token"),
            url: ""
        };

        this.payout50 = this.payout50.bind(this);
        this.payout100 = this.payout100.bind(this);
        this.payout200 = this.payout200.bind(this);
        this.payout500 = this.payout500.bind(this);
        this.payout = this.payout.bind(this);

        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }
    }


    componentDidMount() {

        
    }

    payout(price)
    {
        const data = {
            amount: price
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

                    this.props.history.push({
                        pathname:"/v13-simple",
                        state:{
                            errMsg: r.payload
                        }
                    });
                }
            });
    }

    payout50()
    {
        this.payout(50);
    }

    payout100()
    {
        this.payout(100);
    }

    payout200()
    {
        this.payout(200);
    }
    payout500()
    {
        this.payout(500);
    }
    render() {
        return (
            <div id="root">
                <div className="container text-center">
                    <br/>
                    <h1 className="display-1">Wypłata środków</h1>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <button type="button" onClick={this.payout50} className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">50 zł</h1></button>
                        </div>
                        <div className="col-6">
                            <button type="button" onClick={this.payout100} className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">100 zł</h1></button>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <button type="button" onClick={this.payout200} className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">200 zł</h1></button>
                        </div>
                        <div className="col-6">
                            <button type="button" onClick={this.payout500} className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">500 zł</h1></button>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <Link to={'/v3-simple'}><button type="button" className="btn btn-danger btn-lg btn-block"><h1 className="display-1">Anuluj</h1></button></Link>
                        </div>
                        <div className="col-6">
                            <Link to={'/v8'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Inna kwota</h1></button></Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default V7;

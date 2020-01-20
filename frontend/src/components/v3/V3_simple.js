import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from "sweetalert";

class V3_simple extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.unlog = this.unlog.bind(this);
        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }

    }

    unlog()
    {
        window.sessionStorage.removeItem("token");
        this.props.history.push('/');

    }

    componentDidMount() {

        
    }

    render() {
        return (
            <div id="root">
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Link to={'/v3'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Widok standardowy</h1></button></Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/'}><button type="button" onClick={this.unlog} className="btn btn-danger btn-lg btn-block"><h1 className="display-1">Zakończ transakcje</h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Link to={'/v4-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Aktywacja karty</h1></button></Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/v7-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Wypłata środków <i class="fas fa-money-bill"></i></h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="el33">
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Link to={'/v5-simple'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Zmiana kodu PIN</h1></button></Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/v6'}><button type="button" className="btn btn-secondary btn-lg btn-block"><h1 className="display-1">Saldo konta <i class="fas fa-chart-line"></i></h1></button></Link>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default V3_simple;

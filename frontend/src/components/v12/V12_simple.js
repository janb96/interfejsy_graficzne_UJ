import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from "sweetalert";

class V12_simple extends Component {

    constructor(props) {
        super();
        this.state = {
        };

        if (window.sessionStorage.getItem("token") == null) {
            swal("Musisz być zalogowany");
            props.history.push('/');
        }
    }

    componentDidMount() {

        
    }

    render() {
        return (
            <div id="root">
                <div className="container text-center">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">Zmiana PIN</h1>
                    <h1 className="display-1">Numer PIN został zmieniony</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Link to={'/v3-simple'}><button type="button" className="btn btn-success btn-lg btn-block"><h1 className="display-1">Zatwierdź</h1></button></Link>
                </div>
            </div>
        );
    }
}

export default V12_simple;

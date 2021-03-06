import React, {Component} from 'react';
import axios from 'axios';
import swal from "sweetalert";

class V10_simple extends Component {

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

    async wait() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => this.props.history.push('/V11'), 5000)
          });

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

        this.wait();

    }

    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="display-1">OPERACJA W TRAKCIE</h1>
                    <h1 className="display-1">Proszę czekać</h1>
                </div>
            </div>
        );
    }
}

export default V10_simple;

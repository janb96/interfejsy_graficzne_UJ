import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class V1 extends Component {

    constructor(props) {
        super();
        this.state = {
            pinCode: "",
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.postData = this.postData.bind(this);

        if (window.sessionStorage.getItem("token") != null) {
            swal("Już wprowadziłeś PIN. Ta strona jest dla ciebie niedostępna");
            props.history.push('/V3');
        }
    }

    async componentDidMount() {

        let imgResponse = await axios.get("http://localhost:4000/advert");
        let addUrl = imgResponse.data.payload.link;
        this.setState({url: addUrl});
        
    }

     postData(){
        let pinCode = this.state.pinCode;

        const data = {
            cardId: "1234123412341234",
            pinCode: pinCode
        };
      //let response = await axios.post('http://localhost:4000/auth/authenticate' , data ).then(element => {console.log(element)});
      //console.log(response);
        fetch('http://localhost:4000/auth/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(r=>r.json())
            .then(r=>{
                console.log(r);

                if(r.type === "token")
                {
                    window.sessionStorage.setItem("token", r.payload);
                    this.props.history.push('/V3');
                }
                else
                {
                    console.log(r.payload);
                    swal("Niepoprawny kod pin");
                }


            });
    }

    handleChange(event){
        this.setState({pinCode: event.target.value});
    }
    render() {
        return (
            <div id="root">
                <div id="reklama50">
                    <img src={this.state.url}></img>
                </div>
                <div id="dol50">
                    <br/>
                    <h1 className="display-1">Wprowadź kod PIN</h1>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input onChange={this.handleChange} placeholder="Kod PIN" type="password" maxlength="4" id="pwd"></input>
                            </div>
                        </div>
                        <div className="col-4">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <Link to={'/'}><button type="button" className="btn btn-danger btn-lg btn-block"><h1>Cofnij</h1></button></Link>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <button onClick={this.postData} type="button" className="btn btn-success btn-lg btn-block"><h1>Zatwierdź</h1></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default V1;

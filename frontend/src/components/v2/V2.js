import React, {Component} from 'react';
import './V2.css';
import {Link} from "react-router-dom";

class V2 extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="root">
                <div id="reklama75">
                    <h1 className="display-1">REKLAMA</h1>
                </div>
                <div id="dol25">
                    <table className="table-borderless">
                        <tbody>
                            <tr>
                                <td className="szerokosc50">
                                    <div className='col-8 m-center'>
                                        <Link to={'/'}><button type="button" className="btn btn-warning btn-lg btn-block"><h1>Polski</h1></button></Link>
                                    </div>
                                </td>
                                <td className="szerokosc50">
                                    <div className='col-8 m-center'>
                                        <Link to={'/'}><button type="button" className="btn btn-warning btn-lg btn-block"><h1>English</h1></button></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='col-8 m-center'>
                                        <Link to={'/'}><button type="button" className="btn btn-warning btn-lg btn-block"><h1>German</h1></button></Link>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-8 m-center'>
                                        <Link to={'/'}><button type="button" className="btn btn-warning btn-lg btn-block"><h1>日本語</h1></button></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default V2;

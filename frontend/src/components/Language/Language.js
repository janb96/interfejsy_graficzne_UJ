import React, {Component} from 'react';
import './Language.css';

class Language extends Component {

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
                                        <button type="button" className="btn btn-warning btn-lg btn-block">Polski</button>
                                    </div>
                                </td>
                                <td className="szerokosc50">
                                    <div className='col-8 m-center'>
                                        <button type="button" className="btn btn-warning btn-lg btn-block">English</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='col-8 m-center'>
                                        <button type="button" className="btn btn-warning btn-lg btn-block">German</button>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-8 m-center'>
                                        <button type="button" className="btn btn-warning btn-lg btn-block">日本語</button>
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

export default Language;

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        //TODO logout
        sessionStorage.removeItem('userId');
        window.location = '/';
        /**
         axios.post(
         process.env.REACT_APP_API_URL + 'logout',
         ).then((response) => {
        });
         */
    };
    render() {
        return <Redirect to="/" />;
    }
};

export default Logout;
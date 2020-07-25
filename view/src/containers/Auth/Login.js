import React, {Component} from 'react';
import './Auth.scss';
import {checkValidity} from '../../shared/Validity';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import strings from '../../shared/LocalizedStrings';
import axios from 'axios';

class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: strings.registration_form_email
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: strings.registration_form_pass
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
    };

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,

            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

    login = async e => {
        e.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        axios.post(
          process.env.REACT_APP_API_URL + 'login',
          {email: email, password: password},
          { withCredentials: true }
        ).then((response) => {
            if (response.data.success) {
                //TODO add authentication
                sessionStorage.setItem('userId', email);
                window.location = '/';
            } else {
                //TODO handle errors
            }
        });
    };

    render() {
        const {controls} = this.state;

        // convert object of objects into array of objects
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }
        ;

        let form = formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
          >{strings.registration_form_email}</Input>
        ));
        let title = <h1 className="auth-title">{strings.login_form_title}</h1>;
        return (
          <>
              <ScrollToTopOnMount/>
              <div className="auth-container">
                  {title}
                  <div className="switch">
                      <a href="/register" className="btn">{strings.login_form_registration_button}</a>
                  </div>
                  <form onSubmit={this.login}>
                      {form}
                      <Button btnType={'btn-primary'}>{strings.login_form_submit}</Button>
                  </form>
              </div>
          </>
        );
    }
}
export default Login;
import React, {Component} from 'react';
import './CreateProduct.scss';
import UserNavigation from '../../components/Navigation/NavigationItems/UserNavigation';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import strings from '../../shared/LocalizedStrings';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {checkValidity} from "../../shared/Validity";
import axios from "axios";


class CreateProduct extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: strings.create_product_form_name,
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: strings.create_product_form_description
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: strings.create_product_form_price,
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    type: 'text',
                    placeholder: strings.create_product_form_select_default,
                    options: [{value: '', displayValue: strings.create_product_form_select_default},
                        {value: '1', displayValue: "Vegetables"},
                        {value: '2', displayValue: "Fruits"},
                        {value: '3', displayValue: "Meat"},
                        {value: '4', displayValue: "Dairy"},
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            medias: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: strings.create_product_form_medias,
                    options: [{value: '', displayValue: strings.create_product_form_select_default}]
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
        },
        file: null
    };

    inputChangedHandler = (e, controlName) => {
        let file = null;
        if (e.target.files) {
            file = e.target.files[0];
        } else {
            file = this.state.file;
        }
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
            controls: updatedControls,
            file: file,
        });
    };

    createProduct = async e => {
        e.preventDefault();
        const controls = this.state.controls;
        let data = new FormData();
        data.append('name', controls.name.value);
        data.append('description', controls.description.value);
        data.append('price', controls.price.value);
        data.append('category', controls.category.value);
        data.append('medias', this.state.file);
        axios
          .post(process.env.REACT_APP_API_URL + 'products/create', data, {withCredentials: true})
          .then((response) => {
              if (response.data) {
                  window.location = '/user/store';
              } else {
                  //TODO handle errors
              }
          });
    };

    render() {
        const {controls} = this.state;
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }
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
          ></Input>
        ));
        return (
          <>
              <ScrollToTopOnMount/>
              <div className="create-form-container">
                  <div className="user-navigation">
                      <UserNavigation/>
                  </div>
                  <div className="create-form-wrapper">
                      <h2 className="user-page-heading"> {strings.store_products_create_new}</h2>
                      <form onSubmit={this.createProduct}>
                          {form}
                          <Button btnType={'btn-primary'}>{strings.create_product_form_submit}</Button>
                      </form>
                  </div>
              </div>
          </>
        );
    };
};
export default CreateProduct;
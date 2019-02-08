import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                inputType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                inputType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    };

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event, elementId) => {
        const updatedAuthForm = {...this.state.authForm};
        updatedAuthForm[elementId].value = event.target.value;
        updatedAuthForm[elementId].valid = this.checkValidity(updatedAuthForm[elementId].value, updatedAuthForm[elementId].validation);
        updatedAuthForm[elementId].touched = true;

        let formIsValid = true;
        for (let elementKey in updatedAuthForm) {
            if (!updatedAuthForm[elementKey].valid && formIsValid) {
                formIsValid = false
            }
        }
        this.setState({
            authForm: updatedAuthForm,
            formIsValid: formIsValid
        })
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    };

    render() {
        const formElementArray = Array.from(Object.keys(this.state.authForm)).map(data => {
            return {
                id: data,
                config: this.state.authForm[data]
            }
        });

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementArray.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementName={formElement.id}
                            elementConfig={formElement.config.elementConfig}
                            elementType={formElement.config.inputType}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}/>
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>

        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = this.props.error.message
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            console.log(this.props.isAuth);
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH
                    TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapActionsToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapActionsToProps)(Auth);

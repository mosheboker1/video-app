import React, {Component} from 'react';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';

export default class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        // Todo: Link to real endpoint
        const url = 'https://video-server.com/login';
        const email = this.state.email;
        const password = this.state.password;
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('password', password);
        axios.post(url, bodyFormData)
            .then(result => {
                if (result.data.status) {
                    localStorage.setItem('token', result.data.token);
                    this.setState({redirect: true, isLoading: false});
                    localStorage.setItem('isLoggedIn', 'true');
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    componentDidMount() {
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Navigate to="/"/>;
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (<div className="card card-login mx-auto mt-5">
                <h3 className="card-header">Login</h3>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="form-label-group">
                                <input className={'form-control ' + (this.state.authError ? 'is-invalid' : '')}
                                       id="inputEmail" placeholder="Email address" type="text" name="email"
                                       onChange={this.handleEmailChange} autoFocus required/>
                                <label htmlFor="inputEmail">Email address</label>
                                <div className="invalid-feedback">
                                    Please provide a valid Email.
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <input type="password"
                                       className={'form-control ' + (this.state.authError ? 'is-invalid' : '')}
                                       id="inputPassword" placeholder="******" name="password"
                                       onChange={this.handlePwdChange} required/>
                                <label htmlFor="inputPassword">Password</label>
                                <div className="invalid-feedback">
                                    Please provide a valid Password.
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/>Remember Password
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit"
                                    disabled={this.state.isLoading}>Login &nbsp;&nbsp;&nbsp;
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span>
                                ) : (
                                    <span></span>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link className="d-block small mt-3" to={'/register'}>Register an Account</Link>
                        <Link className="d-block small" to={'/reset'}>Forgot Password?</Link>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}

import React, {Component} from 'react';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import authService from '../../services/auth.service';

export default class RegisterPage extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        redirect: false,
        authError: null,
        isLoading: false
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };
    handleNameChange = event => {
        this.setState({name: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        // Todo: Link to real endpoint
        const url = 'https://video-server.com/register';
        const email = this.state.email;
        const password = this.state.password;
        const name = this.state.name;
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('name', name);
        bodyFormData.set('password', password);
        authService.registerUser(email, password).then(a => {
            console.log({a});
        }).catch(e => {
            if (e?.code === 'auth/weak-password')
                this.setState({authError: 'Password too weak.'});
            console.log({e});
        });
        axios.post(url, bodyFormData)
            .then(result => {
                this.setState({isLoading: false});
                if (result.data.status !== 'fail') {
                    this.setState({redirect: true, authError: null});
                } else {
                    this.setState({redirect: false, authError: 'Failed to login'});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: 'Failed to login', isLoading: false});
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Navigate to="/"/>;
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputName" className="form-control" placeholder="name"
                                           name="name" onChange={this.handleNameChange} autoFocus required/>
                                    <label htmlFor="inputName">Name</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputEmail"
                                           className={'form-control ' + (this.state.authError ? 'is-invalid' : '')}
                                           placeholder="Email address" type="text" name="email"
                                           onChange={this.handleEmailChange} required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email address.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword"
                                           placeholder="******" name="password" onChange={this.handlePwdChange}
                                           required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit"
                                        disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading
                                        ? (<span className="spinner-border spinner-border-sm" role="status"
                                                 aria-hidden="true"></span>)
                                        : (<span></span>)}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'/login'}>Login Your Account</Link>
                            <Link className="d-block small" to={'/reset'}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


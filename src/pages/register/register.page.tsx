import React, {Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import './register.page.css';
import profileService from '../../services/profile.service';

export default class RegisterPage extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        authError: null,
        isLoading: false
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value, authError: null});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value, authError: null});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const email = this.state.email;
        const password = this.state.password;
        profileService.registerUser(email, password).then(cred => {
            if (cred?.user?.uid)
                profileService.createProfile(cred?.user?.uid, email).then((profile) => {
                    // Todo: cache videos
                });
        }).catch(e => {
            let errMsg = 'General Error.';
            if (e.code === 'auth/email-already-in-use')
                errMsg = 'Email already exist.';
            else if (e.code === 'auth/weak-password')
                errMsg = 'Password is too weak. Use at least 6 characters.';
            this.setState({authError: errMsg});
        }).finally(() => this.setState({isLoading: false}));
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
                                    <input id="inputEmail"
                                           className={'form-control'}
                                           placeholder="Email address" type="text" name="email"
                                           onChange={this.handleEmailChange} required/>
                                    <label htmlFor="inputEmail">Email address</label>
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

                            {!!this.state.authError && <div className="invalid m-3">
                                {this.state.authError}
                            </div>}

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


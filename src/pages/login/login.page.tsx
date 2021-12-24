import React, {Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import profileService from '../../services/profile.service';
import appStore from '../../store/app.store';

export default class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false
    };

    handleEmailChange = event => {
        this.setState({authError: false, email: event.target.value});
    };

    handlePwdChange = event => {
        this.setState({authError: false, password: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const email = this.state.email;
        const pwd = this.state.password;
        profileService.loginUser(email, pwd).then((cred) => {
            profileService.fetchProfile(cred.user.uid).then((profile) => {
                appStore.setProfile(profile.data.data);
                this.setState({redirect: true});
            });
        }).catch(e => {
            let errMsg = 'General Error.';
            if (e.code === 'auth/wrong-password')
                errMsg = 'Invalid email/password.';
            this.setState({authError: errMsg});
            console.log({e});
        }).finally(() => this.setState({isLoading: false}));
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
                                <input className={'form-control'}
                                       id="inputEmail" placeholder="Email address" type="text" name="email"
                                       onChange={this.handleEmailChange} autoFocus required/>
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <input type="password"
                                       className={'form-control'}
                                       id="inputPassword" placeholder="******" name="password"
                                       onChange={this.handlePwdChange} required/>
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                        </div>
                        {!!this.state.authError && <div className="invalid m-3">
                            {this.state.authError}
                        </div>}
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit"
                                    disabled={this.state.isLoading}>Login &nbsp;&nbsp;&nbsp;
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status"
                                                    aria-hidden="true"/>}
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

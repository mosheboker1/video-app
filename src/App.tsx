import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecordingPage} from './pages/recording/recording.page';
import {GalleryPage} from './pages/gallery/gallery.page';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import fire from './assets/config/fire';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

class App extends Component <{ user?: null }> {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };

        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        const auth = getAuth(fire);
        onAuthStateChanged(auth, user => {
            if (user) {
                this.setState({user});
            } else {
                this.setState({user: null});
            }
        });
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<RecordingPage/>}/>
                    <Route path="/gallery" element={<GalleryPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/reset" element={<RegisterPage/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;

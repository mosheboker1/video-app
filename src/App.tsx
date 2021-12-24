import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecordingPage} from './pages/recording/recording.page';
import {GalleryPage} from './pages/gallery/gallery.page';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import fire from './assets/config/fire';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {observer} from 'mobx-react';
import appStore from './store/app.store';
import profileService from './services/profile.service';

const App = observer(
    class App extends Component <{ profile?: null }> {
        constructor(props) {
            super(props);
            this.state = {
                profile: null
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
                profileService.fetchProfile(user.uid).then((profile) => {
                    appStore.setProfile(profile.data.data);
                    this.setState({redirect: true});
                });
                this.setState({profile: user});
            } else {
                this.setState({profile: null});
            }
        });
    }

        render() {
            return (
                <Router>
                    <Routes>
                        <Route path="/" element={<RecordingPage store={appStore}/>}/>
                        <Route path="/gallery" element={<GalleryPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/reset" element={<RegisterPage/>}/>
                    </Routes>
                </Router>
            );
        }
    }
);

export default App;

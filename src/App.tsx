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
import {AppStore} from './store/app.store';
import profileService from './services/profile.service';
import {VideoPage} from './pages/video/video.page';

const App = observer(
    class App extends Component <{}, { user?: any, redirect: boolean }> {
        appState: AppStore;

        constructor(props) {
            super(props);
            this.appState = new AppStore();
            this.state = {
                user: null,
                redirect: false
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
                        this.appState.setProfile(profile.data.data);
                        this.setState({redirect: true});
                    });
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
                        <Route path="/" element={<RecordingPage store={this.appState}/>}/>
                        <Route path="/gallery"
                               element={<GalleryPage fbId={this.state?.user?.uid} profile={this.appState?.profile}/>}/>
                        <Route path="/gallery/:id" element={<VideoPage/>}/>
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

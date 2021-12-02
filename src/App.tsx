import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecordingPage} from './pages/recording/recording.page';
import {GalleryPage} from './pages/gallery/gallery.page';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecordingPage/>}/>
                <Route path="/gallery" element={<GalleryPage/>}/>
            </Routes>
        </Router>);
}

export default App;

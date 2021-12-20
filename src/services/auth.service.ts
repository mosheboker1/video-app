import fire from '../assets/config/fire';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
const AuthService = {
    loginUser: async (email, pwd) => {
        const auth = getAuth(fire);
        return await signInWithEmailAndPassword(auth, email, pwd)
    },

    registerUser: async (email, pwd) => {
        const auth = getAuth(fire);
        return await createUserWithEmailAndPassword(auth, email, pwd)
    }

};

export default AuthService;

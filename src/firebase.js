import { initializeApp } from "firebase/app";
import { 
         createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { 
         addDoc, 
         collection, 
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBzizXBfGGriZjjumi6opJHHbNgGsfshS4",
  authDomain: "netflix-clone-aae86.firebaseapp.com",
  projectId: "netflix-clone-aae86",
  storageBucket: "netflix-clone-aae86.appspot.com",
  messagingSenderId: "546790875414",
  appId: "1:546790875414:web:c0ea6b97d1e7f70013b037"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
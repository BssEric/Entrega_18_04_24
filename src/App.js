import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './App.css'

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAw0yFf_YtibEH0b3TWfjzo9BtrEpwAo_8",
  authDomain: "projectpw-3a639.firebaseapp.com",
  projectId: "projectpw-3a639",
  storageBucket: "projectpw-3a639.appspot.com",
  messagingSenderId: "371095540106",
  appId: "1:371095540106:web:ddd02b3f61b48548a7b873",
  measurementId: "G-PXBSKTQYZY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleSignout = async () => {
    try {
      
      setError(null);
      setUser(null);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    
    <div>
      <img id='img' src="logo.png" alt=''></img>
      <h1 id='titulo'>Firebase Authentication</h1>
      <div id='div1'>
          <input id='botao1'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <input id='botao2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
          <br></br>
          <button id='botao3' onClick={handleLogin}>Login</button>
          <button id='botao4' onClick={handleGoogleLogin}>Login com Google</button>
          <button id='botao5' onClick={handleSignout}>Sair</button>
          {error && <p>{error}</p>}
          {user && (
            <div>
              <h2>Dados do Usuário:</h2>
              <p>Nome: {user.displayName || 'Não fornecido'}</p>
              <p>Email: {user.email}</p>
              <p>ID do Usuário: {user.uid}</p>
            </div>
          )}
      </div>    
    </div>
  );
}

export default App;
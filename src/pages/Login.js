// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. IMPORTA O HOOK SIMULADO

// import logo from '../collection.png'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. PEGA A FUNÇÃO DE LOGIN SIMULADA
  const { login } = useAuth(); 

  // 3. O 'handleSubmit' agora chama o login simulado
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login simulado com:', { email, password });
    // (Pode adicionar um alerta se quiser)
    // alert('Login simulado com sucesso! (Firebase está desativado).');
    login(); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* <img src={logo} alt="Pocket Collection Logo" className="auth-logo" /> */}
        <h1 className="auth-title" style={{ marginTop: '20px' }}>Welcome to Pocket Collection</h1>
        <p className="auth-subtitle">Sign in to continue</p>

        {/* 4. BOTÃO DO GOOGLE DESATIVADO */}
        <button className="btn-secondary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
          Continue with Google (desativado)
        </button>

        <div className="divider">OR</div>

        {/* 5. ESTE FORMULÁRIO AGORA FUNCIONA (com o login simulado) */}
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Campo de Senha */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <div className="auth-links">
          <Link to="/recovery" className="auth-link">Forgot password?</Link>
          <Link to="/register" className="auth-link">
            Need an account? <span>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
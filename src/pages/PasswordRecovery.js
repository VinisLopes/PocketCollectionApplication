// src/pages/PasswordRecovery.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PasswordRecovery() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Pedido de recuperação para:', email);
    alert('Email de recuperação enviado (simulação)!');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Link para Voltar */}
        <Link to="/" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to sign in
        </Link>

        {/* Título e Subtítulo */}
        <h1 className="auth-title" style={{ textAlign: 'left' }}>Reset your password</h1>
        <p className="auth-subtitle" style={{ textAlign: 'left', marginBottom: '24px' }}>
          Enter your email and we'll send you a link to reset your password
        </p>

        {/* Formulário de Recuperação */}
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

          {/* Botão de Enviar Link */}
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Send reset link</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
import React, { useState } from "react";
import { findUserByEmail } from "./UserService";
import RegisterApp from "./RegisterApp";
import "bootstrap/dist/css/bootstrap.min.css";

import { navigateToUrl } from "single-spa";

export const userIdEventName = "userIdChanged";

const LoginApp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const user = await findUserByEmail(email);
    if (!user) {
      setError("Email not found.");
      setUserId(null);
      window.dispatchEvent(new CustomEvent(userIdEventName, { detail: null }));
      return;
    }
    setUserId(user.id);
    window.dispatchEvent(new CustomEvent(userIdEventName, { detail: user.id }));

    // Navigate based on role
    switch (user.role) {
      case "customer":
        navigateToUrl(`/products?userId=${user.id}`);
        break;
      case "supplier":
        navigateToUrl(`/productCatalogue?userId=${user.id}`);
        break;
      case "steward":
        navigateToUrl(`/productCatalogue?userId=${user.id}`);
        break;
      default:
        navigateToUrl(`/`); // fallback
    }
  };

  if (showRegister) {
    return <RegisterApp onRegistered={() => setShowRegister(false)} />;
  }

  return (

    <div
      style={{
        backgroundImage: `url(${require('./assets/background.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <div className="container mt-5" style={{ maxWidth: 400 }}>
        <h2 className="mb-5 text-center" style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}>E - Mart</h2>
        <h2 className="mb-4 text-center" style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}>Login</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {userId && <div className="alert alert-success">Logged in! User ID: {userId}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-primary btn-sm" onClick={() => setShowRegister(true)}>
            Register as a new user
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginApp;

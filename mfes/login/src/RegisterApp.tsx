import React, { useState } from "react";
import { addUser, findUserByEmail } from "./UserService";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterApp: React.FC<{ onRegistered: () => void }> = ({ onRegistered }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [password, setPassword] = useState(""); // UI only
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      setError("Email already exists.");
      return;
    }

    // Add user (excluding password)
    await addUser({ name, email, address, role });

    setSuccess("Registration successful! Redirecting...");
    setTimeout(() => {
      setSuccess(null);
      onRegistered();
    }, 1500);
  };

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
      <div className="container mt-5" style={{ maxWidth: 450 }}>
        <h2 className="mb-4 text-center" style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}>Register</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password (UI only) */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="customer">Customer</option>
              <option value="supplier">Supplier</option>
              <option value="steward">Steward</option>
            </select>
          </div>

          {/* Error / Success */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterApp;

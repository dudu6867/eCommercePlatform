import React, { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Spinner,
  Alert,
} from "react-bootstrap";
import bgImg from "./assets/background.jpg";
import userImg from "./assets/account.jpg";

type NavItem = { key: string; label: string; href: string };

const NAV_CONFIG: Record<string, NavItem[]> = {
  customers: [
    { key: "products", label: "Products", href: "/products" },
    { key: "carts", label: "Carts", href: "/carts" },
    { key: "orders", label: "Orders", href: "/orders" },
  ],
  suppliers: [
    {
      key: "productCatalogue",
      label: "ProductCatalogue",
      href: "productCatalogue",
    }
  ],
  stewards: [
    {
      key: "productCatalogue",
      label: "ProductCatalogue",
      href: "productCatalogue",
    },
  ],
  default: [{ key: "home", label: "Home", href: "/" }],
};

const Navbar: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = Number(searchParams.get("userId"));

  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user details on mount
  useEffect(() => {
  if (!userId) {
    setError("No userId found in URL");
    setLoading(false);
    return;
  }

  fetch(`http://localhost:3000/bff/users/${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user details");
      return res.json();
    })
    .then((data) => setUser(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [userId]);


  // Role-based nav items
  const items = user ? NAV_CONFIG[user.role + "s"] || NAV_CONFIG.default : NAV_CONFIG.default;
  console.log("Nav items for role:", user?.role, items);

  return (
    <>
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "150px",
          backgroundImage: bgImg ? `url(${bgImg})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          E-Mart
        </h1>
      </div>

      {/* Navbar */}
      <BootstrapNavbar bg="dark" expand="lg">
        <Container>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {items.map((item) => (
                <Nav.Link
                  key={item.key}
                  href={item.href}
                  style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  className="me-5"
                  onClick={(e) => {
                    e.preventDefault();
                    const urlWithUser = `${item.href}?userId=${userId}`;
                    navigateToUrl(urlWithUser);
                  }}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>

            {/* User avatar / status */}
            <Nav>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : error ? (
                <Alert variant="danger" className="mb-0">
                  {error}
                </Alert>
              ) : user ? (
                <NavDropdown
                  title={
                    <Image
                      src={userImg}
                      roundedCircle
                      width={40}
                      height={40}
                      alt="User"
                    />
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.ItemText>
                    <strong>{user.name}</strong>
                  </NavDropdown.ItemText>
                  <NavDropdown.ItemText>{user.email}</NavDropdown.ItemText>
                  <NavDropdown.ItemText>Role: {user.role}</NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      navigateToUrl("/login");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;

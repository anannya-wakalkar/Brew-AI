import { Link, useLocation } from "react-router";
import { motion } from "motion/react";

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/evaluate", label: "Evaluate" },
    { to: "/team-fit", label: "Team Fit" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl tracking-tight text-neutral-900">
          Brew
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  location.pathname === link.to
                    ? "text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

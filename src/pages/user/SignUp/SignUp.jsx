import axios from "../../../axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import showNotification from "../../../notification.mjs";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Please enter a username")
      .min(4, "Username must be at least 4 characters"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postData = (data) => {
    axios
      .post("/signup", data)
      .then((res) => {
        if (res.data.signed) {
          navigate("/");
        } else {
          showNotification("Username is already taken");
          navigate("/signUp");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function fetchUserExists(value) {
    setIsChecking(true);
    axios.post("/signUp/existsUser", { name: value }).then((res) => {
      setAvailable(res.data.isAvailable);
      setIsChecking(false);
    });
  }

  const checkUser = (e) => {
    const value = e.target.value;
    if (value.length < 4) {
      setAvailable(false);
      return;
    }
    fetchUserExists(value);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "var(--gray-50)" }}
    >
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-lg relative animate-fade-in">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm transition-colors duration-300"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div
          className="p-10 lg:p-12"
          style={{
            backgroundColor: "var(--color-secondary)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border-light)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              Create Account
            </h1>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              Join us today and discover exclusive collections
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(postData)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                className="block text-xs font-medium tracking-wider uppercase mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-0 py-4 text-base outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-primary)",
                  backgroundColor: "transparent",
                  borderBottom: "1px solid var(--color-border)",
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = "var(--color-primary)";
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = "var(--color-border)";
                }}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm" style={{ color: "#dc2626" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label
                className="block text-xs font-medium tracking-wider uppercase mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full px-0 py-4 text-base outline-none transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "var(--color-border)";
                  }}
                  {...register("username")}
                  onChange={checkUser}
                />
                {/* Availability Indicator */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-medium">
                  {isChecking ? (
                    <span style={{ color: "var(--color-text-muted)" }}>Checking...</span>
                  ) : available ? (
                    <span style={{ color: "#16a34a" }}>✓ Available</span>
                  ) : (
                    <span style={{ color: "#dc2626" }}>✗ Taken</span>
                  )}
                </span>
              </div>
              {errors.username && (
                <p className="mt-2 text-sm" style={{ color: "#dc2626" }}>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label
                  className="block text-xs font-medium tracking-wider uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-0 py-4 text-base outline-none transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "var(--color-border)";
                  }}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-2 text-sm" style={{ color: "#dc2626" }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block text-xs font-medium tracking-wider uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Confirm
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-0 py-4 text-base outline-none transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "var(--color-border)";
                  }}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm" style={{ color: "#dc2626" }}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              By creating an account, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 mt-4"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-inverse)",
                border: "1px solid var(--color-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--gray-800)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
              }}
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />
            <span
              className="text-xs tracking-wider uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />
          </div>

          {/* Sign In Link */}
          <p
            className="text-center text-sm"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium transition-colors duration-300"
              style={{ color: "var(--color-primary)" }}
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Brand Footer */}
        <p
          className="text-center mt-8 text-xs tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          TRENDZY
        </p>
      </div>
    </div>
  );
}

export default SignUp;

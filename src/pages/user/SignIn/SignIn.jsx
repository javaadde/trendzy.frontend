import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../axios";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    console.log(data);
    axios
      .post("/signIn", data, { withCredentials: true })
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
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

      <div className="w-full max-w-md relative animate-fade-in">
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
              Welcome Back
            </h1>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
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
              <input
                type="text"
                placeholder="Enter your username"
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
              />
              {errors.username && (
                <p
                  className="mt-2 text-sm"
                  style={{ color: "#dc2626", fontFamily: "var(--font-body)" }}
                >
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
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
                placeholder="Enter your password"
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
                <p
                  className="mt-2 text-sm"
                  style={{ color: "#dc2626", fontFamily: "var(--font-body)" }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 mt-8"
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
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
            <span
              className="text-xs tracking-wider uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
          </div>

          {/* Sign Up Link */}
          <p
            className="text-center text-sm"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="font-medium transition-colors duration-300"
              style={{ color: "var(--color-primary)" }}
            >
              Create one
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

export default SignIn;

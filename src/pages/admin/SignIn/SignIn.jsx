import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";

function SignInAdmin() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Security requirement: 6+ characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    axios
      .post("/admin/signin", data, { withCredentials: true })
      .then((res) => navigate("/admin"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "var(--gray-50)" }}
    >
      <div className="w-full max-w-md animate-fade-in">
        {/* Decorative Element */}
        <div className="flex justify-center mb-12">
          <div
            className="w-16 h-16 bg-black flex items-center justify-center rotate-45 transform hover:rotate-180 transition-transform duration-1000"
          >
            <span
              className="text-white text-2xl font-semibold -rotate-45"
              style={{ fontFamily: "var(--font-display)" }}
            >
              T
            </span>
          </div>
        </div>

        <div
          className="p-12 shadow-elegant relative overflow-hidden"
          style={{
            backgroundColor: "var(--color-secondary)",
            border: "1px solid var(--color-border-light)",
          }}
        >
          {/* Subtle Background Text */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none">
            <h2 className="text-8xl font-bold uppercase tracking-tighter">Admin</h2>
          </div>

          <div className="relative z-10">
            <h2
              className="text-3xl lg:text-4xl font-semibold tracking-tight text-center mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Console Access
            </h2>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase text-center text-gray-400 mb-12"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Trendzy Luxury Group Systems
            </p>

            <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3 block">
                  Identifier
                </label>
                <input
                  type="text"
                  className="w-full px-0 py-4 bg-transparent border-b outline-none text-sm transition-all duration-300"
                  style={{
                    borderBottomColor: "var(--color-border)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="Admin Username"
                  {...register("username")}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "var(--color-border)";
                  }}
                />
                {errors.username && (
                  <p className="text-[10px] text-red-500 mt-2 uppercase tracking-wider">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3 block">
                  Security Code
                </label>
                <input
                  type="password"
                  className="w-full px-0 py-4 bg-transparent border-b outline-none text-sm transition-all duration-300"
                  style={{
                    borderBottomColor: "var(--color-border)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="••••••••"
                  {...register("password")}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "var(--color-border)";
                  }}
                />
                {errors.password && (
                  <p className="text-[10px] text-red-500 mt-2 uppercase tracking-wider">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-black text-white text-[11px] font-bold tracking-widest uppercase transition-all duration-500 hover:tracking-[0.2em] transform active:scale-95 mt-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-12 text-center">
          <p
            className="text-[10px] font-medium tracking-[0.3em] uppercase text-gray-400"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © 2025 Trendzy Operational Systems
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInAdmin;

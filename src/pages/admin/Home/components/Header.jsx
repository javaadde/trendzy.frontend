import axios from "../../../../axios";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const logOut = () => {
        if (confirm("Are you sure you want to log out of the admin panel?")) {
            axios
                .delete("/details/logout")
                .then((res) => {
                    navigate("/admin/login");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <header
                className="sticky top-0 z-50 py-4"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid var(--color-border-light)",
                }}
            >
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/admin" className="flex items-center gap-4">
                                <div
                                    className="w-10 h-10 bg-black flex items-center justify-center"
                                >
                                    <span
                                        className="text-white font-semibold text-lg"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        T
                                    </span>
                                </div>
                                <div>
                                    <h1
                                        className="text-xl font-semibold tracking-widest uppercase"
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        Trendzy <span className="text-gray-400 font-normal">Admin</span>
                                    </h1>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden md:block text-right">
                                <p
                                    className="text-sm font-medium"
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    Administrator
                                </p>
                                <p
                                    className="text-[10px] tracking-widest uppercase"
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        color: "var(--color-text-muted)",
                                    }}
                                >
                                    Session Active
                                </p>
                            </div>

                            <button
                                onClick={logOut}
                                className="px-6 py-2.5 bg-black text-white text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-gray-800"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
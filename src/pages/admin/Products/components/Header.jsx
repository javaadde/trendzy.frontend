import { useNavigate, Link } from "react-router-dom";
import axios from "../../../../axios";

function Header() {
    const navigate = useNavigate();

    const logOut = () => {
        if (confirm("Are you sure you want to log out?")) {
            axios
                .delete("/details/logout")
                .then(() => {
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
                        <div className="flex items-center gap-6">
                            <Link
                                to="/admin"
                                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Link>
                            <div>
                                <h1
                                    className="text-xl font-semibold tracking-tight"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    Product Catalog
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={logOut}
                                className="text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:text-red-600"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--color-text-muted)",
                                }}
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
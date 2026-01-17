import axios from "../../../axios";
import { useEffect, useState } from "react";
import showNotification from "../../../notification.mjs";
import { Link } from "react-router-dom";

function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/admin/users")
            .then((res) => {
                setUsers(res.data.allUsers);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [update]);

    const enableUser = (id) => {
        axios
            .put("/admin/user/enable", { id })
            .then((res) => {
                showNotification(res.data.message);
                setUpdate((prev) => prev + 1);
            })
            .catch((err) => console.log(err));
    };

    const disableUser = (id) => {
        axios
            .put("/admin/user/disable", { id })
            .then((res) => {
                showNotification(res.data.message);
                setUpdate((prev) => prev + 1);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
            {/* Header */}
            <header
                className="sticky top-0 z-40 py-4"
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
                                style={{ color: "var(--color-primary)" }}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Link>
                            <h1
                                className="text-xl font-semibold tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                User Directory
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto p-6 lg:p-12 animate-fade-in">
                <div className="mb-12">
                    <span
                        className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Access Control
                    </span>
                    <h2
                        className="text-3xl lg:text-5xl font-semibold tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Accounts <span className="italic">Database</span>
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-32">
                        <div className="loader">
                            <p className="loader-text">Syncing</p>
                            <span className="load"></span>
                        </div>
                    </div>
                ) : (
                    <div
                        className="overflow-hidden"
                        style={{
                            backgroundColor: "var(--color-secondary)",
                            border: "1px solid var(--color-border-light)",
                        }}
                    >
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    className="text-[10px] font-semibold tracking-widest uppercase text-gray-400"
                                    style={{ borderBottom: "1px solid var(--color-border-light)" }}
                                >
                                    <th className="px-10 py-6">Unique ID</th>
                                    <th className="px-6 py-6">Credentials / Email</th>
                                    <th className="px-6 py-6 text-center">Status</th>
                                    <th className="px-10 py-6 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <code className="text-[11px] bg-gray-100 px-2 py-1 text-gray-600">
                                                {user._id}
                                            </code>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm font-medium tracking-wide">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span
                                                className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 ${user.active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {user.active ? "Enabled" : "Disabled"}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right space-x-3">
                                            {user.active ? (
                                                <button
                                                    onClick={() => disableUser(user._id)}
                                                    className="px-6 py-2 border border-black text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
                                                >
                                                    Revoke Access
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => enableUser(user._id)}
                                                    className="px-6 py-2 bg-black text-white text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all"
                                                >
                                                    Grant Access
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-12 p-8 border border-gray-100 italic text-[11px] leading-relaxed text-gray-400 max-w-2xl">
                    <p>
                        Note: Managing user access requires high-level administrative
                        privileges. Changes to account status are immediate and will affect
                        the user's ability to initialize sessions and execute transactions.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default UsersAdmin;
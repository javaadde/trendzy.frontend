import useCart from "../../hooks/useCart";
import { useState } from "react";

function Pro(props) {
    const product_id = props.proId;
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product_id);
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <div
            className="group relative animate-fade-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div
                className="relative overflow-hidden aspect-[3/4]"
                style={{
                    backgroundColor: "var(--color-accent)",
                }}
            >
                <img
                    src={props.url}
                    alt={props.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Action Overlay */}
                <div
                    className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="px-8 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.3em] active:scale-95"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {isAdding ? "Added to Bag" : "Add to Bag"}
                    </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase shadow-sm"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)" }}
                    >
                        {props.category}
                    </span>
                </div>
            </div>

            {/* Product Information */}
            <div className="pt-6 pb-2">
                <div className="flex justify-between items-start gap-4 mb-1">
                    <h3
                        className="text-sm font-medium tracking-wide line-clamp-1 transition-colors duration-300 group-hover:text-gray-500"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)" }}
                    >
                        {props.name}
                    </h3>
                    <span
                        className="text-sm font-semibold whitespace-nowrap"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
                    >
                        ${props.price}
                    </span>
                </div>
                <p
                    className="text-[10px] uppercase tracking-widest text-gray-400"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Limited Edition
                </p>
            </div>

            {/* Decorative hover line */}
            <div className="h-px w-0 bg-black transition-all duration-700 group-hover:w-full opacity-10" />
        </div>
    );
}

export default Pro;
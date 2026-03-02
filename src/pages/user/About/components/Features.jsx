function Features() {
  const features = [
    {
      icon: "fa-solid fa-truck-fast",
      title: "Worldwide Shipping",
      desc: "Fast & Reliable Shipping Worldwide",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Secure Payment",
      desc: "Safe & Trusted Transactions",
    },
    {
      icon: "fa-solid fa-rotate-left",
      title: "30 Days Free Returns",
      desc: "Easy & Hassle-free Returns",
    },
    {
      icon: "fa-solid fa-gift",
      title: "Surprise Gift",
      desc: "Free Gifts & Vouchers on Orders",
    },
  ];

  return (
    <section className="py-24 border-y border-gray-100 bg-[#f9f9f9]/50">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-6 group hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-xl shadow-sm border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <i className={feature.icon}></i>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

function Team() {
  const team = [
    {
      name: "Savannah Marie",
      role: "Lead Designer",
      image: "/about/team1.png",
    },
    {
      name: "Leslie Alexander",
      role: "Creative Director",
      image: "/about/team2.png",
    },
    {
      name: "Leyla Alexander",
      role: "Lead Stylist",
      image: "/about/team3.png",
    },
  ];

  return (
    <section className="section-premium bg-white">
      <div className="container-premium">
        <div className="text-center mb-20">
          <h2
            className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet Our Teams
          </h2>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">
            The visionary minds behind the Trendzy aesthetic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                {/* Social Links Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <i className="fa-brands fa-instagram"></i>
                  </button>
                  <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <i className="fa-brands fa-x-twitter"></i>
                  </button>
                  <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;

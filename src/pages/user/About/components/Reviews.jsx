function Reviews() {
  const reviews = [
    {
      name: "Sophia Roberts",
      text: "The quality of materials and the attention to detail in their designs is simply outstanding. Trendzy has become my go-to for elevate basics and statement pieces alike.",
      rating: 5,
    },
    {
      name: "Marcus Thorne",
      text: "Exceptional shopping experience. The interface is clean, the shipping is incredibly fast, and the pieces I received exceeded my expectations in both fit and finish.",
      rating: 5,
    },
    {
      name: "Elena Vance",
      text: "I love how Trendzy blends contemporary trends with timeless silhouettes. Their customer service is top-notch and made my return process completely effortless.",
      rating: 5,
    },
  ];

  return (
    <section className="section-premium bg-[#f9f9f9]/30">
      <div className="container-premium">
        <div className="text-center mb-20 animate-fade-in">
          <h2
            className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Customers Review
          </h2>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">
            Voices of our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-12 border border-gray-100 flex flex-col items-center text-center group hover:border-black transition-colors duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star text-[10px] text-black"
                  ></i>
                ))}
              </div>
              <p
                className="text-lg italic text-gray-700 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                "{review.text}"
              </p>
              <div className="w-8 h-[1px] bg-gray-200 mb-6 group-hover:w-16 group-hover:bg-black transition-all duration-500"></div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">
                {review.name}
              </h4>
              <p className="text-[8px] font-bold tracking-widest uppercase text-gray-300 mt-2">
                Verified Customer
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;

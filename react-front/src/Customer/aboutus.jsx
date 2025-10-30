export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://images.ft.com/v3/image/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3f8d8a91-00df-4745-980c-9d776e8972e7.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            About LegalEase Law Firm
          </h1>
          <p className="text-white text-sm md:text-base">
            Trusted Myanmar Legal Experts — Dedicated to Integrity, Justice, and Client Success.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#1A3636]">
          Our Mission & Vision
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
          At LegalEase, we are committed to providing clear, honest, and professional legal
          guidance for individuals and businesses across Myanmar. We combine traditional
          legal expertise with modern solutions to ensure justice is accessible for everyone.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-[#1A3636]">Our Commitment</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Since our establishment in 2020, LegalEase Law Firm has handled hundreds of
              civil, corporate, and criminal cases successfully. We take pride in our
              ethical standards, transparency, and dedication to our clients' best interests.
            </p>

            <h3 className="text-2xl font-semibold mb-3 text-[#1A3636]">Client Privacy</h3>
            <p className="text-gray-600 leading-relaxed">
              We understand the sensitivity of legal matters. All client details,
              consultations, and documents are treated with the highest level of
              confidentiality. Your information will never be shared or disclosed —
              your trust is our foundation.
            </p>
          </div>
        <div className="flex justify-center">
        <img
        src="https://lawfirmsuites.com/wp-content/uploads/2015/05/CR1.jpg"
        alt="Law Office"
        className="rounded-lg shadow-lg w-full md:w-10/12"
        />
        </div>

        </div>
      </section>
      {/* How We Work Section */}
<section className="bg-[#f8f9f8] py-16">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-semibold text-[#1A3636] mb-6">
      How We Work
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-10">
      At LegalEase Law Firm, we make the legal consultation process simple,
      transparent, and efficient — ensuring every client receives the best
      possible guidance and representation from start to finish.
    </p>

    <div className="grid gap-8 md:grid-cols-3">
      {/* Step 1 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-[#83B582] text-4xl font-bold mb-3">1</div>
        <h3 className="text-lg font-semibold mb-2">Book Your Consultation</h3>
        <p className="text-gray-600 text-sm">
          Clients can easily book an appointment online through our platform.
          Our admin team reviews each booking and confirms the schedule within 24 hours.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-[#83B582] text-4xl font-bold mb-3">2</div>
        <h3 className="text-lg font-semibold mb-2">Lawyer Assignment</h3>
        <p className="text-gray-600 text-sm">
          A suitable lawyer is carefully assigned based on the client’s case type
          — whether corporate, civil, family, or criminal — ensuring expert representation.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-[#83B582] text-4xl font-bold mb-3">3</div>
        <h3 className="text-lg font-semibold mb-2">In-Office Consultation</h3>
        <p className="text-gray-600 text-sm">
          Once the appointment is confirmed, the discussion with your assigned
          lawyer will take place at the LegalEase Office in a professional and private setting.
        </p>
      </div>
    </div>

    {/* Optional step 4 */}
    <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="text-[#83B582] text-4xl font-bold mb-3">4</div>
      <h3 className="text-lg font-semibold mb-2">Case Progress & Support</h3>
      <p className="text-gray-600 text-sm">
        After the initial consultation, clients can follow up through our platform
        for updates, document sharing, and ongoing support until the case is resolved.
      </p>
    </div>
  </div>
</section>


      {/* Senior Lawyers */}
      <section className="bg-[#83B582]/10 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#1A3636] mb-10">
            Our Senior Lawyers
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
             {
              name: "John Doe",
              role: "Senior Corporate Lawyer",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG_B_oVh358KRsmUCsUdFmQKBy6m8l0inKuw&s",
              bio: "With over 15 years of experience in corporate law, John has successfully managed high-value mergers, intellectual property disputes, and compliance cases for international companies.",
              success: "Led a $10M cross-border corporate merger with zero legal conflict post-integration.",
            },

              {
                name: "Mary Johnson",
                role: "Criminal Law Specialist",
                img: "https://www.workitdaily.com/media-library/law-student-has-the-skills-needed-to-become-a-successful-lawyer.jpg?id=22661511&width=1200&height=800&quality=50&coordinates=2%2C0%2C2%2C0",
                bio: "Mary is renowned for her courtroom expertise and her dedication to justice. She has defended clients in over 100 high-profile criminal cases with an outstanding success rate.",
                success: "Secured acquittal in one of Myanmar’s most complex criminal defense cases in 2023.",
              },
              {
                name: "David Smith",
                role: "Family & Civil Law Expert",
                img: "https://imageio.forbes.com/specials-images/imageserve/640e3166569159b2e37aa269/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
                bio: "David combines compassion and strategy in family and civil law. His approach ensures fair settlements and minimal stress for clients during emotional legal battles.",
                success: "Resolved over 200 civil and family cases with amicable and fair outcomes for all parties.",
              },
            ].map((lawyer) => (
              <div
                key={lawyer.name}
                className="bg-white rounded-lg shadow-md overflow-hidden text-left"
              >
                <img
                  src={lawyer.img}
                  alt={lawyer.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{lawyer.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{lawyer.role}</p>
                  <p className="text-sm text-gray-700 mb-2">{lawyer.bio}</p>
                  <p className="text-sm text-[#55a754] font-medium">
                    🌟 {lawyer.success}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognition Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-semibold text-[#1A3636] mb-6">
      Achievements & Recognition
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Over the years, LegalEase Law Firm has earned recognition for our
      dedication, professionalism, and consistent success in protecting our
      clients’ rights and interests.
    </p>

    <div className="grid gap-8 md:grid-cols-3">
      {/* Award 1 */}
      <div className="bg-[#f8f9f8] rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div className="text-[#83B582] text-4xl mb-3">🏆</div>
        <h3 className="text-lg font-semibold mb-2">
          Best Legal Consultancy 2024
        </h3>
        <p className="text-gray-600 text-sm">
          Honored by the Yangon Legal Association for outstanding service and
          client satisfaction in corporate and civil law.
        </p>
      </div>

      {/* Award 2 */}
      <div className="bg-[#f8f9f8] rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div className="text-[#83B582] text-4xl mb-3">⚖️</div>
        <h3 className="text-lg font-semibold mb-2">
          1,000+ Successful Case Resolutions
        </h3>
        <p className="text-gray-600 text-sm">
          Our experienced legal team has successfully managed complex cases with
          dedication, fairness, and transparency.
        </p>
      </div>

      {/* Award 3 */}
      <div className="bg-[#f8f9f8] rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div className="text-[#83B582] text-4xl mb-3">💼</div>
        <h3 className="text-lg font-semibold mb-2">
          Excellence in Client Service
        </h3>
        <p className="text-gray-600 text-sm">
          Recognized for exceptional legal support and ethical standards by
          national and international business clients.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* Closing Statement */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-[#1A3636] mb-4">Our Promise</h2>
        <p className="text-gray-600 leading-relaxed">
          Whether you’re seeking legal advice, defense, or consultation — LegalEase stands as your
          trusted partner. We combine experience, confidentiality, and compassion to ensure that
          every client feels heard, respected, and legally protected.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#83B582] text-black py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold">LegalEase Law Firm</h3>
          <p className="text-sm text-black/80 mt-1">
            Yangon Main Office — 123 Pyay Road, Yangon, Myanmar
          </p>
          <p className="text-sm text-black/80">📞 +95 9 123 456 789</p>
          <p className="text-sm text-black/80">✉️ contact@legalease.com</p>
          <div className="border-t border-black/20 mt-4 pt-3">
            <p className="text-xs text-black/70">
              © {new Date().getFullYear()} LegalEase Law Firm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

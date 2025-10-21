import { Link } from "react-router-dom";
import CustomerNav from "../Components/CustomerNav";

export default function Home() {


  return (
    <div className="min-h-screen bg-white text-gray-900">

      <CustomerNav />
      {/* HERO */}
      <header
        className="relative flex items-center"
        style={{
         backgroundImage:
        "url('https://walzermelcher.com/wp-content/uploads/2021/10/Law-book-gavel-Lady-Justice.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16">
          <div className="max-w-2xl text-white">
            <p className="text-sm uppercase tracking-wider">
              Client-First Legal Services
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Experienced Lawyers. Clear Advice. Real Results.
            </h1>
            <p className="mt-4 text-sm md:text-base">
              From complex corporate matters to personal disputes, our team brings
              practical strategy and transparent communication.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/customer/lawyer"
                className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                View Lawyer
              </Link>
              <Link to="/customer/lawbook"
                className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Read Lawbook
              </Link>
            </div>
          </div>
        </div>
      </header>

    {/*  About LegalEase Section */}
<div className="py-16 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
    {/* Left: Image */}
    <div className="md:w-1/3 w-full">
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
        alt="LegalEase Office"
        className="rounded-lg shadow-md w-full h-auto object-cover"
      />
    </div>

    {/* Right: Content */}
    <div className="md:w-2/3 w-full">
      <h2 className="text-3xl font-semibold text-[#83B582] mb-4">
        About LegalEase Law Firm
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4 text-justify">
        LegalEase is a physical office that provides appointment services to
        clients and lawyers. It was established in 2018 in Yangon, Myanmar.
        Mr. Linn founded the organization with decades of legal experience and a
        profound grasp of customer needs. The organization was created by a
        retired, highly regarded attorney who had received multiple professional
        honours.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4 text-justify">
        The founder aims to bridge the needs of legal advice and highly skilled
        legal experts with guaranteed access to reliable and effective legal
        services. This program was established in response to the increasing
        need for simplified legal assistance in Myanmar, especially in Yangon, a
        city known for its thriving business community and intricate legal
        system.
      </p>
      <p className="text-gray-700 leading-relaxed text-justify">
        The organization's focus on in-person consultations demonstrates its
        dedication to providing individualised service and cultivating enduring
        client-attorney connections. This strategy satisfies the traditional
        tastes of the local clientele, who frequently value direct communication
        and faith in professional services.
      </p>
    </div>
  </div>
</div>

{/* PRACTICE AREAS */}
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-semibold text-[#83B582] mb-10">Our Practice Areas</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Corporate Law",
          desc: "Assisting businesses with contracts, mergers, and legal compliance.",
          icon: "💼",
        },
        {
          title: "Family Law",
          desc: "Helping families resolve divorce, custody, and inheritance matters with care.",
          icon: "👨‍👩‍👧‍👦",
        },
        {
          title: "Criminal Law",
          desc: "Providing expert defense and justice for those accused of criminal offenses.",
          icon: "⚖️",
        },
      ].map((area) => (
        <div key={area.title} className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl mb-3">{area.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{area.title}</h3>
          <p className="text-gray-600 text-sm">{area.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* WHY CHOOSE US */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 className="text-3xl font-semibold text-[#83B582] mb-6">
        Why Clients Choose LegalEase
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li>✅ Experienced lawyers with proven case success</li>
        <li>🔒 Guaranteed privacy and data protection</li>
        <li>💬 Clear communication throughout the process</li>
        <li>⚖️ Fair and transparent consultation fees</li>
      </ul>
    </div>
    <img
      src="https://img.freepik.com/premium-photo/closeup-view-courtroom-judge-justice-court-lawyer-s-desk-legal-office_43157-5084.jpg"
      alt="Why Choose Us"
      className="rounded-lg shadow-md"
    />
  </div>
</section>


{/* TESTIMONIALS */}
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-semibold text-[#83B582] mb-8">
      What Clients Say
    </h2>

    <div className="flex gap-6 overflow-x-auto no-scrollbar px-2">
      {[
        {
          name: "Thura Aung",
          feedback:
            "LegalEase helped me resolve a business dispute efficiently. The lawyers were transparent and kind.",
        },
        {
          name: "Mya Nandar",
          feedback:
            "Excellent consultation and very professional communication from start to finish.",
        },
        {
          name: "David Lin",
          feedback:
            "The process was fast and smooth — I recommend LegalEase to anyone needing trusted legal advice.",
        },
      ].map((client) => (
        <div
          key={client.name}
          className="bg-white min-w-[250px] shadow-md rounded-lg p-5 text-left"
        >
          <p className="text-gray-700 text-sm italic mb-3">
            “{client.feedback}”
          </p>
          <p className="text-sm font-semibold text-[#1A3636]">{client.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      <footer class="bg-[#83B582] text-black py-6">
      <div class="max-w-6xl mx-auto px-4 text-center">
      <h3 class="text-lg font-semibold">LegalEase Law Firm</h3>
      <p class="text-sm text-black/80 mt-1">
        Yangon Main Office — 123 Pyay Road, Yangon, Myanmar
      </p>
      <p class="text-sm text-black/80">📞 +95 9 123 456 789</p>
      <p class="text-sm text-black/80">✉️ contact@legalease.com</p>

      <div class="border-t border-black/20 mt-4 pt-3">
      <p className="text-xs text-black/70">
              © {new Date().getFullYear()} LegalEase Law Firm. All rights reserved.
      </p>
      </div>
    </div>
</footer>

    </div>
    
  );
}






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
              <a
                href="/lawyer.jsx"
                className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                View Lawyer
              </a>
              <a
                href="/lawbookpg.jsx"
                className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Read Lawbook
              </a>
            </div>
          </div>
        </div>
      </header>

    {/* 🏛️ About LegalEase Section */}
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


      {/* 👩‍⚖️ Lawyer Section */}
<div className="py-16 bg-gray-50">
  <h2 className="text-3xl font-semibold text-center mb-10 text-[#83B582]">
    Meet Our Experienced Lawyers
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    {/* Lawyer 1 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
        alt="Lawyer 1"
        className="w-full h-60 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Aung Min</h3>
        <p className="text-gray-600 mb-4">
          Specializing in criminal defense and family law with over 10 years of
          experience helping clients achieve justice.
        </p>
        <a
          href="/lawyer"
          className="text-[#83B582] hover:text-[#55a754] font-semibold"
        >
          Read More 
        </a>
      </div>
    </div>

    {/* Lawyer 2 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
        alt="Lawyer 2"
        className="w-full h-60 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Zaw Htet</h3>
        <p className="text-gray-600 mb-4">
          Corporate law expert with deep experience in business contracts,
          negotiations, and legal compliance.
        </p>
        <a
          href="/lawyer"
          className="text-[#83B582] hover:text-[#55a754] font-semibold"
        >
          Read More 
        </a>
      </div>
    </div>

    {/* Lawyer 3 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
        alt="Lawyer 3"
        className="w-full h-60 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Hnin Ei Mon</h3>
        <p className="text-gray-600 mb-4">
          Passionate about human rights and civil litigation, advocating
          strongly for fairness and equal protection.
        </p>
        <a
          href="/lawyer"
          className="text-[#83B582] hover:text-[#55a754] font-semibold"
        >
          Read More 
        </a>
      </div>
    </div>
  </div>
</div>


      {/* SERVICES */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                num: "01",
                title: "Get Your Legal Advice",
                body: "Understand your options and next steps with a quick consult.",
              },
              {
                num: "02",
                title: "Work with Expert Lawyers",
                body: "Dedicated specialists in corporate, criminal, family, and more.",
              },
              {
                num: "03",
                title: "Clear, Fair Fees",
                body: "Upfront pricing and tailored scopes—no surprises.",
              },
              {
                num: "04",
                title: "Secure Document Review",
                body: "Share files safely and track your case in one place.",
              },
            ].map((card) => (
              <div
                key={card.num}
                className="h-full rounded border p-4 shadow-sm"
              >
                <span className="text-sm text-gray-500">{card.num}</span>
                <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
}



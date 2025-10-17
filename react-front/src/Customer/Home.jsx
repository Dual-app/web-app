import React, { useState } from "react";
import LoginModal from "./loginclient.jsx";
import RegisterModal from "./registerclient.jsx"; 

export default function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="/" className="text-lg font-semibold">
            LegalEase <span className="text-[#83B582]">Law Firm</span>
          </a>

          <input
            id="nav-toggle"
            type="checkbox"
            className="peer hidden"
            aria-hidden="true"
          />

          <div className="hidden items-center gap-6 md:flex">
            {[
              ["Home", "/"],
              ["About Us", "/about.html"],
              ["Practice Areas", "/practice-areas.html"],
              ["Case Studies", "/case.html"],
              ["Attorneys", "/attorneys.html"],
              ["Blog", "/blog.html"],
              ["Contact", "/contact.html"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-gray-200 hover:text-white"
              >
                {label}
              </a>
            ))}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenLogin(true)}
                className="rounded border border-white/70 px-3 py-1.5 text-sm hover:bg-white hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                className="rounded bg-[#83B582] px-3 py-1.5 text-sm font-medium text-black hover:bg-[#55a754]"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <label
            htmlFor="nav-toggle"
            className="cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div className="h-0.5 w-6 bg-white"></div>
              <div className="h-0.5 w-6 bg-white"></div>
              <div className="h-0.5 w-6 bg-white"></div>
            </div>
          </label>
        </div>

        {/* Mobile menu */}
        <div className="peer-checked:block hidden border-t border-gray-700 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            {[
              ["Home", "/"],
              ["About Us", "/about.html"],
              ["Practice Areas", "/practice-areas.html"],
              ["Case Studies", "/case.html"],
              ["Attorneys", "/attorneys.html"],
              ["Blog", "/blog.html"],
              ["Contact", "/contact.html"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-gray-200 hover:text-white"
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenLogin(true)}
                className="w-full rounded border border-white/70 px-3 py-2 text-center text-sm hover:bg-white hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                className="w-full rounded bg-[#83B582] px-3 py-2 text-sm font-medium text-black hover:bg-[#55a754]"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        className="relative flex items-center"
        style={{
          backgroundImage: "url(/images/bg_1.jpg)",
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
                href="/topuppg.jsx"
                className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Book for Consultation
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
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LegalEase Law Firm. For education.
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </div>
  );
}

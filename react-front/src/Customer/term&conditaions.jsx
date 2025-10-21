import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-[#1A3636] mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last updated: October 2025
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <b>LegalEase Law Firm</b>. By accessing or using our
            website and services, you agree to comply with these Terms and
            Conditions. Please read them carefully before proceeding. If you do
            not agree with any part of these terms, you should discontinue use
            of our services immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            2. Legal Services Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            LegalEase Law Firm provides legal advice and consultation through
            professional lawyers. However, the information available on this
            website or shared during initial consultations should not be
            considered a full legal opinion until a formal engagement agreement
            is made between the client and the firm.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            3. Confidentiality and Client Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We are committed to protecting all information shared by our clients.
            All personal and case-related data provided through this platform
            will remain strictly confidential and used only for legal service
            purposes. No client information will be disclosed to third parties
            without written consent, except where required by law.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            4. Consultation Fees and Payment
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our firm charges a fixed consultation fee of <b>$200</b> per case.
            This fee covers the initial consultation and all follow-up discussions
            related to the same case. Payment is required before booking a
            consultation and can be made through our available payment options
            (Wave Pay, KBZPay, or Credit Card). Fees are non-refundable once
            services are rendered.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            5. Lawyer Assignment and Communication
          </h2>
          <p className="text-gray-700 leading-relaxed">
            After a successful consultation booking, a suitable lawyer will be
            assigned to the client based on the case type. Clients may communicate
            with their assigned lawyer through our office or secure communication
            channels as advised by the firm. The firm reserves the right to
            reassign a lawyer if necessary.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            6. Client Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Clients are responsible for providing accurate and complete
            information regarding their legal matters. Any false, misleading,
            or incomplete information may result in the termination of the
            service agreement without refund.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            7. Use of Uploaded Documents
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Clients may upload relevant documents to support their cases.
            All uploaded materials will be securely stored and accessible
            only to authorized legal professionals within the firm. Clients
            should ensure that all documents are accurate and relevant to
            their legal inquiry.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            LegalEase Law Firm will not be held responsible for any indirect,
            incidental, or consequential losses arising from the use of our
            website or services. While we strive to provide accurate and timely
            legal advice, outcomes in legal matters are not guaranteed.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            9. Modification of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms and Conditions at any
            time. Updated terms will be effective immediately upon posting on
            this website. Clients are encouraged to review this page regularly
            to stay informed of any changes.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
            10. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For questions regarding these Terms and Conditions, please contact
            us at:
          </p>
          <ul className="mt-2 text-gray-700">
            <li>Email: <b>info@legaleaselaw.com</b></li>
            <li>Phone: <b>+95 9 123 456 789</b></li>
            <li>Address: LegalEase Law Firm, Yangon Main Office</li>
          </ul>
        </section>

        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LegalEase Law Firm. All rights reserved.
        </div>
      </div>
    </div>
  );
}

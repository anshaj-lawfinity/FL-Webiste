"use client";

// Static disclaimer UI (same layout as Privacy Policy / Terms).
export default function DisclaimerPage() {
  return (
    <div className="mt-20">
      <div>
        <div className="bg-gradient-to-br from-[#7A3EF2] to-[#a674f7] text-white md:py-40 py-20 md:px-0 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Disclaimer
            </h1>
            <p className="text-base max-w-xl mb-8">
              Please thoroughly read this Disclaimer before using FactoryLicence.in
              or our services. FactoryLicence.in is a private consultancy and
              application-facilitating platform that helps manufacturers, factory
              owners, entrepreneurs, and businesses obtain factory-related licenses,
              registrations, and documentation, and for factory applications or
              compliances.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-0 px-4 py-0 pb-8 grid md:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-8">
          <section id="our-role">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Our Role
            </h3>
            <div className="text-gray-700 mt-2 text-justify space-y-3">
              <p>
                This website, FactoryLicence.in, is different from any government
                department that issues factory licences; we are not affiliated,
                operated, or officially associated with, or a part of, any
                Government authority.
              </p>
              <p>
                We can only do consultancy, provide document support, help in
                procedure guidance and do application facilitation. We do not
                grant or have regulatory powers in factory licenses.
              </p>
              <p>
                Thereby, whether a licence is approved, rejected, renewed,
                modified, suspended or cancelled is subject to the laws and to
                the decision of the competent government authority.
              </p>
            </div>
          </section>

          <section id="website-information">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Website Information
            </h3>
            <div className="text-gray-700 mt-2 text-justify space-y-3">
              <p>
                The information published in the FactoryLicence.in is intended to
                be for a general informational and educational reference. It is
                not intended to be a legal, occupational safety, financial, or
                professional opinion.
              </p>
              <p>
                The licensing requirements for factories could differ by state or
                jurisdiction based upon the type of manufacturing activity,
                premises, number of employees, type of machinery or processes
                operated, and other applicable requirements.
              </p>
              <p>
                Government processes, paperwork, forms, requirements for
                eligibility and compliance can vary. The user must confirm that
                the requirements that may apply to the decision and/or
                application is within the relevant governmental body.
              </p>
            </div>
          </section>

          <section id="prices-timelines">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Prices, Timelines and Approval
            </h3>
            <div className="text-gray-700 mt-2 text-justify space-y-3">
              <p>
                The information about fees, processing times, documents required,
                and other procedures described on this website shall be
                considered as general information and guidance and is not
                intended to replace specific details that may appear in
                government feeders or attached as filers. Requirements and
                charges are subject to change based on the application and
                jurisdiction that may apply.
              </p>
              <p>
                Processing times are approximate and may also be impacted by
                inspections, verification, government enquiries, deficiencies,
                technical requirements, objections or other regulatory
                considerations.
              </p>
              <p>
                Approval or completion of an application within a certain time
                period is not guaranteed. The final assessment will be
                determined by the competent authority.
              </p>
            </div>
          </section>

          <section id="limitation-of-liability">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Limitation of Liability
            </h3>
            <p className="text-gray-700 mt-2 text-justify">
              The use of information and resources provided on the
              FactoryLicence.in website is at your own discretion. To the extent
              allowed under the applicable law, FactoryLicence.in, manufacturers,
              directors, employees, consultants and representatives of
              FactoryLicence.in will not be liable for any loss or damage to
              anyone who relies upon the information of this website or decisions
              made by government authorities.
            </p>
          </section>

          <section id="external-websites">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              External Websites
            </h3>
            <p className="text-gray-700 mt-2 text-justify">
              There might be links to third-party sites and official government
              portals in FactoryLicence.in. The following links are made for ease
              of access and for information only. We are not responsible for the
              accuracy, security, content, or policies of external websites and
              do not control or endorse them.
            </p>
          </section>

          <section id="intellectual-property">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Intellectual Property
            </h3>
            <div className="text-gray-700 mt-2 text-justify space-y-3">
              <p>
                All original text, graphics, images, design, logos and articles
                published on the FactoryLicence.in are, unless otherwise stated,
                subject to applicable intellectual property rights. Copying,
                reproduction, distribution, or commercial publishing of any kind
                is not permitted without our permission.
              </p>
              <p>
                Mention of government departments, licensing authorities, laws
                and regulations, forms, licences and official portals is solely
                to provide details about the surrounding services and the
                procedures pertinent to those services. They are not indicative
                of government affiliation, sponsorship, partnership, endorsement
                or official representation.
              </p>
            </div>
          </section>

          <section id="acknowledgment">
            <h3 className="text-xl font-semibold mt-8 text-[#7A3EF2]">
              Acknowledgment
            </h3>
            <p className="text-gray-700 mt-2 text-justify">
              Continuing using FactoryLicence.in or by using our services, you
              acknowledge you have read, understood and accepted this Disclaimer.
            </p>
          </section>
        </div>

        {/* Table of Contents */}
        <aside className="hidden md:block sticky top-24 self-start mt-10">
          <div className="border-l-2 pl-4 border-gray-200">
            <h4 className="text-xl font-semibold mb-4 text-[#7A3EF2]">
              Table of contents
            </h4>
            <ul className="space-y-3 text-sm text-[#7A3EF2]">
              <li>
                <a href="#our-role" className="hover:underline">
                  1. Our Role
                </a>
              </li>
              <li>
                <a href="#website-information" className="hover:underline">
                  2. Website Information
                </a>
              </li>
              <li>
                <a href="#prices-timelines" className="hover:underline">
                  3. Prices, Timelines and Approval
                </a>
              </li>
              <li>
                <a href="#limitation-of-liability" className="hover:underline">
                  4. Limitation of Liability
                </a>
              </li>
              <li>
                <a href="#external-websites" className="hover:underline">
                  5. External Websites
                </a>
              </li>
              <li>
                <a href="#intellectual-property" className="hover:underline">
                  6. Intellectual Property
                </a>
              </li>
              <li>
                <a href="#acknowledgment" className="hover:underline">
                  7. Acknowledgment
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

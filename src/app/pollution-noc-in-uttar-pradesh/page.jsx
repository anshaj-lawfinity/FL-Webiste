// app/factory-licence-in-delhi/page.jsx

import PollutionNOCUPPage from "@/components/pages/PollutionNOCUPPage";
import { CmsLandingBoundary } from "@/components/cms/FactoryCmsJsonLd";
import RecentBlogsSection from "@/components/RecentBlogsSection";
import { buildLandingPageMetadata, getFactoryCmsLandingPage } from "@/lib/cms";

const LANDING_SLUG = "pollution-noc-in-uttar-pradesh";

// ISR: cache rendered page for 5 minutes instead of blocking on CMS every request.
export const revalidate = 300;

const fallbackMetadata = {
  title: "Pollution NOC in Uttar Pradesh – Apply Online & Certificate",
  description:
    "Get pollution noc in uttar pardesh with noc from pollution control board in uttar pardesh, CTO, certificate, documents required & factory waste authorisation.",
  keywords: [
    "pollution noc in uttar pardesh",
    "noc pollution control board in uttar pardesh",
    "pollution noc certificate in uttar pardesh",
    "noc from pollution control board in uttar pardesh",
    "cto pollution control board in uttar pardesh",
    "documents required for pollution noc",
    "pollution noc for factory in uttar pardesh",
  ],
  openGraph: {
    title: "Pollution NOC in Uttar Pradesh – Apply Online & Certificate",
    description:
      "Get pollution noc in uttar pardesh with noc from pollution control board in uttar pardesh, CTO, certificate, documents required & factory waste authorisation.",
    url: "https://factorylicence.in/pollution-noc-in-uttar-pradesh",
    type: "website",
    siteName: "FactoryLicence.in",
  },
  alternates: {
    canonical: "https://factorylicence.in/pollution-noc-in-uttar-pradesh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata() {
  return buildLandingPageMetadata(LANDING_SLUG, fallbackMetadata);
}

export default async function Page() {
  // Server-rendered so the CMS body ships in the initial HTML — avoids the
  // hardcoded-then-CMS-content flash that the old client-only DOM sync caused.
  const page = await getFactoryCmsLandingPage(LANDING_SLUG);

  return (
    <>
      <link rel="preload" as="image" href="/assets/pollution-control-board-license-in-up.webp" fetchPriority="high" media="(min-width: 768px)" />
      <link rel="preload" as="image" href="/assets/pollution-control-board-license-in-up-mobile.jpg" fetchPriority="high" media="(max-width: 767px)" />
      <PollutionNOCUPPage page={page} />
      <RecentBlogsSection />
      <CmsLandingBoundary slug={LANDING_SLUG} page={page} />
    </>
  );
}

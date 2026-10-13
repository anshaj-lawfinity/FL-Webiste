import DisclaimerPage from "@/components/pages/DisclaimerPage";
import FactoryCmsStaticPage from "@/components/cms/FactoryCmsStaticPage";
import { buildCmsMetadata, getFactoryCmsStaticPageFresh } from "@/lib/cms";
import { Suspense } from "react";

// ISR: cache rendered page for 5 minutes instead of blocking on CMS every request.
export const revalidate = 300;

const fallbackMetadata = {
  title: "Disclaimer – Factorylicence",
  description:
    "Read the FactoryLicence.in disclaimer. We are a private consultancy platform and are not affiliated with any government authority issuing factory licences.",
  keywords: ["Disclaimer", "FactoryLicence.in Disclaimer"],
  openGraph: {
    title: "Disclaimer – Factorylicence",
    description:
      "Read the FactoryLicence.in disclaimer. We are a private consultancy platform and are not affiliated with any government authority issuing factory licences.",
    url: "https://factorylicence.in/disclaimer",
    type: "website",
    siteName: "FactoryLicence.in",
  },
  alternates: {
    canonical: "https://factorylicence.in/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata() {
  const cmsPage = await getFactoryCmsStaticPageFresh("disclaimer");
  return buildCmsMetadata(cmsPage, fallbackMetadata);
}

export default function Page() {
  return (
    <Suspense fallback={<DisclaimerPage />}>
      <DisclaimerCmsContent />
    </Suspense>
  );
}

async function DisclaimerCmsContent() {
  const cmsPage = await getFactoryCmsStaticPageFresh("disclaimer");

  if (cmsPage) {
    return <FactoryCmsStaticPage page={cmsPage} fallbackTitle="Disclaimer" />;
  }

  return <DisclaimerPage />;
}

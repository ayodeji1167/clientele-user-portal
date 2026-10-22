import { Head } from "@/components/seo/Head";
import { OverviewTemplate } from "../template/OverviewTemplate";

export function OverviewPage() {
  return (
    <>
      <Head title="Overview" description="What’s happening in your workspace" />
      <OverviewTemplate />
    </>
  );
}

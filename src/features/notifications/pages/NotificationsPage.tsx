import { Head } from "@/components/seo/Head";
import { NotificationsTemplate } from "../template/NotificationsTemplate";

export function NotificationsPage() {
  return (
    <>
      <Head
        title="Notifications"
        description="Client activity, project updates and payments"
      />
      <NotificationsTemplate />
    </>
  );
}

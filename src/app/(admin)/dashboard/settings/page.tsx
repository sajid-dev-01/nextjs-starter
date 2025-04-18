import SettingTabs from "~/features/settings/components/setting-tabs";

export const metadata = {
  title: "Settings | Dashboard",
};

export default async function SettingsPage() {
  return (
    <div>
      <SettingTabs />
    </div>
  );
}

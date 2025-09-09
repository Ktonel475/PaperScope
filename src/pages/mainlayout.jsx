import { Outlet } from "react-router-dom";
import SearchBar from "@/components/search";
import Header from "@/components/header";
import { AppShell } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

export default function MainLayout() {
  const pinned = useHeadroom({ fixedAt: 50 });
  return (
    <AppShell header={{ height: 180, collapsed: !pinned, offset: false }}>
      <AppShell.Header height={180}>
        <Header />
        <div className="search">
          <SearchBar />
        </div>
      </AppShell.Header>
      <AppShell.Main pt="var(--app-shell-header-height)">
        <Outlet /> 
      </AppShell.Main>
    </AppShell>
  );
}
  
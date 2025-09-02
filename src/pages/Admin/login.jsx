import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import { AppShell } from "@mantine/core";

export default function AdminLayout() {
  return (
    <AppShell header={{ height: 109 }} footer={{height: 60}}>
      <AppShell.Header height={109}>
        <Header />
      </AppShell.Header>
      <AppShell.Main p={200} >
        <div className="loginElement">
          <Login />
        </div>
      </AppShell.Main>
      <AppShell.Footer height={20}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import { AppShell } from "@mantine/core";

export default function AdminLayout() {
  return (
    <AppShell header={{ height: 100 }} footer={{height: 50}}>
      <AppShell.Header height={100}>
        <Header />
      </AppShell.Header>
      <AppShell.Main p={200} >
        <div className="loginElement">
          <Login />
        </div>
      </AppShell.Main>
      <AppShell.Footer height={50}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

import { AppShell, Button } from "@mantine/core";
import Header from "@/components/header";
import { GoPlus } from "react-icons/go";
import PaperTable from "@/components/PaperTable";
import { useRef } from "react";

export default function Demo() {
  const ref = useRef(null);
  return (
    <AppShell header={{ height: 76 }} padding="md">
      <AppShell.Header height={76}>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Button
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            borderRadius: "50%",
            width: 60,
            height: 60,
            zIndex: 100,
          }}
          onClick={() => ref.current.enableModal()}
        >
          <GoPlus size={100} />
        </Button>
        <PaperTable ref={ref} />
      </AppShell.Main>
    </AppShell>
  );
}

import { AppShell } from "@mantine/core";

import { Outlet } from "react-router-dom";
import NavHeader from "./Header";

const Layout = () => {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      header={<NavHeader />}
    >
      <Outlet />
    </AppShell>
  );
};

export default Layout;

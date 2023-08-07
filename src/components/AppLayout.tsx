import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppShell,
  Navbar,
  NavLink,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
} from "@mantine/core";

import { navData } from "../lib/nav/data";

const AppLayout: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 220 }}
        >
          {navData.map((item: any, key: number) => (
            <NavLink
              key={key}
              component={Link}
              to={item.route}
              label={item.label}
              icon={<item.icon size="1rem" stroke={1.5} />}
              active={item.route === location.pathname}
            />
          ))}
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={4}>Amari Angels</Title>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default AppLayout;

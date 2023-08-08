import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppShell,
  Navbar,
  NavLink,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Box,
  Card,
  Group,
} from "@mantine/core";

import { navData } from "../lib/nav/data";
import AvatarMenu from "./AvatarMenu";

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
          {navData.map((item: any, key: number) => {
            // Checks the route for home route and nested routes
            const isRootLink = item.route === "/";
            const isActive = isRootLink
              ? location.pathname === item.route
              : location.pathname.startsWith(item.route);
            return (
              <NavLink
                key={key}
                component={Link}
                to={item.route}
                label={item.label}
                icon={<item.icon size="1rem" stroke={1.5} />}
                active={isActive}
              />
            );
          })}
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }}>
          <Group
            sx={{ height: "100%", alignItems: "center" }}
            px={20}
            position="apart"
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
            <AvatarMenu />
          </Group>
        </Header>
      }
    >
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        })}
      >
        <Card mih="80vh">
          <Outlet />
        </Card>
      </Box>
    </AppShell>
  );
};

export default AppLayout;

import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, useMantineColorScheme } from "@mantine/core";
import {
  IconUserCircle,
  IconBrightness,
  IconLogout2,
} from "@tabler/icons-react";
import { useAuth } from "../util/AuthContext";

const AvatarMenu: React.FC = () => {
  const { handleUserLogout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Menu
      shadow="md"
      width={150}
      trigger="hover"
      openDelay={100}
      closeDelay={400}
      position="bottom-end"
      withArrow
    >
      <Menu.Target>
        <Avatar color="cyan" radius="xl" src="/admin1.png">
          SA
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to="/profile"
          icon={<IconUserCircle size={14} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          icon={<IconBrightness size={14} />}
          onClick={() => toggleColorScheme()}
        >
          {dark ? "Light mode" : "Dark mode"}
        </Menu.Item>
        <Menu.Item icon={<IconLogout2 size={14} />} onClick={handleUserLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;

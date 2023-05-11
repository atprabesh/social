import { useAuth } from "@hooks/useAuth";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  MantineNumberSize,
  Menu,
  SystemProp,
  Text,
} from "@mantine/core";
import { getInitials } from "@utils/getInitials";
import { CSSProperties, FC } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

type Props = {
  size?: MantineNumberSize | undefined;
  direction?: SystemProp<CSSProperties["flexDirection"]>;
};

const UserProfileMenu: FC<Props> = ({ size = "md" }) => {
  const auth = useAuth();

  return (
    <Group position="center">
      <Menu
        withArrow
        styles={{
          item: {
            width: "130px",
          },
        }}
      >
        <Menu.Target>
          {auth?.isLoggedIn && (
            <div>
              <Avatar
                my={3}
                src={auth.user?.photoURL}
                color="cyan"
                radius={10000}
                size={size}
                sx={{ cursor: "pointer" }}
              >
                {!auth.user?.photoURL &&
                  getInitials(auth.user?.displayName ?? "")}
              </Avatar>
            </div>
          )}
        </Menu.Target>

        <Menu.Dropdown miw={"200px"}>
          <Box sx={{ textAlign: "center" }} py={"md"}>
            <Center>
              <Avatar
                my={4}
                src={auth?.user?.photoURL}
                color="cyan"
                radius={10000}
                size={size}
                sx={{ cursor: "pointer" }}
                component={Link}
                to={"/myprofile"}
              >
                {!auth?.user?.photoURL &&
                  getInitials(auth?.user?.displayName ?? "")}
              </Avatar>
            </Center>
            <Text size={"xl"} weight="bolder">
              {auth?.user?.displayName}
            </Text>
          </Box>
          <Divider />
          <Menu.Item
            onClick={auth?.onLogOut}
            sx={{ width: "100%" }}
            icon={<RiLogoutBoxLine />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default UserProfileMenu;

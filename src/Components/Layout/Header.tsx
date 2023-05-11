import { useAuth } from "@hooks/useAuth";
import { Container, createStyles, Header, Text } from "@mantine/core";
import UserProfileMenu from "@components/UI/UserProfileMenu";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const HEADER_HEIGHT = 60;
const NavHeader = () => {
  const { classes } = useStyles();
  const auth = useAuth();

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.inner} fluid>
        <Text component={Link} to={"/"}>
          YourBook
        </Text>
        {auth?.isLoggedIn && <UserProfileMenu />}
      </Container>
    </Header>
  );
};

export default NavHeader;

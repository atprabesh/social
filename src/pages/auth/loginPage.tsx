import { useAuth } from "@hooks/useAuth";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    await auth?.loginWithEmailPassword(values.email, values.password);
    setLoading(false);
  };

  return (
    <Container fluid my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome
      </Title>
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Paper p={30} mt={30} radius="md" withBorder shadow="md">
          <TextInput
            {...form.getInputProps("email")}
            autoComplete={"email"}
            label="Email"
            type={"email"}
            placeholder="Your email address"
            required
            name="email"
          />
          <PasswordInput
            {...form.getInputProps("password")}
            label="Password"
            autoComplete={"password"}
            placeholder="Your password"
            required
            mt="md"
            name="password"
          />
          <Group position="right" mt={10}></Group>
          <Center sx={{ flexDirection: "column" }}>
            <Button loading={loading} w={150} mt="xl" type="submit">
              Sign in
            </Button>
          </Center>
        </Paper>
      </form>
      <Center>
        {" "}
        {"Don't"} have account?
        <Anchor component={Link} to="/signup" ml={5}>
          Create now
        </Anchor>
      </Center>
    </Container>
  );
};
export default LoginPage;

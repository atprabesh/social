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
const SignupPage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onFormSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await auth?.createUserWithEmail({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
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
        Register Account
      </Title>
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Paper p={30} mt={30} radius="md" withBorder shadow="md">
          <TextInput
            {...form.getInputProps("firstName")}
            autoComplete={"name"}
            label="First Name"
            type={"text"}
            placeholder="Your First Name"
            required
            mt="md"
            name="firstName"
          />

          <TextInput
            {...form.getInputProps("lastName")}
            autoComplete={"lastName"}
            label="Last Name"
            type={"text"}
            placeholder="Your Last Name"
            required
            mt="md"
            name="lastName"
          />
          <TextInput
            {...form.getInputProps("email")}
            autoComplete={"email"}
            label="Email"
            type={"email"}
            placeholder="Your email address"
            required
            mt="md"
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
          <Group position="right" mt={10}>
            {/* <Link to={RoutePath.forgotPassword}>
                <Anchor
                component="button"
                align="end"
                type="button"
                color="dimmed"
                size="xs"
                >
                Forgot password?
                </Anchor>
              </Link> */}
          </Group>
          <Center>
            <Button loading={loading} w={150} mt="xl" type="submit">
              Sign up
            </Button>
          </Center>
        </Paper>
      </form>
      <Center>
        {" "}
        Already have an account?
        <Anchor component={Link} ml={5} to="/login">
          Login
        </Anchor>
      </Center>
    </Container>
  );
};

export default SignupPage;

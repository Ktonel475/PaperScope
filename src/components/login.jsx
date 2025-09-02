import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Modal,
  Text,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { IoWarningOutline } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      open();
    }
  };

  return (
    <Container size={420} my={60}>
      <Paper withBorder shadow="md" p="xl" mt="lg" radius="lg">
        <Title align="center" order={2} fw={700} c="blue" pt={10} pb={10}>
          Admin Login
        </Title>
        <form onSubmit={handleLogin}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Button type="submit" fullWidth radius="md" mt="md">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>

      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Flex direction="column" align="center" gap="sm" py="md">
          <IoWarningOutline size={80} color="#e03131" />
          <Text fw={600} size="lg" align="center">
            Incorrect email or password.
          </Text>
        </Flex>
      </Modal>
    </Container>
  );
}

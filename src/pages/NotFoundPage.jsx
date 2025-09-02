import { Container, Title, Text, Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Container ta="center">
        <Title order={1} c="red" mb="sm">
          404
        </Title>
        <Text size="lg" mb="lg">
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button component={Link} to="/" radius="md">
          Go back home
        </Button>
      </Container>
    </Flex>
  );
}

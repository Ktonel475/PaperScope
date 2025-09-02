import {
  Image,
  Flex,
  Grid,
  Button,
  Title,
} from "@mantine/core";

export default function Header() {
  return (
    <div className="header">
        <Grid align="center">
          <Grid.Col span={6}>
            <Flex justify="flex-start" align="center">
              <Image src="../src/assets/logo.png" alt="Logo" h={60} w={60} p={8} />
              <Title order={3}>Organization Name</Title>
            </Flex>
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col span={3}>
            <Flex justify="flex-end" align="center" h="100%" gap="md" p="md">
              <Button variant="subtle" color="rgba(255, 255, 255, 1)">About us</Button>
              <Button variant="subtle" color="rgba(255, 255, 255, 1)">Contact</Button>
            </Flex>
          </Grid.Col>
        </Grid>
    </div>
  );
}

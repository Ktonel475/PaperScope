import { Image, Flex, Grid, Button, Anchor } from "@mantine/core";
import img from "@/assets/images.png";

export default function Header() {
  return (
    <div className="header">
      <Grid align="center">
        <Grid.Col span={6}>
          <Flex justify="flex-start" align="center">
            <Image src={img} alt="Logo" maxh="100px" h={100} w="auto" p={8} />
          </Flex>
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
        <Grid.Col span={3}>
          <Flex justify="flex-end" align="center" h="100%" gap="md" p="md">
            <Anchor href="https://www.cpu.ac.th/" target="_blank">
              <Button variant="subtle" color="rgba(255, 255, 255, 1)">
                About us
              </Button>
            </Anchor>
            <Anchor href="https://www.cpu.ac.th/?page_id=1395" target="_blank">
              <Button variant="subtle" color="rgba(255, 255, 255, 1)">
                Contact us
              </Button>
            </Anchor>
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}

import { Card, Text, Group, Badge, Stack, Title } from "@mantine/core";

function PaperCard({ paper }) {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack spacing="sm">
        <Title order={4}>{paper.title}</Title>

        <Text size="md" c="dimmed">
          {paper.authors.map((author) => author.user.name).join(", ")}
        </Text>

        <Text size="sm" c="gray">
          Year: {new Date(paper.date).getFullYear()}
        </Text>

        <Group spacing="xs">
          {paper.tags.map((tag) => (
            <Badge key={tag.tag.id} color="blue" variant="light">
              {tag.tag.name}
            </Badge>
          ))}
        </Group>

        {paper.abstract && (
          <Text size="sm" lineClamp={3} color="dimmed">
            {paper.abstract}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default PaperCard;

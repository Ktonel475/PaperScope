import { Container, Group, Text, Anchor } from '@mantine/core';

export default function Footer({ hideBorder }) {
  return (
    <footer
      style={{
        borderTop: hideBorder ? "none" : "1px solid var(--mantine-color-gray-3)",
        paddingTop: '1rem',
        paddingBottom: '1rem',
        backgroundColor: 'var(--mantine-color-gray-0)',
      }}
    >
      <Container size="lg">
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} Paper Search. All rights reserved.
          </Text>

          <Group gap="md">
            <Anchor href="/about" size="sm" c="dimmed">
              About
            </Anchor>
            <Anchor href="https://github.com/ktonel475" target="_blank" size="sm" c="dimmed">
              GitHub
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}

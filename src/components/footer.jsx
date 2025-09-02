import { Container, Group, Text, Anchor } from '@mantine/core';

export default function Footer({ hideBorder }) {
  return (
    <footer
      style={{
        borderTop: hideBorder ? "none" : "1px solid var(--mantine-color-gray-3)",
        paddingTop: '1rem',
        paddingBottom: '1rem',
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
            <Anchor href="/contact" size="sm" c="dimmed">
              Contact
            </Anchor>
            <Anchor href="https://github.com" target="_blank" size="sm" c="dimmed">
              GitHub
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}

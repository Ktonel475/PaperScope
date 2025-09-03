import { Modal, Button, Group, Text } from "@mantine/core";

function ConfirmDeleteModal({ opened, onClose, onConfirm, recordName }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
    >
      <Text size="xl" fw={700} align="center">Alert</Text>
        <Text>
        Are you sure you want to delete <strong>{recordName}</strong>?
      </Text>

      <Group justify="space-between" mt="md" style={{ width: '100%' }}>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export default ConfirmDeleteModal;

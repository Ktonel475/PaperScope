import React, { useState, useEffect } from "react";
import {
  TextInput,
  MultiSelect,
  Button,
  Group,
  Flex,
  FileInput,
  Textarea,
  Paper,
  Anchor,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import ConfirmDeleteModal from "./confirmModal";
import { FaDownload, FaTimes } from "react-icons/fa";

const AddingForm = ({ closeModal, selectedID }) => {
  const [opened, { open, close }] = useDisclosure();
  const [modified, setModified] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [authors, setAuthors] = useState([{ id: "", name: "" }]);
  const [tags, setTags] = useState([{ id: "", name: "" }]);
  const [newFiles, setNewFiles] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    authors: [],
    affiliation: "",
    publication: "",
    tags: [],
    date: new Date().toISOString().split("T")[0],
    abstract: "",
    files: [],
  });

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewFileChange = (selectedFiles) => {
    if (selectedFiles) {
      setNewFiles(Array.from(selectedFiles));
    }
  };

  useEffect(() => {
    axios
      .get("/api/papers/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => console.error("Error fetching authors:", error));
    axios
      .get("/api/papers/tags")
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);
  useEffect(() => {
    if (!selectedID) {
      axios
        .get("/api/papers/newID")
        .then((response) => {
          setFormData((prev) => ({ ...prev, id: response.data.id }));
        })
        .catch((error) => console.error("Error fetching new ID:", error));
      return;
    }
    axios
      .get(`/api/papers/${selectedID}`)
      .then((response) => {
        setFormData((prev) => ({
          ...prev,
          id: response.data.id || 0,
          title: response.data.title || "",
          date: response.data.date
            ? response.data.date.split("T")[0]
            : new Date().toISOString().split("T")[0],
          authors: response.data.authors?.map((a) => a.user?.id || 0) || [],
          tags: response.data.tags?.map((t) => t.tag?.name || "") || [],
          abstract: response.data.abstract || "",
          affiliation: response.data.affiliation || "",
          publication: response.data.publication || "",
          files: response.data.files?.map((f) => f.filename || "") || [],
        }));
      })
      .catch((error) => console.error("Error fetching authors:", error));
    setModified(true);
    setIsNew(false);
  }, [selectedID]);

  const handleChange = (field, value) => {
    if (field === "authors") {
      const numericIds = value.map(Number);
      setFormData((prev) => ({ ...prev, [field]: numericIds }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    if (modified) {
      e.preventDefault();

      const submitData = new FormData();

      // Append regular form fields
      submitData.append("title", formData.title || "");
      submitData.append("abstract", formData.abstract || "");
      submitData.append("affiliation", formData.affiliation || "");
      submitData.append("publication", formData.publication || "");
      submitData.append("date", formData.date || "");
      submitData.append("authorIds", JSON.stringify(formData.authors || []));
      submitData.append("tagNames", JSON.stringify(formData.tags || []));

      // Append files from formData.files
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => {
          submitData.append("files", file); // 'files' matches upload.array('files')
        });
      }

      axios
        .patch(`/api/papers/${Number(formData.id)}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating paper:", error);
        });
    } else {
      e.preventDefault();

      const submitData = new FormData();

      // Append regular form fields for POST
      submitData.append("title", formData.title || "");
      submitData.append("abstract", formData.abstract || "");
      submitData.append("date", formData.date || "");
      submitData.append("authorIds", JSON.stringify(formData.authors || []));
      submitData.append("tagNames", JSON.stringify(formData.tags || []));
      submitData.append("affiliation", formData.affiliation || "");
      submitData.append("publication", formData.publication || "");

      // Append files for POST too
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => {
          submitData.append("files", file);
        });
      }

      axios
        .post("/api/papers", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Error creating paper:", error);
        });
    }
  };

  const openDeleteModal = () => {
    open();
  };

  const handleDelete = () => {
    close();
    axios.delete(`/api/papers/${formData.id}`).catch((error) => {
      console.error("Error deleting paper:", error);
    });
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <TextInput
        span={4}
        label="ID"
        placeholder="Enter ID"
        value={formData.id}
        onChange={(e) => handleChange("id", e.target.value)}
        disabled
      />
      <TextInput
        label="Title"
        placeholder="Enter Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />
      <MultiSelect
        label="Authors"
        placeholder="Select authors"
        data={authors.map((author) => ({
          value: author.id.toString(),
          label: author.name,
        }))}
        value={formData.authors.map(String)}
        onChange={(value) => handleChange("authors", value)}
        searchable
        required
      />
      <TextInput
        label="Affiliation"
        placeholder="Enter Affiliation"
        value={formData.affiliation}
        onChange={(e) => handleChange("affiliation", e.target.value)}
      />
      <TextInput
        label="Publication"
        placeholder="Enter Publication"
        value={formData.publication}
        onChange={(e) => handleChange("publication", e.target.value)}
      />
      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        data={tags.map((tag) => ({
          value: tag.name,
          label: tag.name,
        }))}
        value={formData.tags}
        onChange={(value) => handleChange("tags", value)}
        searchable
        required
      />
      <DateInput
        value={formData.date}
        onChange={(value) => handleChange("date", value)}
        label="Date input"
        placeholder="Date input"
      />
      <Textarea
        label="Abstract"
        placeholder="Enter Abstract"
        value={formData.abstract}
        onChange={(e) => handleChange("abstract", e.target.value)}
      />
        {/* Existing files from database */}
        {formData.files && formData.files.length > 0 && (
          <Paper p="md" mb="md" withBorder>
            <Text size="sm" weight={500} mb="xs">
              Existing Files:
            </Text>
            {formData.files.map((file, index) => (
              <Group key={index} position="apart" mb="xs">
                <Group>
                  <Text size="sm">{file.filename}</Text>
                  {file.size && (
                    <Text size="xs" color="dimmed">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </Text>
                  )}
                </Group>
                <Anchor
                  href={file.url}
                  download
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaDownload size={14} />
                </Anchor>
              </Group>
            ))}
          </Paper>
        )}

        {/* Upload new files */}
        <FileInput
          clearable
          label="Upload new files"
          placeholder="Select files to upload"
          value={newFiles}
          onChange={handleNewFileChange}
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
          mb="md"
        />

        {/* Show selected new files preview */}
        {newFiles.length > 0 && (
          <Paper p="md" withBorder>
            <Text size="sm" weight={500} mb="xs">
              New files to upload:
            </Text>
            {newFiles.map((file, index) => (
              <Group key={index} position="apart" mb="xs">
                <Text size="sm">{file.filename}</Text>
                <Group>
                  <Text size="xs" color="dimmed">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Text>
                  <Button
                    size="xs"
                    color="red"
                    variant="outline"
                    onClick={() => removeNewFile(index)}
                  >
                    <FaTimes size={12} />
                  </Button>
                </Group>
              </Group>
            ))}
          </Paper>
        )}
      <Flex justify="center" gap="sm" wrap="wrap">
        {isNew ? (
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        ) : (
          <Group justify="space-between" mt="md" style={{ width: "100%" }}>
            <Button type="button" color="red" onClick={openDeleteModal}>
              Delete
            </Button>
            <Button type="submit">Update</Button>
          </Group>
        )}
      </Flex>
      <ConfirmDeleteModal
        opened={opened}
        onClose={close}
        onConfirm={handleDelete}
        recordName={formData.title}
      />
    </form>
  );
};

export default AddingForm;

import React, { useState, useEffect } from "react";
import {
  TextInput,
  MultiSelect,
  Button,
  Group,
  Flex,
  FileInput,
  Textarea,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import ConfirmDeleteModal from "./confirmModal";

const AddingForm = ({ closeModal, selectedID }) => {
  const [opened, { open, close }] = useDisclosure();
  const [modified, setModified] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [authors, setAuthors] = useState([{ id: "", name: "" }]);
  const [tags, setTags] = useState([{ id: "", name: "" }]);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    authors: [],
    tags: [],
    date: new Date().toISOString().split("T")[0],
    abstract: "",
    files: [],
  });
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
          files: response.data.files?.map((f) => f.filename || "") || [],
        }));
      })
      .catch((error) => console.error("Error fetching authors:", error));
    setModified(true);
    setIsNew(false);
  }, [selectedID]);

  const handleChange = (field, value) => {
    if (field === "authors") {
      console.log("Selected strings from MultiSelect:", value);
      const numericIds = value.map(Number);
      console.log("Converted to numeric IDs:", numericIds);
      setFormData((prev) => ({ ...prev, [field]: numericIds }));
    } else if (field === "tags") {
      console.log("Selected tags:", value);
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    if (modified) {
      e.preventDefault();
      axios;
      axios
        .patch(`/api/papers/${Number(formData.id)}`, {
          title: formData.title || undefined,
          abstract: formData.abstract || undefined,
          date: formData.date || undefined,
          authorIds: formData.authors || [], // must be array of user IDs
          tagNames: formData.tags || [], // must be array of strings
        })
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating paper:", error);
        });
    }else{
      e.preventDefault();
      axios
        .post("/api/papers", {
          title: formData.title || undefined,
          abstract: formData.abstract || undefined,
          date: formData.date || undefined,
          authorIds: formData.authors || [], // must be array of user IDs
          tagNames: formData.tags || [], // must be array of strings
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
          value: author.id.toString(), // convert ID to string for MultiSelect
          label: author.name,
        }))}
        value={formData.authors.map(String)} // convert selected IDs to strings
        onChange={(value) => handleChange("authors", value)}
        searchable
        required
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
      <FileInput clearable label="Upload files" placeholder="Upload files" />
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

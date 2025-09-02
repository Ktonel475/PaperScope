import React, { useState, useEffect } from "react";
import {
  TextInput,
  MultiSelect,
  Button,
  Group,
  Flex,
  FileInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";

const AddingForm = ({ onSubmit, selectedID }) => {
  const [modified, setModified] = useState(false);
  const [authors, setAuthors] = useState([{ id: "", name: "" }]);
  const [tags, setTags] = useState([{ id: "", name: "" }]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    authors: [],
    tags: [],
    date: new Date().toISOString().split("T")[0],
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
    if (!selectedID) return;
    axios
      .get(`/api/papers/${selectedID}`)
      .then((response) => {
        setFormData((prev) => ({
          ...prev,
          id: response.data.id || "",
          title: response.data.title || "",
          date: response.data.date
            ? response.data.date.split("T")[0]
            : new Date().toISOString().split("T")[0],
          authors: response.data.authors?.map((a) => a.user?.name || "") || [],
          tags: response.data.tags?.map((t) => t.tag?.name || "") || [],
          files: response.data.files?.map((f) => f.filename || "") || [],
        }));
      })
      .catch((error) => console.error("Error fetching authors:", error));
    setModified(true);
  }, [selectedID]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    if (modified) {
      e.preventDefault();
      // Handle modified state
    }
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <TextInput
        label="ID"
        placeholder="Enter ID"
        value={formData.id}
        onChange={(e) => handleChange("id", e.target.value)}
        required
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
          value: author.name,
          label: author.name,
        }))}
        value={formData.authors}
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
      <FileInput clearable label="Upload files" placeholder="Upload files" />

      <Flex justify="center" gap="sm" wrap="wrap">
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddingForm;

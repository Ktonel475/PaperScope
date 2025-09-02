import { useEffect, useState, forwardRef } from "react";
import { Badge, Card, Table, Title, Flex, Modal } from "@mantine/core";
import axios from "axios";
import { useImperativeHandle } from "react";
import { useDisclosure } from "@mantine/hooks";
import AddingForm from "@/components/addingForm";
import SearchBar from "@/components/search";

const AdminPaperlist = forwardRef((Prop, ref) => {
  const [opened, { open, close }] = useDisclosure();
  const [papers, setPapers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState({});
  const [modifying, setModifying] = useState(false);

  useImperativeHandle(ref, () => ({
    enableModal: () => {
      setModifying(false);
      open();
    },
  }));

  useEffect(() => {
    axios
      .get("/api/papers")
      .then((response) => setPapers(response.data))
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setPapers(null);

        const {
          query = "",
          year = "",
          sort = "relevance",
          filters = {},
        } = filter;

        const params = {
          query,
          year,
          sort,
          filters: JSON.stringify(filters),
        };

        const response = await axios.get("/api/papers/search", { params });
        setPapers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]);
      }
    };

    fetchPapers();
  }, [filter]);

  const handleTableFilter = (filters) => {
    setFilter(filters);
  };

  const handleClick = (id) => {
    setSelectedId(id);
    setModifying(true);
    open();
  };

  const rows = (papers || []).map((paper) => (
    <Table.Tr key={paper.id} onClick={() => handleClick(paper.id)}>
      <Table.Td>{paper.id}</Table.Td>
      <Table.Td>{paper.title}</Table.Td>
      <Table.Td>
        {paper.authors?.map((a) => a.user?.name || "").join(", ") || "N/A"}
      </Table.Td>
      <Table.Td>
        {paper.tags?.map((tag, idx) => (
          <Badge key={idx} color="blue" variant="light">
            {tag.tag?.name || ""}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td>{paper.date.split("T")[0]}</Table.Td>
      <Table.Td>
        {paper.files?.map((a) => a.filename || "").join(", ") || "N/A"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder height="100%">
        <Flex justify="flex-start" p={10} pb={20}>
          <Title order={2}>Manuscript List</Title>
        </Flex>
        <div className="tableSearch">
          <SearchBar filterMode onSearch={handleTableFilter} />
        </div>
        <Table.ScrollContainer minWidth={500}>
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Tags</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>File</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal opened={opened} onClose={close} title={modifying ? "Edit Manuscript" : "Add Manuscript"} centered>
        <AddingForm selectedID={selectedId} />
      </Modal>
    </>
  );
});

export default AdminPaperlist;

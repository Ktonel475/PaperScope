import { useEffect, useState, forwardRef, useRef } from "react";
import { Badge, Card, Table, Title, Flex, Modal, Button } from "@mantine/core";
import axios from "axios";
import { useImperativeHandle } from "react";
import { useDisclosure } from "@mantine/hooks";
import AddingForm from "@/components/addingForm";
import SearchBar from "@/components/search";
import { notifications } from "@mantine/notifications";

const AdminPaperlist = forwardRef((Prop, ref) => {
  const [opened, { open, close }] = useDisclosure();
  const [papers, setPapers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState({
    sort: "id",
    order: "asc",
  });
  const [modifying, setModifying] = useState(false);
  
  // Use useRef to maintain stable order
  const papersOrderRef = useRef(new Map());
  const refreshKeyRef = useRef(0);

  useImperativeHandle(ref, () => ({
    enableModal: () => {
      setModifying(false);
      setSelectedId(null);
      open();
    },
  }));

  // Store original order when papers are first loaded
  useEffect(() => {
    if (papers && papers.length > 0) {
      papers.forEach((paper, index) => {
        papersOrderRef.current.set(paper.id, index);
      });
    }
  }, [papers]);

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
        const fetchedPapers = Array.isArray(response.data) ? response.data : [];
        
        // Store order for newly fetched papers
        fetchedPapers.forEach((paper, index) => {
          papersOrderRef.current.set(paper.id, index);
        });
        
        setPapers(fetchedPapers);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]);
      }
    };
    fetchPapers();
  }, [filter]); // Use ref value instead of state

  const handleTableFilter = (filters) => {
    setFilter(filters);
  };

  const handleClick = (id) => {
    setSelectedId(id);
    setModifying(true);
    open();
  };

  const closeModal = () => {
    close();
    console.log("Closing modal, refreshing paper list");
    
    // Force refresh using ref instead of state
    refreshKeyRef.current += 1;
    
    // Re-fetch data while maintaining order
    axios
      .get("/api/papers")
      .then((response) => {
        const updatedPapers = response.data;
        
        // Maintain existing order for papers that were already present
        const sortedPapers = [...updatedPapers].sort((a, b) => {
          const orderA = papersOrderRef.current.get(a.id) ?? Number.MAX_SAFE_INTEGER;
          const orderB = papersOrderRef.current.get(b.id) ?? Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        });
        
        // Update the order reference with new indices
        sortedPapers.forEach((paper, index) => {
          papersOrderRef.current.set(paper.id, index);
        });
        
        setPapers(sortedPapers);
      })
      .catch((error) => console.error("Error refreshing papers:", error));

    notifications.show({
      title: "Successful",
      message: "Operation completed successfully",
      autoClose: 5000,
    });
  };

  // Sort papers based on stored order before rendering
  const sortedPapers = papers ? [...papers].sort((a, b) => {
    const orderA = papersOrderRef.current.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const orderB = papersOrderRef.current.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [];

  const rows = sortedPapers.map((paper) => (
    <Table.Tr key={paper.id} onClick={() => handleClick(paper.id)}>
      <Table.Td>{paper.id}</Table.Td>
      <Table.Td>{paper.title}</Table.Td>
      <Table.Td>
        {paper.authors?.map((a) => a.user?.name || "").join(", ") || "N/A"}
      </Table.Td>
      <Table.Td>{paper.affiliation || "N/A"}</Table.Td>
      <Table.Td>{paper.publication || "N/A"}</Table.Td>
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
                <Table.Th>Affiliation</Table.Th>
                <Table.Th>Publication</Table.Th>
                <Table.Th>Tags</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>File</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={modifying ? "Edit Manuscript" : "Add Manuscript"}
        centered
        size="lg"
      >
        <AddingForm selectedID={selectedId} closeModal={closeModal} />
      </Modal>
    </>
  );
});

export default AdminPaperlist;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Container,
  SimpleGrid,
  Pagination,
  Loader,
  Stack,
  Text
} from "@mantine/core";
import { FiInfo } from "react-icons/fi";
import PaperCard from "@/components/paperInfo";
import "./index.css";

function PaperList() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [papers, setPapers] = useState(null); // null = not loaded yet
  const papersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setPapers(null); // trigger loading state
        // Get params from URL
        const query = searchParams.get("query") || "";
        const year = searchParams.get("year") || "";
        const sort = searchParams.get("sort") || "relevance";

        let filters = {};
        const filtersParam = searchParams.get("filters");
        if (filtersParam) {
          try {
            filters = JSON.parse(filtersParam);
          } catch (e) {
            console.error("Invalid filters JSON in URL", e);
          }
        }

        const params = {
          query,
          year,
          sort,
          filters: JSON.stringify(filters),
        };

        const response = await axios.get("/api/papers/search", { params });
        setPapers(Array.isArray(response.data) ? response.data : []);
        setCurrentPage(1); // reset to first page on new search
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]); // treat error as empty
      }
    };

    fetchPapers();
  }, [searchParams]);

  if (papers === null) {
    // Loading state
    return (
      <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
      </Flex>
    );
  }

  if (papers.length === 0) {
    // No results state
    return (
       <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
        <Stack align="center" spacing="md">
          <FiInfo size={48} color="#868e96" />
          <Text size="xl" weight={500} color="dimmed" align="center">
            No papers found
          </Text>
          <Text color="dimmed" align="center">
            Try adjusting your search or filters.
          </Text>
        </Stack>
      </Flex>
    );
  }

  // Pagination
  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = papers.slice(indexOfFirstPaper, indexOfLastPaper);

  return (
    <div className="main">
      <Container fluid>
        <SimpleGrid cols={1} spacing="lg">
          {currentPapers.map((paper) => (
            <div
              key={paper.id}
              onClick={() => navigate(`/paper/${paper.id}`)}
              style={{ cursor: "pointer" }}
            >
              <PaperCard paper={paper} />
            </div>
          ))}
        </SimpleGrid>

        <Flex justify="center" mt="lg">
          <Pagination
            total={Math.ceil(papers.length / papersPerPage)}
            value={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </Flex>
      </Container>
    </div>
  );
}

export default PaperList;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Container,
  SimpleGrid,
  Pagination,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { TbError404 } from "react-icons/tb";
import PaperCard from "@/components/paperInfo";
import Footer from "@/components/footer";

function PaperList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [papers, setPapers] = useState(null);
  const papersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("/api/papers");
        setPapers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]);
      }
    };

    fetchPapers();
  }, []);

  if (papers === null) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
      </Flex>
    );
  }

  if (papers.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
        <Stack align="center" spacing="md">
          <TbError404 size={48} color="#868e96" />
          <Text size="xl" weight={500} c="dimmed" align="center">
            Server Error
          </Text>
          <Text c="dimmed" align="center">
            Cannot fetch papers at the moment. Please try again later.
          </Text>
        </Stack>
      </Flex>
    );
  }

  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = papers.slice(indexOfFirstPaper, indexOfLastPaper);

  return (
    <>
      <div className="paper-list">
        <Container fluid>
          <SimpleGrid cols={1} spacing="lg">
            {currentPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => navigate(`/paper/${paper.id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                className="paper-card"
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
      <Footer />
    </>
  );
}

export default PaperList;

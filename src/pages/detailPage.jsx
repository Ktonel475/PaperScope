import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Title,
  Text,
  Badge,
  Group,
  List,
  Anchor,
  Grid,
  Box,
  Divider,
  Loader,
  Center,
  Card,
  AppShell,
} from "@mantine/core";
import { FaDownload } from "react-icons/fa";
import Footer from "@/components/footer";

export default function PaperDetail() {
  const { id } = useParams();

  const [paperData, setPaperData] = useState({
    title: "",
    authors: [],
    affiliation: "",
    abstract: "",
    tags: [],
    publication: "",
    date: new Date().toISOString(),
    doi: "",
    downloads: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`/api/papers/${id}`);
        setPaperData(response.data || {});
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError("Failed to load paper data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [id]);

  if (loading) {
    return (
      <Center style={{ height: "50vh" }}>
        <Loader size="lg" variant="dots" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: "50vh" }}>
        <Text color="red">{error}</Text>
      </Center>
    );
  }

  return (
    <AppShell>
      <AppShell.Main>
        <div className="paper-detail">
          <Card shadow="lg" padding="xl" radius="md">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 10 }}>
                <Title order={2}>{paperData.title || "Untitled Paper"}</Title>

                <Group mt="sm">
                  {paperData.tags?.map((tag, idx) => (
                    <Badge key={idx} color="blue" variant="light">
                      {tag.tag?.name || ""}
                    </Badge>
                  ))}
                </Group>

                <Text size="sm" mt="sm">
                  <strong>Authors:</strong>{" "}
                  {paperData.authors
                    ?.map((a) => a.user?.name || "")
                    .join(", ") || "N/A"}
                </Text>

                <Text size="sm" mt="xs">
                  <strong>Affiliation:</strong> {paperData.affiliation || "N/A"}
                </Text>
                <Text size="sm" mt="xs">
                  <strong>Publication:</strong> {paperData.publication || "N/A"}
                </Text>
                <Text size="sm" mt="xs">
                  <strong>Year:</strong>{" "}
                  {paperData.date
                    ? new Date(paperData.date).getFullYear()
                    : "N/A"}
                </Text>

                <Divider my="sm" />

                <Text size="sm" mt="sm">
                  <strong>Abstract:</strong>{" "}
                  {paperData.abstract || "No abstract available."}
                </Text>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 2 }}>
                <Box
                  style={{
                    position: "sticky",
                    top: "20px",
                    padding: "1rem",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Title order={4} mb="sm">
                    📥 Downloads
                  </Title>
                  <List spacing="sm">
                    {paperData.files?.length > 0 ? (
                      paperData.files.map((file, idx) => (
                        <List.Item
                          key={idx}
                          icon={<FaDownload style={{ color: "#1c7ed6" }} />}
                        >
                          <Anchor href={file.url} download>
                            {file.filename || "Unnamed file"}
                          </Anchor>
                        </List.Item>
                      ))
                    ) : (
                      <Text size="sm">No downloads available.</Text>
                    )}
                  </List>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>
        </div>
      </AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

import { useEffect, useState } from "react";
import { Stack, Title, Grid, TextInput, Select, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchForm({ filterMode, onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(null);
  const [sort, setSort] = useState("relevance");
  const [years, setYears] = useState([2025, 2024, 2023]);
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("/api/papers/years");
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };
    fetchYears();
  }, []);

  const handleSearchClick = () => {
    const regex = /\$(\w+):(\S+)/g;
    let match;
    const filters = {};
    const rest = query.replace(regex, "").trim();
    while ((match = regex.exec(query)) !== null) {
      const [, key, value] = match;
      filters[key] = value;
    }
    console.log("Parsed filters:", filters);
    if (filterMode) {
      onSearch({
        query: rest,
        year: year,
        sort: sort,
        filters: filters,
      });
    } else {
      navigate(
        `/search?query=${encodeURIComponent(rest)}&year=${encodeURIComponent(
          year || ""
        )}&sort=${encodeURIComponent(sort)}&filters=${encodeURIComponent(
          JSON.stringify(filters)
        )}`
      );
    }
  };

  return (
    <Stack gap="md" p="lg">
      <Grid align="end">
        <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
          <TextInput
            label="Keyword"
            placeholder='Search papers… (use $key:value, e.g. $author:Smith $tag:"Deep Learning" $year:2024)'
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchClick();
              }
            }}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
          <Select
            label="Year"
            placeholder="Any"
            data={years.map(String)}
            clearable
            value={year}
            onChange={(v) => setYear(v)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
          <Select
            label="Sort by"
            data={[
              { value: "relevance", label: "Relevance" },
              { value: "year_desc", label: "Year ↓" },
              { value: "year_asc", label: "Year ↑" },
              { value: "title_asc", label: "Title A–Z" },
              { value: "title_desc", label: "Title Z–A" },
            ]}
            value={sort}
            onChange={(v) => setSort(v || "relevance")}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 12, md: 2 }}>
          <Button fullWidth onClick={handleSearchClick} radius="xl" size="md">
            Search
          </Button>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default SearchForm;

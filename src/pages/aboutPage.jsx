import { Card, Container, Title, Text, List } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

export default function About() {
  return (
    <div className="about-page">
      <Container size="sm">
        <Card shadow="lg" padding="xl" className="about-card">
          <Title order={2} mb="md" align="center">About This Project</Title>
          <Text mb="md">
            This web application is a paper searching page designed as a non-profit project for educational purposes. 
            It helps students and researchers quickly search and browse academic papers using a clean and user-friendly interface.
          </Text>

          <Title order={4} mb="sm">Key Features</Title>
          <List
            spacing="sm"
            size="sm"
            mb="md"
            icon={<FaSearch style={{ color: 'blue', marginRight: 5 }} />}
          >
            <List.Item>Search academic papers efficiently</List.Item>
            <List.Item>View paper details such as title, authors, and abstract</List.Item>
            <List.Item>Filter and sort results for easier browsing</List.Item>
            <List.Item>Simple, responsive design for all devices</List.Item>
          </List>

          <Title order={4} mb="sm">Who Can Use It</Title>
          <Text mb="md">
            This project is intended for students, educators, and anyone interested in exploring academic research. 
            It is completely free to use and serves as a school project template for learning purposes.
          </Text>

          <Title order={4} mb="sm">Credits</Title>
          <Text>
            Built with React, Vite, JSX, and Mantine. Designed as an educational, non-profit project.
          </Text>
        </Card>
      </Container>
    </div>
  );
}

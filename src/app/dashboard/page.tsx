"use client";
import { useRouter } from 'next/navigation';
import { Box, Button, Center, VStack } from '@chakra-ui/react';

const Dashboard = () => {
  const router = useRouter();

  return (
    <Center minH="100vh" bg="gray.50" flexDirection="column">
      <Box p={8} maxWidth="500px" width="full" bg="white" boxShadow="md" borderRadius="md" mb={6}>
        <VStack spacing={4}>
          <Button colorScheme="teal" width="full" onClick={() => router.push('/dashboard/book-reviews')}>
            Manage Book Reviews
          </Button>
          <Button colorScheme="teal" width="full" onClick={() => router.push('/dashboard/profile')}>
            View Profile
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Dashboard;

"use client";
import { useRouter } from 'next/navigation';
import { Box, Button, Center, VStack, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { EditIcon, StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Dashboard = () => {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the token cookie
    router.push('/login');
  };

  return (
    <Center minH="100vh" bg="gray.50" flexDirection="column">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p={8}
        maxWidth="600px"
        width="full"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        mb={6}
        textAlign="center"
      >
        <Heading mb={6}>Welcome to Your Dashboard</Heading>
        <VStack spacing={4}>
          <Flex justify="space-between" align="center" width="full">
            <Button
              colorScheme="teal"
              leftIcon={<EditIcon />}
              width="full"
              onClick={() => router.push('/dashboard/book-reviews')}
              mb={4}
            >
              Manage Book Reviews
            </Button>
            <Button
              colorScheme="teal"
              leftIcon={<StarIcon />}
              width="full"
              onClick={() => router.push('/dashboard/profile')}
              mb={4}
            >
              View Profile
            </Button>
          </Flex>
          <Button colorScheme="red" onClick={handleSignOut} width="full">
            Sign Out
          </Button>
        </VStack>
      </MotionBox>
      <Text mt={4} color="gray.500">
        Manage your book reviews and profile information easily from here.
      </Text>
    </Center>
  );
};

export default Dashboard;

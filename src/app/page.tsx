"use client";
import { useRouter } from 'next/navigation';
import { Box, Button, Center, VStack, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { EditIcon, StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import withAuth from '@/components/withAuth';

const MotionBox = motion(Box);

const Dashboard = () => {
  const router = useRouter();
  const toast = useToast();

  const handleSignOut = () => {
    localStorage.removeItem('user'); // Clear the user data from local storage
    toast({
      title: 'Signed out.',
      description: "You've been signed out successfully.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
          <Button
            colorScheme="blue"
            leftIcon={<EditIcon />}
            width="full"
            onClick={() => router.push('/dashboard/book-reviews')}
          >
            Manage Book Reviews
          </Button>
          <Button
            colorScheme="blue"
            leftIcon={<StarIcon />}
            width="full"
            onClick={() => router.push('/dashboard/profile')}
          >
            View Profile
          </Button>
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

export default withAuth(Dashboard);

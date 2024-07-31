"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Center,
  Text,
  Stack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface User {
  username: string;
  email: string;
  password: string;
  id: string;
}

interface Review {
  title: string;
  author: string;
  text: string;
  rating: number;
  userId: string;
}

const UserProfileComponent = () => {
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('user') || '{}'));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ username: user.username, email: user.email });
  const toast = useToast();

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const userReviews = storedReviews.filter((review: Review) => review.userId === user.id);
    setReviews(userReviews);
  }, [user.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
      title: 'Profile updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Center minH="100vh" bg="gray.50" flexDirection="column">
      <Box p={8} maxWidth="500px" width="full" bg="white" boxShadow="md" borderRadius="md" mb={6}>
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input name="username" value={form.username} onChange={handleChange} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input name="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <Button onClick={handleSave} colorScheme="teal" width="full">
            Save
          </Button>
        </VStack>
      </Box>
      <Box p={8} maxWidth="600px" width="full" bg="white" boxShadow="md" borderRadius="md">
        <Text fontSize="2xl" mb={4}>
          My Reviews
        </Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review, index) => (
            <Box key={index} p={4} mb={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">
                {review.title}
              </Text>
              <Text>Author: {review.author}</Text>
              <Text>Review: {review.text}</Text>
              <Stack direction="row" alignItems="center">
                <Text>Rating: </Text>
                {Array(review.rating)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color="teal.500" />
                  ))}
              </Stack>
            </Box>
          ))
        )}
      </Box>
    </Center>
  );
};

export default UserProfileComponent;

"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  useToast,
  Center,
  Text,
  Stack,
  IconButton,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { StarIcon, EditIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import withAuth from './withAuth';
import isClient from '../utils/isClient';

interface Review {
  title: string;
  author: string;
  text: string;
  rating: number;
  userId: string;
}

const BookReviewComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Review>({ title: '', author: '', text: '', rating: 1, userId: '' });
  const toast = useToast();
  const router = useRouter();
  const user = isClient() ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  useEffect(() => {
    if (isClient()) {
      const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      setReviews(storedReviews);
    }
  }, []);

  const handleSubmit = () => {
    if (isClient()) {
      const newReviews = [...reviews];
      if (editIndex !== null) {
        newReviews[editIndex] = { ...form, userId: user.id };
        setEditIndex(null);
      } else {
        newReviews.push({ ...form, userId: user.id });
      }
      setReviews(newReviews);
      localStorage.setItem('reviews', JSON.stringify(newReviews));
      setForm({ title: '', author: '', text: '', rating: 1, userId: '' });
      toast({
        title: 'Review submitted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (index: number) => {
    setForm(reviews[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
    if (isClient()) {
      localStorage.setItem('reviews', JSON.stringify(newReviews));
    }
    toast({
      title: 'Review deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  return (
    <Center minH="100vh" bg="gray.50" flexDirection="column">
      <Box p={8} maxWidth="500px" width="full" bg="white" boxShadow="md" borderRadius="md" mb={6}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline" onClick={() => router.push('/dashboard')}>
            Back
          </Button>
          <Heading flex="1" textAlign="center" fontSize="2xl">Book Review Management</Heading>
        </Flex>
        <VStack spacing={4}>
          <FormControl id="title">
            <FormLabel>Book Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl id="author">
            <FormLabel>Author</FormLabel>
            <Input name="author" value={form.author} onChange={handleChange} />
          </FormControl>
          <FormControl id="text">
            <FormLabel>Review Text</FormLabel>
            <Textarea name="text" value={form.text} onChange={handleChange} />
          </FormControl>
          <FormControl id="rating">
            <FormLabel>Rating</FormLabel>
            <Select name="rating" value={form.rating} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} {star === 1 ? 'Star' : 'Stars'}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} colorScheme="teal" width="full">
            {editIndex !== null ? 'Update Review' : 'Submit Review'}
          </Button>
        </VStack>
      </Box>
      <Box p={8} maxWidth="600px" width="full" bg="white" boxShadow="md" borderRadius="md">
        <Text fontSize="2xl" mb={4}>
          Book Reviews
        </Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review, index) => (
            <Box key={index} p={4} mb={4} borderWidth={1} borderRadius="md">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold">
                  {review.title}
                </Text>
                {review.userId === user.id && (
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      aria-label="Edit Review"
                      icon={<EditIcon />}
                      onClick={() => handleEdit(index)}
                    />
                    <IconButton
                      aria-label="Delete Review"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(index)}
                    />
                  </Stack>
                )}
              </Stack>
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

export default withAuth(BookReviewComponent);

"use client";
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  Image,
  Center,
  Text,
  Link,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MotionBox = motion(Box);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (values: any) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.email === values.email && user.password === values.password) {
      document.cookie = `token=${user.id}; path=/`;
      toast({
        title: 'Logged in successfully.',
        description: "You've logged into your account.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Login failed.',
        description: 'Incorrect email or password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p={8}
        maxWidth="500px"
        width="full"
        bg="white"
        boxShadow="md"
        borderRadius="md"
      >
        <Center mb={6}>
          <Image src="/books.png" alt="Books" boxSize="100px" />
        </Center>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={4}>
                <FormControl id="email" isInvalid={!!errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" type="email" placeholder="Email" />
                </FormControl>

                <FormControl id="password" isInvalid={!!errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Field as={Input} name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button type="submit" colorScheme="blue" width="full">
                  Login
                </Button>
                <Text>
                  Don&apos;t have an account?{' '}
                  <Link color="blue.500" onClick={() => router.push('/signup')}>
                    Register here
                  </Link>
                </Text>
              </VStack>
            </Form>
          )}
        </Formik>
      </MotionBox>
    </Center>
  );
};

export default Login;

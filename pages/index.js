import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Container,
  Select,
  useToast
} from '@chakra-ui/react';
import { useRegistration } from '../components/RegistrationContext';

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const { updateUserData } = useRegistration();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    collegeName: '',
    department: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    for (const key in formData) {
      if (!formData[key]) {
        toast({
          title: 'Error',
          description: 'Please fill in all fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 10-digit phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Update global state and navigate to course selection
    updateUserData(formData);
    router.push('/select-courses');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Course Registration</Heading>
        
        <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="Enter your first name"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                placeholder="Enter your last name"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email address"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter your 10-digit phone number"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>College Name</FormLabel>
              <Input 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleChange} 
                placeholder="Enter your college name"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Department</FormLabel>
              <Input 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                placeholder="Enter your department"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Year</FormLabel>
              <Select 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                placeholder="Select your year"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </Select>
            </FormControl>
            
            <Button 
              mt={4} 
              colorScheme="blue" 
              type="submit" 
              width="full"
            >
              Continue to Course Selection
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 
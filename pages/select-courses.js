import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Checkbox,
  VStack,
  Heading,
  Container,
  Text,
  CheckboxGroup,
  useToast,
  Flex
} from '@chakra-ui/react';
import { useRegistration } from '../components/RegistrationContext';

// CSE Courses available for selection
const CSE_COURSES = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Data Science',
  'Cyber Security',
  'Cloud Computing',
  'Dev Ops'
];

export default function SelectCourses() {
  const router = useRouter();
  const toast = useToast();
  const { userData, updateSelectedCourses, selectedCourses } = useRegistration();
  const [courses, setCourses] = useState(selectedCourses);

  // Redirect if user data is not available
  useEffect(() => {
    if (!userData.firstName) {
      router.replace('/');
      toast({
        title: 'Error',
        description: 'Please complete registration form first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [userData, router, toast]);

  const handleCoursesChange = (selectedCourses) => {
    setCourses(selectedCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (courses.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one course',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    updateSelectedCourses(courses);
    router.push('/pricing');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Select CSE Courses</Heading>
        
        <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="medium">
              Choose the courses you're interested in:
            </Text>
            
            <CheckboxGroup colorScheme="blue" value={courses} onChange={handleCoursesChange}>
              <VStack align="start" spacing={3}>
                {CSE_COURSES.map((course) => (
                  <Checkbox key={course} value={course}>
                    {course}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
            
            <Flex justify="space-between" mt={6}>
              <Button 
                variant="outline" 
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                colorScheme="blue"
              >
                Continue to Pricing
              </Button>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 
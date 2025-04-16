import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  Text,
  Divider,
  Flex,
  Icon,
  useToast
} from '@chakra-ui/react';
import { useRegistration } from '../components/RegistrationContext';

// Helper function to get the selected plan details
const getPlanDetails = (planId) => {
  const plans = {
    'self-paced': { name: 'Self-paced', price: 3500 },
    'mentor-led': { name: 'Mentor Led', price: 5000 },
    'advanced': { name: 'Advanced', price: 9000 }
  };
  return plans[planId] || { name: 'Unknown', price: 0 };
};

export default function Confirmation() {
  const router = useRouter();
  const toast = useToast();
  const { userData, selectedCourses, pricingPlan } = useRegistration();

  // Get plan details
  const planDetails = getPlanDetails(pricingPlan);

  // Redirect if we don't have complete registration info
  useEffect(() => {
    if (!userData.firstName || !selectedCourses.length || !pricingPlan) {
      router.replace('/');
      toast({
        title: 'Error',
        description: 'Registration information is incomplete',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [userData, selectedCourses, pricingPlan, router, toast]);

  // Generate a random order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  // Generate current date for the order
  const orderDate = new Date().toLocaleDateString();

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading color="green.500">Payment Successful!</Heading>
          <Text fontSize="xl" mt={2}>Thank you for your registration</Text>
        </Box>
        
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={6} align="stretch">
            <Flex justify="space-between">
              <Text fontWeight="bold" fontSize="lg">Order Confirmation</Text>
              <Text>Order ID: {orderId}</Text>
            </Flex>
            
            <Divider />
            
            <Box>
              <Text fontWeight="bold" mb={2}>Personal Information</Text>
              <Flex>
                <Text width="150px" color="gray.600">Name:</Text>
                <Text>{userData.firstName} {userData.lastName}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Email:</Text>
                <Text>{userData.email}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Phone:</Text>
                <Text>{userData.phone}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">College:</Text>
                <Text>{userData.collegeName}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Department:</Text>
                <Text>{userData.department}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Year:</Text>
                <Text>{userData.year}</Text>
              </Flex>
            </Box>
            
            <Divider />
            
            <Box>
              <Text fontWeight="bold" mb={2}>Course Details</Text>
              <Flex>
                <Text width="150px" color="gray.600">Courses:</Text>
                <VStack align="start" spacing={0}>
                  {selectedCourses.map((course, index) => (
                    <Text key={index}>{course}</Text>
                  ))}
                </VStack>
              </Flex>
              <Flex mt={2}>
                <Text width="150px" color="gray.600">Plan:</Text>
                <Text>{planDetails.name}</Text>
              </Flex>
            </Box>
            
            <Divider />
            
            <Box>
              <Text fontWeight="bold" mb={2}>Payment Information</Text>
              <Flex>
                <Text width="150px" color="gray.600">Amount Paid:</Text>
                <Text fontWeight="bold">₹{planDetails.price}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Date:</Text>
                <Text>{orderDate}</Text>
              </Flex>
              <Flex>
                <Text width="150px" color="gray.600">Status:</Text>
                <Text color="green.500" fontWeight="bold">Paid</Text>
              </Flex>
            </Box>
            
            <Divider />
            
            <Text fontSize="sm" color="gray.600" textAlign="center">
              A confirmation email has been sent to {userData.email}. If you have any questions about your registration, please contact our support team.
            </Text>
            
            <Button 
              colorScheme="blue" 
              onClick={() => router.push('/')}
              mx="auto"
              width="200px"
            >
              Back to Home
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 
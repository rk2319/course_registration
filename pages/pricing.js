import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  Text,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Flex,
  Badge
} from '@chakra-ui/react';
import { useRegistration } from '../components/RegistrationContext';

// Pricing plans
const PRICING_PLANS = [
  { 
    id: 'self-paced', 
    name: 'Self-paced', 
    price: 3500,
    description: 'Learn at your own pace with access to all course materials',
    features: ['24/7 access to course content', 'Quizzes and assignments', 'Discussion forum access']
  },
  { 
    id: 'mentor-led', 
    name: 'Mentor Led', 
    price: 5000,
    description: 'Get guidance from industry experts while learning',
    features: ['All Self-paced features', 'Weekly mentor sessions', 'Assignment feedback', 'Career guidance']
  },
  { 
    id: 'advanced', 
    name: 'Advanced', 
    price: 9000,
    description: 'Complete learning experience with advanced features',
    features: ['All Mentor Led features', 'Capstone project', 'Job placement assistance', 'Certificate of completion', 'Industry connections']
  }
];

export default function Pricing() {
  const router = useRouter();
  const toast = useToast();
  const { userData, selectedCourses, updatePricingPlan, pricingPlan } = useRegistration();
  const [plan, setPlan] = useState(pricingPlan || 'self-paced');

  // Redirect if user hasn't selected courses
  useEffect(() => {
    if (!selectedCourses.length) {
      router.replace('/select-courses');
      toast({
        title: 'Error',
        description: 'Please select courses first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [selectedCourses, router, toast]);

  const handlePlanChange = (value) => {
    setPlan(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!plan) {
      toast({
        title: 'Error',
        description: 'Please select a pricing plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    updatePricingPlan(plan);
    router.push('/payment');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Choose Your Pricing Plan</Heading>
        
        <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" fontWeight="medium">
              Select the plan that works best for you:
            </Text>
            
            <RadioGroup onChange={handlePlanChange} value={plan}>
              <Stack direction="column" spacing={5}>
                {PRICING_PLANS.map((pricingPlan) => (
                  <Box 
                    key={pricingPlan.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={plan === pricingPlan.id ? "blue.500" : "gray.200"}
                    boxShadow={plan === pricingPlan.id ? "md" : "none"}
                  >
                    <Radio value={pricingPlan.id} colorScheme="blue">
                      <Flex align="center" justify="space-between" width="100%">
                        <Box>
                          <Text fontWeight="bold" fontSize="lg">{pricingPlan.name}</Text>
                          <Text color="gray.600">{pricingPlan.description}</Text>
                          <VStack align="start" mt={2} spacing={1}>
                            {pricingPlan.features.map((feature, index) => (
                              <Text key={index} fontSize="sm">• {feature}</Text>
                            ))}
                          </VStack>
                        </Box>
                        <Badge colorScheme="green" fontSize="xl" p={2}>
                          ₹{pricingPlan.price}
                        </Badge>
                      </Flex>
                    </Radio>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
            
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
                Continue to Payment
              </Button>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 
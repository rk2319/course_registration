import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Divider,
  useToast,
  Flex,
  InputGroup,
  InputLeftElement
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

export default function Payment() {
  const router = useRouter();
  const toast = useToast();
  const { userData, selectedCourses, pricingPlan } = useRegistration();
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get plan details
  const planDetails = getPlanDetails(pricingPlan);

  // Redirect if pricing plan isn't selected
  useEffect(() => {
    if (!pricingPlan) {
      router.replace('/pricing');
      toast({
        title: 'Error',
        description: 'Please select a pricing plan first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [pricingPlan, router, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    for (const key in paymentInfo) {
      if (!paymentInfo[key]) {
        toast({
          title: 'Error',
          description: 'Please fill in all payment fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    
    // Validate card number (simple check for 16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 16-digit card number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Validate expiry date (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(paymentInfo.expiryDate)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid expiry date (MM/YY)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Validate CVV (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(paymentInfo.cvv)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid CVV (3 or 4 digits)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Simulate payment processing
    setIsSubmitting(true);
    
    try {
      // In a real app, you would make an API call to process the payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success and redirect to confirmation
      toast({
        title: 'Payment Successful',
        description: 'Your registration is complete!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      router.push('/confirmation');
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Payment Details</Heading>
        
        <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={6} align="stretch">
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
              <Text fontWeight="bold" mb={2}>Order Summary</Text>
              <Flex justify="space-between">
                <Text>Selected Courses:</Text>
                <Text>{selectedCourses.length} course(s)</Text>
              </Flex>
              <Text color="gray.600" fontSize="sm" ml={4}>
                {selectedCourses.join(', ')}
              </Text>
              <Flex justify="space-between" mt={2}>
                <Text>Plan:</Text>
                <Text>{planDetails.name}</Text>
              </Flex>
              <Divider my={2} />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>₹{planDetails.price}</Text>
              </Flex>
            </Box>
            
            <FormControl isRequired>
              <FormLabel>Name on Card</FormLabel>
              <Input 
                name="cardName" 
                value={paymentInfo.cardName} 
                onChange={handleChange} 
                placeholder="Enter name as it appears on card"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Card Number</FormLabel>
              <Input 
                name="cardNumber" 
                value={paymentInfo.cardNumber} 
                onChange={handleChange} 
                placeholder="Enter 16-digit card number"
                maxLength={19}
              />
            </FormControl>
            
            <HStack>
              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input 
                  name="expiryDate" 
                  value={paymentInfo.expiryDate} 
                  onChange={handleChange} 
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>CVV</FormLabel>
                <Input 
                  name="cvv" 
                  type="password"
                  value={paymentInfo.cvv} 
                  onChange={handleChange} 
                  placeholder="CVV"
                  maxLength={4}
                />
              </FormControl>
            </HStack>
            
            <Flex justify="space-between" mt={6}>
              <Button 
                variant="outline" 
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                colorScheme="green"
                isLoading={isSubmitting}
                loadingText="Processing"
              >
                Complete Payment
              </Button>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 
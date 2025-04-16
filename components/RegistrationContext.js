import { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export function useRegistration() {
  return useContext(RegistrationContext);
}

export function RegistrationProvider({ children }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    collegeName: '',
    department: '',
    year: '',
  });
  
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [pricingPlan, setPricingPlan] = useState('');

  const updateUserData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const updateSelectedCourses = (courses) => {
    setSelectedCourses(courses);
  };

  const updatePricingPlan = (plan) => {
    setPricingPlan(plan);
  };

  return (
    <RegistrationContext.Provider
      value={{
        userData,
        selectedCourses,
        pricingPlan,
        updateUserData,
        updateSelectedCourses,
        updatePricingPlan,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
} 
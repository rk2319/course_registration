# Course Registration Web Application

A multi-page web application for course registration built with Next.js and Chakra UI.

## Features

- User registration form
- CSE course selection
- Pricing plan options
- Payment processing
- Order confirmation

## Pages

1. **Registration Page**: Collects user information (First Name, Last Name, Email, Phone, College Name, Department, Year)
2. **Course Selection Page**: Allows selection from CSE courses (AI, ML, Web Dev, Data Science, etc.)
3. **Pricing Page**: Choose from 3 pricing plans (Self-paced, Mentor Led, Advanced)
4. **Payment Page**: Enter payment details to complete registration
5. **Confirmation Page**: Displays registration and payment confirmation

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd course-registration-app

# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **Chakra UI**: Component library for styling
- **React**: Frontend library
- **Context API**: For state management across pages 
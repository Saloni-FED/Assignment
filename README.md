# AI-Powered Consultant Matcher

An intelligent application that uses AI to evaluate and match consultants to job descriptions. 

## AI-Driven Talent Matching Approach

The Consultant Matcher works with Groq's  Llama3-70b language model to  understand both the job descriptions and consultant profiles. Instead of just looking for matching keywords, it looks at the meaning behind the words to find the best fit.
This system doesn’t just match technical skills—it also considers things like company culture fit and areas where a consultant could grow. It  even suggest useful interview questions for each candidate. 

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **AI Integration**: AI SDK with Groq's Llama3-70b model
- **State Management**: React useState hooks
- **Server Actions**: Next.js Server Actions for backend functionality

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- Groq API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saloni-FED/Assignment
2. Go to Groq , then  get api key and paste that in .env.local:
3. Npm install:
   ```bash
   npm install
4. Then last step run the project:
   ```bash
   npm run dev

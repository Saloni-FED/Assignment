import { JobDescriptionForm } from "@/components/JobDescriptionForm";
import { ArrowRight, CheckCircle, BarChart2, Users, Clipboard, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className=" mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find the Perfect Consultant{' '}
            <br className="hidden md:block" />
            <span className="text-blue-600 inline-flex items-center">
              with AI-Powered Evaluation
              <Sparkles className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
            Streamline your hiring process with our intelligent consultant evaluation tool that analyzes job descriptions and candidate profiles to find the best match.
          </p>
          <div className="w-full max-w-[95%] xs:max-w-md sm:max-w-xl md:max-w-2xl mx-auto bg-white p-3 sm:p-4 md:p-6 rounded-md sm:rounded-lg md:rounded-xl shadow-sm sm:shadow-md md:shadow-lg my-4 sm:my-6 md:my-8">
            <JobDescriptionForm />
          </div>
        </section>

       
      </main>

     
    </div>
  );
}
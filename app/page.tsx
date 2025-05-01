import { JobDescriptionForm } from "@/components/JobDescriptionForm";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Consultant Evaluation Tool
      </h1>
      <div className="max-w-4xl mx-auto">
        <JobDescriptionForm />
      </div>
    </main>
  );
}

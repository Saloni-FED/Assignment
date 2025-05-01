"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ConsultantList } from "@/components/ConsultantList";
import { Loader2, Sparkles, ClipboardList, Search } from "lucide-react";
import { evaluateConsultants } from "@/lib/actions";

export function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [evaluatedConsultants, setEvaluatedConsultants] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    try {
      const result = await evaluateConsultants(jobDescription);
      setEvaluatedConsultants(result);
    } catch (error) {
      console.error("Error evaluating consultants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Consultant Evaluation
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter job details to find the best matching consultants
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
                Job Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here...\n\nExample:\n- 5+ years experience in React\n- Strong TypeScript skills\n- Consulting background preferred\n- Financial services industry knowledge"
                className="min-h-[200px] text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                Tip: Include specific skills, years of experience, and industry preferences
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                className="text-gray-700 border-gray-300"
                onClick={() => setJobDescription("")}
                disabled={isLoading || !jobDescription}
              >
                Clear
              </Button>
              
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md transition-all"
                disabled={isLoading || !jobDescription.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Candidates...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Evaluate Consultants
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {evaluatedConsultants.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Matching Consultants
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {evaluatedConsultants.length} top candidates found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ConsultantList consultants={evaluatedConsultants} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
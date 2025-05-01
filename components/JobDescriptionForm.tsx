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
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <Card className="border-0 shadow-sm md:shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                Consultant Evaluation
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Enter job details to find the best matching consultants
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label htmlFor="job-description" className="block text-sm sm:text-base font-medium text-gray-700">
                Job Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here...\n\nExample:\n- 5+ years experience in React\n- Strong TypeScript skills\n- Consulting background preferred\n- Financial services industry knowledge"
                className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
              <p className="text-xs sm:text-sm text-gray-500">
                Tip: Include specific skills, years of experience, and industry preferences
              </p>
            </div>
            
            <div className="flex flex-col-reverse xs:flex-row items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full xs:w-auto text-gray-700 border-gray-300 text-xs sm:text-sm"
                onClick={() => setJobDescription("")}
                disabled={isLoading || !jobDescription}
              >
                Clear
              </Button>
              
              <Button
                type="submit"
                size="sm"
                className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-sm md:shadow-md transition-all text-xs sm:text-sm"
                disabled={isLoading || !jobDescription.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Evaluate Consultants
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {evaluatedConsultants.length > 0 && (
        <Card className="border-0 shadow-sm md:shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                  Matching Consultants
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  {evaluatedConsultants.length} top candidates found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ConsultantList consultants={evaluatedConsultants} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
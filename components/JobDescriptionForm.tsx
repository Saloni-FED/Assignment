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
    <div className="space-y-4 md:space-y-6 lg:space-y-8 ">
      <Card className="shadow-none border-none">
        <CardHeader >
            
            
              <CardTitle className="text-xl sm:text-2xl font-bold text-blue-600 flex gap-2 justify-center items-center">
              <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 " />

                Consultant Evaluation
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Enter job details to find the best matching consultants
              </CardDescription>
            
          
        </CardHeader>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label htmlFor="job-description" className="block text-sm sm:text-base font-medium text-gray-700">
                Job Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                id="job-description"
                
                placeholder="Paste the job description here...\n\nExample:\n- 5+ years experience in React\n- Strong TypeScript skills\n- Consulting background preferred\n- Financial services industry knowledge"
                className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-300"
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
                className="w-full xs:w-auto text-gray-700 border-gray-300 text-xs sm:text-sm cursor-pointer"
                onClick={() => setJobDescription("")}
                disabled={isLoading || !jobDescription}
              >
                Clear
              </Button>
              
              <Button
                type="submit"
                size="sm"
                className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-sm md:shadow-md transition-all text-xs sm:text-sm cursor-pointer"
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
        <Card className="shadow-none border-none">
          <CardHeader>
              
                <CardTitle className="text-xl sm:text-2xl font-bold text-blue-600 flex items-center justify-center gap-2">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />

                  Matching Consultants
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  {evaluatedConsultants.length} top candidates found
                </CardDescription>
            
          </CardHeader>
          <CardContent className="px-0">
            <ConsultantList consultants={evaluatedConsultants} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
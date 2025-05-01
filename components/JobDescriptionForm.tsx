"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ConsultantList } from "@/components/ConsultantList";
import { Loader2 } from "lucide-react";
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
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="job-description" className="text-sm font-medium">
                Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Enter the job description here..."
                className="min-h-[150px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Evaluating Consultants...
                </>
              ) : (
                "Evaluate Consultants"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {evaluatedConsultants.length > 0 && (
        <ConsultantList consultants={evaluatedConsultants} />
      )}
    </div>
  );
}

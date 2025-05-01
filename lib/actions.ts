"use server";

import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { consultants } from "./mockData";
import { jsonrepair } from "jsonrepair";

export async function evaluateConsultants(jobDescription: string) {
  try {
    // Create a copy of the consultants array to avoid mutating the original
    const consultantsWithEvaluation = await Promise.all(
      consultants.map(async (consultant) => {
        const evaluation = await evaluateConsultant(consultant, jobDescription);
        return {
          ...consultant,
          evaluation,
        };
      })
    );

    // Sort consultants by fit score (highest first)
    return consultantsWithEvaluation.sort(
      (a, b) => b.evaluation.fitScore - a.evaluation.fitScore
    );
  } catch (error) {
    console.error("Error evaluating consultants:", error);
    throw error;
  }
}

async function evaluateConsultant(consultant: any, jobDescription: string) {
  try {
    const prompt = `
You are an expert consultant evaluator. Your task is to evaluate how well a consultant matches a job description.

Job Description:
${jobDescription}

Consultant Profile:
Name: ${consultant.name}
Experience: ${consultant.yearsOfExperience} years
Expertise: ${consultant.expertise.join(", ")}
Bio: ${consultant.bio}

Please provide the following evaluation:
1. A fit score from 0-100 (just the number)
2. A brief summary of the consultant's fit for this role (2-3 sentences)
3. Three key pros of this consultant for the role
4. Two potential cons or areas of concern
5. Three specific questions to ask this consultant during an interview

IMPORTANT: Your response MUST be a valid JSON object with the following structure and nothing else:
{
  "fitScore": number,
  "summary": "string",
  "pros": ["string", "string", "string"],
  "cons": ["string", "string"],
  "questions": ["string", "string", "string"]
}

Do not include any explanations, notes, or additional text outside of the JSON object.
Ensure all quotes are properly escaped within strings.
`;

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.5, // Lower temperature for more consistent output
      maxTokens: 1000,
    });

    // Clean up the response to ensure it's valid JSON
    let cleanedText = text.trim();

    // If the response starts with \`\`\` or ends with \`\`\`, remove them (code blocks)
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.substring(7);
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.substring(3);
    }

    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }

    cleanedText = cleanedText.trim();

    // Try to extract JSON if the response contains other text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    // Parse the JSON response
    const evaluation = JSON.parse(jsonrepair(cleanedText));

    // Validate the structure and provide defaults for missing fields
    return {
      fitScore:
        typeof evaluation.fitScore === "number"
          ? evaluation.fitScore
          : Math.floor(Math.random() * 100),
      summary: evaluation.summary || "No summary provided.",
      pros: Array.isArray(evaluation.pros)
        ? evaluation.pros.slice(0, 3)
        : [
            "Relevant experience",
            "Technical skills",
            "Problem-solving abilities",
          ],
      cons: Array.isArray(evaluation.cons)
        ? evaluation.cons.slice(0, 2)
        : ["May need additional training", "Potential experience gap"],
      questions: Array.isArray(evaluation.questions)
        ? evaluation.questions.slice(0, 3)
        : [
            "Can you describe your experience with similar projects?",
            "How do you approach problem-solving?",
            "What are your strengths and weaknesses?",
          ],
    };
  } catch (error) {
    console.error(`Error evaluating consultant ${consultant.name}:`, error);

    // Return a fallback evaluation if there's an error
    return {
      fitScore: Math.floor(Math.random() * 100),
      summary: "Unable to generate AI evaluation. This is a fallback summary.",
      pros: [
        "Experience in relevant field",
        "Technical expertise",
        "Problem-solving abilities",
      ],
      cons: ["May need additional training", "Potential experience gap"],
      questions: [
        "Can you describe your experience with similar projects?",
        "How do you approach problem-solving?",
        "What are your strengths and weaknesses?",
      ],
    };
  }
}

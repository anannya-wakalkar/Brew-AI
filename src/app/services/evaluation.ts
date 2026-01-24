import { GoogleGenerativeAI } from "@google/generative-ai";

export interface EvaluationResult {
    verdicts: {
        judgeId: string;
        score: number;
        feedback: string[];
        improvement: string;
    }[];
    overallStrengths: string[];
    overallWeaknesses: string[];
    finalText: string;
}

export async function scrapeHackathon(url: string, apiKey: string): Promise<string> {
    try {
        const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                url: url,
                formats: ["markdown"],
            })
        });

        if (!response.ok) {
            throw new Error(`Firecrawl failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(`Firecrawl error: ${data.error || "Unknown error"}`);
        }

        return data.data.markdown;
    } catch (error) {
        console.error("Scraping error:", error);
        throw error;
    }
}

export async function checkConsistencyAndEvaluate(
    guidelines: string,
    solution: string,
    apiKey: string
): Promise<EvaluationResult> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Use a widely available model, or "gemini-1.5-pro" if preferred. 2.0-flash is fast.
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const prompt = `
    You are the Head Judge for a Hackathon.
    
    HACKATHON GUIDELINES (Scraped from website):
    ${guidelines}
    
    PARTICIPANT SOLUTION:
    ${solution}
    
    First, extract the key rules/guidelines from the scraped text if there is noise. Focus on judging criteria.
    Then, evaluate the solution based on these guidelines and general startup/hackathon criteria.
    
    You need to simulate 4 specific judges:
    1. Corporate Judge (ID: 'corporate') - Focus on Business Model, ROI, Viability.
    2. Research Judge (ID: 'research') - Focus on Innovation, Technology, Novelty.
    3. VC Judge (ID: 'vc') - Focus on Scalability, Market Size, Team.
    4. Community Judge (ID: 'community') - Focus on Social Impact, Inclusivity, User Benefit.
    
    Output a JSON object with this exact structure:
    {
      "verdicts": [
        {
          "judgeId": "corporate",
          "score": number (1-10),
          "feedback": [string, string, string] (3 distinct points),
          "improvement": string (1 specific suggestion)
        },
        // repeat for research, vc, community
      ],
      "overallStrengths": [string, string, string] (Top 3 strengths of the project),
      "overallWeaknesses": [string, string, string] (Top 3 areas for improvement),
      "finalText": string (Short concluding remark)
    }
  `;

    const result = await model.generateContent(prompt);
    const jsonString = result.response.text();

    try {
        return JSON.parse(jsonString) as EvaluationResult;
    } catch (e) {
        console.error("Failed to parse Gemini response:", e);
        throw new Error("Failed to generate valid evaluation.");
    }
}

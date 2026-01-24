import { useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { JudgePanel } from "@/app/components/JudgePanel";
import { motion } from "motion/react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

interface JudgeVerdict {
  judgeId: string;
  score: number;
  feedback: string[];
  improvement: string;
}

// Mock verdicts for demonstration
// Mock verdicts removed - using real AI evaluation

import { scrapeHackathon, checkConsistencyAndEvaluate, type EvaluationResult } from "@/app/services/evaluation";
import { toast } from "sonner"; // Assuming sonner is installed as seen in package.json

// ... existing imports ...

export function EvaluatePage() {
  const [hackathonLink, setHackathonLink] = useState("");
  const [solution, setSolution] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentJudgeIndex, setCurrentJudgeIndex] = useState(0);
  const [verdicts, setVerdicts] = useState<JudgeVerdict[]>([]);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hackathonLink || !solution) {
      return;
    }

    const firecrawlKey = import.meta.env.VITE_FIRECRAWL_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!firecrawlKey || !geminiKey) {
      toast.error("Missing API Keys. Please check your .env file.");
      return;
    }

    setIsEvaluating(true);
    setVerdicts([]);
    setCurrentJudgeIndex(0);
    setLoadingMessage("Scraping hackathon guidelines...");

    try {
      // 1. Scrape
      const guidelines = await scrapeHackathon(hackathonLink, firecrawlKey);

      setLoadingMessage("Judges are deliberating (calling Gemini)...");

      // 2. Evaluate
      const result = await checkConsistencyAndEvaluate(guidelines, solution, geminiKey);
      setEvaluationResult(result);
      setLoadingMessage("");

      // 3. Reveal Judges
      for (let i = 0; i < result.verdicts.length; i++) {
        setLoadingMessage(`Judge ${i + 1} is speaking...`);
        await new Promise(resolve => setTimeout(resolve, 3500));
        setVerdicts(prev => [...prev, result.verdicts[i]]);
        setCurrentJudgeIndex(i + 1);
      }
      setLoadingMessage("");

    } catch (error) {
      console.error(error);
      toast.error("Evaluation failed. Please try again.");
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl text-neutral-900 mb-4">Idea Evaluation</h1>
            <p className="text-lg text-neutral-600">
              Submit your hackathon idea and receive feedback from our AI judge panel
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 rounded-lg border border-neutral-200 sticky top-24">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">
                      Hackathon Link
                    </label>
                    <Input
                      type="url"
                      placeholder="https://hackathon-example.com"
                      value={hackathonLink}
                      onChange={(e) => setHackathonLink(e.target.value)}
                      required
                      disabled={isEvaluating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">
                      Solution Description
                    </label>
                    <Textarea
                      placeholder="Describe your hackathon solution and its key features..."
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      required
                      disabled={isEvaluating}
                      rows={10}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isEvaluating || !hackathonLink || !solution}
                    className="w-full"
                  >
                    {isEvaluating ? "Evaluating..." : "Submit for Evaluation"}
                  </Button>
                </form>

                {isEvaluating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-sm text-neutral-600">
                      {loadingMessage || `Judge ${Math.min(currentJudgeIndex + 1, 4)} of 4 is speaking...`}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Judge Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <JudgePanel
                verdicts={verdicts}
                currentJudgeIndex={currentJudgeIndex}
                isEvaluating={isEvaluating}
                overallStrengths={evaluationResult?.overallStrengths}
                overallWeaknesses={evaluationResult?.overallWeaknesses}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

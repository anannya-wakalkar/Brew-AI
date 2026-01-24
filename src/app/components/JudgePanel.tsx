import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Judge {
  id: string;
  name: string;
  role: string;
  color: string;
  focus: string;
}

interface JudgeVerdict {
  judgeId: string;
  score: number;
  feedback: string[];
  improvement: string;
}

const judges: Judge[] = [
  {
    id: "corporate",
    name: "Alex Morrison",
    role: "Corporate Judge",
    color: "bg-blue-100",
    focus: "ROI obsessed"
  },
  {
    id: "research",
    name: "Dr. Sarah Chen",
    role: "Research Judge",
    color: "bg-purple-100",
    focus: "Innovation nerd"
  },
  {
    id: "vc",
    name: "Marcus Reed",
    role: "VC Judge",
    color: "bg-green-100",
    focus: "Scalability bro"
  },
  {
    id: "community",
    name: "Jamie Kim",
    role: "Community Judge",
    color: "bg-orange-100",
    focus: "Impact first"
  }
];

interface JudgePanelProps {
  verdicts: JudgeVerdict[];
  currentJudgeIndex: number;
  isEvaluating: boolean;
  overallStrengths?: string[];
  overallWeaknesses?: string[];
}

export function JudgePanel({ verdicts, currentJudgeIndex, isEvaluating, overallStrengths, overallWeaknesses }: JudgePanelProps) {
  const [showFinalVerdict, setShowFinalVerdict] = useState(false);

  useEffect(() => {
    if (currentJudgeIndex >= judges.length && verdicts.length === judges.length) {
      setTimeout(() => setShowFinalVerdict(true), 1000);
    }
  }, [currentJudgeIndex, verdicts.length]);

  const currentJudge = judges[currentJudgeIndex];
  const currentVerdict = verdicts[currentJudgeIndex];

  // Calculate final score
  const finalScore = verdicts.length === judges.length
    ? Math.round(verdicts.reduce((sum, v) => sum + v.score, 0) / verdicts.length * 10) / 10
    : 0;

  // Get strengths and weaknesses (use props if available, else derive from feedback)
  const allFeedback = verdicts.flatMap(v => v.feedback);
  const strengths = overallStrengths || allFeedback.slice(0, 3);
  const weaknesses = overallWeaknesses || allFeedback.slice(3, 6);

  return (
    <div className="min-h-[600px] relative">
      <AnimatePresence mode="wait">
        {!isEvaluating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="text-lg text-neutral-600">
              Submit your idea to begin evaluation
            </p>
          </motion.div>
        )}

        {isEvaluating && !showFinalVerdict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Judge Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {judges.map((judge, index) => {
                const isActive = index === currentJudgeIndex;
                const hasSpoken = index < currentJudgeIndex;

                return (
                  <motion.div
                    key={judge.id}
                    initial={false}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      opacity: isActive ? 1 : hasSpoken ? 0.6 : 0.4,
                      filter: isActive ? "blur(0px)" : "blur(1px)"
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`${judge.color} p-6 rounded-lg border-2 ${isActive ? "border-neutral-900" : "border-transparent"
                      }`}
                  >
                    {/* Judge Avatar Placeholder */}
                    <div className="w-20 h-20 bg-neutral-300 rounded-full mx-auto mb-4 relative overflow-hidden">
                      <motion.div
                        animate={isActive ? {
                          y: [0, -2, 0],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full h-full bg-neutral-400 rounded-full"
                      />
                    </div>
                    <h3 className="text-sm text-neutral-900 text-center mb-1">
                      {judge.name}
                    </h3>
                    <p className="text-xs text-neutral-600 text-center mb-1">
                      {judge.role}
                    </p>
                    <p className="text-xs text-neutral-500 text-center italic">
                      {judge.focus}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Current Judge Verdict */}
            <AnimatePresence mode="wait">
              {currentVerdict && currentJudge && (
                <motion.div
                  key={currentJudge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-8 rounded-lg border border-neutral-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-neutral-900">
                      {currentJudge.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-neutral-600">Score:</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-3xl text-neutral-900"
                      >
                        {currentVerdict.score}/10
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentVerdict.feedback.map((line, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.2 }}
                        className="text-neutral-700"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-6 pt-6 border-t border-neutral-200"
                  >
                    <p className="text-sm text-neutral-600 mb-2">Improvement suggestion:</p>
                    <p className="text-neutral-900">{currentVerdict.improvement}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Final Verdict */}
        {showFinalVerdict && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* All Judges Back to Equal Focus */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {judges.map((judge) => (
                <motion.div
                  key={judge.id}
                  initial={{ opacity: 0.6, filter: "blur(1px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6 }}
                  className={`${judge.color} p-6 rounded-lg border border-neutral-200`}
                >
                  <div className="w-20 h-20 bg-neutral-300 rounded-full mx-auto mb-4" />
                  <h3 className="text-sm text-neutral-900 text-center mb-1">
                    {judge.name}
                  </h3>
                  <p className="text-xs text-neutral-600 text-center">
                    {judge.role}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-neutral-900">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-neutral-900 mb-2">Final Verdict</h2>
                  <div className="text-6xl text-neutral-900">{finalScore}/10</div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg text-neutral-900 mb-4">Strengths</h3>
                    <ul className="space-y-2">
                      {strengths.map((strength, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="text-neutral-700 flex items-start gap-2"
                        >
                          <span className="text-green-600">✓</span>
                          <span>{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg text-neutral-900 mb-4">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {weaknesses.map((weakness, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                          className="text-neutral-700 flex items-start gap-2"
                        >
                          <span className="text-orange-600">→</span>
                          <span>{weakness}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 pt-8 border-t border-neutral-200 text-center"
                >
                  <p className="text-lg text-neutral-700">
                    {finalScore >= 8
                      ? "Excellent! Your idea is hackathon-ready."
                      : finalScore >= 6
                        ? "Good foundation. Consider the improvements suggested."
                        : "Needs refinement. Focus on the key areas highlighted."}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

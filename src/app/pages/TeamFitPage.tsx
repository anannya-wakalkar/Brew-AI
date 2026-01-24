import { useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Plus, Minus, Github } from "lucide-react";

interface TeamMember {
  githubUrl: string;
  name: string;
  role: string;
  techStack: string[];
  activityLevel: string;
  strengths: string[];
  missingSkills?: string[];
}

const mockAnalysis: TeamMember[] = [
  {
    githubUrl: "https://github.com/user1",
    name: "Alex Chen",
    role: "Full-Stack Developer",
    techStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    activityLevel: "High",
    strengths: ["Strong frontend skills", "Experienced with REST APIs", "Active contributor"]
  },
  {
    githubUrl: "https://github.com/user2",
    name: "Jordan Smith",
    role: "Backend Specialist",
    techStack: ["Python", "Django", "Docker", "Redis"],
    activityLevel: "Medium",
    strengths: ["Database optimization", "Microservices architecture", "DevOps experience"]
  },
  {
    githubUrl: "https://github.com/user3",
    name: "Sam Park",
    role: "UI/UX Developer",
    techStack: ["React", "CSS", "Figma", "JavaScript"],
    activityLevel: "High",
    strengths: ["Design systems", "Responsive design", "Animation expertise"]
  }
];

const mockTeamBalance = {
  overall: "Good",
  strengths: [
    "Strong full-stack coverage",
    "Good balance of frontend and backend skills",
    "Active GitHub contributions"
  ],
  gaps: [
    "No dedicated mobile development expertise",
    "Limited machine learning capabilities",
    "Could benefit from a data scientist"
  ]
};

export function TeamFitPage() {
  const [hackathonLink, setHackathonLink] = useState("");
  const [teamSize, setTeamSize] = useState(3);
  const [githubLinks, setGithubLinks] = useState<string[]>(["", "", ""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TeamMember[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleTeamSizeChange = (newSize: number) => {
    if (newSize < 1 || newSize > 10) return;
    setTeamSize(newSize);
    setGithubLinks(prev => {
      const newLinks = [...prev];
      while (newLinks.length < newSize) {
        newLinks.push("");
      }
      return newLinks.slice(0, newSize);
    });
  };

  const handleGithubLinkChange = (index: number, value: string) => {
    setGithubLinks(prev => {
      const newLinks = [...prev];
      newLinks[index] = value;
      return newLinks;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hackathonLink || githubLinks.some(link => !link)) {
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysis(mockAnalysis.slice(0, teamSize));
    setIsAnalyzing(false);
    setShowResults(true);
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
            <h1 className="text-4xl text-neutral-900 mb-4">Team Fit Analysis</h1>
            <p className="text-lg text-neutral-600">
              Analyze your team's GitHub profiles to optimize composition and identify skill gaps
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
              <div className="bg-white p-8 rounded-lg border border-neutral-200">
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
                      disabled={isAnalyzing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">
                      Number of Team Members
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleTeamSizeChange(teamSize - 1)}
                        disabled={isAnalyzing || teamSize <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-2xl text-neutral-900 min-w-12 text-center">
                        {teamSize}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleTeamSizeChange(teamSize + 1)}
                        disabled={isAnalyzing || teamSize >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm text-neutral-700">
                      GitHub Profile Links
                    </label>
                    {githubLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Github className="w-5 h-5 text-neutral-400" />
                        <Input
                          type="url"
                          placeholder={`Team member ${index + 1} GitHub URL`}
                          value={link}
                          onChange={(e) => handleGithubLinkChange(index, e.target.value)}
                          required
                          disabled={isAnalyzing}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={isAnalyzing || !hackathonLink || githubLinks.some(link => !link)}
                    className="w-full"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Team"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {!showResults && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-96"
                  >
                    <p className="text-lg text-neutral-600">
                      Submit your team's GitHub profiles to begin analysis
                    </p>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-96 space-y-4"
                  >
                    <div className="w-16 h-16 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
                    <p className="text-lg text-neutral-600">Analyzing GitHub profiles...</p>
                  </motion.div>
                )}

                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Team Members */}
                    <div className="space-y-4">
                      {analysis.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-6 rounded-lg border border-neutral-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl text-neutral-900 mb-1">{member.name}</h3>
                              <p className="text-sm text-neutral-600">{member.role}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              member.activityLevel === "High"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}>
                              {member.activityLevel} Activity
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-neutral-600 mb-2">Tech Stack</p>
                              <div className="flex flex-wrap gap-2">
                                {member.techStack.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-neutral-600 mb-2">Strengths</p>
                              <ul className="space-y-1">
                                {member.strengths.map((strength, idx) => (
                                  <li key={idx} className="text-sm text-neutral-700 flex items-start gap-2">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Team Balance Overview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white p-6 rounded-lg border-2 border-neutral-900"
                    >
                      <h3 className="text-xl text-neutral-900 mb-4">Team Balance Overview</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm text-neutral-700 mb-3">Team Strengths</h4>
                          <ul className="space-y-2">
                            {mockTeamBalance.strengths.map((strength, idx) => (
                              <li key={idx} className="text-sm text-neutral-700 flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm text-neutral-700 mb-3">Skill Gaps</h4>
                          <ul className="space-y-2">
                            {mockTeamBalance.gaps.map((gap, idx) => (
                              <li key={idx} className="text-sm text-neutral-700 flex items-start gap-2">
                                <span className="text-orange-600">→</span>
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                        <p className="text-lg text-neutral-700">
                          Overall Team Balance: <span className="text-neutral-900">{mockTeamBalance.overall}</span>
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

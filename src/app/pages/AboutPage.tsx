import { Navigation } from "@/app/components/Navigation";
import { motion } from "motion/react";

export function AboutPage() {
  const sections = [
    {
      title: "What is Brew?",
      content: "Brew is an AI-powered platform designed to help hackathon teams validate their ideas and optimize their team composition. We combine cutting-edge AI technology with practical team analysis to give you actionable insights before you start building."
    },
    {
      title: "Why Brew Exists",
      content: "Too many great hackathon ideas fail not because of poor execution, but because they weren't properly evaluated or the team wasn't optimally structured. Brew was created to solve this problem by providing professional-grade feedback and team analysis in minutes, not days."
    },
    {
      title: "Our Judge Philosophy",
      content: "We believe that the best feedback comes from multiple perspectives. That's why Brew uses four distinct AI judges - each representing a different viewpoint that matters in the real world: corporate ROI, research innovation, venture scalability, and community impact."
    },
    {
      title: "Our Vision",
      content: "We envision a future where every hackathon team has access to the same quality of feedback and insights that top startups receive from experienced advisors. Brew democratizes access to professional evaluation and makes hackathons more successful for everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl text-neutral-900 mb-4">About Brew</h1>
            <p className="text-lg text-neutral-600">
              Empowering hackathon teams with AI-driven insights
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg border border-neutral-200"
              >
                <h2 className="text-2xl text-neutral-900 mb-4">{section.title}</h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-neutral-600">
              Ready to improve your hackathon outcomes?
            </p>
            <a
              href="/signup"
              className="inline-block mt-4 bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { Navigation } from "@/app/components/Navigation";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  const features = [
    {
      title: "AI idea evaluation",
      description: "Get detailed feedback from four specialized AI judges"
    },
    {
      title: "Multi-judge feedback",
      description: "Receive perspectives from corporate, research, VC, and community angles"
    },
    {
      title: "Team fit analysis",
      description: "Analyze GitHub profiles to find the right team composition"
    }
  ];

  const benefits = [
    "Better ideas",
    "Better teams",
    "Better hackathon outcomes"
  ];

  const workflow = [
    { step: 1, label: "Login / Sign up" },
    { step: 2, label: "Submit hackathon idea" },
    { step: 3, label: "Watch judges evaluate" },
    { step: 4, label: "Receive feedback" },
    { step: 5, label: "Check team fit" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl tracking-tight text-neutral-900 mb-6">
              Brew
            </h1>
            <p className="text-2xl text-neutral-700 mb-4">
              Where ideas are reviewed, not just submitted.
            </p>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Brew helps hackathon teams evaluate ideas and team composition using multi-perspective AI judges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Brew Does */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl text-neutral-900 mb-12 text-center">
              What Brew does
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg border border-neutral-200"
                >
                  <h3 className="text-xl text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Brew */}
      <section className="py-20 px-6 bg-neutral-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl text-neutral-900 mb-12 text-center">
              Why Brew
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                  <p className="text-xl text-neutral-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl text-neutral-900 mb-16 text-center">
              How it works
            </h2>
            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-neutral-200 hidden md:block" />
              
              <div className="grid md:grid-cols-5 gap-8 relative">
                {workflow.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl mb-4 relative z-10">
                      {item.step}
                    </div>
                    <p className="text-sm text-neutral-700">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl text-neutral-900 mb-8">
              Ready to get started?
            </h2>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-md hover:bg-neutral-800 transition-colors text-lg"
            >
              Get started <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto text-center text-sm text-neutral-600">
          © 2026 Brew. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

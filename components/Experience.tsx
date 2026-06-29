"use client";

import React from "react";
import { Timeline } from "./ui/Timeline";
import { cn } from "@/lib/utils";

const experiences = [
  {
    role: "Research Intern",
    date: "Jan 2025 – July 2025",
    location: "ABV-IIITM",
    company: "ABV-IIITM", // Added company name
    points: [
      "End-to-End Autonomous Pipeline: Developed and implemented a full-stack behavioral cloning pipeline in the CARLA simulator, processing a large-scale dataset of 20,000+ frames to train a resilient self-driving algorithm.",
      "Data Engineering & Edge Case Coverage: Engineered a specialized data engine integrating trajectory clustering and dynamic collision avoidance, achieving a 35% improvement in dataset coverage for complex edge cases.",
      "Optimized Model Training: Leveraged Transfer Learning on a pre-trained Vision Transformer (ViT) to reduce model training time by 40% while ensuring fluid and accurate vehicle control outputs for steering and speed.",
      "Collaborated with cross-functional teams to deliver scalable components, improving workflows and accelerating feature delivery.",
    ],
    icon: (
      <a
        href="https://www.servicenow.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/servicenow_logo_icon_168835.png"
          alt="ServiceNow Logo"
          className="h-8 w-8 md:h-20 md:w-20 object-contain"
        />
      </a>
    ),
  },
];

// 1. We use 'export default' so page.tsx can find it easily
export default function Experience() {
  const timelineData = experiences.map((exp) => ({
    title: exp.date,
    content: <ExperienceCard {...exp} />,
  }));

  return (
    <div id="experience" className="relative w-full overflow-hidden p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
        My <span className="text-purple-500">Professional Journey</span>
      </h1>
      <Timeline data={timelineData} />
    </div>
  );
}

const ExperienceCard = ({
  company,
  role,
  location,
  points,
  icon,
  date,
}: {
  company: string;
  role: string;
  location: string;
  points: string[];
  icon: React.ReactNode;
  date: string;
}) => (
  <div className="w-full group/card">
    <div
      className={cn(
        "cursor-pointer overflow-hidden relative h-auto rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 w-full mx-auto flex flex-col p-6 bg-black/50",
      )}
    >
      <div className="flex flex-row items-center space-x-4 z-10">
        <div className="flex h-12 w-12 items-center justify-center">{icon}</div>
        <div className="flex flex-col">
          <p className="font-bold text-lg text-white">{company}</p>
          <p className="text-sm text-gray-400">{role}</p>
          <div className="flex gap-2 text-xs text-gray-400">
            <span>{location}</span>
            <span>|</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <ul className="list-none space-y-3 mt-4 z-10">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-purple-500">✔</span>
            <p className="text-sm text-gray-300">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

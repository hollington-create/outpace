import { Metadata } from "next";
import CaseStudyContent from "./CaseStudyContent";

export const metadata: Metadata = {
  title: "Case Study: Cube Printing | Outpace",
  description:
    "See how Outpace helped Cube Printing break into the med-tech market with outbound campaigns, video content, a new website, social media management, and AI-powered calling.",
};

export default function CaseStudiesPage() {
  return <CaseStudyContent />;
}

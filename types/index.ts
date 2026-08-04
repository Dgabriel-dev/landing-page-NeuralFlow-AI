import { ReactNode } from "react";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

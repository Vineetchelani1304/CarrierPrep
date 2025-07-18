
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import ToolCard from '@/components/ToolCard';
import { MessageCircle, FileText, Map, Mail } from 'lucide-react';

const tools = [
  {
    title: 'AI Career Q&A Chat',
    description: 'Get personalized career advice and answers to your questions from our AI assistant',
    icon: MessageCircle,
    buttonText: 'Ask Now',
    href: '/tools/qa',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'Upload your resume and get detailed analysis with improvement suggestions',
    icon: FileText,
    buttonText: 'Analyze Now',
    href: '/tools/resume',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    title: 'Career Roadmap Generator',
    description: 'Create a personalized career development plan based on your goals and experience',
    icon: Map,
    buttonText: 'Generate Now',
    href: '/tools/roadmap',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    title: 'Cover Letter Generator',
    description: 'Generate compelling, tailored cover letters for specific job applications',
    icon: Mail,
    buttonText: 'Create Now',
    href: '/tools/cover-letter',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
  }
];

const AITools = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">AI Tools</h1>
            </div>
          </header>

          <div className="flex-1 space-y-8 p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Career Tools</h2>
              <p className="text-muted-foreground mb-8">
                Powerful AI-driven tools to accelerate your career growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AITools;

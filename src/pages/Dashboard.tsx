
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolCard from '@/components/ToolCard';
import { MessageCircle, FileText, Map, Mail, Clock, ArrowRight } from 'lucide-react';

const tools = [
  {
    title: 'AI Career Q&A Chat',
    description: 'Get personalized career advice and answers to your questions',
    icon: MessageCircle,
    buttonText: 'Ask Now',
    href: '/tools/qa',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'Analyze and improve your resume with AI-powered insights',
    icon: FileText,
    buttonText: 'Analyze Now',
    href: '/tools/resume',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    title: 'Career Roadmap Generator',
    description: 'Create a personalized career path and development plan',
    icon: Map,
    buttonText: 'Generate Now',
    href: '/tools/roadmap',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    title: 'Cover Letter Generator',
    description: 'Generate compelling cover letters tailored to specific jobs',
    icon: Mail,
    buttonText: 'Create Now',
    href: '/tools/cover-letter',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
  }
];

const recentHistory = [
  { id: 1, tool: 'AI Career Q&A', query: 'How to transition from marketing to tech?', date: '2 hours ago' },
  { id: 2, tool: 'Resume Analyzer', query: 'Software Engineer Resume', date: '1 day ago' },
  { id: 3, tool: 'Roadmap Generator', query: 'Data Science Career Path', date: '3 days ago' },
  { id: 4, tool: 'Cover Letter', query: 'Product Manager Application', date: '1 week ago' },
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Workspace</h1>
            </div>
          </header>

          <div className="flex-1 space-y-8 p-6">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-8 text-white">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-3">
                  AI Career Coach Agent
                </h2>
                <p className="text-xl mb-6 text-purple-50">
                  Get personalized advice and career insights
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                >
                  <Link to="/tools">
                    Let's Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>

            {/* AI Tools Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6">AI Career Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.title} {...tool} />
                ))}
              </div>
            </div>

            {/* Previous History */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Previous History</h3>
                <Button asChild variant="outline">
                  <Link to="/history">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest interactions with AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div>
                          <p className="font-medium">{item.query}</p>
                          <p className="text-sm text-muted-foreground">{item.tool}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

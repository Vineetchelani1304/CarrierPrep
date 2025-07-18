
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Map, Mail, Clock, Download, Eye } from 'lucide-react';

const historyData = [
  {
    id: 1,
    tool: 'AI Career Q&A',
    input: 'How to transition from marketing to tech?',
    output: 'A detailed guide on transitioning from marketing to tech, including skill requirements...',
    date: '2024-01-15',
    time: '2:30 PM',
    icon: MessageCircle,
    type: 'chat'
  },
  {
    id: 2,
    tool: 'Resume Analyzer',
    input: 'Software Engineer Resume Analysis',
    output: 'Resume analysis completed with 8 improvement suggestions...',
    date: '2024-01-14',
    time: '10:15 AM',
    icon: FileText,
    type: 'analysis'
  },
  {
    id: 3,
    tool: 'Career Roadmap',
    input: 'Data Science Career Path',
    output: 'Comprehensive 5-year roadmap for data science career progression...',
    date: '2024-01-12',
    time: '4:45 PM',
    icon: Map,
    type: 'roadmap'
  },
  {
    id: 4,
    tool: 'Cover Letter Generator',
    input: 'Product Manager Application - TechCorp',
    output: 'Personalized cover letter generated for Product Manager position...',
    date: '2024-01-10',
    time: '9:20 AM',
    icon: Mail,
    type: 'document'
  },
  {
    id: 5,
    tool: 'AI Career Q&A',
    input: 'Best programming languages to learn in 2024',
    output: 'Analysis of top programming languages including Python, JavaScript, Go...',
    date: '2024-01-08',
    time: '1:15 PM',
    icon: MessageCircle,
    type: 'chat'
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'chat': return 'bg-blue-100 text-blue-800';
    case 'analysis': return 'bg-green-100 text-green-800';
    case 'roadmap': return 'bg-purple-100 text-purple-800';
    case 'document': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const History = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">My History</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Activity History</h2>
              <p className="text-muted-foreground">
                All your interactions with AI tools and generated content
              </p>
            </div>

            <div className="space-y-4">
              {historyData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{item.tool}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {item.date} at {item.time}
                              </span>
                              <Badge variant="secondary" className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Input:</p>
                          <p className="text-sm bg-muted/50 p-2 rounded">{item.input}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Output:</p>
                          <p className="text-sm bg-muted/50 p-2 rounded line-clamp-2">{item.output}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default History;

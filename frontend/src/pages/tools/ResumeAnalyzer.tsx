
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, CheckCircle, AlertCircle, TrendingUp, Download } from 'lucide-react';

const ResumeAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setAnalysisComplete(false);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const analysisResults = {
    overallScore: 78,
    sections: [
      {
        name: 'Contact Information',
        score: 90,
        status: 'good',
        feedback: 'Complete and professional contact details'
      },
      {
        name: 'Professional Summary',
        score: 65,
        status: 'warning',
        feedback: 'Could be more specific and quantified'
      },
      {
        name: 'Work Experience',
        score: 80,
        status: 'good',
        feedback: 'Good use of action verbs and achievements'
      },
      {
        name: 'Skills Section',
        score: 70,
        status: 'warning',
        feedback: 'Add more relevant technical skills'
      },
      {
        name: 'Education',
        score: 85,
        status: 'good',
        feedback: 'Well-formatted education section'
      },
      {
        name: 'Keywords & ATS',
        score: 60,
        status: 'warning',
        feedback: 'Missing industry-specific keywords'
      }
    ],
    suggestions: [
      'Add more quantified achievements (numbers, percentages, metrics)',
      'Include relevant keywords from the job description',
      'Optimize formatting for ATS (Applicant Tracking Systems)',
      'Add a skills section with both hard and soft skills',
      'Consider adding a projects or certifications section'
    ]
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <h1 className="text-xl font-semibold">AI Resume Analyzer</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Resume Analysis</h2>
              <p className="text-muted-foreground">
                Upload your resume for AI-powered analysis and improvement suggestions
              </p>
            </div>

            {!analysisComplete ? (
              <div className="max-w-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Your Resume</CardTitle>
                    <CardDescription>
                      Support for PDF, DOC, and DOCX files up to 5MB
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <p className="text-lg font-medium">
                          {uploadedFile ? uploadedFile : 'Drag & drop your resume here'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse files
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    {uploadedFile && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm font-medium">{uploadedFile}</span>
                        </div>
                        <Button 
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="flex items-center gap-2"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-4 w-4" />
                              Analyze Resume
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Analyzing resume content...</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="w-full" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Your resume has been analyzed across multiple criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">Overall Score</h3>
                        <p className="text-muted-foreground">Based on industry standards</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-primary">{analysisResults.overallScore}%</div>
                        <Badge variant="secondary" className="mt-1">Good</Badge>
                      </div>
                    </div>
                    <Progress value={analysisResults.overallScore} className="w-full h-2" />
                  </CardContent>
                </Card>

                {/* Section Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle>Section Breakdown</CardTitle>
                    <CardDescription>
                      Detailed analysis of each resume section
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.sections.map((section, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {section.status === 'good' ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                            )}
                            <div>
                              <h4 className="font-medium">{section.name}</h4>
                              <p className="text-sm text-muted-foreground">{section.feedback}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">{section.score}%</div>
                            <Progress value={section.score} className="w-20 h-1 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Improvement Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                    <CardDescription>
                      Actionable recommendations to enhance your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResults.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm">{suggestion}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 mt-6">
                      <Button className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                      <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
                        Analyze Another Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResumeAnalyzer;

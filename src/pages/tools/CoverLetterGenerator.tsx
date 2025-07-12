
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Download, Copy, RefreshCw, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoverLetterGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    jobDescription: '',
    yourName: '',
    yourExperience: '',
    keySkills: '',
    whyInterested: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate cover letter generation
    setTimeout(() => {
      const letter = generateCoverLetter();
      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCoverLetter = () => {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.positionTitle} position at ${formData.companyName}. With my background in ${formData.yourExperience}, I am excited about the opportunity to contribute to your team and help drive ${formData.companyName}'s continued success.

In my previous roles, I have developed expertise in ${formData.keySkills}, which directly aligns with the requirements outlined in your job posting. I am particularly drawn to this opportunity because ${formData.whyInterested}, and I believe my skills and passion would make me a valuable addition to your organization.

Key highlights of my qualifications include:
• Strong foundation in ${formData.keySkills.split(',')[0]?.trim() || 'relevant technologies'}
• Proven track record of delivering high-quality results in fast-paced environments
• Excellent problem-solving abilities and attention to detail
• Strong communication and collaboration skills

I am particularly excited about ${formData.companyName}'s commitment to innovation and would welcome the opportunity to discuss how my experience and enthusiasm can contribute to your team's objectives. I have attached my resume for your review and would appreciate the chance to discuss this position further in an interview.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
${formData.yourName || '[Your Name]'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copied!",
      description: "Cover letter copied to clipboard",
    });
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
                <Mail className="h-5 w-5" />
                <h1 className="text-xl font-semibold">Cover Letter Generator</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-7rem)]">
              {/* Input Form */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Job & Personal Information</CardTitle>
                  <CardDescription>
                    Provide details about the position and your background
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="yourName">Your Name</Label>
                          <Input
                            id="yourName"
                            placeholder="e.g., John Doe"
                            value={formData.yourName}
                            onChange={(e) => handleInputChange('yourName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            placeholder="e.g., TechCorp Inc."
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="positionTitle">Position Title</Label>
                        <Input
                          id="positionTitle"
                          placeholder="e.g., Senior Software Engineer"
                          value={formData.positionTitle}
                          onChange={(e) => handleInputChange('positionTitle', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="jobDescription">Job Description (Key Requirements)</Label>
                        <Textarea
                          id="jobDescription"
                          placeholder="Paste the key requirements from the job posting..."
                          value={formData.jobDescription}
                          onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="yourExperience">Your Experience</Label>
                        <Textarea
                          id="yourExperience"
                          placeholder="Briefly describe your relevant work experience..."
                          value={formData.yourExperience}
                          onChange={(e) => handleInputChange('yourExperience', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="keySkills">Key Skills</Label>
                        <Textarea
                          id="keySkills"
                          placeholder="List your most relevant skills (comma-separated)..."
                          value={formData.keySkills}
                          onChange={(e) => handleInputChange('keySkills', e.target.value)}
                          className="min-h-[60px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whyInterested">Why This Company/Role?</Label>
                        <Textarea
                          id="whyInterested"
                          placeholder="What attracts you to this company and position?"
                          value={formData.whyInterested}
                          onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>

                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !formData.companyName || !formData.positionTitle}
                        className="w-full"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Generating Cover Letter...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Cover Letter
                          </>
                        )}
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Generated Letter */}
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Cover Letter</CardTitle>
                      <CardDescription>
                        AI-generated cover letter tailored to your application
                      </CardDescription>
                    </div>
                    {generatedLetter && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleGenerate}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  {!generatedLetter ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="space-y-3">
                        <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">No cover letter generated yet</p>
                          <p className="text-sm text-muted-foreground">
                            Fill in the form and click generate to create your personalized cover letter
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-full">
                      <div className="bg-white p-6 border rounded-lg font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {generatedLetter}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CoverLetterGenerator;

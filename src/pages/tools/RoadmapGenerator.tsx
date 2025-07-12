
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Map, Target, Clock, CheckCircle, Download, Share } from 'lucide-react';

const RoadmapGenerator = () => {
  const [formData, setFormData] = useState({
    currentRole: '',
    targetRole: '',
    experience: '',
    timeframe: '',
    skills: '',
    goals: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapGenerated, setRoadmapGenerated] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate roadmap generation
    setTimeout(() => {
      setIsGenerating(false);
      setRoadmapGenerated(true);
    }, 2500);
  };

  const roadmapData = {
    title: "Software Engineer to Senior Software Engineer",
    timeline: "12-18 months",
    phases: [
      {
        phase: "Phase 1: Foundation Building",
        duration: "3-4 months",
        goals: [
          "Master advanced JavaScript concepts (closures, prototypes, async/await)",
          "Learn system design fundamentals",
          "Contribute to 3+ major features in current codebase",
          "Start mentoring junior developers"
        ],
        skills: ["Advanced JavaScript", "System Design", "Leadership", "Code Review"],
        completed: true
      },
      {
        phase: "Phase 2: Technical Leadership",
        duration: "4-6 months", 
        goals: [
          "Lead a cross-functional project from conception to deployment",
          "Design and implement scalable architecture solutions",
          "Establish coding standards and best practices for the team",
          "Complete AWS/Cloud certification"
        ],
        skills: ["Project Management", "Architecture Design", "Cloud Computing", "Team Leadership"],
        completed: false
      },
      {
        phase: "Phase 3: Strategic Impact",
        duration: "5-8 months",
        goals: [
          "Drive technical decisions for major product initiatives", 
          "Optimize system performance resulting in measurable improvements",
          "Build and maintain relationships with stakeholders",
          "Present technical solutions to executive leadership"
        ],
        skills: ["Strategic Thinking", "Performance Optimization", "Stakeholder Management", "Executive Communication"],
        completed: false
      }
    ],
    milestones: [
      { title: "Complete System Design Course", date: "Month 2", status: "completed" },
      { title: "Lead First Major Project", date: "Month 6", status: "in-progress" },
      { title: "Obtain Cloud Certification", date: "Month 8", status: "pending" },
      { title: "Performance Review & Promotion", date: "Month 12", status: "pending" }
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
                <Map className="h-5 w-5" />
                <h1 className="text-xl font-semibold">Career Roadmap Generator</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Create Your Career Roadmap</h2>
              <p className="text-muted-foreground">
                Generate a personalized career development plan based on your goals and experience
              </p>
            </div>

            {!roadmapGenerated ? (
              <div className="max-w-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle>Career Information</CardTitle>
                    <CardDescription>
                      Tell us about your current situation and career goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentRole">Current Role</Label>
                        <Input
                          id="currentRole"
                          placeholder="e.g., Software Engineer"
                          value={formData.currentRole}
                          onChange={(e) => handleInputChange('currentRole', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="targetRole">Target Role</Label>
                        <Input
                          id="targetRole"
                          placeholder="e.g., Senior Software Engineer"
                          value={formData.targetRole}
                          onChange={(e) => handleInputChange('targetRole', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="4-5">4-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeframe">Target Timeframe</Label>
                        <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6-months">6 months</SelectItem>
                            <SelectItem value="1-year">1 year</SelectItem>
                            <SelectItem value="2-years">2 years</SelectItem>
                            <SelectItem value="3-years">3+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="skills">Current Skills</Label>
                      <Textarea
                        id="skills"
                        placeholder="List your current technical and soft skills..."
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">Career Goals & Preferences</Label>
                      <Textarea
                        id="goals"
                        placeholder="Describe your career aspirations, preferred work environment, growth areas..."
                        value={formData.goals}
                        onChange={(e) => handleInputChange('goals', e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !formData.currentRole || !formData.targetRole}
                      className="w-full"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating Your Roadmap...
                        </>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Generate Career Roadmap
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Roadmap Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{roadmapData.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4" />
                          Estimated Timeline: {roadmapData.timeline}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Roadmap Phases */}
                <div className="space-y-6">
                  {roadmapData.phases.map((phase, index) => (
                    <Card key={index} className={`${phase.completed ? 'border-green-200 bg-green-50/50' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              phase.completed ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'
                            }`}>
                              {phase.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{phase.phase}</CardTitle>
                              <CardDescription>{phase.duration}</CardDescription>
                            </div>
                          </div>
                          {phase.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Goals & Objectives:</h4>
                          <ul className="space-y-1">
                            {phase.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Key Skills to Develop:</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Milestones</CardTitle>
                    <CardDescription>
                      Important checkpoints to track your progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {roadmapData.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              milestone.status === 'completed' ? 'bg-green-500 text-white' :
                              milestone.status === 'in-progress' ? 'bg-blue-500 text-white' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {milestone.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                              {milestone.status === 'in-progress' && <Clock className="h-3 w-3" />}
                              {milestone.status === 'pending' && <Target className="h-3 w-3" />}
                            </div>
                            <div>
                              <p className="font-medium">{milestone.title}</p>
                              <p className="text-sm text-muted-foreground">{milestone.date}</p>
                            </div>
                          </div>
                          <Badge variant={
                            milestone.status === 'completed' ? 'secondary' :
                            milestone.status === 'in-progress' ? 'default' : 'outline'
                          } className={
                            milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                            milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''
                          }>
                            {milestone.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => setRoadmapGenerated(false)}>
                    Generate New Roadmap
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RoadmapGenerator;

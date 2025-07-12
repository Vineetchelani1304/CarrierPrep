
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, CreditCard } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for exploring AI career tools',
    features: [
      '5 AI tool uses per month',
      'Basic career advice',
      'Resume analysis (1 per month)',
      'Community support'
    ],
    current: true,
    icon: Star,
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: 'Pro',
    price: '$19/month',
    description: 'Ideal for active job seekers',
    features: [
      'Unlimited AI tool uses',
      'Advanced career coaching',
      'Unlimited resume analysis',
      'Cover letter generation',
      'Career roadmap planning',
      'Priority support',
      'Export to PDF/Word'
    ],
    popular: true,
    icon: Zap,
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    price: '$49/month',
    description: 'For career professionals and teams',
    features: [
      'Everything in Pro',
      'Team collaboration tools',
      'Custom AI training',
      'Advanced analytics',
      'API access',
      '1-on-1 career coaching',
      'White-label options',
      'Dedicated support'
    ],
    icon: Crown,
    color: 'from-purple-600 to-pink-600'
  }
];

const Billing = () => {
  const currentPlan = plans.find(plan => plan.current);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Billing</h1>
            </div>
          </header>

          <div className="flex-1 space-y-8 p-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Plan
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">{currentPlan?.name} Plan</h3>
                    <p className="text-muted-foreground">
                      {currentPlan?.name === 'Starter' ? 'Free forever' : 'Billed monthly'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{currentPlan?.price}</p>
                    {currentPlan?.name !== 'Starter' && (
                      <Button variant="outline" size="sm" className="mt-2">
                        Manage Subscription
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Plans */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-muted-foreground mb-8">
                Upgrade to unlock more powerful AI career tools
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const IconComponent = plan.icon;
                  return (
                    <Card 
                      key={plan.name} 
                      className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''} hover:shadow-md transition-shadow`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary px-3 py-1">Most Popular</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          {plan.price !== 'Free' && (
                            <span className="text-muted-foreground">/month</span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full" 
                          variant={plan.current ? "outline" : "default"}
                          disabled={plan.current}
                        >
                          {plan.current ? 'Current Plan' : 
                           plan.name === 'Starter' ? 'Downgrade' : 'Upgrade'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>
                  Track your AI tool usage and remaining quota
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">AI Chat</p>
                    <p className="text-2xl font-bold">3/5</p>
                    <p className="text-xs text-muted-foreground">queries used</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Resume Analysis</p>
                    <p className="text-2xl font-bold">1/1</p>
                    <p className="text-xs text-muted-foreground">analyses used</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Roadmaps</p>
                    <p className="text-2xl font-bold">2/5</p>
                    <p className="text-xs text-muted-foreground">generated</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Cover Letters</p>
                    <p className="text-2xl font-bold">1/5</p>
                    <p className="text-xs text-muted-foreground">created</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Billing;

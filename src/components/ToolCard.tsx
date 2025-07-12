
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  href: string;
  gradient: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  buttonText,
  href,
  gradient
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
          <Link to={href}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;

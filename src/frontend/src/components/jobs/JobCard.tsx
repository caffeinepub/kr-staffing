import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Briefcase, DollarSign } from 'lucide-react';
import type { Job } from '../../backend';
import { getCategoryLabel } from '../../lib/categories';
import { openApplyForm } from '../../lib/applyNow';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const handleApply = () => {
    openApplyForm(job.title, job.city);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{job.title}</CardTitle>
          <Badge variant="secondary">{getCategoryLabel(job.category)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.city}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
        )}
        {job.jobType && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{job.jobType}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-3 mt-3">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleApply} className="w-full">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

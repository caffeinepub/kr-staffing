import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import JobCard from './JobCard';
import { useGetAllActiveJobs } from '../../hooks/useQueries';
import EmptyState from '../common/EmptyState';

const JOBS_PER_PAGE = 6;

export default function FeaturedJobsSection() {
  const { data: jobs, isLoading, isError } = useGetAllActiveJobs();
  const [displayCount, setDisplayCount] = useState(JOBS_PER_PAGE);

  const displayedJobs = jobs?.slice(0, displayCount) || [];
  const hasMore = jobs && jobs.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + JOBS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load jobs"
        description="Something went wrong. Please try again later."
      />
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs available"
        description="Check back soon for new opportunities!"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
}

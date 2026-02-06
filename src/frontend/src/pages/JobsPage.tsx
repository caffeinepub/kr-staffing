import { useState, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';
import EmptyState from '../components/common/EmptyState';
import { useGetAllActiveJobs } from '../hooks/useQueries';
import { getCategoryById } from '../lib/categories';

const JOBS_PER_PAGE = 9;

export default function JobsPage() {
  const searchParams = useSearch({ strict: false }) as any;
  const { data: allJobs, isLoading, isError } = useGetAllActiveJobs();

  const [keyword, setKeyword] = useState(searchParams?.keyword || '');
  const [city, setCity] = useState(searchParams?.city || '');
  const [activeCategory, setActiveCategory] = useState(searchParams?.category || '');
  const [displayCount, setDisplayCount] = useState(JOBS_PER_PAGE);

  const filteredJobs = useMemo(() => {
    if (!allJobs) return [];

    return allJobs.filter((job) => {
      const matchesKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase());

      const matchesCity = !city || job.city.toLowerCase().includes(city.toLowerCase());

      let matchesCategory = true;
      if (activeCategory) {
        const category = getCategoryById(activeCategory);
        if (category) {
          if (category.backendCategory.__kind__ === 'other') {
            matchesCategory = job.category.__kind__ === 'other' && 
              job.category.other === category.backendCategory.other;
          } else {
            matchesCategory = job.category.__kind__ === category.backendCategory.__kind__;
          }
        }
      }

      return matchesKeyword && matchesCity && matchesCategory;
    });
  }, [allJobs, keyword, city, activeCategory]);

  const displayedJobs = filteredJobs.slice(0, displayCount);
  const hasMore = filteredJobs.length > displayCount;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayCount(JOBS_PER_PAGE);
  };

  const handleClearFilters = () => {
    setKeyword('');
    setCity('');
    setActiveCategory('');
    setDisplayCount(JOBS_PER_PAGE);
  };

  const hasActiveFilters = keyword || city || activeCategory;

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-custom py-8">
        <EmptyState
          title="Failed to load jobs"
          description="Something went wrong. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
          <p className="text-muted-foreground">Browse through our verified job listings</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {keyword && (
              <Badge variant="secondary">
                Keyword: {keyword}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setKeyword('')}
                />
              </Badge>
            )}
            {city && (
              <Badge variant="secondary">
                City: {city}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setCity('')}
                />
              </Badge>
            )}
            {activeCategory && (
              <Badge variant="secondary">
                Category: {getCategoryById(activeCategory)?.label}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setActiveCategory('')}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </div>

        {/* Job Grid */}
        {displayedJobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            description="Try adjusting your search filters to find more opportunities."
            action={
              hasActiveFilters ? (
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => setDisplayCount((prev) => prev + JOBS_PER_PAGE)}
                  variant="outline"
                  size="lg"
                >
                  Load More Jobs
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

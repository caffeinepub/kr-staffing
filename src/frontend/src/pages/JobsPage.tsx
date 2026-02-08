import { useState, useMemo, useEffect } from 'react';
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
  const searchParams = useSearch({ strict: false }) as { keyword?: string; city?: string; category?: string };
  const { data: allJobs, isLoading, isError } = useGetAllActiveJobs();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(JOBS_PER_PAGE);

  // Sync state with URL search params on mount and when they change
  useEffect(() => {
    setKeyword(searchParams?.keyword || '');
    setCity(searchParams?.city || '');
    setActiveCategory(searchParams?.category || '');
    setDisplayCount(JOBS_PER_PAGE);
  }, [searchParams?.keyword, searchParams?.city, searchParams?.category]);

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
  const activeCategoryData = activeCategory ? getCategoryById(activeCategory) : null;

  if (isError) {
    return (
      <div className="container-custom py-8">
        <EmptyState
          icon={X}
          title="Error Loading Jobs"
          description="Something went wrong. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
          <p className="text-muted-foreground">Browse through our latest job openings</p>
        </div>

        {/* Search Filters */}
        <form onSubmit={handleSearch} className="space-y-4">
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
            <Button type="submit" className="sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {keyword && (
                <Badge variant="secondary" className="gap-1">
                  Keyword: {keyword}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setKeyword('')}
                  />
                </Badge>
              )}
              {city && (
                <Badge variant="secondary" className="gap-1">
                  City: {city}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setCity('')}
                  />
                </Badge>
              )}
              {activeCategoryData && (
                <Badge variant="secondary" className="gap-1">
                  Category: {activeCategoryData.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setActiveCategory('')}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </form>

        {/* Results Count */}
        {!isLoading && (
          <div className="text-sm text-muted-foreground">
            {filteredJobs.length === 0 ? (
              'No jobs found'
            ) : (
              <>
                Showing {displayedJobs.length} of {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
              </>
            )}
          </div>
        )}

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Jobs Found"
            description={
              hasActiveFilters
                ? 'Try adjusting your search filters to find more jobs.'
                : 'No jobs are currently available. Check back soon!'
            }
            action={
              hasActiveFilters ? (
                <Button variant="outline" onClick={handleClearFilters}>
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

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDisplayCount((prev) => prev + JOBS_PER_PAGE)}
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

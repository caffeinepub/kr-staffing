import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Job, JobCategory } from '../../backend';
import { useAddJob, useUpdateJob } from '../../hooks/useAdminJobs';
import { categories } from '../../lib/categories';

interface JobEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: Job;
}

export default function JobEditorDialog({ open, onOpenChange, job }: JobEditorDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: '',
    category: 'delivery' as string,
    description: '',
    salary: '',
    jobType: '',
  });

  const addJob = useAddJob();
  const updateJob = useUpdateJob();

  useEffect(() => {
    if (job) {
      const categoryId = categories.find((cat) => {
        if (job.category.__kind__ === 'other') {
          return cat.backendCategory.__kind__ === 'other' && cat.backendCategory.other === job.category.other;
        }
        return cat.backendCategory.__kind__ === job.category.__kind__;
      })?.id || 'delivery';

      setFormData({
        title: job.title,
        company: job.company,
        city: job.city,
        category: categoryId,
        description: job.description,
        salary: job.salary || '',
        jobType: job.jobType || '',
      });
    } else {
      setFormData({
        title: '',
        company: '',
        city: '',
        category: 'delivery',
        description: '',
        salary: '',
        jobType: '',
      });
    }
  }, [job, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.id === formData.category);
    if (!selectedCategory) return;

    const jobData = {
      title: formData.title,
      company: formData.company,
      city: formData.city,
      category: selectedCategory.backendCategory,
      description: formData.description,
      salary: formData.salary || null,
      jobType: formData.jobType || null,
    };

    try {
      if (job) {
        await updateJob.mutateAsync({ jobId: job.id, ...jobData });
      } else {
        await addJob.mutateAsync(jobData);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPending = addJob.isPending || updateJob.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="salary">Salary (Optional)</Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., ₹15,000–₹20,000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="jobType">Job Type (Optional)</Label>
            <Input
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="e.g., Full-time, Part-time, Shift"
              className="mt-1"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : job ? 'Update Job' : 'Add Job'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

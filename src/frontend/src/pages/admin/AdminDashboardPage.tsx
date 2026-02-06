import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil } from 'lucide-react';
import { useGetAllActiveJobs, useSeedExampleJobs } from '../../hooks/useQueries';
import JobEditorDialog from '../../components/admin/JobEditorDialog';
import ContactRequestsList from '../../components/admin/ContactRequestsList';
import type { Job } from '../../backend';
import { getCategoryLabel } from '../../lib/categories';

export default function AdminDashboardPage() {
  const { data: jobs, isLoading } = useGetAllActiveJobs();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined);
  
  const seedJobs = useSeedExampleJobs();

  const handleAddJob = () => {
    setEditingJob(undefined);
    setEditorOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setEditorOpen(true);
  };

  const handleSeedJobs = async () => {
    try {
      await seedJobs.mutateAsync();
    } catch (error) {
      console.error('Failed to seed jobs:', error);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage jobs and view contact requests</p>
          </div>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Jobs Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Jobs</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handleSeedJobs} variant="outline" disabled={seedJobs.isPending}>
                      {seedJobs.isPending ? 'Seeding...' : 'Seed Example Jobs'}
                    </Button>
                    <Button onClick={handleAddJob}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Job
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-muted-foreground">Loading jobs...</p>
                ) : !jobs || jobs.length === 0 ? (
                  <p className="text-muted-foreground">No jobs yet. Add your first job!</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.city}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{getCategoryLabel(job.category)}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditJob(job)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <ContactRequestsList />
          </TabsContent>
        </Tabs>
      </div>

      <JobEditorDialog open={editorOpen} onOpenChange={setEditorOpen} job={editingJob} />
    </div>
  );
}

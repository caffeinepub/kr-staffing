import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Job, JobCategory, ContactRequest } from '../backend';

export function useAddJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      company: string;
      city: string;
      category: JobCategory;
      description: string;
      salary: string | null;
      jobType: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addJob(
        data.title,
        data.company,
        data.city,
        data.category,
        data.description,
        data.salary,
        data.jobType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useUpdateJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      jobId: number;
      title: string;
      company: string;
      city: string;
      category: JobCategory;
      description: string;
      salary: string | null;
      jobType: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateJob(
        data.jobId,
        data.title,
        data.company,
        data.city,
        data.category,
        data.description,
        data.salary,
        data.jobType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useActivateJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.activateJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useDeactivateJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deactivateJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useGetAllContactRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactRequest[]>({
    queryKey: ['contactRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedExampleJobs() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.seedExampleJobs();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

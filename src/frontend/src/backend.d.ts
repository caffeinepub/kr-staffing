import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    id: ContactId;
    city: string;
    name: string;
    mobileNumber: string;
    message: string;
}
export interface Job {
    id: JobId;
    title: string;
    salary?: string;
    jobType?: string;
    city: string;
    description: string;
    company: string;
    category: JobCategory;
}
export type JobId = number;
export type JobCategory = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "telecaller";
    telecaller: null;
} | {
    __kind__: "backOffice";
    backOffice: null;
} | {
    __kind__: "delivery";
    delivery: null;
} | {
    __kind__: "warehouse";
    warehouse: null;
} | {
    __kind__: "fieldExec";
    fieldExec: null;
};
export type ContactId = number;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activateJob(jobId: JobId): Promise<void>;
    addJob(title: string, company: string, city: string, category: JobCategory, description: string, salary: string | null, jobType: string | null): Promise<JobId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deactivateJob(jobId: JobId): Promise<void>;
    getAllActiveJobs(): Promise<Array<Job>>;
    getAllContactRequests(): Promise<Array<ContactRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJobById(jobId: JobId): Promise<Job | null>;
    getJobsByCategory(category: JobCategory): Promise<Array<Job>>;
    getJobsByCity(city: string): Promise<Array<Job>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchJobsByKeyword(keyword: string): Promise<Array<Job>>;
    seedExampleJobs(): Promise<void>;
    submitContact(name: string, mobileNumber: string, city: string, message: string): Promise<ContactId>;
    updateJob(jobId: JobId, title: string, company: string, city: string, category: JobCategory, description: string, salary: string | null, jobType: string | null): Promise<void>;
}

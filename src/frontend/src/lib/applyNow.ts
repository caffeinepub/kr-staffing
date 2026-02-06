import { krStaffingConfig } from '../config/krStaffing';

export function buildApplyUrl(jobTitle?: string, city?: string): string {
  const { baseUrl, prefillParams } = krStaffingConfig.googleForm;
  
  if (!jobTitle && !city) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  
  if (jobTitle && prefillParams.jobTitle) {
    url.searchParams.set(prefillParams.jobTitle, jobTitle);
  }
  
  if (city && prefillParams.city) {
    url.searchParams.set(prefillParams.city, city);
  }
  
  return url.toString();
}

export function openApplyForm(jobTitle?: string, city?: string): void {
  const url = buildApplyUrl(jobTitle, city);
  window.open(url, '_blank', 'noopener,noreferrer');
}

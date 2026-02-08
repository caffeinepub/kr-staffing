import { brandConfig } from './brand';

// Legacy configuration module that delegates to brandConfig for backward compatibility
export const krStaffingConfig = {
  companyName: brandConfig.company.name,
  tagline: brandConfig.company.tagline,
  registrationYear: brandConfig.company.registrationYear,
  address: brandConfig.company.address,
  officialEmail: brandConfig.contact.officialEmail,
  whatsappNumber: brandConfig.contact.whatsapp.phoneNumber,
  whatsappMessage: brandConfig.contact.whatsapp.defaultMessage,
  socialLinks: brandConfig.contact.social,
  googleFormUrl: brandConfig.apply.googleForm.baseUrl,
  googleFormPrefillParams: brandConfig.apply.googleForm.prefillParams,
};

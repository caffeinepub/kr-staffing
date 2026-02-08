import { brandConfig } from '../config/brand';

export const copy = {
  hero: {
    heading: 'Explore New Job Opportunities Just For You',
    subheading: 'Find delivery, telecaller, field executive & warehouse jobs near you',
    searchPlaceholder: {
      keyword: 'Job title or keyword',
      city: 'City',
    },
    searchButton: 'Find Jobs',
  },
  popularSearches: {
    title: 'Popular Job Searches',
    items: [
      'Delivery Boy',
      'Telecaller',
      'Field Executive',
      'Back Office Executive',
      'Warehouse',
      'Part Time Jobs',
      'Full Time Jobs',
    ],
  },
  whyChoose: {
    title: `Why Choose ${brandConfig.company.name}`,
    items: [
      {
        title: 'Verified Jobs',
        description: 'All job listings are verified by our team',
      },
      {
        title: 'Fast Hiring Process',
        description: 'Quick application review and employer connection',
      },
      {
        title: 'Local City Jobs',
        description: 'Find opportunities in your city',
      },
      {
        title: 'Trusted Partner',
        description: 'Reliable staffing solutions since day one',
      },
      {
        title: 'Support Team',
        description: 'Our team is here to help you succeed',
      },
    ],
  },
  testimonials: {
    title: 'Success Stories',
    items: [
      {
        name: 'Rajesh Kumar',
        role: 'Delivery Executive',
        text: 'Found a delivery job in my area within 3 days. The team was very helpful throughout the process.',
      },
      {
        name: 'Priya Sharma',
        role: 'Telecaller',
        text: `${brandConfig.company.name} helped me get a telecaller position. The application process was simple and fast.`,
      },
      {
        name: 'Amit Patel',
        role: 'Warehouse Assistant',
        text: 'Great experience! Got connected with a good company for warehouse work near my home.',
      },
    ],
  },
  about: {
    title: `About ${brandConfig.company.name}`,
    content: `${brandConfig.company.name} is your trusted partner for finding quality job opportunities. Registered in ${brandConfig.company.registrationYear}, we connect job seekers with verified employers across delivery, telecalling, field operations, warehouse, and office roles.

Our process is simple: Browse jobs on our portal, apply through our form, and our team will connect you with the right employers. We focus on local opportunities to help you find work near your home.

We believe in transparency and trust. Every job listing is verified, and our support team is available to assist you throughout your job search journey.`,
  },
  trust: {
    gstLine: 'GST No. 10LBSPK2936F1ZI',
    complianceNote: `${brandConfig.company.name} is a registered staffing company committed to transparency and compliance. We verify all job listings and maintain professional standards in connecting job seekers with employers.`,
  },
  credibility: {
    title: 'Roles We Hire For',
    description: 'We connect job seekers with opportunities across multiple platforms and companies',
    platformsTitle: 'Hiring For',
  },
  hrContact: {
    title: 'HR Contact',
    description: 'Our HR team is here to assist you with your job search',
  },
  documents: {
    title: 'Documents & Samples',
    description: 'View sample templates for reference. These are examples only and do not guarantee employment or specific earnings.',
    disclaimer: 'Note: These are sample templates for reference purposes only.',
    viewButton: 'View Sample',
    downloadButton: 'Download',
  },
  contact: {
    title: 'Get In Touch',
    description: 'Have questions? Reach out to us and our team will get back to you.',
    companyDetailsTitle: 'Company Details',
    form: {
      name: 'Your Name',
      mobile: 'Mobile Number',
      city: 'City',
      message: 'Message',
      submit: 'Send Message',
      success: 'Thank you! We will get back to you soon.',
      error: 'Something went wrong. Please try again.',
    },
  },
  privacy: {
    title: 'Privacy Policy',
    content: `At ${brandConfig.company.name}, we respect your privacy and are committed to protecting your personal information.

**Information We Collect**
When you use our job portal, we collect information you provide through application forms and contact forms, including your name, mobile number, city, and any messages you send us.

**How We Use Your Information**
We use your information to:
- Connect you with potential employers
- Respond to your inquiries
- Improve our services
- Send you relevant job opportunities

**Data Security**
We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorized personnel.

**Your Rights**
You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise these rights.

**Contact Us**
If you have questions about this privacy policy, please contact us through our contact form or WhatsApp support.`,
  },
  terms: {
    title: 'Terms & Conditions',
    content: `Please read these terms carefully before using ${brandConfig.company.name} services.

**Service Description**
${brandConfig.company.name} provides a job portal connecting job seekers with employers. We verify job listings but do not guarantee employment outcomes.

**User Responsibilities**
- Provide accurate information in your applications
- Communicate professionally with employers
- Respect the application process
- Do not misuse the platform

**Job Listings**
While we verify all job listings, we are not responsible for employer decisions or workplace conditions. We recommend you verify details directly with employers.

**Limitation of Liability**
${brandConfig.company.name} acts as a connection platform. We are not liable for employment outcomes, disputes between job seekers and employers, or any indirect damages.

**Changes to Terms**
We may update these terms from time to time. Continued use of our services constitutes acceptance of updated terms.

**Contact**
For questions about these terms, please contact us through our contact form.`,
  },
  footer: {
    about: `${brandConfig.company.name} connects job seekers with verified opportunities across delivery, telecalling, field operations, and more. Find your next job with us.`,
    quickLinks: 'Quick Links',
    legal: 'Legal',
    followUs: 'Follow Us',
    contactTitle: 'Contact',
    copyright: `© 2026 ${brandConfig.company.name}. All Rights Reserved.`,
    builtWith: 'Built with',
    caffeine: 'caffeine.ai',
  },
};

// Centralized branding and contact configuration
export const brandConfig = {
  company: {
    name: 'KR Staffing',
    tagline: 'Your Trusted Staffing Partner',
    registrationYear: 2023,
    address: '01, Bachauli, NEAR BSNL STORE, Jandaha, Dulwar, Vaishali, Bihar, 844505, Dulwar, Bihar 844505',
  },
  contact: {
    officialEmail: 'infokrstaffing@gmail.com',
    whatsapp: {
      phoneNumber: '916204740913',
      defaultMessage: 'Hello, I would like to inquire about job opportunities at KR Staffing.',
    },
    social: {
      instagram: 'https://instagram.com/krstaffing',
      whatsappChannel: 'https://whatsapp.com/channel/0029VbAWxCJKLaHGNMHXbC2u',
    },
  },
  apply: {
    googleForm: {
      baseUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform',
      prefillParams: {
        jobTitle: 'entry.123456789',
        city: 'entry.987654321',
      },
    },
  },
  credibility: {
    roles: [
      { label: 'Delivery Executive / Delivery Boy', value: 'delivery' },
      { label: 'Telecaller / Telemarketer', value: 'telecaller' },
    ],
    platforms: [
      { name: 'Blinkit', logoPath: null },
      { name: 'Zomato', logoPath: null },
      { name: 'Swiggy', logoPath: null },
      { name: 'Zepto', logoPath: null },
      { name: 'Swiggy Instamart', logoPath: null },
    ],
  },
  documents: {
    samples: [
      {
        id: 'offer-letter',
        label: 'Offer Letter',
        description: 'Sample offer letter template',
        path: '/assets/generated/sample-offer-letter.dim_1240x1754.png',
      },
      {
        id: 'salary-proof',
        label: 'Salary Proof',
        description: 'Sample salary proof template',
        path: '/assets/generated/sample-salary-proof.dim_1240x1754.png',
      },
      {
        id: 'id-card',
        label: 'ID Card',
        description: 'Sample employee ID card template',
        path: '/assets/generated/sample-id-card.dim_1080x1920.png',
      },
      {
        id: 'earnings-example',
        label: 'Earnings Example',
        description: 'Sample earnings example sheet',
        path: '/assets/generated/sample-earnings-example.dim_1240x1754.png',
      },
    ],
  },
  team: {
    hr: {
      name: 'Muskan Siddiqui',
      position: 'HR Executive',
    },
  },
};

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type StepNumber = 1 | 2 | 3;

export interface StepMeta {
  step: StepNumber;
  title: string;
  description: string;
}

export interface DomainConfig {
  domain: string;
  status: 'connected' | 'pending' | 'verifying';
  sslStatus: 'active' | 'generating';
  dnsRecord: string;
  verifiedAt: string;
}


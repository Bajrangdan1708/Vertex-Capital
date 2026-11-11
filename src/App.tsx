import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullOnboardingSchema, FullFormData, step1Schema, step2Schema } from './schemas/validationSchema';
import { StepNumber } from './types/onboarding';

// Layout & Core Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProgressBar } from './components/ProgressBar';
import { Step1PersonalInfo } from './components/Step1PersonalInfo';
import { Step2AccountDetails } from './components/Step2AccountDetails';
import { Step3ReviewSubmit } from './components/Step3ReviewSubmit';
import { SuccessView } from './components/SuccessView';
import { StateInspector } from './components/StateInspector';

// Modals
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { DomainSettingsModal } from './components/DomainSettingsModal';

export const App: React.FC = () => {
  // Navigation State
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modals State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);
  const [domainName, setDomainName] = useState<string>('portal.vertexcapital.io');

  // React Hook Form initialized with Zod Schema and onChange real-time validation mode
  const {
    register,
    watch,
    formState: { errors },
    reset,
    trigger
  } = useForm<FullFormData>({
    resolver: zodResolver(fullOnboardingSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Watch entire form payload reactively
  const watchedFormData = watch();

  // Validate Step 1 against Step 1 Schema
  const isStep1Valid = step1Schema.safeParse({
    firstName: watchedFormData.firstName,
    lastName: watchedFormData.lastName,
    dateOfBirth: watchedFormData.dateOfBirth
  }).success;

  // Validate Step 2 against Step 2 Schema
  const isStep2Valid = step2Schema.safeParse({
    email: watchedFormData.email,
    password: watchedFormData.password,
    confirmPassword: watchedFormData.confirmPassword
  }).success;

  // Navigation handlers
  const handleGoToStep2 = async () => {
    const isStep1Clean = await trigger(['firstName', 'lastName', 'dateOfBirth']);
    if (isStep1Clean && isStep1Valid) {
      setCurrentStep(2);
    }
  };

  const handleGoToStep3 = async () => {
    const isStep2Clean = await trigger(['email', 'password', 'confirmPassword']);
    if (isStep2Clean && isStep2Valid) {
      setCurrentStep(3);
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleBackToStep2 = () => {
    setCurrentStep(2);
  };

  // Final Form Submission handler (Phase 1, 2, 3 requirement)
  const onSubmitFinal = async () => {
    setIsSubmitting(true);

    // Validate full payload against Zod schema
    const isFullValid = await trigger();
    if (!isFullValid) {
      setIsSubmitting(false);
      return;
    }

    const finalizedPayload = {
      ...watchedFormData,
      submittedAt: new Date().toISOString(),
      clientEnvironment: 'Institutional_Web_Node'
    };

    // Mandatory Phase 1 Deliverable: console.log() the finalized data object
    console.log('[Institutional Onboarding Submission Payload]:', finalizedPayload);

    // Simulate network roundtrip latency for realistic enterprise UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    reset({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Institutional Top Navigation Header */}
      <Header
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
        domainName={domainName}
        isDomainVerified={true}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Institutional Onboarding Header Copy */}
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-blue-400">
            <span>FINANCIAL SERVICES NETWORK</span>
            <span>/</span>
            <span>NEW CLIENT PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-100">
            Institutional Client Onboarding
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Complete the segmented three-step verification process to provision your authorized
            institutional trading and custody settlement credentials.
          </p>
        </div>

        {/* Dynamic Progress Indicator (Phase 2 Requirement: Step X of 3) */}
        {!isSubmitted && (
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        )}

        {/* Conditional Rendering of Wizard Views (Phase 1 Requirement) */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <SuccessView
              payload={watchedFormData}
              onReset={handleResetForm}
            />
          ) : (
            <>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <Step1PersonalInfo
                  register={register}
                  errors={errors}
                  watch={watch}
                  onNext={handleGoToStep2}
                />
              )}

              {/* Step 2: Account Details */}
              {currentStep === 2 && (
                <Step2AccountDetails
                  register={register}
                  errors={errors}
                  watch={watch}
                  onNext={handleGoToStep3}
                  onBack={handleBackToStep1}
                />
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <Step3ReviewSubmit
                  watch={watch}
                  onBack={handleBackToStep2}
                  onSubmit={onSubmitFinal}
                  isSubmitting={isSubmitting}
                  onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
                  onOpenTermsModal={() => setIsTermsModalOpen(true)}
                />
              )}
            </>
          )}
        </div>

        {/* Architecture & Live State Inspector */}
        <StateInspector
          currentStep={currentStep}
          formData={watchedFormData}
          errors={errors}
          isStep1Valid={isStep1Valid}
          isStep2Valid={isStep2Valid}
          isStep3Ready={isStep1Valid && isStep2Valid}
        />
      </main>

      {/* Compliance & Regulatory Footer */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Modal Dialogs */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <DomainSettingsModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        domainName={domainName}
        onUpdateDomain={(newDomain) => setDomainName(newDomain)}
      />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { FullFormData } from '../schemas/validationSchema';
import {
  ArrowLeft,
  Lock,
  Mail,
  User,
  Calendar,
  FileCheck,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface Step3ReviewSubmitProps {
  watch: UseFormWatch<FullFormData>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const Step3ReviewSubmit: React.FC<Step3ReviewSubmitProps> = ({
  watch,
  onBack,
  onSubmit,
  isSubmitting = false,
  onOpenPrivacyModal,
  onOpenTermsModal
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const formData = watch();

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          Review & Submit Application
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review the institutional account payload before final dispatch to our settlement core.
        </p>
      </div>

      {/* Review Summary Cards */}
      <div className="space-y-4">
        {/* Card 1: Identity Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Identity Profile (Step 1)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block text-[11px]">First Name</span>
              <span className="text-slate-100 font-medium font-mono text-sm mt-0.5 block">
                {formData.firstName || '[Not Provided]'}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block text-[11px]">Last Name</span>
              <span className="text-slate-100 font-medium font-mono text-sm mt-0.5 block">
                {formData.lastName || '[Not Provided]'}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block text-[11px]">Date of Birth</span>
              <span className="text-slate-100 font-medium font-mono text-sm mt-0.5 block flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-slate-400 inline" />
                <span>{formData.dateOfBirth || '[Not Provided]'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Security & Account Credentials */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-blue-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Authentication Credentials (Step 2)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block text-[11px]">Authorized Email</span>
              <span className="text-slate-100 font-medium font-mono text-sm mt-0.5 block flex items-center space-x-1">
                <Mail className="h-3 w-3 text-slate-400 inline shrink-0" />
                <span className="truncate">{formData.email || '[Not Provided]'}</span>
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block text-[11px]">Password Hash Policy</span>
              <span className="text-slate-100 font-medium font-mono text-sm mt-0.5 block flex items-center space-x-1">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400 inline shrink-0" />
                <span>
                  {formData.password ? `•••••••• (${formData.password.length} chars, bcrypt/argon2)` : '[Not Provided]'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Institutional Disclosure & Compliance Check */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4 text-xs">
          <div className="flex items-start space-x-2.5">
            <Building2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-300 font-medium">Compliance & Regulatory Attestation</p>
              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                By submitting this payload, you certify that the personal identity and contact records
                belong to the authorized corporate account officer. All transactions are logged under FINRA / SEC
                Rule 17a-4 compliant write-once-read-many (WORM) storage.
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center space-x-2">
            <input
              id="termsAgreement"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <label htmlFor="termsAgreement" className="text-xs text-slate-300 cursor-pointer">
              I agree to the{' '}
              <button
                type="button"
                onClick={onOpenTermsModal}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                Terms of Service
              </button>{' '}
              and acknowledge the{' '}
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                Institutional Privacy Policy
              </button>
              .
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={!agreedToTerms || isSubmitting}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            agreedToTerms && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
          }`}
        >
          <FileCheck className="h-4 w-4" />
          <span>{isSubmitting ? 'Submitting Payload...' : 'Submit Application'}</span>
        </button>
      </div>
    </form>
  );
};

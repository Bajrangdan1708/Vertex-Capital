import React from 'react';
import { X, ShieldCheck, Lock, FileText, Check } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Institutional Privacy Policy
              </h2>
              <p className="text-[11px] text-slate-400">
                Regulatory Reference: GLBA, GDPR Art. 13/14, SOC 2 Type II
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed font-sans">
          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>1. Information Collection and Regulatory Scope</span>
            </h3>
            <p className="text-slate-400">
              Vertex Capital Systems Inc. collects non-public personal information (NPI) necessary
              to comply with the Bank Secrecy Act (BSA), USA PATRIOT Act, FinCEN regulations, and
              applicable KYC/AML mandates. This includes legal identifiers (First Name, Last Name, Date of Birth)
              and electronic contact credentials (institutional email addresses).
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>2. Processing Rationale and Legal Basis</span>
            </h3>
            <p className="text-slate-400">
              All personal data submitted through this onboarding wizard is processed exclusively
              for the establishment of institutional brokerage services, verification of signatory identity,
              and cryptographic credential allocation. We do not sell, rent, or lease personal identifiers to any
              third party marketing entities under any circumstances.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>3. Data Storage and Cryptographic Controls</span>
            </h3>
            <p className="text-slate-400">
              Payloads are transmitted using TLS 1.3 encryption with ECDHE-RSA key exchange. Data at rest
              is safeguarded inside dedicated hardware security modules (HSMs) using AES-256 bit encryption.
              Authentication credentials are processed using salted, compute-intensive cryptographic hashing
              algorithms prior to ingestion into our core ledger.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>4. Record Retention Standards</span>
            </h3>
            <p className="text-slate-400">
              Pursuant to SEC Rule 17a-4 and FINRA Rule 4511, audit trails and customer account records
              must be retained in Write Once, Read Many (WORM) compliant storage for an active lifecycle
              of not less than six years, with the first two years maintained in an easily accessible location.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Document Revision: 2026.4.1 | Legal Entity #894-VC-902
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};


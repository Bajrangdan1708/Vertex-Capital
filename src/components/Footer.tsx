import React from 'react';
import { Shield, FileText } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onOpenDomainModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenDomainModal
}) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Regulatory & Institutional Identification */}
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-slate-500" />
            <span>Vertex Capital Systems Inc. | FINRA/SIPC Regulated Institutional Node</span>
          </div>

          {/* Links for Privacy Policy, Terms, and Domain Configuration */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-200 transition-colors underline-offset-4 hover:underline flex items-center space-x-1"
            >
              <FileText className="h-3 w-3" />
              <span>Privacy Policy</span>
            </button>

            <span className="text-slate-700">|</span>

            <button
              type="button"
              onClick={onOpenTermsModal}
              className="hover:text-slate-200 transition-colors underline-offset-4 hover:underline flex items-center space-x-1"
            >
              <FileText className="h-3 w-3" />
              <span>Terms of Service</span>
            </button>

            <span className="text-slate-700">|</span>

            <button
              type="button"
              onClick={onOpenDomainModal}
              className="hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Domain Configuration
            </button>
          </div>
        </div>

        <div className="mt-3 text-center sm:text-left text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-2 border-t border-slate-900 pt-3">
          <span>All payloads encrypted at rest using AES-256 and transmitted via TLS 1.3 protocol.</span>
          <span>SOC 2 Type II Certified | ISO 27001 Infrastructure Standard</span>
        </div>
      </div>
    </footer>
  );
};


import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Institutional Terms of Service
              </h2>
              <p className="text-[11px] text-slate-400">
                Master Brokerage & Automated API Access Agreement
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
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>1. Corporate Representation and Authority</span>
            </h3>
            <p className="text-slate-400">
              The individual submitting this application warrants that they are at least eighteen (18) years of age,
              possess the legal capacity to enter into binding financial obligations, and have been duly authorized
              by their corporate entity to bind the institution to these terms.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>2. Credential Custody and Security Obligations</span>
            </h3>
            <p className="text-slate-400">
              You are solely responsible for maintaining strict confidentiality of the master authentication
              credentials created during this onboarding process. Any instructions or orders initiated using
              these credentials will be treated by Vertex Capital as authorized by the registered corporate client.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
              <span>3. Service Level Agreements and System Availability</span>
            </h3>
            <p className="text-slate-400">
              Vertex Capital maintains a 99.99% core ledger availability target. Scheduled maintenance windows
              are broadcast 72 hours in advance via signed status notifications. In the event of force majeure
              or distributed denial of service events, failover routing protocols engage automatically across
              isolated regional zones.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-xs mb-1.5 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>4. Governing Law and Dispute Resolution</span>
            </h3>
            <p className="text-slate-400">
              This Agreement shall be governed by and construed in accordance with the laws of the State of
              New York, without regard to choice of law principles. Any dispute arising hereunder shall be
              resolved through binding arbitration administered in New York County before FINRA Dispute Resolution.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Master Agreement ID: 2026-TOS-REV-7
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


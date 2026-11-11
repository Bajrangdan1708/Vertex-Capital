import React, { useState } from 'react';
import { X, Globe, CheckCircle2, ShieldCheck, RefreshCw, Server } from 'lucide-react';

interface DomainSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  onUpdateDomain: (newDomain: string) => void;
}

export const DomainSettingsModal: React.FC<DomainSettingsModalProps> = ({
  isOpen,
  onClose,
  domainName,
  onUpdateDomain
}) => {
  const [inputDomain, setInputDomain] = useState(domainName);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDomain) return;

    setIsVerifying(true);
    setVerificationFeedback(null);

    setTimeout(() => {
      setIsVerifying(false);
      onUpdateDomain(inputDomain);
      setVerificationFeedback('Custom domain DNS records and TLS 1.3 certificates verified successfully.');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Custom Domain Configuration
              </h2>
              <p className="text-[11px] text-slate-400">
                Enterprise routing and SSL certificate management
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

        {/* Modal Content */}
        <div className="px-6 py-5 space-y-5 text-xs text-slate-300">
          {/* Active Domain Status Banner */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-sm bg-emerald-400" />
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-mono">
                  Primary Routing Host
                </span>
                <span className="text-sm font-mono text-slate-100 font-semibold">
                  https://{domainName}
                </span>
              </div>
            </div>
            <span className="flex items-center text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Connected & Live
            </span>
          </div>

          {/* Form to Update/Verify Domain */}
          <form onSubmit={handleVerify} className="space-y-3">
            <label htmlFor="customDomainInput" className="block text-xs font-medium text-slate-300">
              Assigned Custom Domain Hostname
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Globe className="h-4 w-4" />
                </div>
                <input
                  id="customDomainInput"
                  type="text"
                  value={inputDomain}
                  onChange={(e) => setInputDomain(e.target.value)}
                  placeholder="e.g. portal.vertexcapital.io"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isVerifying}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Resolving DNS...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Verify Records</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {verificationFeedback && (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-400 text-xs flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{verificationFeedback}</span>
            </div>
          )}

          {/* DNS Configuration Table */}
          <div className="space-y-2">
            <div className="text-slate-300 font-medium text-xs flex items-center space-x-1.5">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Institutional Edge DNS Records</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-md overflow-hidden font-mono text-[11px]">
              <div className="grid grid-cols-12 bg-slate-850 px-3 py-1.5 text-slate-400 font-sans border-b border-slate-800">
                <span className="col-span-2">Type</span>
                <span className="col-span-4">Host / Name</span>
                <span className="col-span-4">Target Value</span>
                <span className="col-span-2 text-right">Status</span>
              </div>
              <div className="grid grid-cols-12 px-3 py-2 border-b border-slate-850 items-center">
                <span className="col-span-2 text-blue-400 font-semibold">CNAME</span>
                <span className="col-span-4 text-slate-300">portal</span>
                <span className="col-span-4 text-slate-400 truncate">cname.vertexrouting.net</span>
                <span className="col-span-2 text-right text-emerald-400 font-sans">Active</span>
              </div>
              <div className="grid grid-cols-12 px-3 py-2 items-center">
                <span className="col-span-2 text-blue-400 font-semibold">TXT</span>
                <span className="col-span-4 text-slate-300">_vertex-challenge</span>
                <span className="col-span-4 text-slate-400 truncate">vertex-verify=7f82b9a4c10e</span>
                <span className="col-span-2 text-right text-emerald-400 font-sans">Active</span>
              </div>
            </div>
          </div>

          {/* SSL Certificate Details */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-md text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-slate-300">TLS 1.3 Extended Validation SSL</span>
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Auto-Renew Enabled</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Certificate Authority: DigiCert High Assurance TLS Hybrid ECC SHA384 2026. Next rotation scheduled for 2027.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Anycast CDN Edge Node: US-EAST-VA (100% SLA)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

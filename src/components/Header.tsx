import React from 'react';
import { ShieldCheck, Globe, CheckCircle2, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenDomainModal: () => void;
  domainName: string;
  isDomainVerified: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDomainModal,
  domainName,
  isDomainVerified
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Organization */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center text-blue-500 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-100 tracking-tight text-sm uppercase">Vertex Capital</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                Institutional
              </span>
            </div>
            <p className="text-xs text-slate-400">Client Portal Onboarding System</p>
          </div>
        </div>

        {/* System & Domain Verification Indicators */}
        <div className="flex items-center space-x-3 text-xs">
          <button
            type="button"
            onClick={onOpenDomainModal}
            className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-md transition-colors"
            title="Inspect Custom Domain DNS and SSL Certificate Status"
          >
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-mono text-slate-300 hidden sm:inline">{domainName}</span>
            {isDomainVerified ? (
              <span className="flex items-center text-emerald-400 font-medium pl-1">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </span>
            ) : (
              <span className="text-amber-400 font-medium pl-1">Pending</span>
            )}
          </button>

          <div className="hidden md:flex items-center space-x-1.5 text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-md border border-slate-800">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>TLS 1.3 / AES-256</span>
          </div>
        </div>
      </div>
    </header>
  );
};


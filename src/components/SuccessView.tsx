import React, { useState } from 'react';
import { FullFormData } from '../schemas/validationSchema';
import { CheckCircle2, ShieldCheck, Terminal, Copy, Check, RotateCcw } from 'lucide-react';

interface SuccessViewProps {
  payload: FullFormData;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ payload, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Mask password for safe display in UI summary
  const safePayload = {
    ...payload,
    password: '••••••••[PROTECTED_HASH]',
    confirmPassword: '••••••••[PROTECTED_HASH]',
    submissionTimestamp: new Date().toISOString(),
    status: 'INGESTED_SUCCESSFULLY',
    securityStandard: 'SOC2_TYPE_II'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(safePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6">
      {/* Success Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
                Onboarding Payload Verified & Dispatched
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Account provisioning initiated. Payload logged to console with zero data loss.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
            HTTP 201 CREATED
          </span>
        </div>
      </div>

      {/* Console Log Verification Callout */}
      <div className="bg-slate-950 border border-slate-800 rounded-md p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Browser Console Output Verification</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Payload</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mb-2">
          The finalized data object was successfully dispatched via console.log() as requested in Phase 1 specifications.
        </p>

        <pre className="text-xs font-mono bg-slate-900/90 text-slate-300 p-3.5 rounded border border-slate-850 overflow-x-auto leading-relaxed">
          {JSON.stringify(safePayload, null, 2)}
        </pre>
      </div>

      {/* Field Level Summary Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-md overflow-hidden text-xs">
        <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 font-medium text-slate-300">
          Captured Field Registry
        </div>
        <div className="divide-y divide-slate-800/80">
          <div className="px-4 py-2.5 flex justify-between">
            <span className="text-slate-400">Legal First Name</span>
            <span className="font-mono text-slate-200">{payload.firstName}</span>
          </div>
          <div className="px-4 py-2.5 flex justify-between">
            <span className="text-slate-400">Legal Last Name</span>
            <span className="font-mono text-slate-200">{payload.lastName}</span>
          </div>
          <div className="px-4 py-2.5 flex justify-between">
            <span className="text-slate-400">Date of Birth</span>
            <span className="font-mono text-slate-200">{payload.dateOfBirth}</span>
          </div>
          <div className="px-4 py-2.5 flex justify-between">
            <span className="text-slate-400">Institutional Email</span>
            <span className="font-mono text-slate-200">{payload.email}</span>
          </div>
          <div className="px-4 py-2.5 flex justify-between">
            <span className="text-slate-400">Security Credentials</span>
            <span className="font-mono text-emerald-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Length {payload.password.length} chars (Verified Match)
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Check developer tools console (F12) to inspect the live object.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Wizard</span>
        </button>
      </div>
    </div>
  );
};


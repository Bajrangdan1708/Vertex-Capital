import React, { useState } from 'react';
import { FullFormData } from '../schemas/validationSchema';
import { FieldErrors } from 'react-hook-form';
import { Code2, ChevronDown, ChevronUp, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { StepNumber } from '../types/onboarding';

interface StateInspectorProps {
  currentStep: StepNumber;
  formData: FullFormData;
  errors: FieldErrors<FullFormData>;
  isStep1Valid: boolean;
  isStep2Valid: boolean;
  isStep3Ready: boolean;
}

export const StateInspector: React.FC<StateInspectorProps> = ({
  currentStep,
  formData,
  errors,
  isStep1Valid,
  isStep2Valid,
  isStep3Ready
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mask password in debug payload for security
  const displayPayload = {
    ...formData,
    password: formData.password ? `•••••••• (${formData.password.length} chars)` : '',
    confirmPassword: formData.confirmPassword ? `•••••••• (${formData.confirmPassword.length} chars)` : ''
  };

  const errorKeys = Object.keys(errors);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-850 flex items-center justify-between text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <Layers className="w-4 h-4 text-blue-400" />
          <div>
            <span className="text-xs font-semibold text-slate-200">
              Architecture Inspector
            </span>
            <span className="text-[11px] text-slate-400 ml-2 font-mono">
              React Hook Form v7 + Zod Unified Payload
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <span className="text-slate-400">Step:</span>
            <span className="text-blue-400 font-semibold">{currentStep}/3</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <span className="text-slate-400">Validation:</span>
            {errorKeys.length === 0 ? (
              <span className="text-emerald-400 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                Clean
              </span>
            ) : (
              <span className="text-red-400 flex items-center">
                <AlertCircle className="w-3 h-3 mr-0.5" />
                {errorKeys.length} issues
              </span>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className={`p-2.5 rounded border ${isStep1Valid ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
              <div className="font-semibold text-[11px]">Step 1 (Personal Info)</div>
              <div className="text-[10px] mt-0.5">{isStep1Valid ? 'Passed Zod Validation' : 'Pending Valid Inputs'}</div>
            </div>

            <div className={`p-2.5 rounded border ${isStep2Valid ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
              <div className="font-semibold text-[11px]">Step 2 (Account Details)</div>
              <div className="text-[10px] mt-0.5">{isStep2Valid ? 'Passed Zod Validation' : 'Pending Valid Inputs'}</div>
            </div>

            <div className={`p-2.5 rounded border ${isStep3Ready ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
              <div className="font-semibold text-[11px]">Step 3 (Review & Dispatch)</div>
              <div className="text-[10px] mt-0.5">{isStep3Ready ? 'Ready for Console Log' : 'Requires Steps 1 & 2'}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center space-x-1">
                <Code2 className="w-3 h-3 text-blue-400" />
                <span>Unified Parent Payload (Persists across Step 1 &lt;-&gt; Step 2 transitions)</span>
              </span>
              <span className="text-emerald-400 font-sans text-[11px]">Reactive onChange</span>
            </div>
            <pre className="bg-slate-900 text-slate-300 p-3 rounded border border-slate-800/80 overflow-x-auto text-[11px] leading-relaxed">
              {JSON.stringify(displayPayload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};


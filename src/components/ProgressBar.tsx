import React from 'react';
import { StepNumber } from '../types/onboarding';
import { User, KeyRound, CheckSquare, Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: StepNumber;
  totalSteps?: number;
}

const STEPS_DATA = [
  { step: 1, title: 'Personal Info', description: 'Identity verification data', icon: User },
  { step: 2, title: 'Account Details', description: 'Credentials & security setup', icon: KeyRound },
  { step: 3, title: 'Review & Submit', description: 'Payload validation & dispatch', icon: CheckSquare }
] as const;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 3
}) => {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm">
      {/* Header with Step Count and Percent */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
            Onboarding Sequence
          </span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-blue-400 font-medium">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="font-mono text-slate-400">
          {percentage}% Complete
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-2 bg-slate-800 rounded-sm overflow-hidden mb-5">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 gap-2">
        {STEPS_DATA.map((item) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              className={`flex items-start space-x-3 p-2.5 rounded-md border transition-colors ${
                isCurrent
                  ? 'border-blue-600/50 bg-blue-950/20'
                  : isCompleted
                  ? 'border-slate-800 bg-slate-900/60'
                  : 'border-slate-800/40 bg-slate-950/40 opacity-50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded flex items-center justify-center shrink-0 text-xs font-mono font-medium ${
                  isCompleted
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                    : isCurrent
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : item.step}
              </div>

              <div className="min-w-0 hidden sm:block">
                <div className="flex items-center space-x-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-blue-400' : 'text-slate-400'}`} />
                  <p
                    className={`text-xs font-medium truncate ${
                      isCurrent ? 'text-slate-100' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


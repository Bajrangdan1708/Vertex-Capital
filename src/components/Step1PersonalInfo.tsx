import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FullFormData, step1Schema } from '../schemas/validationSchema';
import { ArrowRight, User, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Step1PersonalInfoProps {
  register: UseFormRegister<FullFormData>;
  errors: FieldErrors<FullFormData>;
  watch: UseFormWatch<FullFormData>;
  onNext: () => void;
}

export const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
  register,
  errors,
  watch,
  onNext
}) => {
  const firstName = watch('firstName') || '';
  const lastName = watch('lastName') || '';
  const dateOfBirth = watch('dateOfBirth') || '';

  // Local step validation check against Zod Step 1 schema
  const validationResult = step1Schema.safeParse({
    firstName,
    lastName,
    dateOfBirth
  });

  const isStep1Valid = validationResult.success;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          Personal Information
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Provide your legal identity data for compliance verification and institutional account registration.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              First Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="e.g. Alexander"
                {...register('firstName')}
                className={`w-full pl-9 pr-8 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.firstName
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                    : firstName.length >= 2
                    ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                    : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
                }`}
              />
              {firstName.length >= 2 && !errors.firstName && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
            </div>
            {errors.firstName && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.firstName.message}</span>
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Last Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="e.g. Vance"
                {...register('lastName')}
                className={`w-full pl-9 pr-8 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.lastName
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                    : lastName.length >= 2
                    ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                    : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
                }`}
              />
              {lastName.length >= 2 && !errors.lastName && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
            </div>
            {errors.lastName && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.lastName.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Date of Birth <span className="text-red-400">*</span>
            <span className="text-[11px] text-slate-500 font-normal ml-1">
              (Must be 18 years or older)
            </span>
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              id="dateOfBirth"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              {...register('dateOfBirth')}
              className={`w-full pl-9 pr-8 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                errors.dateOfBirth
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                  : dateOfBirth && !errors.dateOfBirth
                  ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                  : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
              }`}
            />
            {dateOfBirth && !errors.dateOfBirth && isStep1Valid && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.dateOfBirth.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          {!isStep1Valid ? (
            <span className="text-slate-400">Complete required fields to proceed</span>
          ) : (
            <span className="text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Step 1 verified
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!isStep1Valid}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
            isStep1Valid
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};


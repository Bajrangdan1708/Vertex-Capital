import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FullFormData, step2Schema } from '../schemas/validationSchema';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

interface Step2AccountDetailsProps {
  register: UseFormRegister<FullFormData>;
  errors: FieldErrors<FullFormData>;
  watch: UseFormWatch<FullFormData>;
  onNext: () => void;
  onBack: () => void;
}

export const Step2AccountDetails: React.FC<Step2AccountDetailsProps> = ({
  register,
  errors,
  watch,
  onNext,
  onBack
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = watch('email') || '';
  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // Real-time onChange email validation: check for @ symbol specifically
  const emailHasAt = email.includes('@');
  const isEmailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation: min 8 chars
  const isPasswordLengthValid = password.length >= 8;

  // Confirm password match check
  const passwordsMatch = password.length > 0 && confirmPassword === password;

  // Local step validation check against Zod Step 2 schema
  const validationResult = step2Schema.safeParse({
    email,
    password,
    confirmPassword
  });

  const isStep2Valid = validationResult.success;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          Account Credentials & Security
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure authentication credentials for accessing institutional settlement ledgers and portal APIs.
        </p>
      </div>

      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Institutional Email Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="user@institution.com"
              {...register('email')}
              className={`w-full pl-9 pr-8 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                email.length > 0 && (!emailHasAt || !isEmailValidFormat)
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                  : isEmailValidFormat
                  ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                  : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
              }`}
            />
            {isEmailValidFormat && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </div>

          {/* Dynamic real-time email error message */}
          {email.length > 0 && !emailHasAt && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Email address is missing an @ symbol</span>
            </p>
          )}
          {email.length > 0 && emailHasAt && !isEmailValidFormat && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Enter a complete corporate email address (e.g. user@institution.com)</span>
            </p>
          )}
          {errors.email && !email.length && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        {/* Password Field with Eyeball Toggle */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300"
            >
              Primary Access Password <span className="text-red-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500 font-mono">
              Min. 8 characters
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••••••"
              {...register('password')}
              className={`w-full pl-9 pr-10 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                password.length > 0 && !isPasswordLengthValid
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                  : isPasswordLengthValid
                  ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                  : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
              }`}
            />
            {/* Show / Hide Password Eyeball Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Real-time Password Error */}
          {password.length > 0 && !isPasswordLengthValid && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Password must contain at least 8 characters ({password.length}/8 entered)</span>
            </p>
          )}
          {errors.password && !password.length && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.password.message}</span>
            </p>
          )}

          {/* Password Security Metrics */}
          {password.length > 0 && (
            <div className="mt-2.5 p-2 bg-slate-950 border border-slate-800/80 rounded-md">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-400">Password Requirements:</span>
                <span className={isPasswordLengthValid ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {isPasswordLengthValid ? 'Length threshold satisfied' : 'Length requirement pending'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div
                  className={`h-1 flex-1 rounded-sm transition-all ${
                    password.length >= 8 ? 'bg-emerald-500' : password.length >= 4 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-sm transition-all ${
                    password.length >= 12 ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-sm transition-all ${
                    /[A-Z]/.test(password) && /[0-9]/.test(password) ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field with Eyeball Toggle */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Confirm Access Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Shield className="h-4 w-4" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••••••"
              {...register('confirmPassword')}
              className={`w-full pl-9 pr-10 py-2 bg-slate-900 border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                confirmPassword.length > 0 && !passwordsMatch
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                  : confirmPassword.length > 0 && passwordsMatch
                  ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/30'
                  : 'border-slate-800 focus:border-slate-600 focus:ring-slate-700'
              }`}
            />
            {/* Show / Hide Password Eyeball Toggle */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Real-time Confirm Password Error */}
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Confirm Password does not match the primary password</span>
            </p>
          )}
          {errors.confirmPassword && !confirmPassword.length && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.confirmPassword.message}</span>
            </p>
          )}
          {passwordsMatch && (
            <p className="mt-1.5 text-xs text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Passwords match</span>
            </p>
          )}
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
          type="button"
          onClick={onNext}
          disabled={!isStep2Valid}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
            isStep2Valid
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


'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, ChevronRight } from 'lucide-react';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const DASHBOARD_URL = `${basePath}/dashboard`;

  // Dev credentials for testing — remove before production
  const DEV_EMAIL = 'dev@wc-con.com';
  const DEV_PASS = 'dev123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Dev login bypass for testing
      if (email === DEV_EMAIL && password === DEV_PASS) {
        window.location.href = DASHBOARD_URL;
        return;
      }

      setIsLoading(false);
      setError(
        'Invalid credentials. For dev access use dev@wc-con.com / dev123'
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-black/20">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-200 font-semibold">Employee Login</span>
          </div>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/wcc-logo.webp"
                alt="West Central Contracting LTD"
                width={200}
                height={66}
                className="h-16 w-auto mx-auto brightness-0 invert"
              />
            </Link>
            <h1 className="font-heading text-2xl font-bold text-white mt-6">
              Employee Portal
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Sign in to access the team dashboard
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@wc-con.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="mailto:admin@wc-con.com?subject=Password Reset Request" className="text-sm text-brand-red hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="btn-primary w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">or</span>
              </div>
            </div>

            {/* Microsoft SSO */}
            <button
              type="button"
              onClick={() =>
                setError('Microsoft SSO is being configured. Contact admin@wc-con.com for access.')
              }
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Sign in with Microsoft
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
              <Shield className="h-3.5 w-3.5" />
              Secured with encryption. Employee access only.
            </div>
            <p className="text-gray-500 text-xs">
              Need help?{' '}
              <a href="mailto:admin@wc-con.com" className="text-gray-300 hover:text-white underline">
                Contact IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

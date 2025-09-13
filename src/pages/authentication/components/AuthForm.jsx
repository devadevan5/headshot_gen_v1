import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ activeTab, setActiveTab, onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const handleEmailSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setOtpSent(true);
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      onSubmit({ type: 'email', email });
    }
  };

  const handleOtpSubmit = (e) => {
    e?.preventDefault();
    if (otp?.length === 6) {
      onSubmit({ type: 'otp', email, otp });
    }
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      onSubmit({ type: 'resend', email });
    }
  };

  const handleSocialAuth = (provider) => {
    onSubmit({ type: provider });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'login' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'register' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Register
        </button>
      </div>
      {/* Welcome Message for Register */}
      {activeTab === 'register' && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Gift" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">
              Welcome Bonus: Get 2 free credits upon registration!
            </span>
          </div>
        </div>
      )}
      {/* Social Authentication */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading}
          iconName="Chrome"
          iconPosition="left"
          className="h-12"
        >
          Continue with Google
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('apple')}
          disabled={isLoading}
          iconName="Apple"
          iconPosition="left"
          className="h-12"
        >
          Continue with Apple
        </Button>
      </div>
      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>
      {/* Email/OTP Form */}
      {!otpSent ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            required
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={!email || isLoading}
            className="h-12"
          >
            {activeTab === 'login' ? 'Send Login Code' : 'Create Account'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <Icon name="Mail" size={48} className="text-accent mx-auto mb-2" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              Check your email
            </h3>
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <Input
            type="text"
            label="Verification Code"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
            required
            maxLength={6}
            disabled={isLoading}
            className="text-center text-lg tracking-widest"
          />

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={otp?.length !== 6 || isLoading}
            className="h-12"
          >
            Verify & Continue
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
              className={`text-sm transition-smooth ${
                resendTimer > 0
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-accent hover:text-accent/80'
              }`}
            >
              {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setOtp('');
              setResendTimer(0);
            }}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            ← Back to email
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
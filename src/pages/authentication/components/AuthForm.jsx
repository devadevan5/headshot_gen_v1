import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../hooks/useAuth';

const AuthForm = ({ activeTab, setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { signUp, signIn, signInWithOAuth } = useAuth();

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (activeTab === 'register') {
        const { data, error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Check your email for the confirmation link!');
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Social authentication failed');
    } finally {
      setIsLoading(false);
    }
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

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-destructive" />
            <span className="text-sm font-medium text-destructive">{error}</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">{message}</span>
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
          onClick={() => handleSocialAuth('github')}
          disabled={isLoading}
          iconName="Github"
          iconPosition="left"
          className="h-12"
        >
          Continue with GitHub
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

      {/* Email/Password Form */}
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
        
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
          required
          disabled={isLoading}
          description={activeTab === 'register' ? 'Password must be at least 6 characters' : undefined}
        />
        
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={!email || !password || isLoading}
          className="h-12"
        >
          {activeTab === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
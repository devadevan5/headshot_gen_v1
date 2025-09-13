import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PricingCard from './components/PricingCard';
import PaywallModal from './components/PaywallModal';
import CreditBalance from './components/CreditBalance';
import PaymentMethods from './components/PaymentMethods';
import PurchaseConfirmation from './components/PurchaseConfirmation';
import Button from '../../components/ui/Button';


const CreditPurchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCredits, setCurrentCredits] = useState(25);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  // Mock pricing plans
  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 9.99,
      credits: 20,
      savings: 0,
      features: [
        '20 AI headshot generations',
        'High-quality image output',
        'Multiple outfit options',
        'Background customization',
        'Download in HD quality'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      credits: 60,
      savings: 25,
      features: [
        '60 AI headshot generations',
        'Premium quality output',
        'All outfit categories',
        'All background options',
        'Priority processing',
        'Bulk download feature'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      credits: 120,
      savings: 40,
      features: [
        '120 AI headshot generations',
        'Ultra-high quality output',
        'Exclusive outfit collections',
        'Custom background uploads',
        'Fastest processing speed',
        'Advanced editing tools',
        'Priority customer support'
      ]
    }
  ];

  // Check if opened from paywall
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams?.get('paywall') === 'true') {
      setCurrentCredits(0);
      setIsPaywallOpen(true);
    }
  }, [location]);

  const handleSelectPlan = async (plan) => {
    setIsLoading(true);
    
    try {
      // Simulate Stripe checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      const newBalance = currentCredits + plan?.credits;
      setCurrentCredits(newBalance);
      
      setPurchaseDetails({
        planName: plan?.name,
        credits: plan?.credits,
        amount: plan?.price,
        newBalance: newBalance,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        transactionId: `TXN-${Date.now()}`
      });
      
      setIsPaywallOpen(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToGeneration = () => {
    setShowConfirmation(false);
    navigate('/dashboard');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigate('/account-settings');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your Credit Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your headshot generation needs. 
              All plans include monthly credit refresh and premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Credit Balance & Payment Info */}
            <div className="lg:col-span-1 space-y-6">
              <CreditBalance 
                credits={currentCredits}
                lastRefresh={new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)}
                nextRefresh={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
              />
              <PaymentMethods />
            </div>

            {/* Pricing Plans */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pricingPlans?.map((plan, index) => (
                  <PricingCard
                    key={plan?.id}
                    plan={plan}
                    isPopular={index === 1}
                    onSelect={handleSelectPlan}
                    isLoading={isLoading}
                    currentCredits={currentCredits}
                  />
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      How do credits work?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Each headshot generation uses 1 credit. Credits refresh monthly on your billing date, 
                      and unused credits don't roll over to the next month.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Can I cancel anytime?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can cancel your subscription at any time. You'll continue to have access 
                      to your credits until the end of your current billing period.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      What happens to my generated images?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your generated headshots are stored for 7 days and can be downloaded anytime during 
                      this period. After 7 days, images are automatically deleted for privacy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Dashboard */}
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onSelectPlan={handleSelectPlan}
        pricingPlans={pricingPlans}
        isLoading={isLoading}
      />
      {/* Purchase Confirmation */}
      <PurchaseConfirmation
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        purchaseDetails={purchaseDetails}
        onContinue={handleContinueToGeneration}
      />
    </div>
  );
};

export default CreditPurchase;
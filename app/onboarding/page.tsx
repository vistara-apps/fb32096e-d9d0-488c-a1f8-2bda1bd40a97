'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InterestSelector } from '@/components/InterestSelector';
import { FrameHeader } from '@/components/FrameHeader';

export default function OnboardingPage() {
  const [currentInterests, setCurrentInterests] = useState<string[]>([]);
  const [step, setStep] = useState<'welcome' | 'interests' | 'complete'>('welcome');
  const router = useRouter();

  const handleInterestsChange = (interests: string[]) => {
    setCurrentInterests(interests);
  };

  const handleComplete = async () => {
    try {
      // In a real app, save to database
      console.log('Saving interests:', currentInterests);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStep('complete');

      // Redirect after showing success
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };

  if (step === 'complete') {
    return (
      <div className="container">
        <FrameHeader title="VibePulse" />

        <div className="animate-fade-in text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to VibePulse!
          </h1>
          <p className="text-gray-600 mb-6">
            Your personalized event recommendations are ready.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting you to discover events...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <FrameHeader title="VibePulse" />

      {step === 'welcome' && (
        <div className="animate-fade-in text-center py-8">
          <div className="text-4xl mb-4">🎭</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Let's get you set up!
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We'll ask a few questions to personalize your event recommendations based on your interests and social connections.
          </p>

          <button
            onClick={() => setStep('interests')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Get Started →
          </button>
        </div>
      )}

      {step === 'interests' && (
        <div className="py-6">
          <InterestSelector
            currentInterests={currentInterests}
            onInterestsChange={handleInterestsChange}
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  );
}


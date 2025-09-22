'use client';

import { useState } from 'react';
import { CTAButton } from './CTAButton';

interface InterestSelectorProps {
  currentInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onComplete: () => void;
}

const AVAILABLE_INTERESTS = [
  { id: 'music', name: 'Music & Concerts', emoji: '🎵', color: 'bg-purple-100 text-purple-800' },
  { id: 'tech', name: 'Technology & AI', emoji: '💻', color: 'bg-blue-100 text-blue-800' },
  { id: 'art', name: 'Art & Culture', emoji: '🎨', color: 'bg-pink-100 text-pink-800' },
  { id: 'sports', name: 'Sports & Fitness', emoji: '⚽', color: 'bg-green-100 text-green-800' },
  { id: 'food', name: 'Food & Dining', emoji: '🍽️', color: 'bg-orange-100 text-orange-800' },
  { id: 'social', name: 'Social & Networking', emoji: '👥', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'business', name: 'Business & Finance', emoji: '💼', color: 'bg-gray-100 text-gray-800' },
  { id: 'education', name: 'Education & Learning', emoji: '📚', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'travel', name: 'Travel & Adventure', emoji: '✈️', color: 'bg-teal-100 text-teal-800' },
  { id: 'gaming', name: 'Gaming & Entertainment', emoji: '🎮', color: 'bg-red-100 text-red-800' },
];

export function InterestSelector({ currentInterests, onInterestsChange, onComplete }: InterestSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentInterests);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleComplete = () => {
    onInterestsChange(selectedInterests);
    onComplete();
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What interests you? 🎯
        </h2>
        <p className="text-gray-600">
          Select your interests to get personalized event recommendations
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {AVAILABLE_INTERESTS.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{interest.emoji}</span>
                <div>
                  <div className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                    {interest.name}
                  </div>
                  {isSelected && (
                    <div className="text-xs text-primary/70 mt-1">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          {selectedInterests.length} of {AVAILABLE_INTERESTS.length} interests selected
        </p>

        <CTAButton
          onClick={handleComplete}
          disabled={selectedInterests.length === 0}
          className="w-full"
        >
          {selectedInterests.length === 0 ? 'Select at least one interest' : 'Get My Recommendations!'}
        </CTAButton>
      </div>
    </div>
  );
}


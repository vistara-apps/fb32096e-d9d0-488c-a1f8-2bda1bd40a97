'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="container text-center">
        <div className="card p-8">
          <h2 className="text-display text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-body text-muted mb-6">
            We couldn't load your events right now. Let's try again!
          </p>
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

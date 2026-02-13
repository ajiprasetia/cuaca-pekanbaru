'use client';

interface LoadingStateProps {
  onRetry?: () => void;
  error?: string | null;
}

export default function LoadingState({ onRetry, error }: LoadingStateProps) {
  if (error) {
    return (
      <div className="glass-effect rounded-3xl p-8 mb-8 animate-slide-in">
        <div className="text-6xl mb-4 text-center">⚠️</div>
        <p className="text-white text-center text-lg font-medium">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 mx-auto block bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            Coba Lagi
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-64 animate-slide-in">
      <div className="glass-effect rounded-3xl p-8">
        <div className="animate-pulse-soft text-6xl mb-4 text-center">🌤️</div>
        <p className="text-white text-lg font-medium">Memuat data cuaca...</p>
      </div>
    </div>
  );
}
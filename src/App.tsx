import { PlayerList } from './components/PlayerList';
import { RoundForm } from './components/RoundForm';
import { GameSummary } from './components/GameSummary';
import { RoundHistory } from './components/RoundHistory';
import { BuyMeCoffeeButton } from './components/BuyMeCoffeeButton';
import { SEO } from './components/SEO';

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">
            Gambling Tracker
          </h1>
          
          <div className="space-y-8">
            <PlayerList />
            <RoundForm />
            <GameSummary />
            <RoundHistory />
            <div className="flex flex-col items-center gap-4 py-8">
              <p className="text-gray-600 text-center">
                Like this app? Tips are much appreciated! 🙏
              </p>
              <BuyMeCoffeeButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { Helmet } from 'react-helmet-async';

export function SEO() {
  return (
    <Helmet>
      <title>Gambling Tracker - Track Your Gambling Sessions</title>
      <meta name="description" content="Free gambling tracker app to record and analyze your gambling sessions. Track wins, losses, and manage multiple players with detailed history." />
      
      {/* Keywords */}
      <meta name="keywords" content="gambling tracker, bet tracking, gambling log, casino tracker, gambling history, betting tracker, gambling management" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Gambling Tracker - Track Your Gambling Sessions" />
      <meta property="og:description" content="Free gambling tracker app to record and analyze your gambling sessions. Track wins, losses, and manage multiple players with detailed history." />
      <meta property="og:url" content="https://gambling-tracker.netlify.app/" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Gambling Tracker - Track Your Gambling Sessions" />
      <meta name="twitter:description" content="Free gambling tracker app to record and analyze your gambling sessions. Track wins, losses, and manage multiple players with detailed history." />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Gambling Tracker" />
      <link rel="canonical" href="https://gambling-tracker.netlify.app/" />
    </Helmet>
  );
}
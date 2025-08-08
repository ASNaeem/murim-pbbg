import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacter } from '../lib/gameApi';
import { trainStat } from '../lib/trainApi';
import ProfilePanel from '../components/ProfilePanel';
import StatsPanel from '../components/StatsPanel';
import InventoryPanel from '../components/InventoryPanel';
import CityPanel from '../components/CityPanel';
import TrainPanel from '../components/TrainPanel';
import ExplorePanel from '../components/ExplorePanel';
import WorkPanel from '../components/WorkPanel';

const sections = [
  { key: 'profile', label: 'Profile' },
  { key: 'stats', label: 'Stats' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'city', label: 'City' },
  { key: 'train', label: 'Train' },
  { key: 'explore', label: 'Explore' },
  { key: 'work', label: 'Work' },
];

export default function Dashboard() {
  const [active, setActive] = useState('profile');
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trainStatKey, setTrainStatKey] = useState('attack');
  const [trainLoading, setTrainLoading] = useState(false);
  const [trainMsg, setTrainMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }
    getCharacter(token)
      .then(setCharacter)
      .catch(() => setError('Failed to load character'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar (mobile: stats panel) */}
      <header className="bg-white shadow flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <div className="text-xl md:text-2xl font-bold tracking-tight">
          Murim Game
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-medium text-gray-700 text-sm md:text-base">
            {character?.name || '...'}
          </span>
          <button
            className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-600 text-sm md:text-base"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Pinned stats panel (always visible, mobile-friendly) */}
      <div className="bg-white shadow flex justify-between items-center px-4 py-2 md:px-8 md:py-3 sticky top-0 z-10">
        <div className="flex gap-4 text-xs md:text-base">
          <span>
            <span className="font-semibold">Health:</span>{' '}
            {character ? `${character.health}/${character.health}` : '...'}
          </span>
          <span>
            <span className="font-semibold">Stamina:</span>{' '}
            {character ? `${character.stamina}/${character.maxStamina}` : '...'}
          </span>
          <span>
            <span className="font-semibold">Silver Taels:</span>{' '}
            {character ? character.silverTaels : '...'}
          </span>
        </div>
      </div>

      {/* Main Content & Navigation */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              {active === 'profile' && <ProfilePanel character={character} />}
              {active === 'stats' && <StatsPanel character={character} />}
              {active === 'inventory' && <InventoryPanel />}
              {active === 'city' && <CityPanel />}
              {active === 'train' && (
                <TrainPanel
                  character={character}
                  trainStatKey={trainStatKey}
                  setTrainStatKey={setTrainStatKey}
                  trainLoading={trainLoading}
                  trainMsg={trainMsg}
                  onTrain={async () => {
                    setTrainLoading(true);
                    setTrainMsg('');
                    try {
                      const token = localStorage.getItem('accessToken');
                      if (!token) throw new Error('Not logged in');
                      const res = (await trainStat(token, trainStatKey)) as {
                        character: any;
                        message: string;
                      };
                      setCharacter(res.character);
                      setTrainMsg(res.message);
                    } catch (e: any) {
                      setTrainMsg(e?.message || 'Failed to train');
                    } finally {
                      setTrainLoading(false);
                    }
                  }}
                />
              )}
              {active === 'explore' && <ExplorePanel />}
              {active === 'work' && <WorkPanel />}
            </>
          )}
        </main>

        {/* Bottom Navigation (mobile) */}
        <nav className="md:fixed bottom-0 left-0 right-0 bg-white shadow flex justify-around py-2 z-20">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`flex-1 py-2 px-1 text-xs font-medium ${active === s.key ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-700'}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

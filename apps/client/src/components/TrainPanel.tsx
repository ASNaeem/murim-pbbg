import React from 'react';

export default function TrainPanel({
  character,
  trainStatKey,
  setTrainStatKey,
  trainLoading,
  trainMsg,
  onTrain,
}: {
  character: any;
  trainStatKey: string;
  setTrainStatKey: (key: string) => void;
  trainLoading: boolean;
  trainMsg: string;
  onTrain: () => void;
}) {
  const stats = [
    { key: 'attack', label: 'Attack', value: character?.attack },
    { key: 'defense', label: 'Defense', value: character?.defense },
    { key: 'evasion', label: 'Evasion', value: character?.evasion },
    { key: 'accuracy', label: 'Accuracy', value: character?.accuracy },
  ];
  // Example locations, unlock logic based on character.attack (can be changed)
  const locations = [
    { key: 'dojo', label: 'Local Dojo', multiplier: 1, unlock: true },
    {
      key: 'mountain',
      label: 'Mountain Retreat',
      multiplier: 1.5,
      unlock: character?.attack >= 10,
    },
    {
      key: 'temple',
      label: 'Ancient Temple',
      multiplier: 2,
      unlock: character?.attack >= 25,
    },
    {
      key: 'sect',
      label: 'Elite Sect',
      multiplier: 3,
      unlock: character?.attack >= 50,
    },
  ];
  const [selectedLocation, setSelectedLocation] = React.useState('dojo');

  return (
    <section className="mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row gap-4 max-w-3xl">
        {/* Trainable stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center"
            >
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <div className="mb-2">
                Current: <span className="font-bold">{stat.value}</span>
              </div>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 w-full ${trainLoading && trainStatKey === stat.key ? 'opacity-50' : ''}`}
                disabled={trainLoading}
                onClick={() => {
                  setTrainStatKey(stat.key);
                  onTrain();
                }}
              >
                {trainLoading && trainStatKey === stat.key
                  ? 'Training...'
                  : `Train ${stat.label}`}
              </button>
            </div>
          ))}
        </div>
        {/* Training locations card */}
        <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center min-w-[220px] md:min-w-[260px]">
          <div className="text-lg font-semibold mb-2">Training Locations</div>
          {locations.map((loc) => (
            <button
              key={loc.key}
              className={`w-full mb-2 px-3 py-2 rounded border text-left ${selectedLocation === loc.key ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'} ${!loc.unlock ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!loc.unlock}
              onClick={() => loc.unlock && setSelectedLocation(loc.key)}
            >
              <div className="flex justify-between items-center">
                <span>{loc.label}</span>
                <span className="text-xs text-gray-500">x{loc.multiplier}</span>
              </div>
              {!loc.unlock && (
                <div className="text-xs text-red-500 mt-1">Locked</div>
              )}
            </button>
          ))}
          <div className="mt-2 text-xs text-gray-600">
            Higher tier locations give increased training multiplier.
          </div>
        </div>
        {/* ...existing code... */}
        {trainMsg && (
          <div className="text-sm text-blue-700 mb-2 w-full">{trainMsg}</div>
        )}
      </div>
    </section>
  );
}

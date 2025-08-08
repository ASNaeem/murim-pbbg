import React from 'react';

export default function StatsPanel({ character }: { character: any }) {
  if (!character) return null;
  return (
    <section className="mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Stats</h2>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <span className="font-semibold">Health:</span> {character.health}/
            {character.health}
          </div>
          <div>
            <span className="font-semibold">Stamina:</span> {character.stamina}/
            {character.maxStamina}
          </div>
          <div>
            <span className="font-semibold">Attack:</span> {character.attack}
          </div>
          <div>
            <span className="font-semibold">Defense:</span> {character.defense}
          </div>
          <div>
            <span className="font-semibold">Evasion:</span> {character.evasion}
          </div>
          <div>
            <span className="font-semibold">Accuracy:</span>{' '}
            {character.accuracy}
          </div>
          <div>
            <span className="font-semibold">Wisdom:</span> {character.wisdom}
          </div>
          <div>
            <span className="font-semibold">Intelligence:</span>{' '}
            {character.intelligence}
          </div>
          <div>
            <span className="font-semibold">Charisma:</span>{' '}
            {character.charisma}
          </div>
          <div>
            <span className="font-semibold">Silver Taels:</span>{' '}
            {character.silverTaels}
          </div>
        </div>
      </div>
    </section>
  );
}

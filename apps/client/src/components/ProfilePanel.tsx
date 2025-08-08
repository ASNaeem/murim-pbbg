import React from 'react';

export default function ProfilePanel({ character }: { character: any }) {
  if (!character) return null;
  return (
    <section className="mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Character Name:</span>{' '}
          {character.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Alignment:</span>{' '}
          {character.alignment}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {character.userId}
        </p>
      </div>
    </section>
  );
}

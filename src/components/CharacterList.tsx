import React from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

type CharacterListProps = {
  characters: Character[];
};

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <div
          key={character.id}
          className="border-2 border-gray-300 p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all flex flex-col"
        >
          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-bold text-center">{character.name}</h2>
            <p className="text-sm text-center">Status: {character.status}</p>
            <p className="text-sm text-center">Gender: {character.gender}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;

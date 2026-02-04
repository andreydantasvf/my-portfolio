'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Position = {
  top: string;
  left: string;
};

type Element = {
  id: number;
  position: Position;
  god: string;
};

const generateRandomPosition = (): Position => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`
});

const godsVectors = [
  'zeusVector.svg',
  'achillesVector.svg',
  'aphroditeVector.svg',
  'apolloVector.svg',
  'aresVector.svg',
  'athenaVector.svg',
  'erosVector.svg',
  'hephaestusVector.svg',
  'heraVector.svg',
  'hermesVector.svg',
  'heraclesVector.svg',
  'artemisVector.svg',
  'demeterVector.svg',
  'dionysusVector.svg',
  'hadesVector.svg',
  'hestiaVector.svg',
  'perseusVector.svg',
  'poseidonVector.svg'
];

const getRandomGod = (): string =>
  godsVectors[Math.floor(Math.random() * godsVectors.length)];

const AnimatedBackground: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev => [
        ...prev,
        {
          id: Date.now(),
          position: generateRandomPosition(),
          god: getRandomGod() // Atribuir um deus aleatório ao elemento
        }
      ]);

      // Remove o elemento após 3 segundos
      setTimeout(() => {
        setElements(prev => prev.slice(1));
      }, 3000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {elements.map(element => (
        <div
          key={element.id}
          className="animate-fade-in-out absolute"
          style={{
            top: element.position.top,
            left: element.position.left
          }}
        >
          <Image
            width={64}
            height={64}
            className="h-16 w-16 text-white opacity-10"
            src={`/gods-vectors/${element.god}`} // Cada elemento usa seu próprio deus
            alt={element.god.replace('.svg', '')}
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;

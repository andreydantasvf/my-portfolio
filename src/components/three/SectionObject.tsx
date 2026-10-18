'use client';

import { ObjectCanvas } from './ObjectCanvas';
import DatabaseStack from './objects/DatabaseStack';
import NetworkGraph from './objects/NetworkGraph';
import ServerRack from './objects/ServerRack';

const objects = {
  database: { Component: DatabaseStack, cameraZ: 7 },
  rack: { Component: ServerRack, cameraZ: 7 },
  network: { Component: NetworkGraph, cameraZ: 7.5 }
};

export type SectionObjectKind = keyof typeof objects;

export default function SectionObject({
  kind,
  className
}: {
  kind: SectionObjectKind;
  className?: string;
}) {
  const { Component, cameraZ } = objects[kind];
  return (
    <ObjectCanvas className={className} cameraZ={cameraZ}>
      <Component />
    </ObjectCanvas>
  );
}

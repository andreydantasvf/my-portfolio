import { BsFillLightningChargeFill } from 'react-icons/bs';
import { SectionTitle } from '../SectionTitle';
import { DivineSkill } from '../DivineSkill';
import { IoCodeSharp } from 'react-icons/io5';
import { FaDatabase } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';

export const Skills = () => {
  return (
    <section className="mt-10 md:mt-20">
      <SectionTitle title="Habilidades Divinas" imageUrl="/ray.svg" />

      <div className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <DivineSkill
          skillName="Relâmpago de Zeus"
          skills={'JavaScript & TypeScript'}
          icon={<BsFillLightningChargeFill />}
        />

        <DivineSkill
          skillName="Forja de Hefesto"
          skills={'React & Next Js'}
          icon={<IoCodeSharp />}
        />

        <DivineSkill
          skillName="Profundezas de Poseidon"
          skills={'Banco de Dados & Backend'}
          icon={<FaDatabase />}
        />

        <DivineSkill
          skillName="A Beleza de Afrodite"
          skills={'UI/UX Design'}
          icon={<IoMdColorPalette />}
        />
      </div>
    </section>
  );
};

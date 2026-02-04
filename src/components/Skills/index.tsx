import { BsFillLightningChargeFill } from 'react-icons/bs';
import { SectionTitle } from '../SectionTitle';
import { DivineSkill } from '../DivineSkill';
import { IoCodeSharp } from 'react-icons/io5';
import { FaDatabase } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';

export const Skills = () => {
  return (
    <section id="skills" className="mt-10 md:mt-20">
      <SectionTitle
        title="Habilidades Divinas"
        imageUrl="/title-icons/ray.svg"
      />

      <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <DivineSkill
          skillName="Relâmpago de Zeus"
          skills={'JavaScript & TypeScript & Python'}
          icon={<BsFillLightningChargeFill />}
        />

        <DivineSkill
          skillName="Forja de Hefesto"
          skills={'React & Next Js & Node.js & Flask'}
          icon={<IoCodeSharp />}
        />

        <DivineSkill
          skillName="Mar de Poseidon"
          skills={'Banco de Dados & SQL/NoSQL & AWS'}
          icon={<FaDatabase />}
        />

        <DivineSkill
          skillName="A Beleza de Afrodite"
          skills={'UI/UX Design & Figma & Tailwind CSS'}
          icon={<IoMdColorPalette />}
        />
      </div>
    </section>
  );
};

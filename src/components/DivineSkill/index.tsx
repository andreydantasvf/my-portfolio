type DivineSkillProps = {
  skillName: string;
  skills: string;
  icon: React.ReactNode;
};

export const DivineSkill = ({ icon, skillName, skills }: DivineSkillProps) => {
  return (
    <div className="group flex transform flex-col items-center gap-2 transition-transform hover:scale-105">
      <div className="bg-primaryColor text-secondaryColor mb-3 flex h-12 w-12 items-center justify-center rounded-full text-2xl group-hover:brightness-110">
        {icon}
      </div>

      <span className="text-center text-xl font-bold">{skillName}</span>
      <ul
        className="list-disc text-center text-slate-300"
        role="list"
        aria-label={`${skillName} skills`}
      >
        {skills}
      </ul>
    </div>
  );
};

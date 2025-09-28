type DivineSkillProps = {
  skillName: string;
  skills: string;
  icon: React.ReactNode;
};

export const DivineSkill = ({ icon, skillName, skills }: DivineSkillProps) => {
  return (
    <div className="flex flex-col items-center gap-2 transition-transform transform hover:scale-105 group">
      <div className="flex items-center justify-center w-12 h-12 bg-primaryColor group-hover:brightness-110 text-secondaryColor text-2xl rounded-full mb-3">
        {icon}
      </div>

      <span className="font-bold text-xl text-center">{skillName}</span>
      <ul
        className="text-center list-disc text-slate-300"
        role="list"
        aria-label={`${skillName} skills`}
      >
        {skills}
      </ul>
    </div>
  );
};

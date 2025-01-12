type DivineSkillProps = {
  skillName: string;
  skills: string;
  icon: React.ReactNode;
};

export const DivineSkill = ({ icon, skillName, skills }: DivineSkillProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center w-12 h-12 bg-primaryColor text-secondaryColor text-2xl rounded-full mb-3">
        {icon}
      </div>

      <span className="font-bold text-xl">{skillName}</span>
      <ul className="text-left list-disc">{skills}</ul>
    </div>
  );
};

import { CardContent } from "../../ui/card";

// skills={[
//     { name: "UX/UI Design", level: "Avanzado", percentage: 85 },
//     { name: "Frontend (React)", level: "Intermedio", percentage: 65 },
//     { name: "Figma & Prototipos", level: "Experto", percentage: 95 },
//     { name: "Design Systems", level: "Avanzado", percentage: 80 },
//   ]}

type Skill = {
  name: string;
  level: string;
  percentage: number;
};

type HSkillsProps = {
  skills: Skill[];
};

export function HSkills({ skills }: HSkillsProps) {
  return (
    <CardContent className="pt-4">
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-[#107C10]">{skill.level}</span>
            </div>
            <div className="h-2 mt-2 bg-[#0B5D0B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#107C10]"
                style={{ width: `${skill.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}

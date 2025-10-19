import React from 'react';

const SkillsDisplay = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    const icons = {
      'Frontend': 'laptop-code',
      'Backend': 'server',
      'Languages': 'code',
      'Database': 'database',
      'Mobile': 'mobile-alt',
      'DevOps': 'cloud',
      'Tools': 'tools',
      'AI/ML': 'robot',
    };
    return icons[category] || 'star';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">🛠️ Skills</h2>
      
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center space-x-2">
            <i className={`fas fa-${getCategoryIcon(category)} text-primary`}></i>
            <h3 className="font-medium text-foreground">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <div 
                key={skill.name}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-foreground/90"
                title={skill.name}
              >
                {skill.icon && (
                  <img 
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                    alt={skill.name}
                    className="w-4 h-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`;
                    }}
                  />
                )}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { SkillsDisplay };

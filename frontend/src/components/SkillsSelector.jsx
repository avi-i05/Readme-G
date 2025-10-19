import { useState } from 'react';
import { skillsData } from '@/data/skillsData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, X, Plus, Sparkles } from 'lucide-react';

export function SkillsSelector({ selectedSkills = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const categories = [...new Set(skillsData.map(skill => skill.category))];

  const handleSkillSelect = (skillName) => {
    const newSkills = selectedSkills.includes(skillName)
      ? selectedSkills.filter(skill => skill !== skillName)
      : [...selectedSkills, skillName];
    onChange(newSkills);
  };

  const removeSkill = (skillName) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillName);
    onChange(newSkills);
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      const newSkills = [...selectedSkills, customSkillInput.trim()];
      onChange(newSkills);
      setCustomSkillInput('');
    }
  };

  const handleCustomSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCustomSkill();
    }
  };

  // Separate custom skills from predefined ones
  const customSkills = selectedSkills.filter(skill => !skillsData.some(s => s.name === skill));
  const predefinedSkills = selectedSkills.filter(skill => skillsData.some(s => s.name === skill));

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Select Skills</Label>

      {/* Selected Skills Display */}
      <div className="min-h-[40px] p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
        {selectedSkills.length === 0 ? (
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            No skills selected yet
          </div>
        ) : (
          <div className="space-y-2">
            {/* Predefined Skills */}
            {predefinedSkills.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">Predefined Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {predefinedSkills.map(skillName => {
                    const skill = skillsData.find(s => s.name === skillName);
                    if (!skill) return null;

                    return (
                      <div
                        key={skillName}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs border border-blue-200"
                      >
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                          alt={skill.name}
                          className="w-3 h-3"
                        />
                        <span className="font-medium">{skill.name}</span>
                        <button
                          onClick={() => removeSkill(skillName)}
                          className="ml-1 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Skills */}
            {customSkills.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">Custom Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {customSkills.map(skillName => (
                    <div
                      key={skillName}
                      className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs border border-purple-200"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span className="font-medium">{skillName}</span>
                      <button
                        onClick={() => removeSkill(skillName)}
                        className="ml-1 hover:bg-purple-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Skill Input - Outside Dropdown */}
      <div className="flex gap-2">
        <Input
          placeholder="Add your own skill..."
          value={customSkillInput}
          onChange={(e) => setCustomSkillInput(e.target.value)}
          onKeyPress={handleCustomSkillKeyPress}
          className="flex-1"
        />
        <Button
          onClick={addCustomSkill}
          disabled={!customSkillInput.trim()}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        💡 Add any skill not in our predefined list
      </p>

      {/* Dropdown Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full justify-between border-2 hover:border-blue-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span>Skills ({selectedSkills.length} selected)</span>
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {categories.map(category => {
                const categorySkills = skillsData.filter(skill => skill.category === category);

                return (
                  <div key={category} className="border-b border-gray-100 last:border-b-0">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {category}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {categorySkills.map(skill => (
                          <Button
                            key={skill.name}
                            variant={selectedSkills.includes(skill.name) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSkillSelect(skill.name)}
                            className={`flex items-center gap-2 h-auto py-2 px-3 justify-start transition-all ${
                              selectedSkills.includes(skill.name)
                                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                                : 'hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <img
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                              alt={skill.name}
                              className="w-4 h-4"
                            />
                            <span className="text-sm font-medium">{skill.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {selectedSkills.length > 0 && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange([])}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-700"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

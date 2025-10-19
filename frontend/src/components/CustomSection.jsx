import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit3 } from 'lucide-react';

export function CustomSection({ customSections = [], onChange }) {
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      heading: '',
      description: ''
    };
    onChange([...customSections, newSection]);
  };

  const removeSection = (id) => {
    onChange(customSections.filter(section => section.id !== id));
  };

  const updateSection = (id, field, value) => {
    onChange(customSections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Edit3 className="w-5 h-5 text-blue-500" />
          Custom Sections
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Add your own custom sections with headings and descriptions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {customSections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No custom sections yet</p>
            <p className="text-sm">Add your first custom section to personalize your profile</p>
          </div>
        ) : (
          <div className="space-y-6">
            {customSections.map((section, index) => (
              <div key={section.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Section {index + 1}
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`heading-${section.id}`} className="text-sm font-medium">
                      Section Heading
                    </Label>
                    <Input
                      id={`heading-${section.id}`}
                      placeholder="e.g., My Projects, Achievements, etc."
                      value={section.heading}
                      onChange={(e) => updateSection(section.id, 'heading', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${section.id}`} className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id={`description-${section.id}`}
                      placeholder="Describe this section in detail..."
                      value={section.description}
                      onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={addSection}
          variant="outline"
          className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Section
        </Button>
      </CardContent>
    </Card>
  );
}

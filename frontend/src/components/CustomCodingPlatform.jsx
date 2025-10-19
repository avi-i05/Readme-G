import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export function CustomCodingPlatform({ customPlatforms = [], onChange }) {
  const addPlatform = () => {
    const newPlatform = {
      id: Date.now(),
      name: '',
      url: ''
    };
    onChange([...customPlatforms, newPlatform]);
  };

  const removePlatform = (id) => {
    onChange(customPlatforms.filter(platform => platform.id !== id));
  };

  const updatePlatform = (id, field, value) => {
    onChange(customPlatforms.map(platform =>
      platform.id === id ? { ...platform, [field]: value } : platform
    ));
  };

  return (
    <Card className="border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <LinkIcon className="w-5 h-5 text-green-500" />
          Custom Coding Platforms
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Add your own coding platform profiles (beyond the standard ones)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {customPlatforms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No custom platforms yet</p>
            <p className="text-sm">Add your own coding platform profiles</p>
          </div>
        ) : (
          <div className="space-y-6">
            {customPlatforms.map((platform, index) => (
              <div key={platform.id} className="p-4 border border-green-200 rounded-lg bg-green-50/50">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Platform {index + 1}
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlatform(platform.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`platform-name-${platform.id}`} className="text-sm font-medium">
                      Platform Name
                    </Label>
                    <Input
                      id={`platform-name-${platform.id}`}
                      placeholder="e.g., CodeSignal, Exercism, etc."
                      value={platform.name}
                      onChange={(e) => updatePlatform(platform.id, 'name', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`platform-url-${platform.id}`} className="text-sm font-medium">
                      Platform URL
                    </Label>
                    <Input
                      id={`platform-url-${platform.id}`}
                      placeholder="https://platform.com/username"
                      value={platform.url}
                      onChange={(e) => updatePlatform(platform.id, 'url', e.target.value)}
                      type="url"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={addPlatform}
          variant="outline"
          className="w-full border-dashed border-2 border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Platform
        </Button>
      </CardContent>
    </Card>
  );
}

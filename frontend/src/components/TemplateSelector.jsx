import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, FolderOpen, ArrowLeft, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { readmeTemplates, projectTemplates } from '@/data/templates';

export function TemplateSelector({ selectedTemplate, onTemplateSelect, onNext }) {
  const [mode, setMode] = useState('prebuilt'); // 'prebuilt', 'profile', 'project'
  const [showMessage, setShowMessage] = useState(false);

  const handleProfileTemplates = () => {
    setShowMessage(true);
  };

  const handleProjectTemplates = () => {
    setShowMessage(true);
  };

  const handleBackToPrebuilt = () => {
    setMode('prebuilt');
    setShowMessage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Template
            </CardTitle>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className={`text-center text-lg leading-relaxed ${
              mode === 'prebuilt'
                ? 'text-gray-600 font-medium'
                : 'text-muted-foreground'
            }`}>
              {mode === 'prebuilt' && (
                <span className="block">
                  🚀 <strong>Templates Coming Soon!</strong><br/>
                  <span className="text-base font-normal text-gray-500 mt-2 block">
                    For now, use our Quick Start or Project README options for instant generation.
                  </span>
                </span>
              )}
              {mode === 'profile' && 'Select a Profile template'}
              {mode === 'project' && 'Select a Project template'}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {mode === 'prebuilt' && !showMessage && (
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Choose Template Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <div className="group">
                    <Button
                      onClick={handleProfileTemplates}
                      size="lg"
                      className="w-full h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                          <User className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-2xl">Profile</div>
                          <div className="font-semibold text-lg opacity-90">Templates</div>
                        </div>
                      </div>
                    </Button>
                  </div>

                  <div className="group">
                    <Button
                      onClick={handleProjectTemplates}
                      size="lg"
                      className="w-full h-32 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                          <FolderOpen className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-2xl">Project</div>
                          <div className="font-semibold text-lg opacity-90">Templates</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showMessage && (
            <div className="text-center space-y-8 animate-in fade-in duration-500">
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">
                        🚧 Templates Coming Soon!
                      </h3>
                      <p className="text-amber-700 text-lg">
                        We're working hard to bring you amazing templates
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-xl p-6 mb-6 border border-amber-100">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-amber-800 font-medium mb-2">
                          What you can do right now:
                        </p>
                        <ul className="text-amber-700 space-y-1 text-sm">
                          <li>• Use <strong>Quick Start</strong> for instant profile generation</li>
                          <li>• Use <strong>Project README</strong> for project documentation</li>
                          <li>• Stay tuned for template updates!</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowMessage(false)}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Options
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(mode === 'profile' || mode === 'project') && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(mode === 'profile' ? readmeTemplates : projectTemplates).map((template) => (
                  <div
                    key={template.id}
                    className={`group relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
                    }`}
                    onClick={() => onTemplateSelect(template.id)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-5 h-5 rounded-full mt-1 transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-md'
                          : 'bg-gray-300 group-hover:bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {template.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 italic">
                          {template.preview}
                        </p>
                      </div>
                    </div>

                    {/* Template features preview */}
                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {template.sections.showProfileImage && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            Profile Image
                          </span>
                        )}
                        {template.sections.showStats && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            GitHub Stats
                          </span>
                        )}
                        {template.sections.showSkills && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                            Skills
                          </span>
                        )}
                        {template.sections.showCodingProfiles && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            Coding Profiles
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <Button
                  onClick={handleBackToPrebuilt}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={onNext}
                  size="lg"
                  className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0`}
                >
                  Continue to {mode === 'project' ? 'Project Setup' : 'Profile Setup'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

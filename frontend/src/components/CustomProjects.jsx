import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, FolderOpen, ExternalLink, Calendar, Star } from 'lucide-react';

export function CustomProjects({ projects = [], onChange }) {
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      url: '',
      demoUrl: '',
      imageUrl: '',
      videoUrl: '',
      mediaType: 'image', // 'image' or 'video'
      techStack: '', // Store as string, not array
      startDate: '',
      endDate: '',
      featured: false
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (id) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const updateProject = (id, field, value) => {
    onChange(projects.map(project => {
      if (project.id === id) {
        const updatedProject = { ...project, [field]: value };

        // If setting imageUrl, clear videoUrl and set mediaType to 'image'
        if (field === 'imageUrl' && value) {
          updatedProject.videoUrl = '';
          updatedProject.mediaType = 'image';
        }

        // If setting videoUrl, clear imageUrl and set mediaType to 'video'
        if (field === 'videoUrl' && value) {
          updatedProject.imageUrl = '';
          updatedProject.mediaType = 'video';
        }

        return updatedProject;
      }
      return project;
    }));
  };

  const updateMediaType = (id, mediaType) => {
    onChange(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          mediaType,
          // Clear the other field when switching media type
          ...(mediaType === 'image' ? { videoUrl: '' } : { imageUrl: '' })
        };
      }
      return project;
    }));
  };

  return (
    <Card className="border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FolderOpen className="w-5 h-5 text-purple-500" />
          Projects
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Showcase your projects with descriptions, tech stacks, and links
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No projects yet</p>
            <p className="text-sm">Add your first project to showcase your work</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => {
              // Handle backward compatibility for projects without mediaType
              const projectMediaType = project.mediaType || (project.imageUrl ? 'image' : 'video');

              return (
              <div key={project.id} className="p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Project {index + 1}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateProject(project.id, 'featured', !project.featured)}
                      className={`text-xs ${project.featured ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50' : 'text-gray-500 hover:text-gray-600'}`}
                    >
                      <Star className={`w-3 h-3 mr-1 ${project.featured ? 'fill-current' : ''}`} />
                      Featured
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${project.id}`} className="text-sm font-medium">
                      Project Name *
                    </Label>
                    <Input
                      id={`project-name-${project.id}`}
                      placeholder="e.g., E-commerce Website, Mobile App, etc."
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`project-description-${project.id}`} className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id={`project-description-${project.id}`}
                      placeholder="Brief description of your project, its purpose, and what you learned..."
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-url-${project.id}`} className="text-sm font-medium">
                        Repository URL
                      </Label>
                      <div className="relative">
                        <Input
                          id={`project-url-${project.id}`}
                          placeholder="https://github.com/username/project"
                          value={project.url}
                          onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                          type="url"
                          className="pl-10"
                        />
                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`project-demo-${project.id}`} className="text-sm font-medium">
                        Demo URL (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id={`project-demo-${project.id}`}
                          placeholder="https://your-demo.com"
                          value={project.demoUrl}
                          onChange={(e) => updateProject(project.id, 'demoUrl', e.target.value)}
                          type="url"
                          className="pl-10"
                        />
                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Media Type</Label>
                      <div className="flex gap-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`media-type-${project.id}`}
                            value="image"
                            checked={projectMediaType === 'image'}
                            onChange={(e) => updateMediaType(project.id, e.target.value)}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm">📷 Image</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`media-type-${project.id}`}
                            value="video"
                            checked={projectMediaType === 'video'}
                            onChange={(e) => updateMediaType(project.id, e.target.value)}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm">🎥 Video</span>
                        </label>
                      </div>
                    </div>

                    {projectMediaType === 'image' ? (
                      <div className="space-y-2">
                        <Label htmlFor={`project-image-${project.id}`} className="text-sm font-medium">
                          Project Image URL
                        </Label>
                        <div className="relative">
                          <Input
                            id={`project-image-${project.id}`}
                            placeholder="https://example.com/project-screenshot.png"
                            value={project.imageUrl}
                            onChange={(e) => updateProject(project.id, 'imageUrl', e.target.value)}
                            type="url"
                            className="pl-10"
                          />
                          <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor={`project-video-${project.id}`} className="text-sm font-medium">
                          Project Video URL
                        </Label>
                        <div className="relative">
                          <Input
                            id={`project-video-${project.id}`}
                            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                            value={project.videoUrl}
                            onChange={(e) => updateProject(project.id, 'videoUrl', e.target.value)}
                            type="url"
                            className="pl-10"
                          />
                          <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-tech-${project.id}`} className="text-sm font-medium">
                      Tech Stack (comma-separated)
                    </Label>
                    <Input
                      id={`project-tech-${project.id}`}
                      placeholder="e.g., React, Node.js, MongoDB, Express"
                      value={project.techStack}
                      onChange={(e) => updateProject(project.id, 'techStack', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-start-${project.id}`} className="text-sm font-medium">
                        Start Date (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id={`project-start-${project.id}`}
                          placeholder="Jan 2023"
                          value={project.startDate}
                          onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`project-end-${project.id}`} className="text-sm font-medium">
                        End Date (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id={`project-end-${project.id}`}
                          placeholder="Dec 2023 or Present"
                          value={project.endDate}
                          onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}

        <Button
          onClick={addProject}
          variant="outline"
          className="w-full border-dashed border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}

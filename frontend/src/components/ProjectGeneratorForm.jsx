import { useState, useEffect } from 'react';
import { FolderOpen, Code, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProjectGeneratorForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    projectName: '',
    authors: [{ id: 1, name: '', githubUsername: '' }], // Start with one empty author
    authorType: 'individual', // Start with individual mode
    features: [{ id: 1, text: '' }], // Array of feature objects
    description: '',
    installationSteps: [
      { 
        id: Date.now(),
        title: 'Clone the repository',
        description: 'Get the project files on your local machine',
        commands: [
          { id: Date.now() + 1, text: 'git clone https://github.com/yourusername/yourproject.git' },
          { id: Date.now() + 2, text: 'cd yourproject' }
        ]
      }
    ],
    customSections: [
      {
        id: Date.now(),
        title: 'Configuration',
        content: 'Add your configuration details here...',
        isExpanded: true
      }
    ],
    usage: '',
    imageUrl: '',
    videoUrl: '',
    mediaType: 'image' // 'image' or 'video'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // If setting imageUrl, clear videoUrl and set mediaType to 'image'
      if (field === 'imageUrl' && value) {
        updated.videoUrl = '';
        updated.mediaType = 'image';
      }

      // If setting videoUrl, clear imageUrl and set mediaType to 'video'
      if (field === 'videoUrl' && value) {
        updated.imageUrl = '';
        updated.mediaType = 'video';
      }

      return updated;
    });
  };

  const handleMediaTypeChange = (mediaType) => {
    setFormData(prev => ({
      ...prev,
      mediaType
    }));
  };

  const handleAuthorTypeChange = (authorType) => {
    setFormData(prev => {
      const updated = { ...prev, authorType };
      // If switching to individual, keep only the first author
      if (authorType === 'individual' && prev.authors.length > 1) {
        updated.authors = [prev.authors[0]];
      }
      // If switching to group and no authors, add one empty author
      if (authorType === 'group' && prev.authors.length === 0) {
        updated.authors = [{ id: Date.now(), name: '', githubUsername: '' }];
      }
      return updated;
    });
  };

  const addAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, { id: Date.now(), name: '', githubUsername: '' }]
    }));
  };

  const removeAuthor = (id) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter(author => author.id !== id)
    }));
  };

  const updateAuthor = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.map(author =>
        author.id === id ? { ...author, [field]: value } : author
      )
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { id: Date.now(), text: '' }]
    }));
  };

  const removeFeature = (id) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== id)
    }));
  };

  const updateFeature = (id, text) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === id ? { ...feature, text } : feature
      )
    }));
  };

  const addInstallationStep = () => {
    setFormData(prev => ({
      ...prev,
      installationSteps: [
        ...prev.installationSteps,
        {
          id: Date.now(),
          title: 'New Step',
          description: 'Description of this step',
          commands: [
            { id: Date.now() + 1, text: 'command-to-run' }
          ]
        }
      ]
    }));
  };

  const addCommandToStep = (stepId) => {
    setFormData(prev => ({
      ...prev,
      installationSteps: prev.installationSteps.map(step => 
        step.id === stepId 
          ? { 
              ...step, 
              commands: [...(step.commands || []), { id: Date.now(), text: '' }] 
            } 
          : step
      )
    }));
  };

  const removeCommandFromStep = (stepId, commandId) => {
    setFormData(prev => ({
      ...prev,
      installationSteps: prev.installationSteps.map(step => 
        step.id === stepId 
          ? { 
              ...step, 
              commands: step.commands.filter(cmd => cmd.id !== commandId) 
            } 
          : step
      )
    }));
  };

  const updateCommandInStep = (stepId, commandId, value) => {
    setFormData(prev => ({
      ...prev,
      installationSteps: prev.installationSteps.map(step => 
        step.id === stepId 
          ? { 
              ...step, 
              commands: step.commands.map(cmd => 
                cmd.id === commandId ? { ...cmd, text: value } : cmd
              ) 
            } 
          : step
      )
    }));
  };

  const removeInstallationStep = (id) => {
    setFormData(prev => ({
      ...prev,
      installationSteps: prev.installationSteps.filter(step => step.id !== id)
    }));
  };

  const updateInstallationStep = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      installationSteps: prev.installationSteps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      )
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const addCustomSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: Date.now(),
          title: 'New Section',
          content: 'Add your content here...',
          isExpanded: true
        }
      ]
    }));
  };

  const removeCustomSection = (id) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== id)
    }));
  };

  const updateCustomSection = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  const toggleSection = (id) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === id ? { ...section, isExpanded: !section.isExpanded } : section
      )
    }));
  };

  const generateREADME = () => {
    const validFeatures = formData.features.filter(feature => feature.text && feature.text.trim());

    let readme = `<div align="center">\n\n# 🚀 ${formData.projectName || '[Project Name]'} 🚀\n\n</div>\n\n`;

    if (formData.description) {
      readme += `## 📋 Description\n\n${formData.description}\n\n`;
    }

    // Project media (image or video)
    if (formData.imageUrl && formData.mediaType === 'image') {
      readme += `<div align="center">\n\n## 📸 Screenshots\n\n![${formData.projectName || 'Project Screenshot'}](${formData.imageUrl})\n\n</div>\n\n`;
    }

    if (formData.videoUrl && formData.mediaType === 'video') {
      // Handle different video platforms
      if (formData.videoUrl.includes('youtube.com') || formData.videoUrl.includes('youtu.be')) {
        // Extract video ID from YouTube URL
        let videoId = '';
        if (formData.videoUrl.includes('youtube.com/watch?v=')) {
          videoId = formData.videoUrl.split('v=')[1].split('&')[0];
        } else if (formData.videoUrl.includes('youtu.be/')) {
          videoId = formData.videoUrl.split('youtu.be/')[1].split('?')[0];
        }
        if (videoId) {
          readme += `<div align="center">\n\n## 🎥 Demo Video\n\n<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1rem 0;">\n  <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>\n</div>\n\n[Watch on YouTube](${formData.videoUrl})\n\n</div>\n\n`;
        }
      } else if (formData.videoUrl.includes('vimeo.com')) {
        // Extract Vimeo video ID
        const vimeoId = formData.videoUrl.split('vimeo.com/')[1].split('?')[0];
        readme += `<div align="center">\n\n## 🎥 Demo Video\n\n<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1rem 0;">\n  <iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>\n</div>\n\n[Watch on Vimeo](${formData.videoUrl})\n\n</div>\n\n`;
      } else if (formData.videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
        // Direct video file link (MP4, WebM, OGG)
        readme += `<div align="center">\n\n## 🎥 Demo Video\n\n<video autoplay loop muted playsinline style="max-width: 100%; max-height: 400px; border-radius: 8px; margin: 1rem 0;">\n  <source src="${formData.videoUrl}" type="video/${formData.videoUrl.split('.').pop().toLowerCase()}">\n  Your browser does not support the video tag.\n</video>\n\n[Download Video](${formData.videoUrl})\n\n</div>\n\n`;
      } else {
        // Generic video link as fallback
        readme += `<div align="center">\n\n## 🎥 Demo Video\n\n[🎥 Watch Demo Video](${formData.videoUrl})\n\n</div>\n\n`;
      }
    }

    if (validFeatures.length > 0) {
      readme += `## ✨ Features\n\n`;
      validFeatures.forEach(feature => {
        readme += `⭐ ${feature.text.trim()}\n`;
      });
      readme += '\n';
    }

    // Installation Steps
    if (formData.installationSteps && formData.installationSteps.length > 0) {
      readme += `## 🔧 Installation\n\n`;
      
      formData.installationSteps.forEach((step, index) => {
        readme += `### ${index + 1}. ${step.title || 'Installation Step'}\n\n`;
        if (step.description) {
          readme += `${step.description}\n\n`;
        }
        if (step.commands && step.commands.length > 0) {
          step.commands.forEach(cmd => {
            if (cmd.text && cmd.text.trim()) {
              readme += `\`\`\`bash\n${cmd.text}\n\`\`\`\n\n`;
            }
          });
        }
      });
    }

    if (formData.usage) {
      readme += `## 🚀 Usage\n\n${formData.usage}\n\n`;
    }

    // Custom Sections
    formData.customSections.forEach(section => {
      if (section.title && section.content) {
        readme += `## ${section.title}\n\n${section.content}\n\n`;
      }
    });

    readme += `## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n`;
    readme += `---\n\n`;
    readme += `## 🌟 Support\n\nIf you found this project helpful, please give it a ⭐️!\n\n`;
    readme += `---\n\n`;
    readme += `## 👥 Authors\n\n`;

    const validAuthors = formData.authors.filter(author => author.name && author.name.trim());

    if (validAuthors.length === 0) {
      readme += `- [@yourusername](https://github.com/yourusername)`;
    } else {
      validAuthors.forEach(author => {
        const githubUsername = author.githubUsername || author.name.toLowerCase().replace(/\s+/g, '');
        readme += `- 👤 [${author.name}](https://github.com/${githubUsername})\n`;
      });
    }

    readme += `\n---\n\n`;
    readme += `<div align="center">\n\n## 🌟 Crafted with ❤️\n\n*This README was generated using **[README Generator](https://readme-g.vercel.app/)** - The ultimate tool for creating stunning GitHub project READMEs!*\n\n### 💡 Want to create your own amazing README?\n\n[![Try README Generator](https://img.shields.io/badge/Try%20README%20Generator-FF6B6B?style=for-the-badge&logo=github&logoColor=white)](https://readme-g.vercel.app/)\n[![GitHub](https://img.shields.io/badge/Follow%20Creator-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/avi-i05)\n\n---\n\n</div>`;

    return readme;
  };

  // Real-time preview: Generate README whenever form data changes
  useEffect(() => {
    const readme = generateREADME();
    onGenerate(readme);
  }, [formData, onGenerate]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Project Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="form-field space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="My Awesome Project"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
          />
        </div>

        <div className="form-field space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Author Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.authorType === 'individual'
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="author-type"
                  value="individual"
                  checked={formData.authorType === 'individual'}
                  onChange={(e) => handleAuthorTypeChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className="flex items-center space-x-2 w-full">
                  <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    formData.authorType === 'individual'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {formData.authorType === 'individual' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base">👤</span>
                    <span className="text-sm font-medium">Individual</span>
                  </div>
                </div>
              </label>

              <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.authorType === 'group'
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="author-type"
                  value="group"
                  checked={formData.authorType === 'group'}
                  onChange={(e) => handleAuthorTypeChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className="flex items-center space-x-2 w-full">
                  <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    formData.authorType === 'group'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {formData.authorType === 'group' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base">👥</span>
                    <span className="text-sm font-medium">Group</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {formData.authorType === 'individual' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="author-name" className="text-sm font-medium">
                    Display Name
                  </Label>
                  <Input
                    id="author-name"
                    placeholder="Your Name"
                    value={formData.authors[0]?.name || ''}
                    onChange={(e) => updateAuthor(formData.authors[0].id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author-github" className="text-sm font-medium">
                    GitHub Username
                  </Label>
                  <Input
                    id="author-github"
                    placeholder="your-github-username"
                    value={formData.authors[0]?.githubUsername || ''}
                    onChange={(e) => updateAuthor(formData.authors[0].id, 'githubUsername', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Authors</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAuthor}
                  className="text-xs"
                >
                  + Add Author
                </Button>
              </div>

              {formData.authors.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No authors added yet. Click "Add Author" to get started.
                </div>
              ) : (
                <div className="space-y-2">
                  {formData.authors.map((author, index) => (
                    <div key={author.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Author {index + 1}
                        </Label>
                        {formData.authors.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAuthor(author.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            × Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`author-name-${author.id}`} className="text-xs font-medium text-gray-600">
                            Display Name
                          </Label>
                          <Input
                            id={`author-name-${author.id}`}
                            placeholder="Author Name"
                            value={author.name}
                            onChange={(e) => updateAuthor(author.id, 'name', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`author-github-${author.id}`} className="text-xs font-medium text-gray-600">
                            GitHub Username
                          </Label>
                          <Input
                            id={`author-github-${author.id}`}
                            placeholder="github-username"
                            value={author.githubUsername}
                            onChange={(e) => updateAuthor(author.id, 'githubUsername', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of what your project does..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-field space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Project Media</Label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.mediaType === 'image'
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="media-type"
                  value="image"
                  checked={formData.mediaType === 'image'}
                  onChange={(e) => handleMediaTypeChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    formData.mediaType === 'image'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {formData.mediaType === 'image' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base">📷</span>
                    <span className="text-sm font-medium">Image</span>
                  </div>
                </div>
              </label>

              <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.mediaType === 'video'
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="media-type"
                  value="video"
                  checked={formData.mediaType === 'video'}
                  onChange={(e) => handleMediaTypeChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    formData.mediaType === 'video'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {formData.mediaType === 'video' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base">🎥</span>
                    <span className="text-sm font-medium">Video</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {formData.mediaType === 'image' ? (
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-medium">
                Project Image URL
              </Label>
              <div className="relative">
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/project-screenshot.png"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  type="url"
                  className="pl-10"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="videoUrl" className="text-sm font-medium">
                Project Video URL
              </Label>
              <div className="relative">
                <Input
                  id="videoUrl"
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  type="url"
                  className="pl-10"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="form-field space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Features</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
              className="text-xs"
            >
              + Add Feature
            </Button>
          </div>

          {formData.features.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No features added yet. Click "Add Feature" to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={`Feature ${index + 1}`}
                      value={feature.text}
                      onChange={(e) => updateFeature(feature.id, e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(feature.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-field space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Installation Steps</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInstallationStep}
              className="text-xs"
            >
              + Add Step
            </Button>
          </div>

          {formData.installationSteps.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No installation steps added yet. Click "Add Step" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {formData.installationSteps.map((step, index) => (
                <div key={step.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Step {index + 1}
                    </Label>
                    {formData.installationSteps.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInstallationStep(step.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        × Remove
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`step-title-${step.id}`} className="text-xs font-medium text-gray-600">
                        Step Title
                      </Label>
                      <Input
                        id={`step-title-${step.id}`}
                        placeholder="e.g., Clone the repository"
                        value={step.title}
                        onChange={(e) => updateInstallationStep(step.id, 'title', e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`step-desc-${step.id}`} className="text-xs font-medium text-gray-600">
                        Description (optional)
                      </Label>
                      <Input
                        id={`step-desc-${step.id}`}
                        placeholder="Brief description of this step"
                        value={step.description}
                        onChange={(e) => updateInstallationStep(step.id, 'description', e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-gray-600">
                          Commands
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          onClick={() => addCommandToStep(step.id)}
                          className="text-xs"
                        >
                          + Add Command
                        </Button>
                      </div>
                        
                      {step.commands && step.commands.length > 0 ? (
                        <div className="space-y-2">
                          {step.commands.map((cmd, cmdIndex) => (
                            <div key={cmd.id} className="relative group">
                              <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none">
                                <span className="text-gray-400 text-xs">$</span>
                              </div>
                              <div className="flex items-center">
                                <Input
                                  value={cmd.text}
                                  onChange={(e) => updateCommandInStep(step.id, cmd.id, e.target.value)}
                                  placeholder="Enter command..."
                                  className="text-sm font-mono pl-8 pr-8"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                  {step.commands.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeCommandFromStep(step.id, cmd.id)}
                                      title="Remove command"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                      </svg>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-2 text-gray-400 text-sm">
                          No commands added yet. Click "Add Command" to add one.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Sections */}
        <div className="form-field space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Custom Sections</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomSection}
              className="text-xs"
            >
              + Add Section
            </Button>
          </div>

          {formData.customSections.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No custom sections added yet. Click "Add Section" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {formData.customSections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <ChevronDown className={`w-4 h-4 transition-transform ${section.isExpanded ? 'transform rotate-180' : ''}`} />
                      <h3 className="font-medium">{section.title || 'Untitled Section'}</h3>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomSection(section.id);
                      }}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  
                  {section.isExpanded && (
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`section-title-${section.id}`} className="text-sm font-medium">
                          Section Title
                        </Label>
                        <Input
                          id={`section-title-${section.id}`}
                          placeholder="e.g., Configuration, Deployment, etc."
                          value={section.title}
                          onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                          className="font-medium"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`section-content-${section.id}`} className="text-sm font-medium">
                          Content (Markdown supported)
                        </Label>
                        <Textarea
                          id={`section-content-${section.id}`}
                          placeholder="Enter your content here..."
                          value={section.content}
                          onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                          rows={6}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="usage">Usage Examples</Label>
          <Textarea
            id="usage"
            placeholder="How to use your project..."
            value={formData.usage}
            onChange={(e) => handleInputChange('usage', e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={() => onGenerate(generateREADME())} className="w-full" size="lg">
          <Code className="w-4 h-4 mr-2" />
          Generate Project README
        </Button>
      </CardContent>
    </Card>
  );
}

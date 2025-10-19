import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LandingPage } from '@/components/LandingPage';
import { ProfileGeneratorForm } from '@/components/ProfileGeneratorForm';
import { ProjectGeneratorForm } from '@/components/ProjectGeneratorForm';
import { OutputViewer } from '@/components/OutputViewer';
import { TemplateSelector } from '@/components/TemplateSelector';
import { readmeTemplates, projectTemplates } from '@/data/templates';

const Index = () => {
  // Initialize currentPage from URL hash or default to 'landing'
  const getInitialPage = () => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    const validPages = ['landing', 'templates', 'profile-form', 'project-form'];
    return validPages.includes(hash) ? hash : 'landing';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');

  // Update URL hash when page changes
  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  // Set appropriate default template based on the current page
  const getCurrentTemplate = () => {
    if (currentPage === 'project-form' || projectTemplates[selectedTemplate]) {
      return selectedTemplate; // Use selected project template
    }
    return selectedTemplate; // Use selected profile template (default to minimalist if not set)
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setGeneratedMarkdown(''); // Reset output when switching pages

    // Reset to default template when going back to landing
    if (page === 'landing') {
      setSelectedTemplate('minimalist');
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleTemplateNext = () => {
    // Check if selected template is a project template
    if (projectTemplates[selectedTemplate]) {
      setCurrentPage('project-form');
    } else {
      setCurrentPage('profile-form');
    }
  };

  const handleGenerate = (markdown) => {
    setGeneratedMarkdown(markdown);
  };

  const handleBack = () => {
    // Always go back to landing page when back button is clicked
    setCurrentPage('landing');
    setGeneratedMarkdown('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        showBackButton={currentPage !== 'landing'} 
        onBack={handleBack}
      />
      
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'templates' && (
          <div className="container px-4 md:px-6 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Choose Your Template</h1>
                <p className="text-muted-foreground">
                  Select a pre-built template to customize your README layout
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={handleTemplateSelect}
                  onNext={handleTemplateNext}
                />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'profile-form' && (
          <div className="container px-4 md:px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">GitHub Profile README Generator</h1>
                <p className="text-muted-foreground">
                  Create an impressive profile README that showcases your skills and personality
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 h-full">
                <ProfileGeneratorForm
                  onGenerate={handleGenerate}
                  selectedTemplate={getCurrentTemplate()}
                />
                <OutputViewer
                  markdown={generatedMarkdown}
                  fileName="README.md"
                />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'project-form' && (
          <div className="container px-4 md:px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Project README Generator</h1>
                <p className="text-muted-foreground">
                  Generate comprehensive documentation for your projects
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 h-full">
                <ProjectGeneratorForm
                  onGenerate={handleGenerate}
                  selectedTemplate={getCurrentTemplate()}
                />
                <OutputViewer
                  markdown={generatedMarkdown}
                  fileName="README.md"
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

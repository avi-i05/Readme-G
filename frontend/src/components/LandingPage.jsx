import React from 'react';
import { Rocket, FolderOpen, ArrowRight, Sparkles, Github, Code, Zap, Palette } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import GradualBlur from './ui/gradual-blur';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import CurvedLoop from './CurvedLoop';

// Add floating animation keyframes to global styles
const addFloatingAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    25% { transform: translateY(-20px) translateX(10px) rotate(2deg); }
    50% { transform: translateY(0) translateX(20px) rotate(0deg); }
    75% { transform: translateY(20px) translateX(10px) rotate(-2deg); }
  }
  
  .animate-float-slow {
    animation: float 20s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float 15s ease-in-out infinite reverse;
  }
  
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
  
  .animation-delay-1500 {
    animation-delay: 1500ms;
  }
  
  .animation-delay-2000 {
    animation-delay: 2000ms;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = addFloatingAnimations;
  document.head.appendChild(style);
}

export function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Profile README",
      description: "Create an eye-catching GitHub profile README that showcases your skills and projects.",
      action: () => onNavigate("profile-form")
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-primary" />,
      title: "Project README",
      description: "Generate professional project documentation with all the essential sections.",
      action: () => onNavigate("project-form")
    },
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Templates",
      description: "Choose from pre-designed templates for your profile or project READMEs.",
      action: () => onNavigate("templates")
    }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section - Full Viewport Height */}
      <section className="relative min-h-screen bg-[#0d1117] overflow-hidden">
        {/* Banner at the top */}
        <div className="relative w-full h-16 md:h-20 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://github.githubassets.com/images/modules/site/patterns/contribution-grid-mobile.svg')] md:bg-[url('https://github.githubassets.com/images/modules/site/patterns/contribution-grid.svg')] opacity-20"></div>
          
        </div>
        
        
        <ParticlesBackground />
        
       
        <GradualBlur 
          position="bottom"
          strength={2}
          height="7rem"
          divCount={5}
          exponential={true}
          opacity={0.8}
          target="page"
          style={{
            background: 'linear-gradient(to top, rgba(13, 17, 23, 0.9) 0%, transparent 100%)',
          }}
        />
        {/* Hero Content Wrapper */}
        <div className="relative h-full flex flex-col">
          {/* Curved Text in Hero */}
          <div className="w-full pt-8 md:pt-12 px-4 mb-32 md:mb-48">
            <div className=" mx-auto w-full h-24 md:h-32">
              <CurvedLoop 
                marqueeText="Welcome to Profile MD Maker ✦ AI-Powered README Generator ✦ Create Stunning README Files for Your GitHub Profile and Projects ✦ "
                speed={1.5}
                curveAmount={60}
                direction="left"
                interactive={true}
                className="text-xl md:text-3xl lg:text-4xl font-bold text-white/90"
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center w-full mt-24 md:mt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 ">
                Create Beautiful READMEs
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Generate professional README files for your GitHub profile and projects with ease
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all transform hover:scale-105"
                  onClick={() => onNavigate("profile-form")}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Quick Start
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 border-white/20 hover:bg-white/10 transition-all transform hover:scale-105"
                  onClick={() => onNavigate("project-form")}
                >
                  <FolderOpen className="mr-2 h-5 w-5" />
                  Project README
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105"
                  onClick={() => onNavigate("templates")}
                >
                  <Palette className="mr-2 h-5 w-5" />
                  Choose Template
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="w-full px-4 mb-8 mt-24">
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 -mx-4 px-4">
              {features.map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-48 bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                    {React.cloneElement(feature.icon, { className: "w-4 h-4 text-primary" })}
                  </div>
                  <h3 className="font-medium text-white text-sm">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* GitHub-themed floating shapes - Top Left Corner */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-10 overflow-hidden">
          {/* GitHub logo */}
          <div className="absolute top-[10%] left-[10%] w-32 h-32 text-primary/20 animate-float-slow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path 
                d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1 0 1.6 1.1 1.6 1.1 1 1.7 2.6 1.2 3.2 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1.1-.3 3.6 1.2a12.2 12.2 0 0 1 3.2-.4c1.1 0 2.2.1 3.2.4 2.5-1.5 3.6-1.2 3.6-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.6 5.9.4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"
              />
            </svg>
          </div>
          
          {/* Git branch icon */}
          <div className="absolute top-[30%] left-[30%] w-24 h-24 text-primary/20 animate-float-medium">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path 
                d="M7.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 3.5a3.5 3.5 0 0 0-3.5 3.5v8.5h2v-8.5a1.5 1.5 0 0 1 3 0v8.5h2v-8.5A3.5 3.5 0 0 0 7.5 10zm9 3.5a3.5 3.5 0 0 0-3.5 3.5v5.5h2v-5.5a1.5 1.5 0 0 1 3 0v5.5h2v-5.5a3.5 3.5 0 0 0-3.5-3.5z"
              />
            </svg>
          </div>
          
          {/* Commit icon */}
          <div className="absolute top-[20%] left-[20%] w-20 h-20 text-primary/20 animate-float-slow animation-delay-2000">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path 
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z"
              />
            </svg>
          </div>
          
          {/* Fork icon */}
          <div className="absolute top-[40%] left-[10%] w-28 h-28 text-primary/20 animate-float-medium animation-delay-1000">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path 
                d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5A10 10 0 0 0 12 2z"
              />
            </svg>
          </div>
          
          {/* Floating dots */}
          <div className="absolute top-[15%] left-[15%] w-12 h-12 rounded-full bg-primary/5 animate-float-slow animation-delay-1500"></div>
          <div className="absolute top-[35%] left-[5%] w-16 h-16 rounded-full bg-purple-500/5 animate-float-medium animation-delay-500"></div>
          
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-[#0d1117] to-purple-500/5"></div>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
                  onClick={feature.action}
                >
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="pl-0 group-hover:pl-2 transition-all" onClick={feature.action}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              Get Started in Seconds
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your GitHub Profile?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of developers who have already created stunning README files for their GitHub profiles and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => onNavigate('templates')}
              >
                <Palette className="h-5 w-5" />
                Browse Templates
              </Button>
              <Button
                size="lg"
                className="gap-2"
                onClick={() => onNavigate('profile-form')}
              >
                <Github className="h-5 w-5" />
                Create Your Profile Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

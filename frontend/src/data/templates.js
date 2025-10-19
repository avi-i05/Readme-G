export const projectTemplates = {
  basic: {
    id: 'basic',
    name: 'Basic Project',
    description: 'Simple project layout with essential sections',
    preview: 'Clean and straightforward project documentation',
    sections: {
      showProjectTitle: true,
      showDescription: true,
      showFeatures: true,
      showTechStack: true,
      showInstallation: true,
      showUsage: true,
      showContributing: false,
      showLicense: true,
      showScreenshots: false,
      footerStyle: 'simple'
    },
    styling: {
      theme: 'light',
      accentColor: '#3b82f6',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  comprehensive: {
    id: 'comprehensive',
    name: 'Comprehensive Project',
    description: 'Detailed project layout for thorough documentation',
    preview: 'Complete guide with all necessary sections',
    sections: {
      showProjectTitle: true,
      showDescription: true,
      showFeatures: true,
      showTechStack: true,
      showInstallation: true,
      showUsage: true,
      showContributing: true,
      showLicense: true,
      showScreenshots: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'light',
      accentColor: '#1f2937',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal Project',
    description: 'Minimalist project layout for quick setups',
    preview: 'Focus on core information only',
    sections: {
      showProjectTitle: true,
      showDescription: true,
      showFeatures: false,
      showTechStack: true,
      showInstallation: true,
      showUsage: false,
      showContributing: false,
      showLicense: false,
      showScreenshots: false,
      footerStyle: 'simple'
    },
    styling: {
      theme: 'light',
      accentColor: '#10b981',
      fontSize: 'small',
      spacing: 'compact'
    }
  },

  developer: {
    id: 'developer',
    name: 'Developer Project',
    description: 'Tech-focused layout for developer tools and libraries',
    preview: 'Emphasizes technical details and code',
    sections: {
      showProjectTitle: true,
      showDescription: true,
      showFeatures: true,
      showTechStack: true,
      showInstallation: true,
      showUsage: true,
      showContributing: true,
      showLicense: true,
      showScreenshots: false,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'dark',
      accentColor: '#8b5cf6',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  portfolio: {
    id: 'portfolio',
    name: 'Portfolio Project',
    description: 'Showcase-style layout for portfolio projects',
    preview: 'Highlights visual appeal and features',
    sections: {
      showProjectTitle: true,
      showDescription: true,
      showFeatures: true,
      showTechStack: true,
      showInstallation: false,
      showUsage: true,
      showContributing: false,
      showLicense: false,
      showScreenshots: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'gradient',
      accentColor: '#f59e0b',
      fontSize: 'large',
      spacing: 'relaxed'
    }
  }
};

export const getProjectTemplateById = (id) => {
  return projectTemplates[id] || projectTemplates.basic;
};

export const getAllProjectTemplates = () => {
  return Object.values(projectTemplates);
};

export const readmeTemplates = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple design focused on essential information',
    preview: 'A sleek, professional look with subtle styling',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: false,
      showCodingProfiles: false,
      showAdditionalSections: false,
      footerStyle: 'simple'
    },
    styling: {
      theme: 'light',
      accentColor: '#3b82f6',
      fontSize: 'medium',
      spacing: 'compact'
    }
  },

  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style layout perfect for job seekers',
    preview: 'Structured, business-oriented design',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: true,
      showCodingProfiles: true,
      showAdditionalSections: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'light',
      accentColor: '#1f2937',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful, artistic design for creative professionals',
    preview: 'Vibrant colors and unique layout elements',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: true,
      showCodingProfiles: false,
      showAdditionalSections: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'colorful',
      accentColor: '#8b5cf6',
      fontSize: 'large',
      spacing: 'relaxed'
    }
  },

  developer: {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused design with dark theme and coding emphasis',
    preview: 'Dark theme perfect for developers',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: true,
      showCodingProfiles: true,
      showAdditionalSections: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'dark',
      accentColor: '#10b981',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  student: {
    id: 'student',
    name: 'Student',
    description: 'Perfect for students showcasing academic projects',
    preview: 'Clean layout highlighting learning journey',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: false,
      showCodingProfiles: true,
      showAdditionalSections: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'light',
      accentColor: '#f59e0b',
      fontSize: 'medium',
      spacing: 'normal'
    }
  },

  entrepreneur: {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    description: 'Business-focused design for founders and entrepreneurs',
    preview: 'Professional layout emphasizing achievements',
    sections: {
      showProfileImage: true,
      showBio: true,
      showSkills: true,
      showSocialLinks: true,
      showStats: false,
      showCodingProfiles: false,
      showAdditionalSections: true,
      footerStyle: 'enhanced'
    },
    styling: {
      theme: 'gradient',
      accentColor: '#7c3aed',
      fontSize: 'large',
      spacing: 'relaxed'
    }
  }
};

export const getTemplateById = (id) => {
  return readmeTemplates[id] || readmeTemplates.minimalist;
};

export const getAllTemplates = () => {
  return Object.values(readmeTemplates);
};

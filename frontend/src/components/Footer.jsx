import { Github, Instagram, Linkedin, Code2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '#' },
      { name: 'Profile README', href: '#profile' },
      { name: 'Project README', href: '#project' },
      { name: 'Templates', href: '#templates' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Docs', href: '#' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/avi-i05',
        icon: Github,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/__avisharma_18',
        icon: Instagram,
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/avi-sharma-4189b1278/',
        icon: Linkedin,
      },
    ],
  };

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border/40 mb-8">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Vertical stacked layout */}
        <div className="space-y-8">
          {/* Brand section - top and centered */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">README Generator</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Transform your GitHub presence with beautifully crafted READMEs that showcase your skills and projects professionally.
            </p>
          </div>

          {/* Social media - prominent center section */}
          <div className="text-center py-6">
            <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Connect With Us</h4>
            <div className="flex justify-center space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 hover:scale-105"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links - organized in columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-sm font-medium text-foreground mb-3">Platform</h4>
              <div className="space-y-2">
                {navigation.main.slice(0, 2).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/30 px-3 py-2 rounded-md"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-sm font-medium text-foreground mb-3">Tools</h4>
              <div className="space-y-2">
                {navigation.main.slice(2, 4).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/30 px-3 py-2 rounded-md"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-sm font-medium text-foreground mb-3">Support</h4>
              <div className="space-y-2">
                {navigation.main.slice(4).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/30 px-3 py-2 rounded-md"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom info - clean and minimal */}
          <div className="pt-6 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>&copy; {currentYear} Profile MD Maker</span>
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mx-1 text-red-500 fill-current" />
                  <span>developers</span>
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto p-0 text-sm">
                  Terms of Service
                </Button>
                <span className="text-muted-foreground/50">•</span>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto p-0 text-sm">
                  Privacy Policy
                </Button>
              </div>
              <div className="flex items-center space-x-4 mb-8 mt-8"></div>
            
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

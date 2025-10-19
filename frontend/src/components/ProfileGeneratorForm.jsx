import { useState, useEffect } from 'react';
import { User, Code } from 'lucide-react';
import { skillsData } from '@/data/skillsData';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SkillsSelector } from './SkillsSelector';
import { CustomSection } from './CustomSection';
import { CustomCodingPlatform } from './CustomCodingPlatform';
import { CustomProjects } from './CustomProjects';

export function ProfileGeneratorForm({ onGenerate, selectedTemplate = 'minimalist' }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    selectedSkills: [],
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    instagram: '',
    facebook: '',
    youtube: '',
    devto: '',
    hashnode: '',
    discord: '',
    telegram: '',
    medium: '',
    reddit: '',
    stackoverflow: '',
    gitlab: '',
    bitbucket: '',
    leetcode: '',
    hackerrank: '',
    codechef: '',
    codeforces: '',
    topcoder: '',
    geeksforgeeks: '',
    interviewbit: '',
    spoj: '',
    atcoder: '',
    kickstart: '',
    projecteuler: '',
    collaborate: '',
    helpWith: '',
    learning: '',
    howToReach: '',
    resumeLink: '',
    customSections: [],
    customPlatforms: [],
    projects: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const generateGitHubStats = (username) => {
    if (!username) return '';


    try {
      // Try multiple streak services with fallbacks
      const streakServices = [
        `https://gh-streak-stats.vercel.app/?user=${username}&theme=radical&hide_border=true&background=0d1117&stroke=1f6feb&ring=1f6feb&fire=1f6feb&currStreakNum=8b949e&sideNums=8b949e&currStreakLabel=1f6feb&sideLabels=8b949e&dates=8b949e`,
        `https://streak-stats.demolab.com?user=${username}&theme=radical&date_format=M%20j%5B%2C%20Y%5D&mode=WEEKLY&background=0D1117&border=1F6FEB&stroke=1F6FEB&ring=1F6FEB&fire=1F6FEB&currStreakNum=8B949E&sideNums=8B949E&currStreakLabel=1F6FEB&sideLabels=8B949E&dates=8B949E`,
        `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=0d1117&stroke=1f6feb&ring=1f6feb&fire=1f6feb&currStreakNum=8b949e&sideNums=8b949e&currStreakLabel=1f6feb&sideLabels=8b949e&dates=8b949e`
      ];

      const statsContent = `
## 📊 GitHub Stats

[![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=radical&no-frame=true&no-bg=true&margin-w=10&margin-h=10&row=2&column=4)](https://github.com/ryo-ma/github-profile-trophy)

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&icon_color=58a6ff)

![GitHub Streak](${streakServices[0]})

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&card_width=445&langs_count=8)
`;

      console.log('Generated GitHub stats for username:', username);
      console.log('Stats content length:', statsContent.length);

      return statsContent;
    } catch (error) {
      console.warn('Error generating GitHub stats:', error);
      return `
## 📊 GitHub Stats

⚠️ *GitHub stats badges are temporarily unavailable. Please check your internet connection or try again later.*
`;
    }
  };



  const generatePlatformStats = () => {
    let stats = [];

    // LeetCode Stats
    if (formData.leetcode) {
      const leetcodeUsername = formData.leetcode.split('/').pop();
      if (leetcodeUsername) {
        try {
          // Try multiple LeetCode stats services (working ones first)
          const leetcodeServices = [
            `https://leetcode-badge.vercel.app/api?username=${leetcodeUsername}&theme=dark`
          ];

          stats.push(`### LeetCode Stats

[![LeetCode Stats](${leetcodeServices[0]})](https://leetcode.com/${leetcodeUsername}/)

[![LeetCode Heatmap](https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=roboto&ext=heatmap)](https://leetcode.com/${leetcodeUsername}/)`);
        } catch (error) {
          console.warn('Error generating LeetCode stats:', error);
          stats.push(`### LeetCode Stats

⚠️ *LeetCode stats temporarily unavailable for ${leetcodeUsername}*

[View Profile](https://leetcode.com/${leetcodeUsername}/)`);
        }
      }
    }

    // CodeForces Stats
    if (formData.codeforces) {
      const codeforcesUsername = formData.codeforces.split('/').pop();
      if (codeforcesUsername) {
        try {
          stats.push(`### CodeForces Stats

[![CodeForces Stats](https://codeforces-readme-stats.vercel.app/api/card?username=${codeforcesUsername}&theme=dark)](https://codeforces.com/profile/${codeforcesUsername})`);
        } catch (error) {
          console.warn('Error generating CodeForces stats:', error);
          stats.push(`### CodeForces Stats

⚠️ *CodeForces stats temporarily unavailable for ${codeforcesUsername}*`);
        }
      }
    }

    // CodeChef Stats
    if (formData.codechef) {
      const codechefUsername = formData.codechef.split('/').pop();
      if (codechefUsername) {
        try {
          stats.push(`### CodeChef Stats

[![CodeChef](https://cp-logo.vercel.app/codechef/${codechefUsername})](https://www.codechef.com/users/${codechefUsername})`);
        } catch (error) {
          console.warn('Error generating CodeChef stats:', error);
          stats.push(`### CodeChef Stats

⚠️ *CodeChef stats temporarily unavailable for ${codechefUsername}*`);
        }
      }
    }

    return stats.length > 0 ? `## 📊 Coding Platform Stats\n\n${stats.join('\n\n')}\n` : '';
  };

  const generateREADME = () => {
    // Extract usernames from URLs
    const githubUsername = formData.github ? formData.github.split('/').pop() : '';

    console.log('GitHub input:', formData.github);
    console.log('Extracted GitHub username:', githubUsername);
    console.log('GitHub username exists:', !!githubUsername);

    let readme = `# <span style="font-size: 2.5em; font-weight: bold;">Hi there, I'm ${formData.name || '[Your Name]'}</span> 👋\n\n`;

    // Profile Image
    if (formData.profileImage) {
      readme += `![Profile Image](${formData.profileImage})\n\n`;
    }
    
    // Bio
    if (formData.bio) {
      readme += `> ${formData.bio}\n\n`;
    }

    // Additional Sections
    if (formData.collaborate) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">👯 I'm looking to collaborate on</span>\n\n${formData.collaborate}\n\n`;
    }

    if (formData.helpWith) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">🤝 I'm looking for help with</span>\n\n${formData.helpWith}\n\n`;
    }

    if (formData.learning) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">🌱 I'm currently learning</span>\n\n${formData.learning}\n\n`;
    }

    if (formData.howToReach) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">📫 How to reach me</span>\n\n${formData.howToReach}\n\n`;
    }

    if (formData.resumeLink) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">📄 Resume</span>\n\n[View Resume](${formData.resumeLink})\n\n`;
    }

    // Custom Sections
    if (formData.customSections && formData.customSections.length > 0) {
      formData.customSections.forEach((section, index) => {
        if (section.heading && section.description) {
          readme += `## <span style="font-size: 1.8em; font-weight: bold;">${section.heading}</span>\n\n${section.description}\n\n`;
        }
      });
    }

    // Social Links with Badges (Top section)
    const topSocialLinks = [];

    // Main Social Platforms
    try {
      if (formData.github) topSocialLinks.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](${formData.github})`);
      if (formData.linkedin) topSocialLinks.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${formData.linkedin})`);
      if (formData.twitter) topSocialLinks.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](${formData.twitter})`);

      // Additional Platforms
      if (formData.website) topSocialLinks.push(`[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white)](${formData.website})`);
      if (formData.instagram) topSocialLinks.push(`[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](${formData.instagram})`);
      if (formData.facebook) topSocialLinks.push(`[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](${formData.facebook})`);
      if (formData.youtube) topSocialLinks.push(`[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](${formData.youtube})`);
      if (formData.devto) topSocialLinks.push(`[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](${formData.devto})`);
      if (formData.hashnode) topSocialLinks.push(`[![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](${formData.hashnode})`);
      if (formData.discord) topSocialLinks.push(`[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](${formData.discord})`);
      if (formData.telegram) topSocialLinks.push(`[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](${formData.telegram})`);
      if (formData.medium) topSocialLinks.push(`[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](${formData.medium})`);
      if (formData.reddit) topSocialLinks.push(`[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](${formData.reddit})`);
      if (formData.stackoverflow) topSocialLinks.push(`[![Stack Overflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](${formData.stackoverflow})`);
      if (formData.gitlab) topSocialLinks.push(`[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)](${formData.gitlab})`);
      if (formData.bitbucket) topSocialLinks.push(`[![Bitbucket](https://img.shields.io/badge/Bitbucket-0052CC?style=for-the-badge&logo=bitbucket&logoColor=white)](${formData.bitbucket})`);
    } catch (error) {
      console.warn('Error generating top social badges:', error);
      // Fallback to simple text links if badges fail
      if (formData.github) topSocialLinks.push(`- [GitHub](${formData.github})`);
      if (formData.linkedin) topSocialLinks.push(`- [LinkedIn](${formData.linkedin})`);
      if (formData.twitter) topSocialLinks.push(`- [Twitter](${formData.twitter})`);
      if (formData.website) topSocialLinks.push(`- [Website](${formData.website})`);
      if (formData.instagram) topSocialLinks.push(`- [Instagram](${formData.instagram})`);
      if (formData.facebook) topSocialLinks.push(`- [Facebook](${formData.facebook})`);
      if (formData.youtube) topSocialLinks.push(`- [YouTube](${formData.youtube})`);
      if (formData.devto) topSocialLinks.push(`- [Dev.to](${formData.devto})`);
      if (formData.hashnode) topSocialLinks.push(`- [Hashnode](${formData.hashnode})`);
      if (formData.discord) topSocialLinks.push(`- [Discord](${formData.discord})`);
      if (formData.telegram) topSocialLinks.push(`- [Telegram](${formData.telegram})`);
      if (formData.medium) topSocialLinks.push(`- [Medium](${formData.medium})`);
      if (formData.reddit) topSocialLinks.push(`- [Reddit](${formData.reddit})`);
      if (formData.stackoverflow) topSocialLinks.push(`- [Stack Overflow](${formData.stackoverflow})`);
      if (formData.gitlab) topSocialLinks.push(`- [GitLab](${formData.gitlab})`);
      if (formData.bitbucket) topSocialLinks.push(`- [Bitbucket](${formData.bitbucket})`);
    }

    if (topSocialLinks.length > 0) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">🌐 Connect with me</span>\n\n${topSocialLinks.join(' ')}\n\n`;
    }
        // Skills Section
    if (formData.selectedSkills && formData.selectedSkills.length > 0) {
      readme += '## <span style="font-size: 1.8em; font-weight: bold;">🛠️ Skills</span>\n\n';

      // Separate predefined and custom skills
      const predefinedSkills = formData.selectedSkills.filter(skillName => skillsData.some(s => s.name === skillName));
      const customSkills = formData.selectedSkills.filter(skillName => !skillsData.some(s => s.name === skillName));

      // Group predefined skills by category for better organization
      const skillsByCategory = predefinedSkills.reduce((acc, skillName) => {
        const skill = skillsData.find(s => s.name === skillName);
        if (skill) {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill);
        }
        return acc;
      }, {});

      // Generate predefined skills section with GitHub-native styling
      if (Object.keys(skillsByCategory).length > 0) {
        for (const [category, skills] of Object.entries(skillsByCategory)) {
          if (skills && skills.length > 0) {
            readme += `### ${category}\n\n`;

            // Use GitHub's table-like layout for skills
            readme += '<table>\n  <tr>\n';

            skills.forEach((skill, index) => {
              // Use GitHub's badge styling
              readme += `    <td align="center">\n`;
              readme += `      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg" alt="${skill.name}" width="40" height="40"/>\n`;
              readme += `      <br/>\n`;
              readme += `      <sub><b>${skill.name}</b></sub>\n`;
              readme += `    </td>\n`;

              // Add line break every 4 skills for better layout
              if ((index + 1) % 4 === 0 && index < skills.length - 1) {
                readme += '  </tr>\n  <tr>\n';
              }
            });

            readme += '  </tr>\n</table>\n\n';
          }
        }
      }

      // Add custom skills section
      if (customSkills.length > 0) {
        readme += '### Additional Skills\n\n';
        readme += '<table>\n  <tr>\n';

        customSkills.forEach((skillName, index) => {
          readme += `    <td align="center">\n`;
          readme += `      <sub><b>${skillName}</b></sub>\n`;
          readme += `    </td>\n`;

          // Add line break every 4 skills for better layout
          if ((index + 1) % 4 === 0 && index < customSkills.length - 1) {
            readme += '  </tr>\n  <tr>\n';
          }
        });

        readme += '  </tr>\n</table>\n\n';
      }
    }
    
    // Projects Section
    if (formData.projects && formData.projects.length > 0) {
      readme += '## <span style="font-size: 1.8em; font-weight: bold;">🚀 Projects</span>\n\n';

      // Separate featured and regular projects
      const featuredProjects = formData.projects.filter(project => project.featured);
      const regularProjects = formData.projects.filter(project => !project.featured);

      // Add featured projects first
      if (featuredProjects.length > 0) {
        readme += '### ⭐ Featured Projects\n\n';
        featuredProjects.forEach(project => {
          if (project.name) {
            readme += `#### ${project.name}\n\n`;
            if (project.description) {
              readme += `${project.description}\n\n`;
            }

            // Tech stack
            if (project.techStack && project.techStack.trim()) {
              const techArray = project.techStack.split(',').map(tech => tech.trim()).filter(Boolean);
              readme += `**Tech Stack:** ${techArray.map(tech => `\`${tech}\``).join(', ')}\n\n`;
            }

            // Project media (image and video)
            if (project.imageUrl) {
              readme += `![${project.name}](${project.imageUrl})\n\n`;
            }

            if (project.videoUrl) {
              // Handle different video platforms
              if (project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be')) {
                // Extract video ID from YouTube URL
                let videoId = '';
                if (project.videoUrl.includes('youtube.com/watch?v=')) {
                  videoId = project.videoUrl.split('v=')[1].split('&')[0];
                } else if (project.videoUrl.includes('youtu.be/')) {
                  videoId = project.videoUrl.split('youtu.be/')[1].split('?')[0];
                }
                if (videoId) {
                  readme += `[![${project.name} Demo Video](https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)](${project.videoUrl})\n\n`;
                }
              } else if (project.videoUrl.includes('vimeo.com')) {
                // For Vimeo, we'll add a placeholder since Vimeo doesn't have a simple thumbnail API
                readme += `[🎥 Watch Demo Video](${project.videoUrl})\n\n`;
              } else {
                // Generic video link
                readme += `[🎥 Watch Demo Video](${project.videoUrl})\n\n`;
              }
            }

            // Project links
            const links = [];
            if (project.url) links.push(`[Repository](${project.url})`);
            if (project.demoUrl) links.push(`[Live Demo](${project.demoUrl})`);

            if (links.length > 0) {
              readme += `${links.join(' | ')}\n\n`;
            }

            // Date range
            if (project.startDate || project.endDate) {
              const dateRange = [project.startDate, project.endDate].filter(Boolean).join(' - ');
              if (dateRange) {
                readme += `*${dateRange}*\n\n`;
              }
            }

            readme += '---\n\n';
          }
        });
      }

      // Add regular projects
      if (regularProjects.length > 0) {
        if (featuredProjects.length > 0) {
          readme += '### Other Projects\n\n';
        }

        regularProjects.forEach(project => {
          if (project.name) {
            readme += `#### ${project.name}\n\n`;
            if (project.description) {
              readme += `${project.description}\n\n`;
            }

            // Tech stack
            if (project.techStack && project.techStack.trim()) {
              const techArray = project.techStack.split(',').map(tech => tech.trim()).filter(Boolean);
              readme += `**Tech Stack:** ${techArray.map(tech => `\`${tech}\``).join(', ')}\n\n`;
            }

            // Project media (image and video)
            if (project.imageUrl) {
              readme += `![${project.name}](${project.imageUrl})\n\n`;
            }

            if (project.videoUrl) {
              // Handle different video platforms
              if (project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be')) {
                // Extract video ID from YouTube URL
                let videoId = '';
                if (project.videoUrl.includes('youtube.com/watch?v=')) {
                  videoId = project.videoUrl.split('v=')[1].split('&')[0];
                } else if (project.videoUrl.includes('youtu.be/')) {
                  videoId = project.videoUrl.split('youtu.be/')[1].split('?')[0];
                }
                if (videoId) {
                  readme += `[![${project.name} Demo Video](https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)](${project.videoUrl})\n\n`;
                }
              } else if (project.videoUrl.includes('vimeo.com')) {
                // For Vimeo, we'll add a placeholder since Vimeo doesn't have a simple thumbnail API
                readme += `[🎥 Watch Demo Video](${project.videoUrl})\n\n`;
              } else {
                // Generic video link
                readme += `[🎥 Watch Demo Video](${project.videoUrl})\n\n`;
              }
            }

            // Project links
            const links = [];
            if (project.url) links.push(`[Repository](${project.url})`);
            if (project.demoUrl) links.push(`[Live Demo](${project.demoUrl})`);

            if (links.length > 0) {
              readme += `${links.join(' | ')}\n\n`;
            }

            // Date range
            if (project.startDate || project.endDate) {
              const dateRange = [project.startDate, project.endDate].filter(Boolean).join(' - ');
              if (dateRange) {
                readme += `*${dateRange}*\n\n`;
              }
            }
          }
        });
      }

      readme += '\n';
    }
    
    // GitHub Stats
    if (githubUsername) {
      const githubStatsContent = generateGitHubStats(githubUsername);
      console.log('GitHub stats content preview:', githubStatsContent.substring(0, 100) + '...');
      readme += githubStatsContent;
      readme += '\n';
      console.log('GitHub stats section added to readme');
    } else {
      console.log('No GitHub username provided, skipping GitHub stats');
    }
    
    // Coding Platform Stats
    const platformStats = generatePlatformStats();
    if (platformStats) {
      readme += platformStats + '\n';
    }
    


    // Coding Profiles Section
    const codingProfiles = [];
    if (formData.leetcode) codingProfiles.push(`- [LeetCode](${formData.leetcode})`);
    if (formData.hackerrank) codingProfiles.push(`- [HackerRank](${formData.hackerrank})`);
    if (formData.codechef) codingProfiles.push(`- [CodeChef](${formData.codechef})`);
    if (formData.codeforces) codingProfiles.push(`- [CodeForces](${formData.codeforces})`);
    if (formData.topcoder) codingProfiles.push(`- [TopCoder](${formData.topcoder})`);
    if (formData.geeksforgeeks) codingProfiles.push(`- [GeeksforGeeks](${formData.geeksforgeeks})`);
    if (formData.interviewbit) codingProfiles.push(`- [InterviewBit](${formData.interviewbit})`);
    if (formData.spoj) codingProfiles.push(`- [SPOJ](${formData.spoj})`);
    if (formData.atcoder) codingProfiles.push(`- [AtCoder](${formData.atcoder})`);
    if (formData.kickstart) codingProfiles.push(`- [Google Kick Start](${formData.kickstart})`);
    if (formData.projecteuler) codingProfiles.push(`- [Project Euler](${formData.projecteuler})`);
    
    if (codingProfiles.length > 0) {
      readme += '## <span style="font-size: 1.8em; font-weight: bold;">🏆 Coding Profiles</span>\n\n';
      readme += codingProfiles.join('\n') + '\n\n';
    }
    
    // Social Links with Badges (Only the working section)
    const socialLinks = [];

    // Main Social Platforms
    try {
      if (formData.github) socialLinks.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](${formData.github})`);
      if (formData.linkedin) socialLinks.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${formData.linkedin})`);
      if (formData.twitter) socialLinks.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](${formData.twitter})`);

      // Additional Platforms
      if (formData.website) socialLinks.push(`[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white)](${formData.website})`);
      if (formData.instagram) socialLinks.push(`[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](${formData.instagram})`);
      if (formData.facebook) socialLinks.push(`[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](${formData.facebook})`);
      if (formData.youtube) socialLinks.push(`[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](${formData.youtube})`);
      if (formData.devto) socialLinks.push(`[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](${formData.devto})`);
      if (formData.hashnode) socialLinks.push(`[![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](${formData.hashnode})`);
      if (formData.discord) socialLinks.push(`[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](${formData.discord})`);
      if (formData.telegram) socialLinks.push(`[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](${formData.telegram})`);
      if (formData.medium) socialLinks.push(`[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](${formData.medium})`);
      if (formData.reddit) socialLinks.push(`[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](${formData.reddit})`);
      if (formData.stackoverflow) socialLinks.push(`[![Stack Overflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](${formData.stackoverflow})`);
      if (formData.gitlab) socialLinks.push(`[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)](${formData.gitlab})`);
      if (formData.bitbucket) socialLinks.push(`[![Bitbucket](https://img.shields.io/badge/Bitbucket-0052CC?style=for-the-badge&logo=bitbucket&logoColor=white)](${formData.bitbucket})`);
    } catch (error) {
      console.warn('Error generating social badges:', error);
      // Fallback to simple text links if badges fail
      if (formData.github) socialLinks.push(`- [GitHub](${formData.github})`);
      if (formData.linkedin) socialLinks.push(`- [LinkedIn](${formData.linkedin})`);
      if (formData.twitter) socialLinks.push(`- [Twitter](${formData.twitter})`);
      if (formData.website) socialLinks.push(`- [Website](${formData.website})`);
      if (formData.instagram) socialLinks.push(`- [Instagram](${formData.instagram})`);
      if (formData.facebook) socialLinks.push(`- [Facebook](${formData.facebook})`);
      if (formData.youtube) socialLinks.push(`- [YouTube](${formData.youtube})`);
      if (formData.devto) socialLinks.push(`- [Dev.to](${formData.devto})`);
      if (formData.hashnode) socialLinks.push(`- [Hashnode](${formData.hashnode})`);
      if (formData.discord) socialLinks.push(`- [Discord](${formData.discord})`);
      if (formData.telegram) socialLinks.push(`- [Telegram](${formData.telegram})`);
      if (formData.medium) socialLinks.push(`- [Medium](${formData.medium})`);
      if (formData.reddit) socialLinks.push(`- [Reddit](${formData.reddit})`);
      if (formData.stackoverflow) socialLinks.push(`- [Stack Overflow](${formData.stackoverflow})`);
      if (formData.gitlab) socialLinks.push(`- [GitLab](${formData.gitlab})`);
      if (formData.bitbucket) socialLinks.push(`- [Bitbucket](${formData.bitbucket})`);
    }

    if (socialLinks.length > 0) {
      readme += `## <span style="font-size: 1.8em; font-weight: bold;">🌐 Connect with me</span>\n\n${socialLinks.join(' ')}\n\n`;
    }
    readme += `⭐️ *From [${formData.name || 'Your Name'}](${formData.github || '#'})*`;
    // Add enhanced footer with promotional links
    readme += `\n\n---\n\n<div align="center">\n\n## 🌟 Crafted with ❤️\n\n*This README was generated using **[README Generator](https://readme-g.vercel.app/)** - The ultimate tool for creating stunning GitHub profile READMEs!*\n\n### 💡 Want to create your own amazing README?

[![Try README Generator](https://img.shields.io/badge/Try%20README%20Generator-FF6B6B?style=for-the-badge&logo=github&logoColor=white)](https://readme-g.vercel.app/)
[![GitHub](https://img.shields.io/badge/Follow%20Creator-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/avi-i05)

---


</div>`;
    
    // Add a final newline to ensure proper markdown formatting
    readme = readme.trim() + '\n';

    console.log('Final README length:', readme.length);
    console.log('README contains "GitHub Streak":', readme.includes('GitHub Streak'));
    console.log('Using gh-streak-stats.vercel.app as primary streak service');

    return readme;
  };



  useEffect(() => {
    const readme = generateREADME();
    onGenerate(readme);
  }, [formData, onGenerate]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          GitHub Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-full">
        <div className="form-field space-y-2">
          <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input 
                id="profile" 
                placeholder="https://example.com/your-image.jpg" 
                value={formData.profileImage}
                onChange={(e) => handleInputChange('profileImage', e.target.value)}
              />
            </div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="form-field space-y-2">
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-field">
          <SkillsSelector
            selectedSkills={formData.selectedSkills || []}
            onChange={(skills) => handleInputChange('selectedSkills', skills)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Sections</h3>

          <div className="space-y-2">
            <Label htmlFor="collaborate">👯 I'm looking to collaborate on</Label>
            <Textarea
              id="collaborate"
              placeholder="e.g., Open source projects, web development..."
              value={formData.collaborate}
              onChange={(e) => handleInputChange('collaborate', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="helpWith">🤝 I'm looking for help with</Label>
            <Textarea
              id="helpWith"
              placeholder="e.g., Learning new technologies, debugging..."
              value={formData.helpWith}
              onChange={(e) => handleInputChange('helpWith', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learning">🌱 I'm currently learning</Label>
            <Textarea
              id="learning"
              placeholder="e.g., React, Python, Machine Learning..."
              value={formData.learning}
              onChange={(e) => handleInputChange('learning', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="howToReach">📫 How to reach me</Label>
            <Textarea
              id="howToReach"
              placeholder="e.g., Email me at example@email.com or DM on LinkedIn..."
              value={formData.howToReach}
              onChange={(e) => handleInputChange('howToReach', e.target.value)}
              rows={2}
            />
          </div>
          </div>
      
        <div className="space-y-6">
          <CustomSection
            customSections={formData.customSections || []}
            onChange={(sections) => handleInputChange('customSections', sections)}
          />
        </div>

        <div className="space-y-6">
          <CustomProjects
            projects={formData.projects || []}
            onChange={(projects) => handleInputChange('projects', projects)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resumeLink">Resume Link</Label>
          <Input
            id="resumeLink"
            placeholder="https://example.com/resume.pdf"
            value={formData.resumeLink}
            onChange={(e) => handleInputChange('resumeLink', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input
                id="github"
                placeholder="username"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter (X) URL</Label>
              <Input 
                id="twitter" 
                placeholder="https://x.com/username" 
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Personal Website/Blog</Label>
              <Input 
                id="website" 
                placeholder="https://yourwebsite.com" 
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input 
                  id="instagram" 
                  placeholder="https://instagram.com/username" 
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input 
                  id="facebook" 
                  placeholder="https://facebook.com/username" 
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input 
                  id="youtube" 
                  placeholder="https://youtube.com/@username" 
                  value={formData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="devto">Dev.to</Label>
                <Input 
                  id="devto" 
                  placeholder="https://dev.to/username" 
                  value={formData.devto}
                  onChange={(e) => handleInputChange('devto', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hashnode">Hashnode</Label>
                <Input 
                  id="hashnode" 
                  placeholder="https://hashnode.com/@username" 
                  value={formData.hashnode}
                  onChange={(e) => handleInputChange('hashnode', e.target.value)}
                />
              </div>
              
              
              <div className="space-y-2">
                <Label htmlFor="discord">Discord</Label>
                <Input 
                  id="discord" 
                  placeholder="https://discord.gg/invite" 
                  value={formData.discord}
                  onChange={(e) => handleInputChange('discord', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input 
                  id="telegram" 
                  placeholder="https://t.me/username" 
                  value={formData.telegram}
                  onChange={(e) => handleInputChange('telegram', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medium">Medium</Label>
                <Input 
                  id="medium" 
                  placeholder="https://medium.com/@username" 
                  value={formData.medium}
                  onChange={(e) => handleInputChange('medium', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reddit">Reddit</Label>
                <Input 
                  id="reddit" 
                  placeholder="https://reddit.com/u/username" 
                  value={formData.reddit}
                  onChange={(e) => handleInputChange('reddit', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stackoverflow">Stack Overflow</Label>
                <Input 
                  id="stackoverflow" 
                  placeholder="https://stackoverflow.com/users/username" 
                  value={formData.stackoverflow}
                  onChange={(e) => handleInputChange('stackoverflow', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gitlab">GitLab</Label>
                <Input 
                  id="gitlab" 
                  placeholder="https://gitlab.com/username" 
                  value={formData.gitlab}
                  onChange={(e) => handleInputChange('gitlab', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bitbucket">Bitbucket</Label>
                <Input 
                  id="bitbucket" 
                  placeholder="https://bitbucket.org/username" 
                  value={formData.bitbucket}
                  onChange={(e) => handleInputChange('bitbucket', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Coding Platforms</h3>
            
            {/* LeetCode */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" alt="LeetCode" className="h-6 w-6" />
                <Label htmlFor="leetcode">LeetCode Profile</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  id="leetcode" 
                  placeholder="https://leetcode.com/username" 
                  value={formData.leetcode}
                  onChange={(e) => handleInputChange('leetcode', e.target.value)}
                />
              </div>
            </div>

            {/* HackerRank */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/160_Hackerrank_logo_logos-512.png" alt="HackerRank" className="h-6 w-6" />
                <Label htmlFor="hackerrank">HackerRank Profile</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  id="hackerrank" 
                  placeholder="https://www.hackerrank.com/username" 
                  value={formData.hackerrank}
                  onChange={(e) => handleInputChange('hackerrank', e.target.value)}
                />
              </div>
            </div>

            {/* CodeChef */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6acb96ac.jpg" alt="CodeChef" className="h-6 w-6 rounded-full" />
                <Label htmlFor="codechef">CodeChef Profile</Label>
              </div>
              <Input 
                id="codechef" 
                placeholder="https://www.codechef.com/users/username" 
                value={formData.codechef}
                onChange={(e) => handleInputChange('codechef', e.target.value)}
              />
            </div>

            {/* CodeForces */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://codeforces.org/s/0/favicon-32x32.png" alt="CodeForces" className="h-6 w-6" />
                <Label htmlFor="codeforces">CodeForces Profile</Label>
              </div>
              <Input 
                id="codeforces" 
                placeholder="https://codeforces.com/profile/username" 
                value={formData.codeforces}
                onChange={(e) => handleInputChange('codeforces', e.target.value)}
              />
            </div>

            {/* TopCoder */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-topcoder-3521503-2944994.png" alt="TopCoder" className="h-6 w-6" />
                <Label htmlFor="topcoder">TopCoder Profile</Label>
              </div>
              <Input 
                id="topcoder" 
                placeholder="https://www.topcoder.com/members/username" 
                value={formData.topcoder}
                onChange={(e) => handleInputChange('topcoder', e.target.value)}
              />
            </div>

            {/* GeeksforGeeks */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" className="h-6 w-6" />
                <Label htmlFor="geeksforgeeks">GeeksforGeeks Profile</Label>
              </div>
              <Input 
                id="geeksforgeeks" 
                placeholder="https://auth.geeksforgeeks.org/user/username" 
                value={formData.geeksforgeeks}
                onChange={(e) => handleInputChange('geeksforgeeks', e.target.value)}
              />
            </div>

            {/* InterviewBit */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/interviewbit.svg" alt="InterviewBit" className="h-6 w-6" />
                <Label htmlFor="interviewbit">InterviewBit Profile</Label>
              </div>
              <Input 
                id="interviewbit" 
                placeholder="https://www.interviewbit.com/profile/username" 
                value={formData.interviewbit}
                onChange={(e) => handleInputChange('interviewbit', e.target.value)}
              />
            </div>

            {/* SPOJ */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/spoj.svg" alt="SPOJ" className="h-6 w-6" />
                <Label htmlFor="spoj">SPOJ Profile</Label>
              </div>
              <Input 
                id="spoj" 
                placeholder="https://www.spoj.com/users/username" 
                value={formData.spoj}
                onChange={(e) => handleInputChange('spoj', e.target.value)}
              />
            </div>

            {/* AtCoder */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/atcoder.svg" alt="AtCoder" className="h-6 w-6" />
                <Label htmlFor="atcoder">AtCoder Profile</Label>
              </div>
              <Input 
                id="atcoder" 
                placeholder="https://atcoder.jp/users/username" 
                value={formData.atcoder}
                onChange={(e) => handleInputChange('atcoder', e.target.value)}
              />
            </div>

            {/* Kick Start */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/google.svg" alt="Kick Start" className="h-6 w-6" />
                <Label htmlFor="kickstart">Google Kick Start Profile</Label>
              </div>
              <Input 
                id="kickstart" 
                placeholder="https://codingcompetitions.withgoogle.com/coder/username" 
                value={formData.kickstart}
                onChange={(e) => handleInputChange('kickstart', e.target.value)}
          />
        </div>
            {/* Project Euler */}
            <div className="space-y-2 border p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/projecteuler.svg" alt="Project Euler" className="h-6 w-6" />
                <Label htmlFor="projecteuler">Project Euler Profile</Label>
              </div>
              <Input 
                id="projecteuler" 
                placeholder="https://projecteuler.net/profile/username" 
                value={formData.projecteuler}
                onChange={(e) => handleInputChange('projecteuler', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CustomCodingPlatform
            customPlatforms={formData.customPlatforms || []}
            onChange={(platforms) => handleInputChange('customPlatforms', platforms)}
          />
        </div>
        <Button onClick={() => onGenerate(generateREADME())} className="w-full" size="lg">
          <Code className="w-4 h-4 mr-2" />
          Generate Profile README
        </Button>
      </CardContent>
    </Card>
  );
}

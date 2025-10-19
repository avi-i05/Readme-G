import React from 'react';

const SocialLinks = ({ formData }) => {
  const socialPlatforms = [
    { key: 'github', label: 'GitHub', icon: 'github' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { key: 'twitter', label: 'Twitter', icon: 'twitter' },
    { key: 'website', label: 'Website', icon: 'globe' },
    { key: 'instagram', label: 'Instagram', icon: 'instagram' },
    { key: 'facebook', label: 'Facebook', icon: 'facebook' },
    { key: 'youtube', label: 'YouTube', icon: 'youtube' },
    { key: 'devto', label: 'Dev.to', icon: 'dev' },
    { key: 'hashnode', label: 'Hashnode', icon: 'hashnode' },
  ];

  const codingPlatforms = [
    { key: 'leetcode', label: 'LeetCode', icon: 'code' },
    { key: 'hackerrank', label: 'HackerRank', icon: 'code' },
    { key: 'codechef', label: 'CodeChef', icon: 'code' },
    { key: 'codeforces', label: 'CodeForces', icon: 'code' },
    { key: 'topcoder', label: 'TopCoder', icon: 'code' },
  ];

  const getPlatformUrl = (platform, username) => {
    if (!username) return '#';
    const baseUrls = {
      github: `https://github.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      twitter: `https://twitter.com/${username}`,
      instagram: `https://instagram.com/${username}`,
      facebook: `https://facebook.com/${username}`,
      youtube: `https://youtube.com/${username}`,
      devto: `https://dev.to/${username}`,
      hashnode: `https://hashnode.com/@${username}`,
      leetcode: `https://leetcode.com/${username}/`,
      hackerrank: `https://www.hackerrank.com/profile/${username}`,
      codechef: `https://www.codechef.com/users/${username}`,
      codeforces: `https://codeforces.com/profile/${username}`,
      topcoder: `https://www.topcoder.com/members/${username}`,
    };
    return baseUrls[platform] || '#';
  };

  const renderSocialIcons = (platforms) => {
    return platforms.map(({ key, label, icon }) => {
      const username = formData[key]?.split('/').pop() || '';
      if (!username) return null;
      
      const url = getPlatformUrl(key, username);
      
      return (
        <a 
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
        >
          <i className={`fab fa-${icon} text-lg`}></i>
          <span>{label}</span>
        </a>
      );
    }).filter(Boolean);
  };

  const hasSocialLinks = socialPlatforms.some(platform => formData[platform.key]);
  const hasCodingLinks = codingPlatforms.some(platform => formData[platform.key]);

  if (!hasSocialLinks && !hasCodingLinks) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Connect with me</h2>
        <div className="flex flex-wrap gap-4">
          {renderSocialIcons(socialPlatforms)}
          {renderSocialIcons(codingPlatforms)}
        </div>
      </div>
    </div>
  );
};

export { SocialLinks };

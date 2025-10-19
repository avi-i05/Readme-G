import React from 'react';

const PlatformStats = ({ formData }) => {
  const getPlatformStats = () => {
    const platforms = [
      {
        key: 'leetcode',
        name: 'LeetCode',
        stats: [
          {
            label: 'Problems Solved',
            url: `https://leetcode-stats-six.vercel.app/api?username=${formData.leetcode?.split('/').pop()}`,
          },
          {
            label: 'Contest Rating',
            url: `https://leetcard.jacoblin.cool/${formData.leetcode?.split('/').pop()}?theme=dark&font=roboto`,
          },
        ],
      },
      {
        key: 'codeforces',
        name: 'CodeForces',
        stats: [
          {
            label: 'Profile Stats',
            url: `https://codeforces-readme-stats.vercel.app/api/card?username=${formData.codeforces?.split('/').pop()}`,
          },
        ],
      },
      {
        key: 'codechef',
        name: 'CodeChef',
        stats: [
          {
            label: 'Rating',
            url: `https://cp-logo.vercel.app/codechef/${formData.codechef?.split('/').pop()}`,
          },
        ],
      },
    ];

    return platforms.filter(platform => formData[platform.key]);
  };

  const platforms = getPlatformStats();
  if (platforms.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">🏆 Coding Platform Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.flatMap(platform =>
          platform.stats.map((stat, index) => (
            <div 
              key={`${platform.key}-${index}`}
              className="bg-card rounded-lg p-4 border border-border"
            >
              <h3 className="font-medium text-foreground mb-2">{platform.name} - {stat.label}</h3>
              <img 
                src={stat.url}
                alt={`${platform.name} ${stat.label}`}
                className="w-full h-auto rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { PlatformStats };

import { Mail, Edit, Zap, Cpu, Send } from 'react-feather';
import { Template } from '../types/template';

interface TemplateStatsProps {
  templates: Template[];
}

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

export default function TemplateStats({ templates }: TemplateStatsProps) {
  // Calculate statistics
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter(t => t.status === 'published').length;
  const draftTemplates = templates.filter(t => t.status === 'draft').length;
  const usedInWorkflows = templates.filter(t => t.usage > 0).length;
  const aiGeneratedTemplates = templates.filter(t => 
    t.tags.includes('ai-generated') || t.name.toLowerCase().includes('ai')
  ).length;

  const stats: StatCard[] = [
    {
      title: 'Total Templates',
      value: totalTemplates,
      icon: <Mail className="w-5 h-5" />,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      description: 'All saved templates'
    },
    {
      title: 'Active / Published',
      value: activeTemplates,
      icon: <Send className="w-5 h-5" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'Ready for use'
    },
    {
      title: 'Drafts',
      value: draftTemplates,
      icon: <Edit className="w-5 h-5" />,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      description: 'Still being edited'
    },
    {
      title: 'Used in Workflows',
      value: usedInWorkflows,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Linked templates'
    },
    {
      title: 'AI-Generated Templates',
      value: aiGeneratedTemplates,
      icon: <Cpu className="w-5 h-5" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Created via AI'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} mr-3`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {stat.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
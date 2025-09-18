import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, FileText, PenTool, Mic, Calendar, Download, Settings, CreditCard } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import Dock from '../components/animations/Dock';
import { VscHome, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import { FiFileText, FiMic, FiEdit } from 'react-icons/fi';

interface UsageData {
  tool: string;
  used: number;
  limit: number;
  icon: React.ComponentType<any>;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setUsageData([
      { tool: 'AI Meeting Assistant', used: user.plan === 'free' ? 3 : faker.number.int({ min: 15, max: 50 }), limit: user.plan === 'free' ? 5 : -1, icon: Mic },
      { tool: 'Indian Language Writer', used: user.plan === 'free' ? 7 : faker.number.int({ min: 25, max: 100 }), limit: user.plan === 'free' ? 10 : -1, icon: PenTool },
      { tool: 'GST Invoice Generator', used: user.plan === 'free' ? 2 : faker.number.int({ min: 10, max: 35 }), limit: user.plan === 'free' ? 3 : -1, icon: FileText }
    ]);

    const activities: RecentActivity[] = Array.from({ length: 8 }, () => {
        const types = ['transcription', 'content_generation', 'invoice'];
        const type = faker.helpers.arrayElement(types);
        const descriptions = {
            transcription: 'Meeting transcription completed',
            content_generation: 'Content generated in Hindi',
            invoice: 'GST invoice created'
        };
        return {
            id: faker.string.uuid(),
            type,
            description: descriptions[type as keyof typeof descriptions],
            date: faker.date.recent({ days: 7 }).toISOString(),
            status: faker.helpers.arrayElement(['completed', 'processing', 'failed'])
        };
    });
    setRecentActivity(activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0;
    return (used / limit) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-brand-muted bg-brand-card/50';
    }
  };

  const dockItems = [
    { icon: <FiMic size={24} />, label: 'Transcribe', onClick: () => navigate('/ai-meeting-assistant') },
    { icon: <FiEdit size={24} />, label: 'Write', onClick: () => navigate('/indian-language-writer') },
    { icon: <FiFileText size={24} />, label: 'Invoice', onClick: () => navigate('/gst-invoice-generator') },
    { icon: <VscSettingsGear size={24} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-background text-brand-foreground pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-brand-foreground">Welcome back, {user?.name}!</h1>
              <p className="text-brand-muted mt-2">Here's what's happening with your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.plan === 'free' ? 'bg-brand-card text-brand-muted' :
                user?.plan === 'pro' ? 'bg-accent/20 text-accent' : 'bg-purple-200 text-purple-800'
              }`}>
                {user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)} Plan
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Projects', value: usageData.reduce((sum, data) => sum + data.used, 0), icon: BarChart3, color: 'text-accent' },
            { label: 'This Month', value: faker.number.int({ min: 15, max: 45 }), icon: Calendar, color: 'text-green-500' },
            { label: 'Downloads', value: faker.number.int({ min: 8, max: 25 }), icon: Download, color: 'text-blue-500' },
            { label: 'Plan Status', value: 'Active', icon: CreditCard, color: 'text-purple-500' }
          ].map(stat => (
            <div key={stat.label} className="bg-brand-card rounded-xl shadow-lg p-6 border border-brand-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-brand-muted text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold text-brand-foreground ${typeof stat.value !== 'string' ? '' : 'text-sm text-green-500'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50">
            <h2 className="text-xl font-semibold text-brand-foreground mb-6">Usage Overview</h2>
            <div className="space-y-6">
              {usageData.map((data) => (
                <div key={data.tool} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-background rounded-lg flex items-center justify-center">
                    <data.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-brand-foreground">{data.tool}</span>
                      <span className="text-sm text-brand-muted">
                        {data.used} {data.limit === -1 ? '' : `/ ${data.limit}`}
                        {data.limit === -1 && <span className="text-green-500 ml-1">(Unlimited)</span>}
                      </span>
                    </div>
                    {data.limit !== -1 && (
                      <div className="w-full bg-brand-background rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-300 ${
                            getUsagePercentage(data.used, data.limit) > 80 ? 'bg-red-500' :
                            getUsagePercentage(data.used, data.limit) > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} style={{ width: `${Math.min(getUsagePercentage(data.used, data.limit), 100)}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {user?.plan === 'free' && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-accent font-medium mb-2">Upgrade for unlimited access</p>
                <p className="text-accent/80 text-sm mb-3">Get unlimited usage across all tools with our Pro plan</p>
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">Upgrade Now</button>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50">
            <h2 className="text-xl font-semibold text-brand-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-brand-foreground font-medium">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-brand-muted">{new Date(activity.date).toLocaleDateString()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>{activity.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-accent/80 hover:text-accent text-sm font-medium">View All Activity</button>
          </motion.div>
        </div>
      </div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock items={dockItems} />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  Instagram, 
  TrendingUp, 
  LayoutDashboard, 
  Search, 
  Copy, 
  Check, 
  Sparkles,
  Zap,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Key,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  Download,
  Globe,
  Flame,
  Clock,
  Target,
  Eye,
  MessageSquare,
  Layers,
  FileText,
  Image as ImageIcon,
  ListOrdered
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { 
  generateAdvancedYouTubeSEO, 
  generateEliteInstagramSEO, 
  analyzeTrends, 
  researchKeywords,
  analyzeCompetitor,
  performProfileAudit,
  getDashboardAnalytics
} from './services/geminiService';
import { cn } from './lib/utils';

type Tab = 'dashboard' | 'youtube' | 'instagram' | 'keywords' | 'trends' | 'competitor' | 'subscription' | 'admin' | 'settings' | 'audit';
type Language = 'English' | 'Bengali' | 'Hindi';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>('English');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulated login

  // Form states
  const [ytTopic, setYtTopic] = useState('');
  const [igTopic, setIgTopic] = useState('');
  const [igTone, setIgTone] = useState('Professional');
  const [trendNiche, setTrendNiche] = useState('');
  const [keywordTopic, setKeywordTopic] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorPlatform, setCompetitorPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [auditHandle, setAuditHandle] = useState('');
  const [auditPlatform, setAuditPlatform] = useState<'youtube' | 'instagram'>('youtube');

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runYouTubeSEO = async () => {
    if (!ytTopic) return;
    setIsLoading(true);
    try {
      const data = await generateAdvancedYouTubeSEO(ytTopic, { lang: language });
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error generating SEO package.');
    } finally {
      setIsLoading(false);
    }
  };

  const runInstagramSEO = async () => {
    if (!igTopic) return;
    setIsLoading(true);
    try {
      const data = await generateEliteInstagramSEO(igTopic, { lang: language, tone: igTone });
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error generating SEO package.');
    } finally {
      setIsLoading(false);
    }
  };

  const runProfileAudit = async () => {
    if (!auditHandle) return;
    setIsLoading(true);
    try {
      const data = await performProfileAudit(auditPlatform, auditHandle);
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error performing audit.');
    } finally {
      setIsLoading(false);
    }
  };

  const runTrendAnalysis = async () => {
    if (!trendNiche) return;
    setIsLoading(true);
    try {
      const data = await analyzeTrends(trendNiche);
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error analyzing trends.');
    } finally {
      setIsLoading(false);
    }
  };

  const runKeywordResearch = async () => {
    if (!keywordTopic) return;
    setIsLoading(true);
    try {
      const data = await researchKeywords(keywordTopic);
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error researching keywords.');
    } finally {
      setIsLoading(false);
    }
  };

  const runCompetitorAnalysis = async () => {
    if (!competitorUrl) return;
    setIsLoading(true);
    try {
      const data = await analyzeCompetitor(competitorPlatform, competitorUrl);
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error analyzing competitor.');
    } finally {
      setIsLoading(false);
    }
  };

  const runDashboardAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardAnalytics(trendNiche || 'General Content Creation');
      setResult(data || 'No result generated.');
    } catch (error) {
      console.error(error);
      setResult('Error fetching analytics.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Creator Dashboard</h1>
          <p className="text-zinc-500 mt-1">Real-time SEO health and growth analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-2 outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option>English</option>
            <option>Bengali</option>
            <option>Hindi</option>
          </select>
          <Button variant="primary" size="sm" onClick={runDashboardAnalytics} isLoading={isLoading}>
            <Zap size={14} className="mr-2" /> Refresh Data
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Shield size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium">SEO Health Score</h3>
          <p className="text-2xl font-bold text-white mt-1">84/100</p>
        </Card>
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Viral</span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium">Growth Prediction</h3>
          <p className="text-2xl font-bold text-white mt-1">+2.4k Subs</p>
        </Card>
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
              <Users size={20} />
            </div>
            <span className="text-xs font-medium text-pink-500 bg-pink-500/10 px-2 py-1 rounded-full">High</span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium">Engagement Rate</h3>
          <p className="text-2xl font-bold text-white mt-1">6.8%</p>
        </Card>
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Flame size={20} />
            </div>
            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">New</span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium">Viral Probability</h3>
          <p className="text-2xl font-bold text-white mt-1">72%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Keyword Opportunity Alerts" subtitle="Emerging trends in your niche">
            <div className="space-y-4">
              {[
                { kw: 'AI Video Editing', vol: 'High', trend: '+140%', color: 'text-emerald-500' },
                { kw: 'Gemini 3.1 Pro', vol: 'Very High', trend: '+320%', color: 'text-blue-500' },
                { kw: 'No-code SEO', vol: 'Medium', trend: '+45%', color: 'text-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-medium text-zinc-200">{item.kw}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-500">Vol: {item.vol}</span>
                    <span className={cn("text-xs font-bold", item.color)}>{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {result && activeTab === 'dashboard' && (
            <Card title="AI Content Strategy" subtitle="Generated based on current trends">
              <div className="markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setActiveTab('youtube')} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-500/50 transition-all flex flex-col items-center gap-2">
                <Youtube className="text-red-500" size={20} />
                <span className="text-xs font-medium">YT SEO</span>
              </button>
              <button onClick={() => setActiveTab('instagram')} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-pink-500/50 transition-all flex flex-col items-center gap-2">
                <Instagram className="text-pink-500" size={20} />
                <span className="text-xs font-medium">IG SEO</span>
              </button>
              <button onClick={() => setActiveTab('keywords')} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col items-center gap-2">
                <Key className="text-amber-500" size={20} />
                <span className="text-xs font-medium">Keywords</span>
              </button>
              <button onClick={() => setActiveTab('competitor')} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col items-center gap-2">
                <Target className="text-blue-500" size={20} />
                <span className="text-xs font-medium">Competitor</span>
              </button>
            </div>
          </Card>

          <Card title="Subscription" subtitle="Elite Plan Active">
            <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30 mb-4">
              <div className="flex items-center gap-2 text-amber-500 font-bold mb-1">
                <Sparkles size={16} /> Elite Creator
              </div>
              <p className="text-xs text-amber-200/70">Unlimited AI generations & real-time trend tracking enabled.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('subscription')}>
              Manage Plan
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderYouTube = () => (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Youtube className="text-red-500" /> YouTube SEO Suite
        </h1>
        <p className="text-zinc-500 mt-1">Advanced tools for organic video growth.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card title="Video Optimizer">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Video Topic</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-red-500 transition-all"
                  placeholder="e.g. iPhone 16 Pro Review"
                  value={ytTopic}
                  onChange={(e) => setYtTopic(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-white" onClick={runYouTubeSEO} isLoading={isLoading}>
                  Generate SEO
                </Button>
                <Button variant="secondary" onClick={() => setResult(null)}>Clear</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <ImageIcon size={24} className="text-red-500" />
              <span className="text-xs font-medium">Thumbnail Text</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <ListOrdered size={24} className="text-red-500" />
              <span className="text-xs font-medium">Chapters</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <BarChart3 size={24} className="text-red-500" />
              <span className="text-xs font-medium">SEO Score</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <Target size={24} className="text-red-500" />
              <span className="text-xs font-medium">Rank Tracker</span>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <Card className="relative min-h-[600px]">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download size={14} className="mr-1" /> Export
                </Button>
              </div>
              <div className="markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            </Card>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
              <Youtube size={64} className="mb-4 opacity-10" />
              <p className="max-w-xs">Enter a topic and generate a master SEO package including titles, descriptions, tags, and more.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderInstagram = () => (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Instagram className="text-pink-500" /> Instagram Optimizer
        </h1>
        <p className="text-zinc-500 mt-1">Boost engagement and reach with AI-powered tools.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card title="Content Generator">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Post/Reel Topic</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-pink-500 transition-all"
                  placeholder="e.g. 5 Productivity Hacks"
                  value={igTopic}
                  onChange={(e) => setIgTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Tone</label>
                <select 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-pink-500 transition-all"
                  value={igTone}
                  onChange={(e) => setIgTone(e.target.value)}
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Witty</option>
                  <option>Inspirational</option>
                </select>
              </div>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" onClick={runInstagramSEO} isLoading={isLoading}>
                Generate IG SEO
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <Zap size={24} className="text-pink-500" />
              <span className="text-xs font-medium">Reel Hooks</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <Users size={24} className="text-pink-500" />
              <span className="text-xs font-medium">Bio Optimizer</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <Clock size={24} className="text-pink-500" />
              <span className="text-xs font-medium">Best Time</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center gap-2">
              <MessageSquare size={24} className="text-pink-500" />
              <span className="text-xs font-medium">Profile Audit</span>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <Card className="relative min-h-[600px]">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download size={14} className="mr-1" /> Export
                </Button>
              </div>
              <div className="markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            </Card>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
              <Instagram size={64} className="mb-4 opacity-10" />
              <p className="max-w-xs">Generate captions, hashtags, reel hooks, and profile optimizations to grow your Instagram presence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSubscription = () => (
    <div className="space-y-8">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-white">Choose Your Plan</h1>
        <p className="text-zinc-500 mt-4 text-lg">Scale your content creation with advanced AI tools and real-time analytics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { name: 'Free', price: '₹0', features: ['5 SEO Gens/mo', 'Basic Keywords', 'Standard Support'], color: 'zinc' },
          { name: 'Advanced', price: '₹69', features: ['20 SEO Gens/mo', 'Trend Alerts', 'Priority Support'], color: 'blue' },
          { name: 'Pro', price: '₹189', features: ['50 SEO Gens/mo', 'Competitor Analysis', 'A/B Testing'], color: 'purple' },
          { name: 'Elite', price: '₹299', features: ['Unlimited Gens', 'Real-time Trends', 'Profile Audits'], color: 'amber', popular: true },
          { name: 'Master', price: '₹499', features: ['All Elite Features', 'API Access', 'Dedicated Manager'], color: 'emerald' },
        ].map((plan, i) => (
          <Card key={i} className={cn(
            "relative flex flex-col h-full",
            plan.popular && "border-amber-500/50 ring-1 ring-amber-500/20 shadow-amber-500/10 shadow-2xl"
          )}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500 text-sm">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="text-xs text-zinc-400 flex items-center gap-2">
                  <Check size={12} className="text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
              {plan.price === '₹0' ? 'Current Plan' : 'Upgrade'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'youtube', label: 'YouTube SEO', icon: Youtube },
    { id: 'instagram', label: 'Instagram SEO', icon: Instagram },
    { id: 'keywords', label: 'Keyword Research', icon: Key },
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
    { id: 'competitor', label: 'Competitor Analysis', icon: Target },
    { id: 'audit', label: 'Profile Audit', icon: Shield },
    { id: 'subscription', label: 'Pricing Plans', icon: CreditCard },
    { id: 'admin', label: 'Admin Panel', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'youtube': return renderYouTube();
      case 'instagram': return renderInstagram();
      case 'subscription': return renderSubscription();
      case 'keywords':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  <Key className="text-amber-500" /> Keyword Research Tool
                </h1>
                <p className="text-zinc-500 mt-1">Find high-volume, low-competition keywords.</p>
              </header>

              <Card>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Topic</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-amber-500 transition-all"
                      placeholder="e.g. Finance for Gen Z"
                      value={keywordTopic}
                      onChange={(e) => setKeywordTopic(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none" onClick={runKeywordResearch} isLoading={isLoading}>Research Keywords</Button>
                </div>
              </Card>
            </div>

            <div>
              {result ? (
                <Card className="relative min-h-[500px]">
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                  <div className="markdown-body">
                    <Markdown>{result}</Markdown>
                  </div>
                </Card>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
                  <Key size={64} className="mb-4 opacity-10" />
                  <p>Keyword results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'trends':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  <TrendingUp className="text-blue-500" /> Trend Analysis Tool
                </h1>
                <p className="text-zinc-500 mt-1">Discover what's viral right now.</p>
              </header>

              <Card>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Niche</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-all"
                      placeholder="e.g. Travel Vlog"
                      value={trendNiche}
                      onChange={(e) => setTrendNiche(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={runTrendAnalysis} isLoading={isLoading}>Find Trends</Button>
                </div>
              </Card>
            </div>

            <div>
              {result ? (
                <Card className="relative min-h-[500px]">
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                  <div className="markdown-body">
                    <Markdown>{result}</Markdown>
                  </div>
                </Card>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
                  <TrendingUp size={64} className="mb-4 opacity-10" />
                  <p>Trend results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'competitor':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  <Target className="text-emerald-500" /> Competitor Analysis Tool
                </h1>
                <p className="text-zinc-500 mt-1">Advanced data analysis for creators.</p>
              </header>

              <Card>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Platform</label>
                    <select 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                      value={competitorPlatform}
                      onChange={(e) => setCompetitorPlatform(e.target.value as 'youtube' | 'instagram')}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">URL or Handle</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                      placeholder="e.g. @mrbeast or video url"
                      value={competitorUrl}
                      onChange={(e) => setCompetitorUrl(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={runCompetitorAnalysis} isLoading={isLoading}>Analyze Competitor</Button>
                </div>
              </Card>
            </div>

            <div>
              {result ? (
                <Card className="relative min-h-[500px]">
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                  <div className="markdown-body">
                    <Markdown>{result}</Markdown>
                  </div>
                </Card>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
                  <BarChart3 size={64} className="mb-4 opacity-10" />
                  <p>Results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'audit':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  <Shield className="text-emerald-500" /> Profile Audit Tool
                </h1>
                <p className="text-zinc-500 mt-1">Elite SEO audit for your profile.</p>
              </header>

              <Card>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Platform</label>
                    <select 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                      value={auditPlatform}
                      onChange={(e) => setAuditPlatform(e.target.value as 'youtube' | 'instagram')}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Handle / URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                      placeholder="e.g. @handle or profile url"
                      value={auditHandle}
                      onChange={(e) => setAuditHandle(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={runProfileAudit} isLoading={isLoading}>Run Elite Audit</Button>
                </div>
              </Card>
            </div>

            <div>
              {result ? (
                <Card className="relative min-h-[500px]">
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                  <div className="markdown-body">
                    <Markdown>{result}</Markdown>
                  </div>
                </Card>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
                  <Shield size={64} className="mb-4 opacity-10" />
                  <p>Audit results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div className="text-zinc-500">Coming soon...</div>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-black mx-auto mb-4">
              <Sparkles size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome to SEO Master</h1>
            <p className="text-zinc-500">The ultimate creator optimization suite.</p>
          </div>
          <div className="space-y-4">
            <Button className="w-full py-6 text-lg" onClick={() => setIsLoggedIn(true)}>
              Login with Google
            </Button>
            <p className="text-center text-xs text-zinc-600">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-zinc-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0D0D0D] border-r border-zinc-800 transition-transform lg:translate-x-0 lg:static lg:inset-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-black">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SEO Master</span>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setResult(null);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === item.id 
                    ? "bg-zinc-800 text-white shadow-lg" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-500 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-[#0D0D0D] border-b border-zinc-800 px-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-black">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">SEO Master</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-zinc-400 hover:bg-zinc-900 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

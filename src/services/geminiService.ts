import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateYouTubeSEO = async (topic: string, targetAudience: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive SEO package for a YouTube video about: "${topic}". 
    Target Audience: ${targetAudience}.
    
    Include:
    1. 5 Click-worthy Titles (high CTR).
    2. An SEO-optimized Description (first 2 lines are crucial).
    3. A list of 15-20 relevant Tags/Keywords.
    4. A brief Script Outline (Hook, Intro, Main Points, Outro).
    5. Thumbnail concept ideas.`,
    config: {
      temperature: 0.7,
    },
  });
  return response.text;
};

export const generateInstagramSEO = async (topic: string, tone: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate an Instagram SEO and content package for: "${topic}". 
    Tone: ${tone}.
    
    Include:
    1. 3 Engaging Captions (Short, Medium, Long).
    2. 30 Hashtags categorized by reach (Niche, Medium, Popular).
    3. 5 Reel Hook ideas.
    4. Keywords for Instagram Alt Text.
    5. Best time to post suggestions based on general trends.`,
    config: {
      temperature: 0.8,
    },
  });
  return response.text;
};

export const analyzeTrends = async (niche: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze current content trends for the niche: "${niche}". 
    What is currently viral on YouTube and Instagram? 
    Suggest 3 content ideas that are likely to perform well right now.
    Use your internal knowledge and search grounding if possible.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

export const researchKeywords = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Perform advanced keyword research for the topic: "${topic}".
    Provide a list of 10-15 high-potential keywords for YouTube and 10-15 for Instagram.
    
    For each keyword, provide:
    1. Search Volume (Numerical estimate or Low-Very High)
    2. Competition Score (0-100)
    3. Trend Score (0-100, where 100 is exploding)
    4. Opportunity Score (Calculated based on volume vs competition)
    
    Format the output as a clean Markdown table for each platform.`,
    config: {
      temperature: 0.5,
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

export const analyzeCompetitor = async (platform: 'youtube' | 'instagram', urlOrHandle: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Perform a competitor analysis for the following ${platform} ${platform === 'youtube' ? 'Video/Channel' : 'Profile'}: "${urlOrHandle}".
    
    Analyze:
    1. Content Strategy & Hook patterns.
    2. SEO Optimization (Keywords used, Tags, Bio/Description quality).
    3. Engagement Analysis (Estimated based on public data).
    4. Strengths & Weaknesses.
    5. Actionable tips to outrank or compete with this creator.
    
    Use search grounding to find real data if possible.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

export const generateAdvancedYouTubeSEO = async (topic: string, options: { lang: string }) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an elite YouTube growth strategist. Generate a MASTER SEO package for a video about: "${topic}" in ${options.lang}.
    
    Include:
    1. **5 High-CTR Titles**: Focus on emotional triggers, curiosity gaps, and A/B test variations.
    2. **SEO Description**: First 2 lines optimized for search, followed by a natural keyword-rich summary (keyword density control).
    3. **20 Tags**: A strategic mix of high-volume (broad) and low-competition (long-tail) keywords.
    4. **Thumbnail Concepts**: 3 text overlay ideas that complement the titles.
    5. **Chapter Timestamps**: Structured for maximum retention (Hook: 0-30s, Intro, Core Value, Mid-roll engagement, Outro/CTA).
    6. **SEO Score (0-100)**: A calculated score based on keyword placement and title strength.
    7. **Retention Strategy**: Specific advice on how to keep viewers watching past the 30-second mark.`,
    config: {
      temperature: 0.7,
    },
  });
  return response.text;
};

export const generateEliteInstagramSEO = async (topic: string, options: { lang: string, tone: string }) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an elite Instagram growth strategist. Generate an optimization package for: "${topic}" in ${options.lang}. Tone: ${options.tone}.
    
    Include:
    1. **3 Engagement-First Captions**: Short, Medium, and Long variations with clear engagement triggers (questions, CTAs).
    2. **30 Hashtags**: Categorized by reach (10 Niche, 10 Medium, 10 Popular).
    3. **5 Viral Reel Hooks**: Focus on the first 3 seconds (visual + text hooks).
    4. **Bio Optimization**: How to structure the caption for the Instagram SEO algorithm.
    5. **Trending Audio Advice**: What type of audio would fit this content best.
    6. **Alt Text**: Keywords for accessibility and SEO.`,
    config: {
      temperature: 0.8,
    },
  });
  return response.text;
};

export const performProfileAudit = async (platform: 'youtube' | 'instagram', handle: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Perform an elite SEO audit for the ${platform} profile: "${handle}".
    
    Analyze:
    1. **Brand Consistency**: Visuals, tone, and messaging.
    2. **SEO Health**: Bio/About section optimization, keyword usage.
    3. **Content Performance**: Estimated engagement and reach potential.
    4. **Competitor Benchmarking**: How this profile compares to top creators in the same niche.
    5. **3 Critical Fixes**: Immediate actions to improve organic growth.
    
    Use search grounding for real-time data.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

export const getDashboardAnalytics = async (niche: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide a high-level SEO & Growth dashboard analysis for a creator in the "${niche}" niche.
    
    Include:
    1. Overall SEO Health Score (0-100).
    2. Growth Prediction for the next 90 days (Realistic vs Aggressive).
    3. Engagement Rate benchmarks for this niche.
    4. 3 Keyword Opportunity Alerts (Emerging trends).
    5. Viral Probability Indicator for current content types.
    6. 5 Content Ideas based on current viral patterns.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

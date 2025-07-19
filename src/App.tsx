import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import YouTube from 'react-youtube';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Youtube,
  Mail,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Code,
  Brain,
  Database,
  Globe,
  BookOpen,
  Award,
  FileText,
  Send,
  Briefcase,
  Star,
  Users,
  Terminal,
  Bot,
  Book,
  Activity,
  Coffee,
  Lock
} from 'lucide-react';

function App() {
  // Define our project interface first so we only declare it once
  interface Project {
    title: string;
    description: string;
    tags: string[];
    icon: any; // Using any for the icon component type
    githubUrl: string;
    demoUrl: string | null;
    stars?: number;
    forks?: number;
    status?: string;
  }

  // Define GitHub repo interface
  interface GithubRepo {
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    private: boolean;
  }

  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState("https://drive.google.com/file/d/1iq7ibtC6xuRVvLhAjQircHz2w7_OGCd-/view?usp=drivesdk");
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Define GitHub repo interface
  interface GithubRepo {
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    private: boolean;
  }
  
  // Define our project interface
  interface Project {
    title: string;
    description: string;
    tags: string[];
    icon: any; // Using any for the icon component type
    githubUrl: string;
    demoUrl: string | null;
    stars?: number;
    forks?: number;
    status?: string;
  }

  // Fetch GitHub projects
  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        setIsLoading(true);
        const username = 'yooshamirza'; // Your GitHub username
        const response = await axios.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`);
        
        // Process and filter the projects
        const processedProjects = response.data
          .filter((repo: GithubRepo) => !repo.fork && !repo.private && 
            repo.name.toLowerCase() !== "yooshamirza" && repo.name !== "YooshaMirza") // Exclude your username repo (case insensitive)
          .slice(0, 9) // Get first 9 projects instead of 6
          .map((repo: GithubRepo): Project => ({
            title: repo.name,
            description: repo.description || 'No description provided',
            tags: repo.language ? [repo.language] : [],
            icon: determineProjectIcon(repo.language),
            githubUrl: repo.html_url,
            demoUrl: repo.homepage || null,
            stars: repo.stargazers_count,
            forks: repo.forks_count
          }));
          
        setGithubProjects(processedProjects);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubProjects();
  }, []);
  
  // Helper function to determine icon based on repo language
  const determineProjectIcon = (language: string | null) => {
    if (!language) return Code;
    
    switch (language.toLowerCase()) {
      case 'python':
        return Terminal;
      case 'javascript':
      case 'typescript':
        return Code;
      case 'java':
        return Coffee;
      case 'html':
      case 'css':
        return Globe;
      default:
        return Code;
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Experience data categorized by type
  const experienceCategories = {
    ai: {
      title: "AI & Machine Learning Internships",
      items: [
        {
          title: "Machine Learning & AI Intern",
          company: "Sarvm.ai",
          period: "Dec 2024 – Jan 2025",
          description: [
            "Built Multilingual LLM models for text generation",
            "Fine-tuned large language models to enhance performance"
          ],
          icon: Brain
        },
        {
          title: "Machine Learning Intern",
          company: "IIT Indore DRISHTI CPS Foundation",
          period: "June 2024 – Aug 2024",
          description: [
            "Developed an LSTM model for time-series classification on NIFTY data",
            "Optimized feature extraction with technical indicators"
          ],
          icon: Database
        },
        {
          title: "Deep Learning Intern",
          company: "BIT Sindri, Jharkhand",
          period: "June 2024 – July 2024",
          description: [
            "Built an unsupervised learning model for real-time anomaly detection in WAAM"
          ],
          icon: Bot
        }
      ]
    },
    web: {
      title: "Web Development Internships",
      items: [
        {
          title: "Web Development Intern",
          company: "Sync",
          period: "Dec 2024 – Dec 2024",
          description: [
            "Developed high-performance web applications with modern frontend technologies"
          ],
          icon: Globe
        },
        {
          title: "Web Development Intern",
          company: "Octanet Services Pvt Ltd",
          period: "Dec 2023 – Jan 2024",
          description: [
            "Created interactive landing pages improving UX/UI"
          ],
          icon: Code
        },
        {
          title: "Python Developer Intern",
          company: "Dabotics India Pvt Ltd",
          period: "Dec 2023 – Jan 2024",
          description: [
            "Developed an OTP verification system and a URL shortener"
          ],
          icon: Terminal
        }
      ]
    },
    other: {
      title: "Other Professional Experience",
      items: [
        {
          title: "Quality Check Analyst Intern",
          company: "Cloudbird Digital",
          period: "May 2022 – July 2022",
          description: [
            "Verified and optimized Physics & Chemistry content for accuracy"
          ],
          icon: BookOpen
        }
      ]
    }
  };

  // Add CSS for loader
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .loader {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #14b8a6;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .dark .loader {
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-top: 4px solid #2dd4bf;
      }
      
      @keyframes gradient-x {
        0%, 100% {
          background-size: 200% 200%;
          background-position: left center;
        }
        50% {
          background-size: 200% 200%;
          background-position: right center;
        }
      }
      
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 4s ease infinite;
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          text-shadow: 0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), 0 0 60px rgba(236, 72, 153, 0.2);
        }
        50% {
          text-shadow: 0 0 30px rgba(20, 184, 166, 0.8), 0 0 60px rgba(168, 85, 247, 0.6), 0 0 90px rgba(236, 72, 153, 0.4);
        }
      }
      
      .text-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const leadershipRoles = [
    {
      title: "Freelancer",
      company: "Fiverr",
      period: "May 2021 – Present",
      description: [
        "Delivered AI/ML projects, web development, and content creation",
        "Maintained 5-star ratings on multiple projects"
      ],
      icon: Star
    },
    {
      title: "YouTuber",
      period: "July 2022 – Present",
      description: [
        "Created educational content on AI, ML, Web Development, and Competitive Programming"
      ],
      icon: Youtube
    },
    {
      title: "Placement Committee Member",
      period: "May 2025 – Present",
      description: [
        "Coordinated placement activities between students and recruiting companies",
        "Assisted in organizing campus recruitment drives"
      ],
      icon: Briefcase
    },
    {
      title: "Batch Representative",
      period: "Oct 2022 – Present",
      description: [
        "Bridged communication between students and faculty"
      ],
      icon: Users
    },
    {
      title: "Junior Core Team Member",
      company: "CodeChef BU",
      period: "Oct 2022 – Jan 2023",
      description: [
        "Organized coding contests and mentored students in competitive programming"
      ],
      icon: Code
    }
  ];

  // Fallback projects if GitHub API fails
  const projects: Project[] = [
    {
      title: "LLM-GenAI-Based Chatbot",
      description: "Built an AI chatbot using Gemini API for real-time medical queries",
      tags: ["Python", "Gemini API", "LLM"],
      icon: Bot,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null,
      status: "Ongoing"
    },
    {
      title: "Research on LLM Recommendation Systems",
      description: "Developed a personalized recommendation system powered by LLMs",
      tags: ["LLM", "Python", "ML"],
      icon: Brain,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null,
      status: "Ongoing"
    },
    {
      title: "Deep Learning in Dermatology",
      description: "Built a CNN model achieving 96.64% accuracy on 57 skin diseases",
      tags: ["CNN", "Deep Learning", "Healthcare"],
      icon: Activity,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null
    },
    {
      title: "Crypto Price Prediction Model",
      description: "Developed an ensemble learning model for crypto market forecasting",
      tags: ["ML", "Finance", "Python"],
      icon: Activity,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null
    },
    {
      title: "Campus Cravings",
      description: "Created a responsive food ordering app using Firebase and Bootstrap",
      tags: ["React", "Firebase", "Bootstrap"],
      icon: Coffee,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null
    },
    {
      title: "Say No To Proxy",
      description: "Designed a QR-based attendance system reducing proxy attendance by 50%",
      tags: ["QR Code", "Web App", "Security"],
      icon: Lock,
      githubUrl: "https://github.com/yooshamirza",
      demoUrl: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="glass-nav fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.span 
              className="text-2xl font-bold gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Mirza Yoosha Portfolio
            </motion.span>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">About</a>
              <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">Experience</a>
              <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">Projects</a>
              <a href="#research" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">Research</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">Contact</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Dynamic background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 opacity-90"></div>
        
        {/* Animated particles/grid effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 -skew-y-12"
        >
          {[...Array(30)].map((_, i) => (
            <div key={i} className="border border-teal-500/10" />
          ))}
        </motion.div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 relative"
            >
              <span className="inline-block relative bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Hi, I'm Mirza Yoosha Minhaj
                <motion.span 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "80%", opacity: 1 }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                ></motion.span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                >
                  Hi, I'm Mirza Yoosha Minhaj
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 dark:text-gray-300 mb-4"
            >
              Machine Learning Engineer & AI Researcher
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="max-w-3xl mx-auto mb-8"
            >
              <p className="text-md text-gray-400 dark:text-gray-400 leading-relaxed">
                AI/ML and Computer Vision enthusiast with hands-on experience in deep learning, LLMs, and full-stack development. 
                Proficient in Python, OpenCV, TensorFlow, and Keras, with real-world experience in building and deploying
                image and video processing applications. Strong academic background (CGPA 9.0) with internships at IIT Indore
                and BIT Sindri. Achievements include Amazon ML Challenge (top 1.3%), 10+ international freelance projects, and
                impactful research in healthcare and anomaly detection. Skilled in Flask, React, and Google Cloud Platform (GCP).
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center space-x-4 mb-12"
            >
              <a
                href="https://wa.me/919528114494?text=Hello%20Mirza%20Yoosha%2C%20I%20am%20interested%20in%20hiring%20you%20for%20a%20project.%20I%20found%20your%20portfolio%20impressive%20and%20would%20like%20to%20discuss%20potential%20opportunities."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
              >
                Hire Me
              </a>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all"
              >
                View Resume
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center space-x-8"
            >
              <a href="https://www.github.com/yooshamirza" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full border border-gray-700/50 transition-all hover:scale-110">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/mirza-yoosha-minhaj" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full border border-gray-700/50 transition-all hover:scale-110">
                <Linkedin size={28} />
              </a>
              <a href="https://www.youtube.com/@yooshamirza" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full border border-gray-700/50 transition-all hover:scale-110">
                <Youtube size={28} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visual section indicator */}
      <div className="py-4 bg-gradient-to-r from-gray-100 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
        </div>
        <div className="flex items-center space-x-2 relative">
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
          <span className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"></span>
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-slate-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
              <span className="px-4 py-1 mx-4 rounded-full bg-teal-100 text-teal-800 text-xs font-medium dark:bg-teal-900 dark:text-teal-200">
                01
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              About Me
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                My Background
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                My journey spans from academic research at prestigious institutions to hands-on development 
                of real-world AI solutions. With a strong foundation in computer vision and deep learning, 
                I've built systems that solve complex problems in healthcare, finance, and data analytics.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                As a content creator, I share my knowledge through YouTube tutorials and technical blogs,
                with a passion for making complex AI concepts accessible to a wider audience.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                My Expertise
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Brain className="text-teal-500 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI & Machine Learning</h4>
                    <p className="text-gray-600 dark:text-gray-300">Developing custom CNN models, LLMs, and computer vision applications with Python, TensorFlow, and Keras</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Code className="text-teal-500 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Full-Stack Development</h4>
                    <p className="text-gray-600 dark:text-gray-300">Building responsive web applications with React, TypeScript, and modern backend technologies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="text-teal-500 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Research & Publication</h4>
                    <p className="text-gray-600 dark:text-gray-300">Conducting academic research in AI applications for healthcare and publishing in peer-reviewed journals</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-slate-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
              <span className="px-4 py-1 mx-4 rounded-full bg-teal-100 text-teal-800 text-xs font-medium dark:bg-teal-900 dark:text-teal-200">
                02
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Work Experience
            </motion.h2>
          </div>
          
          {/* Render each experience category */}
          {Object.values(experienceCategories).map((category, catIndex) => (
            <div key={catIndex} className="mb-12 last:mb-0">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center"
              >
                <span className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-3 text-white">
                  {catIndex + 1}
                </span>
                <span className="relative">
                  {category.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-transparent"></span>
                </span>
              </motion.h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 h-full flex flex-col"
                  >
                    <div className="flex items-start h-full">
                      <exp.icon className="text-teal-500 mr-4 flex-shrink-0" size={24} />
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h4>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{exp.company}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="mr-2" size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                          {exp.description.map((desc, i) => (
                            <li key={i}>• {desc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Visual separator between sections */}
          <div className="my-16 flex items-center justify-center">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-1/2"></div>
            <div className="mx-4 text-teal-500 text-xl">•</div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-1/2"></div>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <span className="text-teal-500 font-medium text-sm">ADDITIONAL EXPERIENCE</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Leadership & Freelancing
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 h-full flex flex-col"
              >
                <div className="flex items-start h-full">
                  <role.icon className="text-teal-500 mr-4 flex-shrink-0" size={24} />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {role.title}
                    </h3>
                    {role.company && (
                      <p className="text-gray-600 dark:text-gray-400">{role.company}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="mr-2" size={16} />
                      <span>{role.period}</span>
                    </div>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                      {role.description.map((desc, i) => (
                        <li key={i}>• {desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual section indicator */}
      <div className="py-4 bg-gradient-to-r from-gray-100 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
        </div>
        <div className="flex items-center space-x-2 relative">
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
          <span className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"></span>
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-slate-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
              <span className="px-4 py-1 mx-4 rounded-full bg-teal-100 text-teal-800 text-xs font-medium dark:bg-teal-900 dark:text-teal-200">
                03
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Featured Projects
            </motion.h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Display GitHub projects if available, otherwise fallback to static projects */}
                {(githubProjects.length > 0 ? 
                  githubProjects.filter(p => p.title !== "YooshaMirza" && p.title.toLowerCase() !== "yooshamirza") : 
                  projects.filter(p => p.title !== "YooshaMirza" && p.title.toLowerCase() !== "yooshamirza"))
                  .slice(0, showAllProjects ? undefined : 6) // Show 6 projects initially, or all if showAllProjects is true
                  .map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center mb-4">
                      <project.icon className="text-teal-500 mr-3" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                    </div>
                    {project.status && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full mb-2">
                        {project.status}
                      </span>
                    )}
                    {/* Show stars/forks for GitHub projects */}
                    {(project.stars !== undefined || project.forks !== undefined) && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {project.stars !== undefined && (
                          <div className="flex items-center">
                            <Star size={16} className="mr-1" />
                            {project.stars}
                          </div>
                        )}
                        {project.forks !== undefined && (
                          <div className="flex items-center">
                            <Code size={16} className="mr-1" />
                            {project.forks}
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="skill-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <a
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 flex items-center"
                      >
                        <Github size={20} className="mr-2" />
                        Code
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-500 hover:text-teal-600 flex items-center"
                        >
                          <ExternalLink size={20} className="mr-2" />
                          Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Show "View All Projects" button if there are more projects to show */}
              {(githubProjects.length > 6 || projects.filter(p => p.title !== "Yoosha Mirza").length > 6) && !showAllProjects && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => setShowAllProjects(true)}
                    className="px-8 py-3 rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all"
                  >
                    View All Projects
                  </button>
                </div>
              )}
              
              {/* Show link to GitHub profile if viewing all projects */}
              {showAllProjects && (
                <div className="flex justify-center mt-12">
                  <a 
                    href="https://github.com/yooshamirza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-all flex items-center"
                  >
                    <Github size={20} className="mr-2" />
                    View More on GitHub
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Visual section indicator */}
      <div className="py-4 bg-gradient-to-r from-gray-100 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
        </div>
        <div className="flex items-center space-x-2 relative">
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
          <span className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"></span>
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
        </div>
      </div>

      {/* Research Papers Section */}
      <section id="research" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-slate-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
              <span className="px-4 py-1 mx-4 rounded-full bg-teal-100 text-teal-800 text-xs font-medium dark:bg-teal-900 dark:text-teal-200">
                04
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Research Publications
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* First published paper */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-start">
                <Award className="text-teal-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Deep Learning in Dermatology: Convolutional Neural Network-Based Classification of Skin Diseases and Cancer
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="mr-2" size={16} />
                    <span>Published Jan 16, 2025 • IEEE Xplore</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our research introduces a custom Convolutional Neural Network (CNN) model for classifying 57 types of skin diseases and cancers, achieving 96.64% accuracy. By leveraging deep learning, our model enhances dermatological diagnosis, surpassing traditional methods in speed and precision.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We also compared our model with pre-trained architectures such as VGG16, MobileNet, Inception V3, and Sequential CNN, analyzing their performance on the same dataset. Our CNN demonstrated superior accuracy and efficiency, processing images faster while maintaining high classification precision.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This study utilizes data augmentation techniques, TensorFlow ImageDataGenerator, and advanced model tuning to ensure reliability in real-world applications. Our findings contribute to AI-driven medical advancements, improving early detection and treatment in dermatology.
                  </p>
                  <a 
                    href="https://ieeexplore.ieee.org/document/10837323"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-600 flex items-center"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    View Publication
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Second paper under publication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-start">
                <FileText className="text-teal-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Deep Learning-Based Brain Tumor Identification Using Custom CNN
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                      Under Publication
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our research presents a custom Convolutional Neural Network (CNN) model tailored for classifying four types of brain tumors using MRI scans: glioma, meningioma, pituitary tumor, and no tumor. Achieving a testing accuracy of 97.10%, the model leverages deep learning to significantly improve diagnostic accuracy, speed, and consistency in neuroimaging.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To validate its performance, we compared our custom model against well-known pre-trained CNN architectures including Xception, ResNet50, EfficientNetB4, DenseNet121, and MobileNetV2. Our custom CNN stood out by offering a strong balance of accuracy and computational efficiency, making it highly suitable for real-time medical applications, even in resource-limited settings.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The study employs data augmentation, dilated convolutions, and residual connections, alongside optimized training strategies using TensorFlow. This ensures the model can generalize well, even with limited labeled data — a common constraint in medical imaging.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    By integrating AI into radiology workflows, our work contributes to earlier tumor detection, faster decision-making, and greater diagnostic reliability, aligning with the growing demand for intelligent healthcare systems.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual section indicator */}
      <div className="py-4 bg-gradient-to-r from-gray-100 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl"></div>
        </div>
        <div className="flex items-center space-x-2 relative">
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
          <span className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"></span>
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-glow"></span>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-slate-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
              <span className="px-4 py-1 mx-4 rounded-full bg-teal-100 text-teal-800 text-xs font-medium dark:bg-teal-900 dark:text-teal-200">
                05
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent w-16"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Get in Touch
            </motion.h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                
                // Get form values
                const form = e.currentTarget;
                const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                const messageInput = form.querySelector('textarea') as HTMLTextAreaElement;
                
                // Prepare WhatsApp message
                const name = nameInput?.value || '';
                const email = emailInput?.value || '';
                const message = messageInput?.value || '';
                
                // Create WhatsApp URL with pre-filled message
                let whatsappMessage = '';
                if (name || email || message) {
                  whatsappMessage = `Hello, my name is ${name}. ${email ? `My email is ${email}.` : ''} ${message ? `\n\nMessage: ${message}` : ''}`;
                } else {
                  whatsappMessage = "Hello, I'm interested in connecting with you from your portfolio website.";
                }
                
                // WhatsApp API URL
                const whatsappUrl = `https://wa.me/919528114494?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');
              }}
            >
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  className="contact-input h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Send Message on WhatsApp
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 dark:text-gray-400 relative">
        <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex space-x-4">
              <a href="https://www.github.com/yooshamirza" target="_blank" rel="noopener noreferrer" 
                className="text-gray-500 hover:text-teal-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mirza-yoosha-minhaj" target="_blank" rel="noopener noreferrer" 
                className="text-gray-500 hover:text-teal-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/@yooshamirza" target="_blank" rel="noopener noreferrer" 
                className="text-gray-500 hover:text-teal-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <p className="mb-2">© {new Date().getFullYear()} Mirza Yoosha Minhaj. All rights reserved.</p>
            <p className="text-sm text-gray-500">Machine Learning Engineer & AI Researcher</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
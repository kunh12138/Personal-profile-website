import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

// 错误边界组件 | Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops! Something went wrong wrong worong.</h2>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 加载组件 | Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>This is to show fake Loading</p>
    <p>loading...</p>
  </div>
);

const WELCOME_TEXT = 'Welcome to My Personal Website';

function App() {
  const [loading, setLoading] = useState(true);
  const [navClear, setNavClear] = useState(true);
  const [dark, setDark] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  });
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [msg, setMsg] = useState({
    name: '',
    email: '',
    message: '',
    status: 'idle'
  });
  const [curSection, setCurSection] = useState('home');
  const [typed, setTyped] = useState('');
  const [blink, setBlink] = useState(true);
  const [skills] = useState([
    {
      id: 1,
      icon: '💻',
      name: 'Web Dev',
      desc: 'Frontend & backend dev with various frameworks',
      more: 'React, Vue, Node.js, RESTful APIs, jQuery, Angular'
    },
    {
      id: 2,
      icon: '⚡',
      name: 'Languages',
      desc: 'Multiple programming languages',
      more: 'JS/TS, Python, Java, C++, R， PHP'
    },
    {
      id: 3,
      icon: '🛠️',
      name: 'Tools & DBs',
      desc: 'Dev tools and databases',
      more: 'Git, Webpack, MySQL, MongoDB, Bootstrap'
    }
  ]);

  const [techTags] = useState([
    { name: 'React', level: 90 },
    { name: 'Vue.js', level: 85 },
    { name: 'Angular', level: 80 },
    { name: 'Node.js', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Java', level: 80 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'MySQL', level: 85 },
    { name: 'MongoDB', level: 80 }
  ]);

  const [projects] = useState([
    {
      id: 1,
      title: 'My React Website',
      desc: 'A responsive website built with React, featuring dynamic components and a clean, user-friendly interface. It demonstrates interactive elements and efficient state management. Developed as a learning project to practice React concepts, including component lifecycle, props, state management with hooks, and conditional rendering.',
      img: '/react-web.PNG',
      stack: ['React', 'Node.js', 'javaScript', 'CSS', 'HTML'],
      link: '#'
    },
    {
      id: 2,
      title: 'PHP Shopping Cart',
      desc: 'A fully functional shopping cart application built with PHP and MySQL. It supports both user and admin roles. Users can browse products, add items to the cart, place orders, and view their order history. Admins can manage products, update stock, and view all customer orders. Additional features include user authentication with login and logout functionality, order status updates, and the ability for admins to update or delete orders.',
      img: '/cart.PNG',
      stack: ['PHP', 'Mysql', 'HTML', 'CSS', 'JavaScript'],
      link: '#'
    },
    {
      id: 3,
      title: 'Angular Task Manager',
      desc: 'A task management app built with Angular and TypeScript, designed to help users organize and manage their daily tasks. It features geolocation tracking to automatically sort tasks based on the user’s location, a drag-and-drop interface for easy task management, and customizable task priorities. Tasks are displayed in priority order and dynamically rearranged based on location and urgency.',
      img: '/task_manager.PNG',
      stack: ['Angular', 'TypeScript', 'CSS', 'HTML'],
      link: '#'
    }
  ]);

  const [currentProject, setCurrentProject] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);

  const mainRef = useRef(null);
  const skillsRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const [websiteFeatures] = useState({
    userInterface: {
      name: 'Modern UI Features',
      children: {
        darkMode: {
          name: 'Dark/Light Mode (Hover to view details)',
          details: 'Seamless theme switching with smooth transitions and persistent state',
          level: 100
        },
        responsive: {
          name: 'Side Bar',
          details: 'Displays a collapsible sidebar',
          level: 100
        },
        animations: {
          name: 'Smooth Animations',
          details: 'Custom animations and transitions for enhanced user experience',
          level: 100
        }
      }
    },
    interactivity: {
      name: 'Interactive Elements',
      children: {
        typewriter: {
          name: 'Typewriter Effect',
          details: 'Custom implemented typewriter animation with cursor blinking',
          level: 100
        },
        particles: {
          name: 'Dynamic Background',
          details: 'Interactive particle system with stars/rain effects',
          level: 100
        },
        hover: {
          name: 'Hover Animations',
          details: 'Rich hover effects on cards and buttons, try everything you can',
          level: 100
        }
      }
    },
    technical: {
      name: 'Technical Implementation',
      children: {
        react: {
          name: 'React Best Practices',
          details: 'Custom hooks, efficient state management, and component optimization',
          level: 100
        },
        performance: {
          name: 'Performance',
          details: 'Optimized rendering and smooth scrolling experience',
          level: 100
        },
        architecture: {
          name: 'Clean Architecture',
          details: 'Well-structured components and maintainable code organization',
          level: 100
        }
      }
    }
  });

  const [expandedNodes, setExpandedNodes] = useState(new Set(['frontend', 'backend']));

  const particles = useMemo(() => {
    if (dark) {
      return [...Array(100)].map(() => ({
        type: 'star',
        size: Math.random() * 12 + 8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.5,
        duration: Math.random() * 3 + 2,
        twinkleDelay: Math.random() * 2,
        starColor: Math.random() > 0.3 ? '#FFD700' : '#FFFFFF'
      }));
    } else {
      return [...Array(100)].map(() => ({
        type: 'rain',
        size: Math.random() * 6 + 4,
        left: Math.random() * 100,
        top: -10,
        speed: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 5
      }));
    }
  }, [dark]);

  // 打字机效果 | Typewriter effect
  const txt = dark ? 
    "Hi there! I'm Kun Hu, welcome to my personal website" : 
    "its rainning!";
  
  useEffect(() => {
    let idx = 0;
    
    const typing = setInterval(() => {
      if (idx < txt.length) {
        setTyped(txt.substring(0, idx + 1));
        idx++;
      } else {
        clearInterval(typing);
        setBlink(false);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [txt, dark]);

  // 组件加载时设置主题 | Set theme when component loads
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dark]);

  // 模拟初始加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 监听滚动 | Scroll listener
  const checkScroll = useCallback(() => {
    const y = window.scrollY;
    setNavClear(y < 100);
    setShowTop(y > 300);
    
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setProgress((y / max) * 100);
    
    // 简化section检查逻辑 | Simplified section checking logic
    const sections = document.querySelectorAll('section');
    for(let s of sections) {
      const top = s.offsetTop - 100;
      if (y >= top && y < top + s.clientHeight) {
        setCurSection(s.id);
        break;
      }
    }

    // 简化技能可见性检查 | Simplified skills visibility check
    if (skillsRef.current?.getBoundingClientRect().top < window.innerHeight * 0.8) {
      setSkillsVisible(true);
    }
  }, []);

  // 防抖处理 | Debounce processing
  useEffect(() => {
    let timer;
    const scrollCheck = () => {
      clearTimeout(timer);
      timer = setTimeout(checkScroll, 100);
    };

    window.addEventListener('scroll', scrollCheck);
    return () => {
      window.removeEventListener('scroll', scrollCheck);
      clearTimeout(timer);
    };
  }, [checkScroll]);

  // 回到顶部 | Scroll to top
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 发消息 | Send message
  const sendMsg = async (e) => {
    e.preventDefault();
    setMsg(prev => ({ ...prev, status: 'sending...' }));
    try {
      // 模拟发送 | Simulate sending
      await new Promise(r => setTimeout(r, 1000));
      setMsg(prev => ({ ...prev, status: 'sent!' }));
    } catch (err) {
      setMsg(prev => ({ ...prev, status: 'failed :(' }));
    }
  };

  // 更新表单 | Update form
  const updateMsg = (e) => {
    setMsg(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 切换主题 | Toggle theme
  const toggleTheme = useCallback(() => {
    setDark(prev => {
      const isDark = !prev;
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      return isDark;
    });
  }, []);

  // 项目轮播控制 | Project carousel control
  const nextProj = useCallback(() => {
    setCurrentProject(prev => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProj = useCallback(() => {
    setCurrentProject(prev => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // 自动轮播 | Auto carousel
  useEffect(() => {
    const timer = setInterval(nextProj, 5000);
    return () => clearInterval(timer);
  }, [nextProj]);

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderFeatureNode = (node, nodeId, level = 0) => {
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    const isExpanded = expandedNodes.has(nodeId);
    const isLeaf = !hasChildren;

    return (
      <div key={nodeId} className="feature-node" style={{ marginLeft: `${level * 20}px` }}>
        <div 
          className={`feature-node-content ${isLeaf ? 'leaf' : ''} ${isExpanded ? 'expanded' : ''}`}
          onClick={() => !isLeaf && toggleNode(nodeId)}
        >
          {!isLeaf && (
            <span className="node-arrow">{isExpanded ? '▼' : '▶'}</span>
          )}
          <span className="node-name">{node.name}</span>
          {isLeaf && (
            <>
              <div className="feature-level">
                <div 
                  className="level-bar"
                  style={{ width: `${node.level}%` }}
                ></div>
              </div>
              <div className="feature-details">{node.details}</div>
            </>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="feature-children">
            {Object.entries(node.children).map(([childId, childNode]) => (
              renderFeatureNode(childNode, childId, level + 1)
            ))}
          </div>
        )}
      </div>
    );
  };

  // 添加平滑滚动函数 | Add smooth scrolling function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // 添加高亮动画效果 | Add highlight animation effect
      section.classList.add('highlight-section');
      setTimeout(() => {
        section.classList.remove('highlight-section');
      }, 2000);
    }
  };

  const showProject = (p, idx) => (
    <div
      key={p.id}
      className={`project-card ${idx === currentProject ? 'active' : ''} ${flippedCard === p.id ? 'flipped' : ''}`}
      onClick={() => setFlippedCard(flippedCard === p.id ? null : p.id)}
    >
      <div className="card-front">
        <img 
          src={p.img} 
          alt={p.title}
          loading="lazy"
          onError={e => e.target.src = '/placeholder.png'}
        />
        <div className="project-info">
          <h3>{p.title}</h3>
        </div>
      </div>
      <div className="card-back">
        <h3>{p.title}</h3>
        <div className="project-description">{p.desc}</div>
        <div className="tech-stack">
          <h4 style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>Tech Stack</h4>
          <ul>
            {p.stack.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <button 
          className="project-link"
          onClick={e => {
            e.stopPropagation();
            setFlippedCard(null);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="app">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Suspense fallback={<LoadingSpinner />}>
              <Sidebar 
                activeSection={curSection}
                isDark={dark}
              />
              <div className="main-content">
                {/* 滚动进度条 */}
                <div className="scroll-progress" style={{ width: `${progress}%` }}></div>

                {/* 返回顶部按钮 */}
                {showTop && (
                  <button className="scroll-top-button" onClick={toTop}>
                    ↑
                  </button>
                )}

                {/* 导航栏 */}
                <nav className={`navbar ${navClear ? 'transparent' : ''}`}>
                  <div className="nav-brand">Kun Hu's Personal fronted React Website</div>
                  <ul className="nav-links">
                    <li><a href="#home" className={`nav-link ${curSection === 'home' ? 'active' : ''}`}>Home</a></li>
                    <li><a href="#about" className={`nav-link ${curSection === 'about' ? 'active' : ''}`}>About</a></li>
                    <li><a href="#skills" className={`nav-link ${curSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
                    <li><a href="#features" className={`nav-link ${curSection === 'features' ? 'active' : ''}`}>Features</a></li>
                    <li><a href="#projects" className={`nav-link ${curSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
                    <li><a href="#contact" className={`nav-link ${curSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
                    <li>
                      <button className="theme-toggle" onClick={toggleTheme}>
                        {dark ? '☀️' : '🌙'}
                      </button>
                    </li>
                  </ul>
                </nav>

                <main ref={mainRef}>
                  {/* 首页横幅 */}
                  <section id="home" className="hero">
                    {/* 粒子背景 */}
                    <div className="particles-container">
                      {particles.map((particle, index) => (
                        <div
                          key={index}
                          className={`particle ${particle.type}`}
                          style={{
                            '--size': `${particle.size}px`,
                            '--left': `${particle.left}%`,
                            '--top': `${particle.top}%`,
                            '--delay': `${particle.delay}s`,
                            '--opacity': particle.opacity,
                            '--duration': particle.duration ? `${particle.duration}s` : 'none',
                            '--twinkle-delay': particle.twinkleDelay ? `${particle.twinkleDelay}s` : 'none',
                            '--star-color': particle.starColor,
                            '--speed': particle.speed ? `${particle.speed}s` : 'none'
                          }}
                        />
                      ))}
                    </div>
                    <div className="hero-content">
                      <h1 className="fade-in">
                        <span className={`typing-text ${!blink ? 'no-cursor' : ''}`}>{typed}</span>
                      </h1>
                      <p className="fade-in">{WELCOME_TEXT}</p>
                      <button 
                        className="cta-button fade-in" 
                        onClick={() => scrollToSection('about')}
                        onMouseEnter={(e) => e.target.textContent = "View My Profile →"}
                        onMouseLeave={(e) => e.target.textContent = "Learn More"}
                      >
                        Learn More
                      </button>
                    </div>
                  </section>

                  {/* About Me */}
                  <section id="about" className="about">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                      <div className="about-text">
                        <p>Hey there! 👋 I'm a recent Computer Science graduate from Boston University, where I earned my Master's degree along with a specialized Certificate in Web Application Development. This unique combination has given me a solid foundation in both computer science theory and real-world web development practices.</p>
                        <p>I'm deeply passionate about full-stack development, with extensive experience in modern web technologies. On the frontend, I work with React, Vue.js, and AngularJS to build responsive user interfaces, while utilizing TypeScript for type-safe code. My backend expertise includes Node.js and RESTful APIs, along with both SQL (MySQL) and NoSQL (MongoDB) databases. I also have solid programming experience in Python, Java, C++, and R for various development scenarios.</p>
                        <p>What drives me is the endless opportunity to learn and grow in tech. Being fluent in both English and Chinese, I'm well-positioned to collaborate in diverse team environments. As an aspiring Software Development Engineer, I'm eager to join a dynamic team where I can both contribute my skills and continue learning from experienced developers. I'm looking for opportunities as a Full Stack, Frontend, or Backend Developer where I can help create innovative solutions while growing into a well-rounded engineer.</p>
                      </div>
                    </div>
                  </section>

                  {/* 技能 */}
                  <section id="skills" className="services" ref={skillsRef}>
                    <h2 className="section-title">Professional Skills</h2>
                    <div className="services-grid">
                      {skills.map(skill => (
                        <div key={skill.id} className={`service-card ${skillsVisible ? 'fade-in' : ''}`}>
                          <div className="service-icon">{skill.icon}</div>
                          <h3>{skill.name}</h3>
                          <p>{skill.desc}</p>
                          <div className="service-hover">
                            <p>{skill.more}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* 技能标签云 */}
                    <div className="skill-tags-cloud">
                      {techTags.map(tag => (
                        <div
                          key={tag.name}
                          className="skill-tag"
                          style={{
                            fontSize: `${0.8 + (tag.level / 100) * 0.4}rem`,
                            opacity: 0.5 + (tag.level / 100) * 0.5
                          }}
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Website Features */}
                  <section id="features" className="features">
                    <h2 className="section-title">Website Features</h2>
                    <p className="section-description">Explore the technical highlights and interactive features of this website</p>
                    <div className="features-container">
                      {Object.entries(websiteFeatures).map(([nodeId, node]) => (
                        renderFeatureNode(node, nodeId)
                      ))}
                    </div>
                  </section>

                  {/* 项目展示 */}
                  <section id="projects" className="projects">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-description">Click the card to view project details</p>
                    <div className="projects-container">
                      <button className="carousel-button prev" onClick={prevProj}>←</button>
                      <div className="projects-grid">
                        {projects.map((project, index) => showProject(project, index))}
                      </div>
                      <button className="carousel-button next" onClick={nextProj}>→</button>
                    </div>
                  </section>

                  {/* 联系我 */}
                  <section id="contact" className="contact">
                    <h2 className="section-title">Contact Me</h2>
                    <form className="contact-form" onSubmit={sendMsg}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={msg.name}
                          onChange={updateMsg}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          value={msg.email}
                          onChange={updateMsg}
                          placeholder="Your Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          name="message"
                          value={msg.message}
                          onChange={updateMsg}
                          placeholder="this is just a contact form example, please use email or linkedin to contact me"
                          required
                        ></textarea>
                      </div>
                      <button type="submit" className="submit-button">
                        {msg.status === 'sending...' ? 'Sending...' : msg.status === 'sent!' ? 'Message Sent!' : 'Send Message'}
                      </button>
                    </form>
                  </section>
                </main>

                {/* 页脚 */}
                <footer className="footer">
                  <div className="footer-content">
                    <div className="footer-section">
                      <h3>About Me</h3>
                      <p>Passionate about programming and creation, dedicated to providing the best experience for users.</p>
                    </div>
                    <div className="footer-section">
                      <h3>Contact Information</h3>
                      <p>Email: kunh@bu.edu</p>
                      <p>GitHub: https://github.com/kunh12138</p>
                    </div>
                    <div className="footer-section">
                      <h3>Follow Me</h3>
                      <div className="social-links">
                        <a href="https://github.com/kunh12138" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/kun-hu-17a8a2174/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom">
                    <p>&copy; 2025 Kun Hu's Personal Website. All rights reserved.</p>
                  </div>
                </footer>
              </div>
            </Suspense>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

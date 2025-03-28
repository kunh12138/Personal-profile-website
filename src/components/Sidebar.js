// 导入依赖 | Import dependencies
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdHome, MdPerson, MdCode, MdWork, MdEmail, MdStars } from 'react-icons/md';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

// 侧边栏组件 | Sidebar component
const Sidebar = ({ activeSection, isDark }) => {
  // 侧边栏折叠状态 | Sidebar collapse state
  const [isClosed, setIsClosed] = useState(true);

  // 初始化主内容区域和导航栏 | Initialize main content and navbar
  useEffect(() => {
    const main = document.querySelector('.main-content');
    const nav = document.querySelector('.navbar');
    main.classList.add('expanded');
    nav.classList.add('expanded');
  }, []);

  // 切换侧边栏状态 | Toggle sidebar state
  const toggle = () => {
    setIsClosed(!isClosed);
    const main = document.querySelector('.main-content');
    const nav = document.querySelector('.navbar');
    main.classList.toggle('expanded');
    nav.classList.toggle('expanded');
  };

  // 导航项配置 | Navigation items configuration
  const navItems = [
    { id: 'home', icon: <MdHome />, text: 'Home' },
    { id: 'about', icon: <MdPerson />, text: 'About' },
    { id: 'skills', icon: <MdCode />, text: 'Skills' },
    { id: 'features', icon: <MdStars />, text: 'Features' },
    { id: 'projects', icon: <MdWork />, text: 'Projects' },
    { id: 'contact', icon: <MdEmail />, text: 'Contact' },
  ];

  // 技能列表配置 | Skills list configuration
  const mySkills = [
    { name: 'React', lvl: 90 },
    { name: 'JavaScript', lvl: 85 },
    { name: 'Node.js', lvl: 80 },
    { name: 'Angular', lvl: 75 },
    { name: 'HTML/CSS', lvl: 70 },
  ];

  return (
    <>
      {/* 侧边栏切换按钮 | Sidebar toggle button */}
      <button 
        className="sidebar-toggle-btn"
        onClick={toggle}
        aria-label={isClosed ? "open sidebar" : "close sidebar"}
      >
        {isClosed ? <IoMenuOutline size={24} /> : <IoCloseOutline size={24} />}
      </button>
      
      {/* 侧边栏主体 | Sidebar main content */}
      <aside className={`sidebar ${isClosed ? 'collapsed' : ''}`}>
        {/* 个人信息 | Personal info */}
        <div className="sidebar-header">
          <h2 className="profile-name">Kun Hu</h2>
          <p className="profile-title">Software Development Engineer</p>
          
          {/* 社交链接 | Social links */}
          <div className="social-links">
            <a href="https://github.com/kunh12138" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kun-hu-17a8a2174/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* 导航菜单 | Navigation menu */}
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </nav>

        {/* 技能标签 | Skill tags */}
        <div className="skill-tags">
          <h3>My skills</h3>
          {mySkills.map(skill => (
            <div
              key={skill.name}
              className="skill-tag"
              style={{
                fontSize: `${0.8 + (skill.lvl / 100) * 0.4}rem`,
                opacity: 0.5 + (skill.lvl / 100) * 0.5
              }}
            >
              {skill.name}
            </div>
          ))}
        </div>

        {/* 联系信息 | Contact info */}
        <div className="contact-info">
          <h3>Contact me</h3>
          <div className="contact-item">
            <MdEmail />
            <span>kunh@bu.edu</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 
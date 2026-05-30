document.addEventListener('DOMContentLoaded', () => {
  // Inject configuration data from config.js
  if (typeof CONFIG !== 'undefined') {
    // 1. Meta and document title
    const metaTitle = document.getElementById('meta-title');
    if (metaTitle && CONFIG.name) {
      metaTitle.textContent = `${CONFIG.name} - ECE Portfolio`;
    }
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc && CONFIG.name && CONFIG.title) {
      metaDesc.setAttribute('content', `${CONFIG.title} portfolio of ${CONFIG.name}. Specializing in AI/ML, edge computer vision, embedded systems, and computer architecture.`);
    }

    // 2. Profile names, colleges and titles
    const logoName = document.getElementById('logo-name');
    if (logoName && CONFIG.name) logoName.textContent = CONFIG.name;

    const profileCollege = document.getElementById('profile-college');
    if (profileCollege && CONFIG.college) profileCollege.textContent = CONFIG.college;

    const profileTitle = document.getElementById('profile-title');
    if (profileTitle && CONFIG.title) profileTitle.textContent = CONFIG.title;

    const footerName = document.getElementById('footer-name');
    if (footerName && CONFIG.name) footerName.textContent = CONFIG.name;

    const footerTitle = document.getElementById('footer-title');
    if (footerTitle && CONFIG.title) footerTitle.textContent = CONFIG.title;

    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright && CONFIG.name) {
      footerCopyright.textContent = `© ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.`;
    }

    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn && CONFIG.resumeUrl) {
      resumeBtn.setAttribute('href', CONFIG.resumeUrl);
    }

    // 3. Social and contact links (Direct Dynamic Navigation on Click)
    const triggers = [
      { id: 'link-linkedin', type: 'linkedin' },
      { id: 'link-github', type: 'github' },
      { id: 'link-email', type: 'email' },
      { id: 'link-phone', type: 'phone' }
    ];

    triggers.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          
          let value = '';
          let actionUrl = '';

          if (t.type === 'linkedin' && CONFIG.linkedinParts) {
            value = CONFIG.linkedinParts.join('');
            actionUrl = `https://${value}`;
            window.open(actionUrl, '_blank', 'noopener,noreferrer');
          } else if (t.type === 'github' && CONFIG.githubParts) {
            value = CONFIG.githubParts.join('');
            actionUrl = `https://${value}`;
            window.open(actionUrl, '_blank', 'noopener,noreferrer');
          } else if (t.type === 'email' && CONFIG.emailParts) {
            value = CONFIG.emailParts.join('');
            actionUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${value}`;
            window.open(actionUrl, '_blank', 'noopener,noreferrer');
          } else if (t.type === 'phone' && CONFIG.phoneParts) {
            value = CONFIG.phoneParts.join('');
            actionUrl = `tel:${value}`;
            window.location.href = actionUrl;
          }
        });
      }
    });
  }

  // Navigation tabs and sections
  const tabs = ['home', 'projects', 'skills', 'achievements'];
  const sections = {};
  tabs.forEach(tab => {
    sections[tab] = document.getElementById(`section-${tab}`);
  });

  const navButtons = document.querySelectorAll('[data-tab]');
  const headerNavButtons = document.querySelectorAll('header [data-tab]');

  function navigateTo(view) {
    if (!tabs.includes(view)) return;

    // Find current active section
    const currentActiveSection = document.querySelector('.section-content:not(.hidden)');
    
    // If clicking the already active tab, just scroll to top
    if (currentActiveSection && currentActiveSection.id === `section-${view}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Update active states on header nav buttons
    headerNavButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === view;
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-zinc-800/80', isActive);
      btn.classList.toggle('text-zinc-400', !isActive);
      btn.classList.toggle('hover:text-white', !isActive);
      btn.classList.toggle('hover:bg-zinc-900/50', !isActive);
    });

    if (currentActiveSection) {
      // Fade out current section
      currentActiveSection.classList.add('fade-out');
      
      setTimeout(() => {
        currentActiveSection.classList.add('hidden');
        currentActiveSection.classList.remove('fade-out');
        
        // Prepare and show new section
        const newSection = sections[view];
        if (newSection) {
          newSection.classList.remove('hidden');
          newSection.classList.add('fade-in');
          
          // Trigger reflow to ensure the transition runs
          newSection.offsetHeight;
          
          newSection.classList.remove('fade-in');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    } else {
      // Fallback if no section was visible
      if (sections[view]) {
        sections[view].classList.remove('hidden');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Bind navigation click handlers
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = btn.getAttribute('data-tab');
      navigateTo(tab);
    });
  });

  // Bind logo click handler (goes to home)
  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // Bind project toggle click handlers
  const projectToggleButtons = document.querySelectorAll('.project-toggle-btn');
  projectToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const detailsDiv = document.getElementById(`details-${projectId}`);
      const chevronSvg = btn.querySelector('.chevron-icon');
      const textSpan = btn.querySelector('.btn-text');

      if (detailsDiv) {
        const isCollapsed = detailsDiv.classList.contains('hidden');
        if (isCollapsed) {
          detailsDiv.classList.remove('hidden');
          textSpan.textContent = 'Hide Details';
          if (chevronSvg) {
            chevronSvg.classList.add('rotate-180');
          }
        } else {
          detailsDiv.classList.add('hidden');
          textSpan.textContent = 'Show Details';
          if (chevronSvg) {
            chevronSvg.classList.remove('rotate-180');
          }
        }
      }
    });
  });

  // Mobile Dropdown Interactions
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDropdown = document.getElementById('mobile-dropdown');
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

  if (mobileMenuBtn && mobileDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDropdown.classList.toggle('hidden');
    });

    // Close dropdown when a link is clicked
    mobileNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mobileDropdown.classList.add('hidden');
      });
    });
  }
});

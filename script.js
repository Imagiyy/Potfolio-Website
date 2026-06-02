document.addEventListener('DOMContentLoaded', () => {
  // Mobile Dropdown elements & helper
  const mobileDropdown = document.getElementById('mobile-dropdown');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  function updateMenuIcons(isClosed) {
    if (menuIcon && closeIcon) {
      if (isClosed) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    }
  }

  // Helper: Hex to RGB converter
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper: Adjust color brightness
  function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const r = Math.min(255, Math.max(0, rgb.r + (rgb.r * (percent / 100))));
    const g = Math.min(255, Math.max(0, rgb.g + (rgb.g * (percent / 100))));
    const b = Math.min(255, Math.max(0, rgb.b + (rgb.b * (percent / 100))));
    const toHex = val => {
      const s = Math.round(val).toString(16);
      return s.length === 1 ? '0' + s : s;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Helper: Get SVG Icon markup
  function getSvgIcon(iconName, size = 20) {
    const icons = {
      cpu: `<rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 15h3" /><path d="M1 9h3" /><path d="M1 15h3" />`,
      layers: `<path d="m12 3-10 9 10 9 10-9-10-9Z" /><path d="m2 17 10 9 10-9" /><path d="m2 12 10 9 10-9" />`,
      code: `<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />`,
      network: `<rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />`,
      database: `<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />`,
      terminal: `<polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />`,
      globe: `<circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`,
      award: `<circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />`,
      users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />`,
      briefcase: `<rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />`,
      book: `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 2v20" />`,
      activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />`
    };
    const innerPath = icons[iconName] || icons.cpu;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-violet-400">${innerPath}</svg>`;
  }

  // Inject configuration data from config.js
  if (typeof CONFIG !== 'undefined') {
    // 1. Dynamic CSS overrides for custom themes
    if (CONFIG.theme) {
      const primary = CONFIG.theme.primaryColor || '#8b5cf6';
      const secondary = CONFIG.theme.secondaryColor || '#10b981';
      
      const pRgb = hexToRgb(primary) || { r: 139, g: 92, b: 246 };
      const sRgb = hexToRgb(secondary) || { r: 16, g: 185, b: 129 };

      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .ambient-glow-violet {
          background: radial-gradient(circle at center, rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.045), transparent 75%);
        }
        .ambient-glow-emerald {
          background: radial-gradient(circle at center, rgba(${sRgb.r}, ${sRgb.g}, ${sRgb.b}, 0.035), transparent 75%);
        }
        .footer-glow {
          background: linear-gradient(to top, rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.18) 0%, rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.03) 60%, transparent 100%) !important;
        }
        .project-card:hover, 
        .skill-card:hover, 
        .achievement-card:hover {
          border-color: rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.35) !important;
          box-shadow: 0 20px 40px -15px rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.14), 0 0 15px -3px rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.04) !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // 2. Meta and document title
    const metaTitle = document.getElementById('meta-title');
    if (metaTitle && CONFIG.name) {
      metaTitle.textContent = `${CONFIG.name} - Portfolio`;
    }
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc && CONFIG.name && CONFIG.title) {
      metaDesc.setAttribute('content', `${CONFIG.title} portfolio of ${CONFIG.name}.`);
    }

    // 3. Profile names, colleges, titles and descriptions
    const logoName = document.getElementById('logo-name');
    if (logoName && CONFIG.name) logoName.textContent = CONFIG.name;

    const profileCollege = document.getElementById('profile-college');
    if (profileCollege && CONFIG.college) profileCollege.textContent = CONFIG.college;

    const profileTitle = document.getElementById('profile-title');
    if (profileTitle && CONFIG.title) profileTitle.textContent = CONFIG.title;

    const profileCollegeDesc = document.getElementById('profile-college-desc');
    if (profileCollegeDesc && CONFIG.collegeDescription) {
      profileCollegeDesc.textContent = CONFIG.collegeDescription;
    }

    const heroName = document.getElementById('hero-name');
    if (heroName && CONFIG.name) {
      heroName.textContent = CONFIG.name;
    }

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && CONFIG.title) {
      heroTitle.textContent = CONFIG.title;
    }

    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc && CONFIG.hero && CONFIG.hero.description) {
      heroDesc.textContent = CONFIG.hero.description;
    }

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

    // 4. Render Dynamic Grid Sections (Projects, Skills, Achievements)
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && CONFIG.projects) {
      projectsGrid.innerHTML = CONFIG.projects.map(proj => {
        const specGridHtml = proj.specs ? `
          <div class="bg-zinc-950 border border-zinc-800/80 rounded-lg p-4">
            <span class="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Technical Specifications
            </span>
            <div class="grid grid-cols-2 gap-3">
              ${proj.specs.map(spec => `
                <div class="bg-zinc-900/60 border border-zinc-800/60 p-2.5 rounded-lg">
                  <span class="block text-zinc-500 uppercase text-[9px] font-semibold mb-0.5">${spec.label}</span>
                  <span class="text-zinc-200 font-semibold text-xs">${spec.value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '';

        const detailsHtml = `
          <div id="details-${proj.id}" class="mt-6 pt-5 border-t border-zinc-800/80 space-y-4 hidden">
            <p class="text-zinc-400 text-sm leading-relaxed">${proj.details}</p>
            ${specGridHtml}
          </div>
        `;

        const tagsHtml = proj.tags ? `
          <div class="flex flex-wrap gap-1.5 border-t border-zinc-800/60 pt-4">
            ${proj.tags.map(tag => `
              <span class="px-2.5 py-0.5 text-[10px] font-medium bg-violet-500/5 text-violet-300 border border-violet-500/10 rounded">${tag}</span>
            `).join('')}
          </div>
        ` : '';

        return `
          <article class="project-card bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors relative overflow-hidden group">
            <div>
              <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-violet-400">
                  ${getSvgIcon(proj.icon)}
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg px-2 py-0.5">
                    ${proj.year}
                  </span>
                </div>
              </div>

              <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">
                ${proj.title}
              </h3>

              <p class="text-zinc-400 text-sm leading-relaxed mt-4">
                ${proj.description}
              </p>

              ${detailsHtml}
            </div>

            <!-- Footer Toggles & Tags -->
            <div class="mt-8 flex flex-col gap-4">
              <button data-project-id="${proj.id}"
                class="project-toggle-btn flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 cursor-pointer self-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="chevron-icon transition-transform">
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span class="btn-text">Show Details</span>
              </button>

              ${tagsHtml}
            </div>
          </article>
        `;
      }).join('');
    }

    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && CONFIG.skills) {
      skillsGrid.innerHTML = CONFIG.skills.map(skillCat => {
        return `
          <div class="skill-card bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-violet-400">
                ${getSvgIcon(skillCat.icon)}
              </div>
              <h3 class="text-lg font-bold text-white">${skillCat.category}</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${skillCat.items.map(item => `
                <div class="bg-zinc-950 border border-zinc-800/60 rounded-lg p-3 hover:border-zinc-700 transition-colors">
                  <span class="text-xs font-semibold text-zinc-200">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    const achievementsContainer = document.getElementById('achievements-container');
    if (achievementsContainer && CONFIG.achievements) {
      achievementsContainer.innerHTML = CONFIG.achievements.map((cat, idx) => {
        const extraClass = idx > 0 ? 'pt-10 border-t border-zinc-900/60' : '';
        return `
          <div class="space-y-6 ${extraClass}">
            <h3 class="text-sm font-semibold uppercase text-zinc-500 tracking-wider">
              ${cat.category}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${cat.items.map(item => {
                const yearTag = item.year ? `
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg px-2 py-0.5">
                      ${item.year}
                    </span>
                  </div>
                ` : '';

                const subtitleRole = [item.subtitle, item.role].filter(Boolean).join(' &bull; ');
                const subtitleHtml = subtitleRole ? `<p class="text-xs text-zinc-400 font-medium">${subtitleRole}</p>` : '';

                return `
                  <div class="achievement-card p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl hover:border-zinc-700 transition-colors relative overflow-hidden">
                    <div class="flex items-start justify-between mb-4">
                      <div class="w-8 h-8 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-violet-400 flex-shrink-0">
                        ${getSvgIcon(item.icon || 'award', 16)}
                      </div>
                      ${yearTag}
                    </div>
                    <div class="space-y-1">
                      <h4 class="font-bold text-sm text-white">${item.title}</h4>
                      ${subtitleHtml}
                      <p class="text-xs text-zinc-400 pt-2 leading-relaxed">${item.description}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    // 5. Social and contact links (Direct Dynamic Navigation on Click)
    const triggers = [
      { id: 'link-linkedin', type: 'linkedin' },
      { id: 'link-github', type: 'github' },
      { id: 'link-email', type: 'email' },
      { id: 'link-phone', type: 'phone' }
    ];

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    triggers.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) {
        el.addEventListener('click', (e) => {
          let value = '';
          let actionUrl = '';

          if (t.type === 'linkedin' && CONFIG.linkedinParts) {
            value = CONFIG.linkedinParts.join('');
            if (isMobile) {
              el.href = `https://${value}`;
              el.setAttribute('target', '_blank');
              el.setAttribute('rel', 'noopener noreferrer');
            } else {
              e.preventDefault();
              actionUrl = `https://${value}`;
              window.open(actionUrl, '_blank', 'noopener,noreferrer');
            }
          } else if (t.type === 'github' && CONFIG.githubParts) {
            value = CONFIG.githubParts.join('');
            if (isMobile) {
              el.href = `https://${value}`;
              el.setAttribute('target', '_blank');
              el.setAttribute('rel', 'noopener noreferrer');
            } else {
              e.preventDefault();
              actionUrl = `https://${value}`;
              window.open(actionUrl, '_blank', 'noopener,noreferrer');
            }
          } else if (t.type === 'email' && CONFIG.emailParts) {
            value = CONFIG.emailParts.join('');
            if (isMobile) {
              el.href = `mailto:${value}`;
              el.removeAttribute('target');
            } else {
              e.preventDefault();
              actionUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${value}`;
              window.open(actionUrl, '_blank', 'noopener,noreferrer');
            }
          } else if (t.type === 'phone' && CONFIG.phoneParts) {
            value = CONFIG.phoneParts.join('');
            el.href = `tel:${value}`;
            el.removeAttribute('target');
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

    const currentActiveSection = document.querySelector('.section-content:not(.hidden)');
    
    if (currentActiveSection && currentActiveSection.id === `section-${view}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    headerNavButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === view;
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-zinc-800/80', isActive);
      btn.classList.toggle('text-zinc-400', !isActive);
      btn.classList.toggle('hover:text-white', !isActive);
      btn.classList.toggle('hover:bg-zinc-900/50', !isActive);
    });

    if (currentActiveSection) {
      currentActiveSection.classList.add('fade-out');
      
      setTimeout(() => {
        currentActiveSection.classList.add('hidden');
        currentActiveSection.classList.remove('fade-out');
        
        const newSection = sections[view];
        if (newSection) {
          newSection.classList.remove('hidden');
          newSection.classList.add('fade-in');
          newSection.offsetHeight;
          newSection.classList.remove('fade-in');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    } else {
      if (sections[view]) {
        sections[view].classList.remove('hidden');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      navigateTo(tab);
    });
  });

  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      navigateTo('home');
      if (mobileDropdown) {
        mobileDropdown.classList.add('hidden');
        updateMenuIcons(true);
      }
    });
  }

  // Delegation-based project details toggler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-toggle-btn');
    if (!btn) return;
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

  // Mobile Dropdown Interactions
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

  if (mobileMenuBtn && mobileDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileDropdown.classList.toggle('hidden');
      updateMenuIcons(isHidden);
    });

    mobileNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mobileDropdown.classList.add('hidden');
        updateMenuIcons(true);
      });
    });
  }
});

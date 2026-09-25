/* ==========================================================================
   GENTLE CODER - INTERACTIVE SCRIPT
   Features: Direct Gmail Compose Auto-Generation, Clean Link Displays
   ========================================================================== */

// Official Brand & Social Media Configuration:
const GENTLE_CODER_CONFIG = {
  brandName: "GentleCoder",
  realName: "Oluwatosin Oyelakin",
  handle: "@thegentlecoder",
  motto: "Faith. Code. Knowledge.",
  email: "gentlecoder123@gmail.com",
  university: "University of Lagos (UNILAG)",
  degree: "B.Sc. Statistics",
  linkedinUrl: "https://www.linkedin.com/in/thegentlecoder/",
  youtubeUrl: "https://www.youtube.com/@thegentlecoder",
  githubUrl: "https://github.com/the-gentlecoder",
  twitterUrl: "https://x.com/thegentlecoder",
  instagramUrl: "https://www.instagram.com/thegentlecoder/",
  tiktokUrl: "https://www.tiktok.com/@thegentlecoder",
  roles: [
    "Software & Data Engineer",
    "UNILAG Statistics Student",
    "Web & AI Explorer",
    "YouTube Educator @thegentlecoder"
  ]
};

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. DYNAMIC TYPEWRITER EFFECT (HERO SECTION)
     ------------------------------------------------------------------------ */
  const typedTextElement = document.getElementById('typed-text');
  const roles = GENTLE_CODER_CONFIG.roles;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typedTextElement) {
    typeEffect();
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL & MOBILE TOGGLE
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy Active Link Tracking
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. ANIMATED STAT COUNTERS
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 1800; // ms
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            if (stat.getAttribute('data-target') === '100') {
              stat.textContent = `${count}%`;
            } else {
              stat.textContent = `${count}+`;
            }
          }, stepTime);
        });
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    countUpObserver.observe(statsSection);
  }

  /* ------------------------------------------------------------------------
     4. LIVE CODE PLAYGROUND LAB WIDGET
     ------------------------------------------------------------------------ */
  const editorDisplay = document.getElementById('editor-display');
  const demoWidgetContainer = document.getElementById('demo-widget-container');
  const playgroundTabs = document.querySelectorAll('.playground-tab');

  const playgroundData = {
    password: {
      code: `<pre><code><span class="code-comment">// Password Security Evaluator</span>
<span class="code-keyword">function</span> <span class="code-function">checkStrength</span>(password) {
  <span class="code-keyword">let</span> score = 0;
  <span class="code-keyword">if</span> (password.length >= 8) score++;
  <span class="code-keyword">if</span> (password.length >= 10) score++;
  <span class="code-keyword">if</span> (/[A-Z]/.<span class="code-function">test</span>(password)) score++;
  <span class="code-keyword">if</span> (/[a-z]/.<span class="code-function">test</span>(password)) score++;
  <span class="code-keyword">if</span> (/[0-9]/.<span class="code-function">test</span>(password)) score++;
  <span class="code-keyword">if</span> (/[^A-Za-z0-9]/.<span class="code-function">test</span>(password)) score++;
  
  <span class="code-keyword">return</span> score;
}</code></pre>`,
      renderWidget: () => {
        demoWidgetContainer.innerHTML = `
          <div class="demo-input-group">
            <label for="demo-pass">Test Password Input:</label>
          <input type="password" id="demo-pass" class="demo-input" placeholder="Type a password..." autocomplete="new-password" aria-describedby="pass-text">
          </div>
          <div class="strength-bar-bg">
            <div class="strength-bar-fill" id="pass-fill" style="width: 0%; background:#94A3B8;"></div>
          </div>
          <div class="strength-text">
            <span>Strength Estimate:</span>
            <span id="pass-text" aria-live="polite" style="color:#94A3B8; font-weight:700;">Enter a password</span>
          </div>
          <p style="font-size:0.78rem; color:#94A3B8; margin-top:0.5rem;">A simple learning demo; this is not a full password security check.</p>
        `;

        const input = document.getElementById('demo-pass');
        const fill = document.getElementById('pass-fill');
        const text = document.getElementById('pass-text');

        const updatePass = (val) => {
          let score = 0;
          if (val.length >= 8) score++;
          if (val.length >= 10) score++;
          if (/[A-Z]/.test(val)) score++;
          if (/[a-z]/.test(val)) score++;
          if (/[0-9]/.test(val)) score++;
          if (/[^A-Za-z0-9]/.test(val)) score++;

          if (val.length === 0) {
            fill.style.width = '0%';
            fill.style.background = '#94A3B8';
            text.innerHTML = 'Enter a password';
            text.style.color = '#94A3B8';
          } else if (score <= 2) {
            fill.style.width = '30%';
            fill.style.background = '#EF4444';
            text.innerHTML = 'Weak &#9888;';
            text.style.color = '#EF4444';
          } else if (score <= 4) {
            fill.style.width = '65%';
            fill.style.background = '#F59E0B';
            text.innerHTML = 'Moderate &#128274;';
            text.style.color = '#F59E0B';
          } else {
            fill.style.width = '100%';
            fill.style.background = '#10B981';
            text.innerHTML = 'Strong &#128274;';
            text.style.color = '#10B981';
          }
        };

        input.addEventListener('input', (e) => updatePass(e.target.value));
        updatePass(input.value);
      }
    },

    search: {
      code: `<pre><code><span class="code-comment">// Auto-Suggest Search Filter</span>
<span class="code-keyword">const</span> topics = [<span class="code-string">"HTML Forms & Tables"</span>, <span class="code-string">"CSS Flexbox Layout"</span>, <span class="code-string">"JavaScript DOM Manipulation"</span>, <span class="code-string">"React Components"</span>, <span class="code-string">"Python Data Pipelines"</span>, <span class="code-string">"R Statistical Models"</span>, <span class="code-string">"SQL Database Schemas"</span>];

<span class="code-keyword">function</span> <span class="code-function">filterSearch</span>(query) {
  <span class="code-keyword">return</span> topics.<span class="code-function">filter</span>(item => 
    item.<span class="code-function">toLowerCase</span>().<span class="code-function">includes</span>(query.<span class="code-function">toLowerCase</span>())
  );
}</code></pre>`,
      renderWidget: () => {
        demoWidgetContainer.innerHTML = `
          <div class="demo-input-group">
            <label for="demo-search-input">Search Tutorials & Topics:</label>
            <input type="text" id="demo-search-input" class="demo-input" placeholder="Try typing 'html', 'react' or 'python'...">
          </div>
          <div id="search-results" aria-live="polite" style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.75rem;"></div>
        `;

        const topics = ["HTML Forms & Tables", "CSS Flexbox Layout", "JavaScript DOM Manipulation", "React Components", "Python Data Pipelines", "R Statistical Models", "SQL Database Schemas"];
        const searchInput = document.getElementById('demo-search-input');
        const resultsBox = document.getElementById('search-results');

        const renderResults = (query) => {
          const val = query.toLowerCase().trim();
          const filtered = topics.filter(t => t.toLowerCase().includes(val));
          resultsBox.replaceChildren();
          const heading = document.createElement('div');
          heading.style.cssText = 'font-size:0.85rem; color:#94A3B8;';
          heading.textContent = `Matching topics (${filtered.length}):`;
          resultsBox.append(heading);
          if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.style.cssText = 'font-size:0.85rem; color:#EF4444; padding:0.5rem;';
            empty.textContent = 'No matching tutorials found.';
            resultsBox.append(empty);
          } else {
            filtered.forEach(item => {
              const result = document.createElement('div');
              result.className = 'search-item';
              result.style.cssText = 'padding:0.5rem 0.8rem; background:#091122; border-radius:6px; font-size:0.85rem; border:1px solid rgba(56,189,248,0.2); color:#38BDF8;';
              result.textContent = `▶ ${item}`;
              resultsBox.append(result);
            });
          }
        };
        searchInput.addEventListener('input', (e) => renderResults(e.target.value));
        renderResults('');
      }
    },

    calculator: {
      code: `<pre><code><span class="code-comment">// Mini JS Calculator Logic</span>
<span class="code-keyword">function</span> <span class="code-function">calculate</span>(left, operator, right) {
  <span class="code-keyword">switch</span> (operator) {
    <span class="code-keyword">case</span> <span class="code-string">"+"</span>: <span class="code-keyword">return</span> left + right;
    <span class="code-keyword">case</span> <span class="code-string">"-"</span>: <span class="code-keyword">return</span> left - right;
    <span class="code-keyword">case</span> <span class="code-string">"*"</span>: <span class="code-keyword">return</span> left * right;
    <span class="code-keyword">case</span> <span class="code-string">"/"</span>: <span class="code-keyword">return</span> right === 0 ? <span class="code-string">"Error"</span> : left / right;
  }
}</code></pre>`,
      renderWidget: () => {
        demoWidgetContainer.innerHTML = `
          <div id="mini-calculator" tabindex="0" aria-label="Mini calculator. You can use the buttons or your keyboard." style="max-width:240px; margin:0 auto; background:#091122; padding:1rem; border-radius:12px; border:1px solid rgba(56,189,248,0.3);">
            <div id="calc-display" role="status" aria-live="polite" style="background:#040914; padding:0.75rem; border-radius:6px; text-align:right; font-family:'Fira Code', monospace; font-size:1.25rem; font-weight:700; color:#38BDF8; margin-bottom:0.85rem; border:1px solid rgba(255,255,255,0.08);">0</div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.4rem;">
              <button class="calc-btn" data-number="7" aria-label="7" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">7</button>
              <button class="calc-btn" data-number="8" aria-label="8" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">8</button>
              <button class="calc-btn" data-number="9" aria-label="9" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">9</button>
              <button class="calc-btn" data-operator="/" aria-label="Divide" style="padding:0.6rem; background:#0284C7; border:none; border-radius:6px; color:#fff; cursor:pointer;">÷</button>
              <button class="calc-btn" data-number="4" aria-label="4" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">4</button>
              <button class="calc-btn" data-number="5" aria-label="5" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">5</button>
              <button class="calc-btn" data-number="6" aria-label="6" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">6</button>
              <button class="calc-btn" data-operator="*" aria-label="Multiply" style="padding:0.6rem; background:#0284C7; border:none; border-radius:6px; color:#fff; cursor:pointer;">×</button>
              <button class="calc-btn" data-number="1" aria-label="1" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">1</button>
              <button class="calc-btn" data-number="2" aria-label="2" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">2</button>
              <button class="calc-btn" data-number="3" aria-label="3" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">3</button>
              <button class="calc-btn" data-operator="-" aria-label="Subtract" style="padding:0.6rem; background:#0284C7; border:none; border-radius:6px; color:#fff; cursor:pointer;">−</button>
              <button class="calc-btn" data-number="0" aria-label="0" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer; grid-column:span 2;">0</button>
              <button class="calc-btn" data-action="decimal" aria-label="Decimal point" style="padding:0.6rem; background:#1E293B; border:none; border-radius:6px; color:#fff; cursor:pointer;">.</button>
              <button class="calc-btn" data-operator="+" aria-label="Add" style="padding:0.6rem; background:#0284C7; border:none; border-radius:6px; color:#fff; cursor:pointer;">+</button>
              <button class="calc-btn" data-action="clear" aria-label="Clear" style="padding:0.6rem; background:#EF4444; border:none; border-radius:6px; color:#fff; cursor:pointer; grid-column:span 2;">C</button>
              <button class="calc-btn" data-action="backspace" aria-label="Backspace" style="padding:0.6rem; background:#475569; border:none; border-radius:6px; color:#fff; cursor:pointer;">⌫</button>
              <button class="calc-btn" data-action="equals" aria-label="Equals" style="padding:0.6rem; background:#10B981; border:none; border-radius:6px; color:#fff; cursor:pointer;">=</button>
            </div>
          </div>
        `;

        const display = document.getElementById('calc-display');
        const calculator = document.getElementById('mini-calculator');
        let currentValue = '0';
        let storedValue = null;
        let pendingOperator = null;
        let replaceCurrent = false;

        const showValue = () => { display.textContent = currentValue; };
        const formatValue = (value) => {
          if (!Number.isFinite(value)) return 'Error';
          return String(Number(value.toPrecision(10)));
        };
        const calculate = (left, operator, right) => {
          if (operator === '+') return left + right;
          if (operator === '-') return left - right;
          if (operator === '*') return left * right;
          if (operator === '/') return right === 0 ? NaN : left / right;
          return right;
        };
        const enterNumber = (digit) => {
          if (replaceCurrent || currentValue === 'Error') {
            currentValue = digit;
            replaceCurrent = false;
          } else if (currentValue === '0') {
            currentValue = digit;
          } else if (currentValue.replace('-', '').length < 12) {
            currentValue += digit;
          }
          showValue();
        };
        const enterOperator = (operator) => {
          if (currentValue === 'Error') return;
          const value = Number(currentValue);
          if (pendingOperator && !replaceCurrent) {
            currentValue = formatValue(calculate(storedValue, pendingOperator, value));
            showValue();
            if (currentValue === 'Error') {
              storedValue = null;
              pendingOperator = null;
              replaceCurrent = true;
              return;
            }
            storedValue = Number(currentValue);
          } else {
            storedValue = value;
          }
          pendingOperator = operator;
          replaceCurrent = true;
        };
        const pressAction = (action) => {
          if (action === 'clear') {
            currentValue = '0';
            storedValue = null;
            pendingOperator = null;
            replaceCurrent = false;
          } else if (action === 'decimal') {
            if (replaceCurrent || currentValue === 'Error') {
              currentValue = '0.';
              replaceCurrent = false;
            } else if (!currentValue.includes('.')) {
              currentValue += '.';
            }
          } else if (action === 'backspace') {
            if (replaceCurrent || currentValue === 'Error') {
              currentValue = '0';
              replaceCurrent = false;
            } else {
              currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
              if (currentValue === '-') currentValue = '0';
            }
          } else if (action === 'equals' && pendingOperator) {
            currentValue = formatValue(calculate(storedValue, pendingOperator, Number(currentValue)));
            storedValue = null;
            pendingOperator = null;
            replaceCurrent = true;
          }
          showValue();
        };

        const handleInput = (key) => {
          if (/^\d$/.test(key)) enterNumber(key);
          else if (['+', '-', '*', '/'].includes(key)) enterOperator(key);
          else if (key === '.' ) pressAction('decimal');
          else if (key === 'Enter' || key === '=') pressAction('equals');
          else if (key === 'Backspace') pressAction('backspace');
          else if (key === 'Escape' || key.toLowerCase() === 'c') pressAction('clear');
        };

        calculator.querySelectorAll('.calc-btn').forEach((button) => {
          button.addEventListener('click', () => {
            if (button.dataset.number !== undefined) enterNumber(button.dataset.number);
            else if (button.dataset.operator) enterOperator(button.dataset.operator);
            else pressAction(button.dataset.action);
          });
        });
        calculator.addEventListener('keydown', (event) => {
          if (['Enter', '=', 'Backspace', 'Escape', 'c', 'C', '.', '+', '-', '*', '/'].includes(event.key) || /^\d$/.test(event.key)) {
            event.preventDefault();
            handleInput(event.key);
          }
        });
      }
    }
  };

  function loadPlaygroundTab(tabKey) {
    if (!playgroundData[tabKey]) return;
    editorDisplay.innerHTML = playgroundData[tabKey].code;
    playgroundData[tabKey].renderWidget();
  }

  playgroundTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playgroundTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-tab');
      loadPlaygroundTab(key);
    });
  });

  // Initial tab load
  loadPlaygroundTab('password');

  /* ------------------------------------------------------------------------
     5. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forward';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. AUTOMATIC GMAIL COMPOSE GENERATION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (toastMsg) {
      toastText.textContent = message;
      toastMsg.classList.add('show');
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 5000);
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const userMessage = document.getElementById('message').value.trim();

      const subject = `Message from ${name} via GentleCoder Portfolio`;
      const body = `Hi Oluwatosin (GentleCoder),\n\n${userMessage}\n\n---\nSender Name: ${name}\nSender Email: ${email}`;

      // Gmail Web Compose direct URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(GENTLE_CODER_CONFIG.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Fallback mailto URL
      const mailtoUrl = `mailto:${GENTLE_CODER_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Try opening Gmail Web Compose first in a new tab
      const newWin = window.open(gmailUrl, '_blank');
      
      // If popup blocked or on mobile device, trigger mailto fallback
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }

      showToast(`Generating message for ${name}... Opening Gmail!`);
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     7. LIVE DEVICE SNAPSHOT (BROWSER-EXPOSED INFORMATION ONLY)
     ------------------------------------------------------------------------ */
  const batteryText = document.getElementById('device-battery');
  const connectionText = document.getElementById('device-connection');
  const screenText = document.getElementById('device-screen');
  const capacityText = document.getElementById('device-capacity');

  const timeText = document.getElementById('device-time');
  if (timeText) {
    const localTimeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
    });
    const updateLocalTime = () => {
      timeText.textContent = localTimeFormatter.format(new Date());
    };
    updateLocalTime();
    window.setInterval(updateLocalTime, 1000);
  }
  if (batteryText) {
    if (typeof navigator.getBattery === 'function') {
      navigator.getBattery().then((battery) => {
        const updateBattery = () => {
          const chargingText = battery.charging ? 'Charging' : 'Not charging';
          batteryText.textContent = `${Math.round(battery.level * 100)}%  -  ${chargingText}`;
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {
        batteryText.textContent = 'Unavailable in this browser context';
      });
    } else {
      batteryText.textContent = 'Not exposed by this browser';
    }
  }

  if (connectionText) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const updateConnection = () => {
      const onlineText = navigator.onLine ? 'Online' : 'Offline';
      const connectionType = connection && (connection.effectiveType || connection.type);
      connectionText.textContent = connectionType
        ? `${onlineText}  -  ${connectionType.toUpperCase()}`
        : `${onlineText}  -  connection details unavailable`;
    };
    updateConnection();
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    if (connection && connection.addEventListener) {
      connection.addEventListener('change', updateConnection);
    }
  }

  if (screenText) {
    const updateScreen = () => {
      screenText.textContent = `${window.screen.width}  x  ${window.screen.height}  -  ${window.devicePixelRatio || 1} x  scale`;
    };
    updateScreen();
    window.addEventListener('resize', updateScreen);
  }

  if (capacityText) {
    const details = [];
    if (navigator.hardwareConcurrency) details.push(`${navigator.hardwareConcurrency} logical cores`);
    if (navigator.deviceMemory) details.push(`about ${navigator.deviceMemory} GB RAM`);
    capacityText.textContent = details.length ? details.join('  -  ') : 'Details not exposed by this browser';
  }
});

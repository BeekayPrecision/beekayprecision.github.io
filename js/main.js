(function () {
  const fileName = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  document.body.classList.add(`page-${fileName}`);

  const page = document.body.dataset.page || '';
  const nav = [
    ['index.html', 'Home', 'home'],
    ['about.html', 'About', 'about'],
    ['products.html', 'Products', 'products'],
    ['expertise.html', 'Expertise', 'expertise'],
    ['capabilities.html', 'Capabilities', 'capabilities'],
    ['custom-switches.html', 'Custom Switches', 'custom'],
    ['contact.html', 'Contact', 'contact']
  ];

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `<a class="skip-link" href="#main">Skip to content</a>
      <div class="topbar"><div class="container">
        <a href="tel:+919850880656">+91 98508 80656</a>
        <a href="mailto:beekayp97@gmail.com">beekayp97@gmail.com</a>
        <span>MIDC Bhosari, Pune</span>
      </div></div>
      <header class="site-header"><div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="Beekay Precision home"><span class="brand-mark">BK</span><span class="brand-copy">BEEKAY PRECISION<small>ENGINEERED WITH PRECISION</small></span></a>
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">&#9776;</button>
        <nav class="site-nav" aria-label="Primary navigation">${nav.map(item => `<a href="${item[0]}" class="${page === item[2] ? 'active' : ''}"${page === item[2] ? ' aria-current="page"' : ''}>${item[1]}</a>`).join('')}<a class="nav-cta" href="contact.html#quote">Request a quote</a></nav>
      </div></header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `<footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div><h2 class="footer-brand">Beekay Precision</h2><p>Switch development supported by precision press-tool and plastic-mould expertise in Pune.</p></div>
        <div><h3>Switches</h3><div class="footer-links"><a href="push-buttons.html">Push buttons</a><a href="emergency-stop.html">Emergency stops</a><a href="selector-switches.html">Selector switches</a><a href="limit-switches.html">Limit switches</a><a href="micro-switches.html">Micro switches</a></div></div>
        <div><h3>Company</h3><div class="footer-links"><a href="products.html">All products</a><a href="expertise.html">Tooling expertise</a><a href="capabilities.html">Capabilities &amp; quality</a><a href="custom-switches.html">Custom development</a><a href="about.html">About us</a><a href="contact.html">Contact</a></div></div>
        <div><h3>Office &amp; Works</h3><p>B-33, Pavana Industrial Premises,<br>T-204, MIDC Bhosari,<br>Pune 411026, Maharashtra, India</p><div class="footer-links"><a href="tel:+919850880656">+91 98508 80656</a><a href="mailto:beekayp97@gmail.com">beekayp97@gmail.com</a></div></div>
      </div>
      <div class="footer-bottom"><div>&#169; <span data-year></span> Beekay Precision. All rights reserved.</div><span><a href="privacy.html">Privacy policy</a> &middot; GSTIN: 27ABKPP6250C1ZO</span></div>
    </div></footer>
    <div class="floating-contact" aria-label="Quick contact"><a href="https://wa.me/919850880656?text=Hello%20Beekay%20Precision%2C%20I%20have%20a%20switch%20enquiry" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WA</a><a href="tel:+919850880656" aria-label="Call Beekay Precision">&#9742;</a></div>`;
  }

  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.innerHTML = isOpen ? '&#215;' : '&#9776;';
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '&#9776;';
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-type]');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
    cards.forEach(card => { card.hidden = !(chip.dataset.filter === 'all' || card.dataset.type.split(' ').includes(chip.dataset.filter)); });
  }));

  const form = document.querySelector('[data-enquiry-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = `Website enquiry: ${data.get('product') || 'General requirement'} — ${data.get('company') || data.get('name')}`;
      const body = [
        `Name: ${data.get('name')}`,
        `Company: ${data.get('company')}`,
        `Phone: ${data.get('phone')}`,
        `Email: ${data.get('email')}`,
        `Product / service: ${data.get('product')}`,
        `Estimated quantity: ${data.get('quantity')}`,
        `Required timeline: ${data.get('timeline')}`,
        '',
        'Requirement:',
        data.get('message'),
        '',
        'Please attach drawings or specifications to this email before sending.'
      ].join('\n');
      window.location.href = `mailto:beekayp97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Your email application has been opened. Please attach any drawings or specifications before sending.';
    });
  }

  const revealItems = document.querySelectorAll('.card,.section-head,.image-frame,.art-frame,.cta-band,.step,.tooling-image,.flow-step');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(element => element.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    revealItems.forEach(element => observer.observe(element));
  }
})();

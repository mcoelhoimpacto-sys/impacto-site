(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', 'Abrir menu');
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const countElements = document.querySelectorAll('[data-count]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (!Number.isFinite(target) || target >= 1000 || reducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.7 });
    countElements.forEach((el) => countObserver.observe(el));
  }

  const proposalForm = document.getElementById('proposal-form');
  proposalForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!proposalForm.reportValidity()) return;
    const data = new FormData(proposalForm);
    const subject = `Solicitação de proposta - ${data.get('empresa')}`;
    const body = [
      'Olá, equipe Impacto,',
      '',
      'Gostaria de solicitar uma proposta.',
      '',
      `Nome: ${data.get('nome')}`,
      `Empresa/condomínio: ${data.get('empresa')}`,
      `E-mail: ${data.get('email')}`,
      `Cidade: ${data.get('cidade')}`,
      `Segmento: ${data.get('segmento')}`,
      '',
      'Necessidade:',
      data.get('mensagem'),
      '',
      'Atenciosamente.'
    ].join('\n');

    const status = proposalForm.querySelector('.form-status');
    if (status) {
      status.classList.remove('is-error', 'is-success');
      status.textContent = 'Abrindo seu aplicativo de e-mail…';
    }

    window.location.href = `mailto:administrativo@isimpacto.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const jobForm = document.getElementById('job-application-form');
  jobForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!jobForm.reportValidity()) return;

    const status = jobForm.querySelector('.form-status');
    const fileInput = jobForm.querySelector('input[type="file"]');
    const file = fileInput?.files?.[0];

    if (file && file.size > 10 * 1024 * 1024) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = 'O arquivo excede 10 MB. Envie um currículo menor.';
      }
      return;
    }

    const formData = new FormData(jobForm);

    if (status) {
      status.className = 'form-status';
      status.textContent = 'Enviando seu currículo…';
    }

    try {
      const response = await fetch(jobForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Falha no envio');

      if (status) {
        status.className = 'form-status is-success';
        status.textContent = 'Currículo enviado com sucesso. Em breve a Impacto poderá entrar em contato.';
      }
      jobForm.reset();
    } catch (error) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      }
    }
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

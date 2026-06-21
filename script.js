const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = cursor.style.height = '14px'; ring.style.width = ring.style.height = '52px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = cursor.style.height = '8px'; ring.style.width = ring.style.height = '36px'; });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const wave1 = document.getElementById('wave1');
const wave2 = document.getElementById('wave2');
let t = 0;
(function animateWaves() {
  t += 0.007;
  const s = Math.sin(t), c = Math.cos(t * 0.7);
  wave1.setAttribute('d', `M0,${20 + s * 5} Q80,${10 + c * 6} 160,${20 + s * 5} Q240,${30 + c * 4} 320,${20 + s * 5} Q400,${10 + c * 6} 480,${20 + s * 4} Q560,${30 + c * 5} 640,${18 + s * 6} Q720,${8 + c * 4} 800,${20 + s * 5} L800,200 L0,200 Z`);
  wave2.setAttribute('d', `M0,${35 + c * 4} Q100,${22 + s * 5} 200,${35 + c * 4} Q300,${48 + s * 4} 400,${33 + c * 5} Q500,${20 + s * 4} 600,${35 + c * 5} Q700,${48 + s * 3} 800,${33 + c * 4} L800,200 L0,200 Z`);
  requestAnimationFrame(animateWaves);
})();

const quotes = [
  { text: "I had spoken to recruiters, attended workshops, and read every article I could find. None of it gave me what Elena gave me in the first session — a clear picture of exactly where I stood and precisely what to do next.", author: "Priya S.", origin: "Computer Science · University of Michigan · Now at Google" },
  { text: "Most advisors tell you what is possible. Elena told me what was optimal — and the difference between those two things is enormous when your visa clock is ticking.", author: "Wei L.", origin: "Finance · Columbia University · Now at Goldman Sachs" },
  { text: "The day I was accepted into the Elena program, I felt — for the first time — that my future in this country was a plan, not a hope.", author: "Andrés M.", origin: "Engineering · UT Austin · H-1B secured, Green Card in progress" }
];
let current = 0;
const tText = document.getElementById('testimonialText');
const tAuth = document.getElementById('testimonialAuthor');
const tOrig = document.getElementById('testimonialOrigin');
[tText, tAuth, tOrig].forEach(el => el.style.transition = 'opacity 0.4s');

function switchQuote(idx) {
  current = idx;
  [tText, tAuth, tOrig].forEach(el => el.style.opacity = 0);
  setTimeout(() => {
    tText.textContent = quotes[current].text;
    tAuth.textContent = quotes[current].author;
    tOrig.textContent = quotes[current].origin;
    [tText, tAuth, tOrig].forEach(el => el.style.opacity = 1);
  }, 400);
  document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}
document.querySelectorAll('.t-dot').forEach(dot => dot.addEventListener('click', () => switchQuote(+dot.dataset.idx)));
setInterval(() => switchQuote((current + 1) % quotes.length), 7000);

/* ── INQUIRY FORM ─────────────────────────────────── */
const gradeSelect    = document.getElementById('gradeSelect');
const gradeOtherWrap = document.getElementById('gradeOtherWrap');
const gradeOther     = document.getElementById('gradeOther');

if (gradeSelect) {
  gradeSelect.addEventListener('change', () => {
    const isOther = gradeSelect.value === 'Other';
    gradeOtherWrap.style.display = isOther ? 'block' : 'none';
    gradeOther.required = isOther;
    if (!isOther) gradeOther.value = '';
  });
}

const inquiryForm  = document.getElementById('inquiryForm');
const formSuccess  = document.getElementById('formSuccess');
const formError    = document.getElementById('formError');
const submitBtn    = document.getElementById('submitBtn');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';
    formSuccess.style.display = 'none';
    formError.style.display   = 'none';

    try {
      const data = new FormData(inquiryForm);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        // Hide form fields, show success
        inquiryForm.querySelectorAll('.form-field, .form-submit-wrap').forEach(el => {
          el.style.display = 'none';
        });
        formSuccess.style.display = 'block';
        inquiryForm.reset();
        gradeOtherWrap.style.display = 'none';
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      formError.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Submit Application';
    }
  });
}

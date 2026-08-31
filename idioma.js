// The language switch on the legal pages.
//
// All three languages are in the HTML and one is shown at a time, rather than a
// page per language: a store listing links to one URL per locale and every one
// of them has to land on something readable, and a reader who was sent the
// Catalan link but reads Spanish should not have to find the other page.
const buttons = document.querySelectorAll('nav button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    buttons.forEach((b) => b.setAttribute('aria-current', String(b === button)));
    ['ca', 'es', 'en'].forEach((code) => {
      const section = document.getElementById(code);
      if (section) section.hidden = code !== lang;
    });
    document.documentElement.lang = lang;
  });
});

// Open in the reader's own language when we have it, so a link shared in a
// Spanish-language listing does not open in Catalan.
const preferred = (navigator.language || 'ca').slice(0, 2);
const match = document.querySelector(`nav button[data-lang="${preferred}"]`);
if (match) match.click();

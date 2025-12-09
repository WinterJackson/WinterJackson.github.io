export function initAnimations() {
  const spanYear = document.querySelector('#currentYear');
  if (spanYear) {
    spanYear.innerText = new Date().getFullYear();
  }

  const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show')
          } else {
              entry.target.classList.remove('show')
          }
      });
  });
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((element) => observer1.observe(element));

  function typingEffect(element, text, speed) {
      let i = 0;
      const typingInterval = setInterval(() => {
          if (i < text.length) {
              element.textContent += text.charAt(i);
              i++;
          } else {
              clearInterval(typingInterval);
          }
      }, speed);
  }

  function startTyping(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const paragraph = entry.target.querySelector('.show-list');
              if (paragraph) {
                  const text = paragraph.textContent;
                  paragraph.style.display = 'inline-block';
                  paragraph.textContent = '';
                  typingEffect(paragraph, text, 50);
                  observer.unobserve(entry.target);
              }
          }
      });
  }

  const skillsShowDiv = document.querySelector('.skills-show');
  if (skillsShowDiv) {
      const observer = new IntersectionObserver(startTyping, { threshold: 0.7 });
      observer.observe(skillsShowDiv);
  }
}

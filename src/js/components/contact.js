export function initContact() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (!form || !formBtn) return;

  // Initialize EmailJS
  // IMPORTANT: Replace with your actual Public Key
  emailjs.init("LCOJCSJdZUnGzpjg0"); 

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const originalBtnText = formBtn.innerHTML;
    formBtn.innerText = 'Sending...';
    formBtn.setAttribute('disabled', 'true');

    // Send email
    // IMPORTANT: Replace with your Service ID and Template ID
    emailjs.sendForm('service_74zb9ia', 'template_ujgl3bj', this)
      .then(function() {
          alert('Message sent successfully!');
          form.reset();
          formBtn.innerHTML = originalBtnText;
          formBtn.removeAttribute('disabled');
      }, function(error) {
          alert('Failed to send message: ' + JSON.stringify(error));
          formBtn.innerHTML = originalBtnText;
          formBtn.removeAttribute('disabled');
      });
  });
}


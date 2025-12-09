export function initContact() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (!form || !formBtn) return;

  // Initialize EmailJS (You should replace 'YOUR_PUBLIC_KEY' with your actual key if you have one, 
  // otherwise this serves as the implementation structure ready for the key)
  // emailjs.init("YOUR_PUBLIC_KEY"); 

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

    // MOCK SENDING for now
    // In production: emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    
    setTimeout(() => {
        alert('Message sent successfully! (This is a mock, configured for EmailJS)');
        form.reset();
        formBtn.innerHTML = originalBtnText;
        formBtn.removeAttribute('disabled');
    }, 2000);
  });
}


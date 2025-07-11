// script.js

"use strict";

// ---------------- helper function ----------------
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// ---------------- sidebar toggle ----------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// ---------------- profile video loop ----------------
document.addEventListener("DOMContentLoaded", () => {
    const vid = document.querySelector(".profile-video");
    if (vid) {
        vid.addEventListener("loadedmetadata", () => {
            vid.currentTime = 0;
            vid.play();
        });
        vid.addEventListener("timeupdate", () => {
            if (vid.currentTime >= 6) {
                vid.currentTime = 0;
                vid.play();
            }
        });
    }

    // ---------------- splash screen hide ----------------
    const splash = document.getElementById("splash-screen");
    const main = document.getElementById("main-content");
    if (splash && main) {
        setTimeout(() => {
            splash.classList.add("fade-out");
            setTimeout(() => {
                splash.style.display = "none";
                main.hidden = false;
            }, 2000);
        }, 6000);
    }

    // ---------------- auto-clone scrolling tracks ----------------
    const cloneTrack = (selector) => {
        const track = document.querySelector(selector);
        if (!track || !track.firstElementChild) return;
        const clone = track.firstElementChild.cloneNode(true);
        track.appendChild(clone);
    };
    cloneTrack(".languages-track");
    cloneTrack(".others-track");

    // ---------------- IntersectionObserver: fade-in .hidden elements ----------------
    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
    document.querySelectorAll(".hidden").forEach((el) => observer1.observe(el));

    // ---------------- Typing animation in .skills-show section ----------------
    const typingEffect = (element, text, speed) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    };

    const startTyping = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const paragraph = entry.target.querySelector(".show-list");
                const text = paragraph.textContent;
                paragraph.style.display = "inline-block";
                paragraph.textContent = "";
                typingEffect(paragraph, text, 50);
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsObserver = new IntersectionObserver(startTyping, {
        threshold: 0.7,
    });
    const skillsShowDiv = document.querySelector(".skills-show");
    if (skillsShowDiv) skillsObserver.observe(skillsShowDiv);
});

// ---------------- testimonials modal ----------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

testimonialsItem.forEach((item) => {
    item.addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector(
            "[data-testimonials-title]"
        ).innerHTML;
        modalText.innerHTML = this.querySelector(
            "[data-testimonials-text]"
        ).innerHTML;
        testimonialsModalFunc();
    });
});
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ---------------- project filter (dropdown & buttons) ----------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll(".project-item");

// dropdown toggle
select.addEventListener("click", () => elementToggleFunc(select));

// select from dropdown
selectItems.forEach((item) => {
    item.addEventListener("click", function () {
        const val = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(val);
    });
});

// top bar button filters
let lastBtn = filterBtn[0];
filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        const val = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(val);
        lastBtn.classList.remove("active");
        this.classList.add("active");
        lastBtn = this;
    });
});

// filtering logic
function filterFunc(selectedValue) {
    filterItems.forEach((item) => {
        const category = item.dataset.category?.toLowerCase();
        const match = selectedValue === "all" || category === selectedValue;
        item.classList.toggle("active", match);
    });
}

// ---------------- contact form validation ----------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
    input.addEventListener("input", () => {
        form.checkValidity()
            ? formBtn.removeAttribute("disabled")
            : formBtn.setAttribute("disabled", "");
    });
});

// ---------------- page navigation ----------------
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link, i) => {
    link.addEventListener("click", () => {
        pages.forEach((page, idx) => {
            const name = link.innerHTML.toLowerCase();
            const match = name === page.dataset.page;
            page.classList.toggle("active", match);
            navLinks[idx].classList.toggle("active", match);
            if (match) window.scrollTo(0, 0);
        });
    });
});

// ---------------- touch support for project overlays ----------------
document.querySelectorAll(".project-item").forEach((item) => {
    item.addEventListener("click", (e) => {
        if (!e.target.closest("a") && !e.target.closest("button")) {
            item.classList.toggle("open");
        }
    });
});

// auto-close open project descriptions when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".project-item")) {
        document.querySelectorAll(".project-item.open").forEach((item) => {
            item.classList.remove("open");
        });
    }
});

// ---------------- footer year ----------------
const spanYear = document.querySelector("#currentYear");
if (spanYear) spanYear.innerText = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .recognition, .final-cta").forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});

const countdown = document.querySelector(".countdown");

if (countdown) {
  const deadline = new Date(countdown.dataset.deadline);
  const units = ["days", "hours", "minutes", "seconds"];
  let timer;

  const updateCountdown = () => {
    const remaining = Math.max(0, deadline.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const values = [
      Math.floor(totalSeconds / 86400),
      Math.floor((totalSeconds % 86400) / 3600),
      Math.floor((totalSeconds % 3600) / 60),
      totalSeconds % 60
    ];

    units.forEach((unit, index) => {
      const element = countdown.querySelector(`[data-unit="${unit}"]`);
      element.textContent = String(values[index]).padStart(2, "0");
    });

    if (remaining === 0) {
      countdown.closest(".registration-timer").classList.add("registration-closed");
      countdown.previousElementSibling.textContent = "Registration for the idea phase is now closed.";
      clearInterval(timer);
    }
  };

  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
}

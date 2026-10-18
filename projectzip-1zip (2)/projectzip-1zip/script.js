(() => {
  const backdrop = document.querySelector(".dialog-backdrop");
  const dialog = backdrop?.querySelector('[role="dialog"]');
  const trigger = document.querySelector(".app-button");
  const closeButtons = [...document.querySelectorAll("[data-dialog-close]")];
  const backgroundVideo = document.querySelector(".hero-video");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    backgroundVideo?.pause();
    backgroundVideo?.removeAttribute("autoplay");
  }

  const closeDialog = () => {
    if (!backdrop || backdrop.hidden) return;
    backdrop.hidden = true;
    document.body.classList.remove("dialog-open");
    trigger?.focus();
  };

  trigger?.addEventListener("click", () => {
    if (!backdrop || !dialog) return;
    backdrop.hidden = false;
    document.body.classList.add("dialog-open");
    closeButtons[0]?.focus();
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeDialog));
  backdrop?.addEventListener("click", (event) => {
    if (event.target === backdrop) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (!backdrop || backdrop.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key !== "Tab" || !dialog) return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();

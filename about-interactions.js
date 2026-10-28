(() => {
    const revealItems = document.querySelectorAll(".scroll-reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            requestAnimationFrame(() => {
                entry.target.classList.remove("opacity-0", "translate-y-6");
                entry.target.classList.add("opacity-100", "translate-y-0");
            });
            activeObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach((item) => {
        item.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700", "ease-out");
        observer.observe(item);
    });
})();

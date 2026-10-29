/* =========================================================
       CONFIG
       ========================================================= */
    const WEDDING_DATE = new Date("2027-06-14T00:00:00+05:30");

    /* =========================================================
       OPENING: ONE CLICK -> VIDEO -> HERO
       ========================================================= */
    const opening = document.getElementById("opening");
    const openButton = document.getElementById("openInvitation");
    const openingVideo = document.getElementById("openingVideo");
    const weddingAudio = document.getElementById("weddingAudio");
    const soundToggles = document.querySelectorAll(".sound-toggle");

    let openingStarted = false;

    function enterWebsite() {
      opening.classList.add("hide");
      document.body.classList.remove("locked");

      // Move focus away from the opening overlay for accessibility.
      setTimeout(() => {
        document.getElementById("home")?.focus?.();
      }, 700);
    }

    async function startOpening() {
      if (openingStarted) return;
      openingStarted = true;

      opening.classList.add("playing");
      openingVideo.currentTime = 0;
      openingVideo.muted = true;

      try {
        await openingVideo.play();
      } catch (error) {
        // If autoplay/playback fails, do not trap the visitor.
        enterWebsite();
      }
    }

    openButton.addEventListener("click", startOpening);

    openingVideo.addEventListener("ended", enterWebsite);

    // Fallback for videos that fail to load.
    openingVideo.addEventListener("error", () => {
      if (openingStarted) enterWebsite();
    });

    function updateSoundToggleState(soundEnabled) {
      soundToggles.forEach(soundToggle => {
        soundToggle.classList.toggle("active", soundEnabled);
        soundToggle.setAttribute("aria-label", soundEnabled ? "Turn wedding music off" : "Turn wedding music on");
        soundToggle.setAttribute("aria-pressed", String(soundEnabled));
      });
    }

    soundToggles.forEach(soundToggle => soundToggle.addEventListener("click", async (event) => {
      event.stopPropagation();
      const soundEnabled = !soundToggle.classList.contains("active");

      if (soundEnabled) {
        openingVideo.muted = false;
        updateSoundToggleState(true);

        try {
          await weddingAudio.play();
        } catch (error) {
          // The video sound still works if the MP3 is unavailable.
        }
      } else {
        openingVideo.muted = true;
        weddingAudio.pause();
        updateSoundToggleState(false);
      }
    }));

    /* =========================================================
       NAVIGATION
       ========================================================= */
    const siteNav = document.getElementById("siteNav");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    window.addEventListener("scroll", () => {
      siteNav.classList.toggle("scrolled", window.scrollY > 35);
    }, { passive: true });

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    /* =========================================================
       COUNTDOWN
       ========================================================= */
    function updateCountdown() {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        document.getElementById("days").textContent = "000";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      document.getElementById("days").textContent = String(days).padStart(3, "0");
      document.getElementById("hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =========================================================
       SCRATCH / REVEAL
       ========================================================= */
    const celebration = document.getElementById("celebration");
    const scratchCanvases = document.querySelectorAll(".scratch-canvas");

    function setupScratchCanvas(canvas) {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      let scratching = false;
      let lastPoint = null;
      let revealed = false;

      function resizeScratchCanvas() {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(rect.width * ratio);
        canvas.height = Math.floor(rect.height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, "#b3ad94");
        gradient.addColorStop(.45, "#c9c0a5");
        gradient.addColorStop(1, "#9c987f");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        ctx.fillStyle = "rgba(255,250,235,.32)";
        for (let i = 0; i < 18; i++) {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 1.8 + .5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "#fff9eb";
        ctx.font = 'italic 14px "Cormorant Garamond", serif';
        ctx.textAlign = "center";
        ctx.fillText("Scratch", rect.width / 2, rect.height / 2 + 5);
        ctx.globalCompositeOperation = "destination-out";
      }

      function pointFromEvent(event) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }

      function checkScratchProgress() {
        if (revealed) return;

        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < image.data.length; i += 32) {
          if (image.data[i] < 50) transparent++;
        }

        if (transparent / (image.data.length / 32) > 0.48) {
          revealed = true;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.pointerEvents = "none";
          if ([...scratchCanvases].every(otherCanvas => otherCanvas.style.pointerEvents === "none")) {
            celebration.classList.add("show");
          }
        }
      }

      function scratchAt(point) {
        if (!lastPoint) lastPoint = point;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 24;
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        lastPoint = point;
        checkScratchProgress();
      }

      canvas.addEventListener("pointerdown", event => {
        scratching = true;
        lastPoint = pointFromEvent(event);
        canvas.setPointerCapture?.(event.pointerId);
        scratchAt(lastPoint);
      });

      canvas.addEventListener("pointermove", event => {
        if (scratching) scratchAt(pointFromEvent(event));
      });

      canvas.addEventListener("pointerup", () => {
        scratching = false;
        lastPoint = null;
      });

      canvas.addEventListener("pointercancel", () => {
        scratching = false;
        lastPoint = null;
      });

      canvas.resizeScratchCanvas = resizeScratchCanvas;
      resizeScratchCanvas();
    }

    scratchCanvases.forEach(setupScratchCanvas);
    window.addEventListener("resize", () => scratchCanvases.forEach(canvas => {
      if (canvas.style.pointerEvents !== "none") canvas.resizeScratchCanvas();
    }));

    /* =========================================================
       SCROLL REVEALS
       ========================================================= */
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

 /* =========================================================
   TIMELINE FLOWER & PROGRESS LINE
   ========================================================= */
const timeline = document.getElementById("timeline");
const timelineProgress = document.getElementById("timelineProgress");
const timelineFlower = document.getElementById("timelineFlower");

function updateTimeline() {
  if (!timeline || !timelineFlower) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Start moving when top of timeline reaches middle of screen
  const startOffset = windowHeight / 2;
  const totalHeight = rect.height;
  const currentScroll = startOffset - rect.top;

  // Calculate percentage (0 to 1)
  let progress = currentScroll / totalHeight;
  progress = Math.max(0, Math.min(1, progress));

  const percentage = (progress * 100) + "%";

  // Update flower position
  timelineFlower.style.top = percentage;

  // Update animated vertical gold line if element exists
  if (timelineProgress) {
    timelineProgress.style.height = percentage;
  }
}

window.addEventListener("scroll", updateTimeline, { passive: true });
window.addEventListener("resize", updateTimeline);
updateTimeline();

    /* =========================================================
       GALLERY LIGHTBOX
       ========================================================= */
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeLightbox();
    });

    /* =========================================================
       RSVP DEMO
       ========================================================= */
    document.getElementById("rsvpForm").addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("guestName").value.trim();
      const attendance = document.getElementById("attendance").value;

      if (!name || !attendance) return;

      alert(
        `Thank you, ${name}!\\n\\nYour RSVP has been recorded as: ${attendance}.\\n\\nConnect this form to your preferred RSVP backend before publishing.`
      );

      event.target.reset();
    });

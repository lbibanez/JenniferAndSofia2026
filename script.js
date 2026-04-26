function openLetter() {
  const closedState = document.getElementById('state-closed');
  const openedState = document.getElementById('state-opened');
  const scrollBtn = document.getElementById('scroll-btn');

  // 1. Fade out the Closed Envelope & Seal
  closedState.style.opacity = '0';
  closedState.style.transform = 'scale(0.95)'; // Slight shrink effect

  // 2. Wait, then Fade In the Opened Letter
  setTimeout(() => {
    // Hide the closed div entirely so it doesn't block clicks
    closedState.style.display = 'none';
    
    // Reveal the opened div
    openedState.classList.remove('hidden');
    // We need a tiny timeout to allow the CSS transition to catch the opacity change
    setTimeout(() => {
        openedState.style.opacity = '1';
        openedState.style.position = 'relative'; // Reset position so it takes space
    }, 50);

    // 3. Reveal the Scroll Button
    setTimeout(() => {
      scrollBtn.classList.remove('hidden');
      scrollBtn.style.opacity = '1';
    }, 800);
    
  }, 600); // Matches the CSS transition time
}

function enterSite() {
  const overlay = document.getElementById('intro-overlay');
  startMusic();
  
  // 1. Slide the whole overlay UP like a curtain
  overlay.style.transform = 'translateY(-100%)';
  
  // 2. Optional: Remove it from the DOM after the slide is done
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
  
  // 3. Trigger hero fade-in animation after overlay slides away
  setTimeout(() => {
    const heroLogo = document.querySelector('.hero_logo');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.subtitle');
    
    if (heroLogo) heroLogo.classList.add('fade-in-hero');
    if (heroTitle) heroTitle.classList.add('fade-in-hero');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in-hero');
  }, 10); // Start fading in shortly after overlay is gone
}

let musicIsPlaying = false;

function setMusicButtonLabel(isPlaying) {
  const musicBtn = document.getElementById("music-toggle");
  if (!musicBtn) return;

  musicBtn.innerHTML = isPlaying ? "Pause Audio" : "Play Soundtrack";
}

function startMusic() {
  const music = document.getElementById("bg-music");
  if (!music) return;

  music.volume = 0.4;

  music.play()
    .then(() => {
      musicIsPlaying = true;
      setMusicButtonLabel(true);
    })
    .catch(() => {
      musicIsPlaying = false;
      setMusicButtonLabel(false);
    });
}

function stopMusic() {
  const music = document.getElementById("bg-music");
  if (!music) return;

  music.pause();
  musicIsPlaying = false;
  setMusicButtonLabel(false);
}

const targetDate = new Date("June 24, 2026 00:00:00").getTime();

const countdown = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Time calculations for days, hours, minutes and seconds
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in the elements
  document.getElementById("days").innerHTML = d.toString().padStart(2, '0');
  document.getElementById("hours").innerHTML = h.toString().padStart(2, '0');
  document.getElementById("minutes").innerHTML = m.toString().padStart(2, '0');
  document.getElementById("seconds").innerHTML = s.toString().padStart(2, '0');

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("timer").innerHTML = "The Big Day is Here!";
  }
}, 1000);

document.addEventListener("DOMContentLoaded", function() {
  
  // Title Animation Observer
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const title = document.querySelector('.fade-in-element');
  if (title) titleObserver.observe(title);

  // Timeline "Ladder" Observer
  const ladderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Find all items and apply a staggered delay
        const items = document.querySelectorAll('.ladder-fade');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, index * 200); // 200ms between each slot
        });
        ladderObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const timelineContainer = document.querySelector('.schedule-timeline');
  if (timelineContainer) ladderObserver.observe(timelineContainer);

});

document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const section = document.querySelector('.fade-in-section');
  if (section) observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function() {
  const venueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the image and text inside this specific block
        const elementsToAnimate = entry.target.querySelectorAll('.reveal-left, .reveal-right');
        
        elementsToAnimate.forEach(el => {
          el.classList.add('is-visible');
        });

        // Stop observing this block once it has animated
        venueObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Triggers when 20% of the block is visible

  // Observe each venue block
  const venueBlocks = document.querySelectorAll('.venue-block');
  venueBlocks.forEach(block => {
    venueObserver.observe(block);
  });
});

const venueHeaderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      venueHeaderObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Target the new wrapper
const venueHeader = document.querySelector('.venue-header');
if (venueHeader) {
  venueHeaderObserver.observe(venueHeader);
}

const storyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { 
  /* Trigger when the text container is 50% visible in the viewport */
  threshold: 0.2 
});

const storyContent = document.querySelector('.story-content');
if (storyContent) {
  storyObserver.observe(storyContent);
}

document.addEventListener("DOMContentLoaded", function() {
  const entourageOptions = {
    root: null, // use the viewport
    threshold: 0.1 // trigger when 10% of the section is visible
  };

  const entourageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        entry.target.classList.add('is-visible');
    
        observer.unobserve(entry.target);
        console.log("Entourage section animated."); // Optional debug
      }
    });
  }, entourageOptions);


  const entourageTarget = document.querySelector('#entourage');
  
  if (entourageTarget) {
    entourageObserver.observe(entourageTarget);
  } else {
    console.warn("Element with ID #entourage not found.");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        
        // 1. Animate the main content
        const content = section.querySelector('.fade-in-element, .fade-in-section, .entourage-container');
        if (content) content.classList.add('is-visible');

        // 2. CHANGE: Animate ALL background decorations in this section
        const allDecorations = section.querySelectorAll('.bg-decoration');
        allDecorations.forEach(bg => {
          bg.classList.add('is-visible');
        });

        const floralAccents = section.querySelectorAll('.floral-accent');
        floralAccents.forEach(flower => {
          flower.classList.add('is-visible');
        });

        observer.unobserve(section);
      }
    });
  }, { threshold: 0.1 }); // Lowered threshold so the bottom flower triggers sooner

  const sections = document.querySelectorAll('#wedding-schedule, #dress-code, #faq, #entourage');
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (document.body.classList.contains("menu-open")) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("nav-hidden");
    return;
  }

  const currentScrollY = window.scrollY;

  // 1. Transparency Toggle
  if (currentScrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // 2. Hide on Scroll Down, Show on Scroll Up
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    // Scrolling Down
    navbar.classList.add("nav-hidden");
  } else {
    // Scrolling Up
    navbar.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
});

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const mobilePanel = document.getElementById("mobile-menu-panel");
  const mobileBackdrop = document.getElementById("mobile-menu-backdrop");
  const mobileDetailsToggle = document.getElementById("mobile-details-toggle");
  const mobileDetailsMenu = document.getElementById("mobile-details-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-menu a[href^='#']");

  if (!navbar || !menuToggle || !mobilePanel || !mobileBackdrop || !mobileDetailsToggle || !mobileDetailsMenu) {
    return;
  }

  function closeMobileMenu() {
    document.body.classList.remove("menu-open");
    navbar.classList.remove("mobile-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobilePanel.setAttribute("aria-hidden", "true");
    mobileBackdrop.setAttribute("aria-hidden", "true");
  }

  function openMobileMenu() {
    document.body.classList.add("menu-open");
    navbar.classList.add("mobile-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mobilePanel.setAttribute("aria-hidden", "false");
    mobileBackdrop.setAttribute("aria-hidden", "false");
  }

  function toggleMobileDetails() {
    const isOpen = mobileDetailsMenu.classList.toggle("open");
    mobileDetailsToggle.setAttribute("aria-expanded", String(isOpen));
    mobileDetailsMenu.setAttribute("aria-hidden", String(!isOpen));
  }

  menuToggle.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileBackdrop.addEventListener("click", closeMobileMenu);
  mobileDetailsToggle.addEventListener("click", toggleMobileDetails);

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
      mobileDetailsMenu.classList.remove("open");
      mobileDetailsToggle.setAttribute("aria-expanded", "false");
      mobileDetailsMenu.setAttribute("aria-hidden", "true");
    }
  });
});

// Smooth Scroll for internal nav links
document.querySelectorAll('.nav-links a[href^="#"], .dropdown-content a[href^="#"], .mobile-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for navbar height
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
    const rsvpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                rsvpObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger as soon as 10% is visible

    const rsvpSection = document.querySelector('.rsvp-container');
    if (rsvpSection) {
        rsvpObserver.observe(rsvpSection);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxeb_VYIVSC5JxfC7SAmTQsdbpoQbNekoo3vOOD0WV39AcbLiju9ruSxHFs_d5yObwm/exec';
    let fullGuestList = [];
    let selectedGuest = null;

    // 1. Fetch Guest List from Sheets on Load (WITH DEBUGGING)
    fetch(`${SCRIPT_URL}?action=getList`)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => { 
            console.log("SUCCESS! Guest list loaded:", data); 
            fullGuestList = data; 
        })
        .catch(error => {
            console.error("FAILED to load guest list. Check your Google Apps Script URL and permissions.", error);
        });

    // 2. Search Box Logic (WITH EMPTY STATE HANDLING)
    const searchInput = document.getElementById('guest-search');
    const resultsList = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        resultsList.innerHTML = ''; // Clear old results
        
        if (val.length < 2) {
            resultsList.classList.add('hidden');
            return;
        }

        // Filter the list safely
        const filtered = fullGuestList.filter(g => g.name && g.name.toLowerCase().includes(val));
        
        // Show "No results" if the list is empty
        if (filtered.length === 0) {
            const li = document.createElement('li');
            li.innerText = "No matching name found.";
            li.style.color = "#888"; // Subtle gray text
            li.style.pointerEvents = "none"; // Unclickable
            resultsList.appendChild(li);
        } else {
            // Populate actual names
            filtered.forEach(guest => {
                const li = document.createElement('li');
                li.innerText = guest.name;
                li.onclick = () => handleGuestSelection(guest);
                resultsList.appendChild(li);
            });
        }
        
        resultsList.classList.remove('hidden');
    });

    // 3. Populate Form and Generate Companion Fields
    function handleGuestSelection(guest) {
        selectedGuest = guest;
        document.getElementById('rsvp-search-box').classList.add('hidden');
        
        // CHECK IF THEY ALREADY RSVP'd
        if (guest.hasRSVP) {
            // Show Overview
            const overview = document.getElementById('rsvp-overview');
            overview.classList.remove('hidden');
            
            document.getElementById('overview-name').innerText = `Hello again, ${guest.name}!`;
            document.getElementById('overview-attending').innerText = guest.rsvpData.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';
            
            // Handle Companions
            if (guest.rsvpData.companions) {
                document.getElementById('overview-companions-group').style.display = 'block';
                document.getElementById('overview-companions').innerText = guest.rsvpData.companions;
            } else {
                document.getElementById('overview-companions-group').style.display = 'none';
            }

            // Handle Notes
            if (guest.rsvpData.notes) {
                document.getElementById('overview-notes-group').style.display = 'block';
                document.getElementById('overview-notes').innerText = guest.rsvpData.notes;
            } else {
                document.getElementById('overview-notes-group').style.display = 'none';
            }

        } else {
            // Show Normal Form
            showRsvpForm(guest);
        }
    }

    // Helper function to build the form
    function showRsvpForm(guest) {
        document.getElementById('dynamic-rsvp-form').classList.remove('hidden');
        document.getElementById('welcome-message').innerText = `Hello, ${guest.name}!`;
        document.getElementById('seats-info').innerText = `We have reserved ${guest.seats} seats in your honor.`;

        const companionContainer = document.getElementById('companion-inputs');
        companionContainer.innerHTML = '';
        
        // Find this block inside showRsvpForm() and update it:
        if (guest.seats > 1) {
            const label = document.createElement('label');
            // Added the N/A instruction and styling here
            label.innerHTML = `Please confirm the exact name(s) of the other guest(s) joining you: <span style="text-transform: none; font-size: 0.75rem; opacity: 0.7; letter-spacing: normal;">(If someone cannot make it, please note it below)</span>`;
            companionContainer.appendChild(label);

            for (let i = 1; i < guest.seats; i++) {
                const input = document.createElement('input');
                input.type = "text";
                input.name = `companion_${i}`;
                input.placeholder = `Guest ${i} Full Name`;
                input.className = "companion-field";
                input.required = true; // Makes the dynamically created field mandatory
                companionContainer.appendChild(input);
            }
        }
    }

    // EDIT BUTTON LOGIC
    document.getElementById('btn-edit-rsvp').addEventListener('click', function() {
        document.getElementById('rsvp-overview').classList.add('hidden');
        showRsvpForm(selectedGuest);
        
        // Pre-fill the attendance dropdown based on past response
        if (selectedGuest.rsvpData) {
            document.getElementById('attendance-select').value = selectedGuest.rsvpData.attending;
            // Trigger the change event to hide/show companion section if "No"
            document.getElementById('attendance-select').dispatchEvent(new Event('change'));
        }
    });

    // 4. Attendance Toggle (Hide/Show Companion Section)
    const attendanceSelect = document.getElementById('attendance-select');
    const companionSection = document.getElementById('companion-section');

    attendanceSelect.addEventListener('change', function() {
        // Find all inputs and textareas inside the companion section
        const sectionFields = companionSection.querySelectorAll('input, textarea');

        if (this.value === 'no') {
            companionSection.classList.add('hidden');
            // Remove 'required' so the form can still submit when hidden
            sectionFields.forEach(field => field.required = false);
        } else {
            companionSection.classList.remove('hidden');
            // Add 'required' back if they change their mind to "Yes"
            sectionFields.forEach(field => field.required = true);
        }
    });

    // 5. Final Submission
    document.getElementById('dynamic-rsvp-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerText; // Remembers "Confirm RSVP"
        
        // Trigger the loading state
        btn.innerText = "SAVING...";
        btn.classList.add('loading');

        const formData = new FormData(this);
        formData.append('mainName', selectedGuest.name);

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(() => {
                // Remove loading state on success
                btn.innerText = originalText;
                btn.classList.remove('loading');
                
                document.getElementById('dynamic-rsvp-form').classList.add('hidden');
                document.getElementById('rsvp-success').classList.remove('hidden');
                window.scrollTo({ top: document.getElementById('rsvp').offsetTop - 50, behavior: 'smooth' });
            })
            .catch(error => {
                // Reset button if there's a network error
                console.error('Error!', error.message);
                btn.innerText = originalText;
                btn.classList.remove('loading');
                alert("Something went wrong. Please check your connection and try again.");
            });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // 1. Create a single, universal scroll observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once it has faded in
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); // Triggers when 10% of the section is on screen

    // 2. Find EVERY element on the site with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    // 3. Tell the observer to watch all of them
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

});

// --- FAQ ACCORDION LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;

            // Toggle the 'active' class
            accordionItem.classList.toggle('active');

            // Handle the smooth slide down/up
            if (accordionItem.classList.contains('active')) {
                // Open it: set max-height to its actual inner scroll height plus padding
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 25 + "px";
            } else {
                // Close it
                accordionContent.style.maxHeight = 0;
            }

            // OPTIONAL: Close all other open accordions when you click a new one
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherItem = otherHeader.parentElement;
                    const otherContent = otherHeader.nextElementSibling;
                    
                    otherItem.classList.remove('active');
                    otherContent.style.maxHeight = 0;
                }
            });
        });
    });
});

// --- RANDOMIZED FILMSTRIP LOGIC ---

// 1. Automatically Generate the Master Pool of Photos
const photoPool = [];
const totalPhotos = 62; // Just change this number if you add or remove photos later!

for (let i = 1; i <= totalPhotos; i++) {
    // This automatically creates links like "images/1.jpg", "images/2.jpg", etc.
    // Change "images/" to whatever folder your photos are actually in.
    photoPool.push(`images/Gallery/${i}.jpg`); 
}
// 2. The Shuffle Function
function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 3. Build and Inject the Seamless Loop
document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('dynamic-filmstrip');
  const swipeHint = document.querySelector('.swipe-hint');
  const mobileTapMedia = window.matchMedia('(max-width: 768px), (hover: none), (pointer: coarse)');

  function updateFilmstripInteractionMode() {
    if (!track) return;

    // Reset paused state when switching modes to avoid getting stuck.
    track.classList.remove('is-paused');

    if (swipeHint) {
      swipeHint.textContent = mobileTapMedia.matches ? 'Tap to pause' : 'Hover to pause';
    }
  }

  updateFilmstripInteractionMode();

  if (typeof mobileTapMedia.addEventListener === 'function') {
    mobileTapMedia.addEventListener('change', updateFilmstripInteractionMode);
  } else if (typeof mobileTapMedia.addListener === 'function') {
    mobileTapMedia.addListener(updateFilmstripInteractionMode);
  }
    
    if (track) {
        // Shuffle the pool and select exactly 15 photos to keep the site fast
        const allRandomPhotos = shuffleArray(photoPool);
        const selectedPhotos = allRandomPhotos.slice(0, 15); 

        const group1 = document.createElement('div');
        group1.className = 'filmstrip-slide';
        
        const group2 = document.createElement('div');
        group2.className = 'filmstrip-slide';

        // Loop through the 15 photos and build the two identical groups
        selectedPhotos.forEach(src => {
            // Group 1 Image
            const img1 = document.createElement('img');
            img1.className = 'film-frame';
            img1.src = src;
            img1.loading = "lazy"; // Prevents loading until scrolled into view
            img1.alt = "Prenup Gallery";
            group1.appendChild(img1);

            // Group 2 Image (Exact Clone for the Loop)
            const img2 = document.createElement('img');
            img2.className = 'film-frame';
            img2.src = src;
            img2.loading = "lazy";
            img2.alt = "Prenup Gallery";
            group2.appendChild(img2);
        });

        // Inject the groups into the webpage
        track.appendChild(group1);
        track.appendChild(group2);

        // Mobile-only toggle: tap once to pause, tap again to play.
        track.addEventListener('click', function() {
          if (!mobileTapMedia.matches) return;

          track.classList.toggle('is-paused');

          if (swipeHint) {
            swipeHint.textContent = track.classList.contains('is-paused') ? 'Tap to play' : 'Tap to pause';
          }
        });
    }
});

// --- AUDIO PLAYER LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");

    // Optional: Lower the volume slightly so it's background ambiance, not overpowering
  if (music) {
    music.volume = 0.01;
  }

    if (musicBtn) {
        musicBtn.addEventListener("click", function() {
      if (musicIsPlaying) {
        stopMusic();
            } else {
        startMusic();
            }
        });
    }
});
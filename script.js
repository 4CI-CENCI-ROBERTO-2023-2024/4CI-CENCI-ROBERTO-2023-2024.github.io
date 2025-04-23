document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. MENU MOBILE
    // ======================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  
    // ======================
    // 2. SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // ======================
    // 3. HEADER SCROLL EFFECT
    // ======================
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      header.classList.toggle('scrolled', window.scrollY > 50);
      
      // Back to top button
      const backToTop = document.getElementById('back-to-top');
      backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
  
    // ======================
    // 4. BACK TO TOP BUTTON
    // ======================
    document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // ======================
    // 5. RADIATION SIMULATOR (REALISTIC VALUES)
    // ======================
    const radiationLevels = {
      natural: 0.1,          // Natural background
      pripyat1986: 250,      // Pripyat central square (April 26, 1986)
      reactorRoof: 12000,    // Reactor roof (max)
      redForest: 15000,      // Red Forest (max)
      todayReactor: 300,     // Near sarcophagus today
      exclusionZone: 5       // Current exclusion zone avg
    };
  
    const radiationValue = document.getElementById('radiation-value');
    let currentRadiation = 0;
    let phase = 'surge'; // 'surge' or 'monitor'
  
    function simulateRadiation() {
      // Phase 1: Radiation surge (1986 incident)
      if (phase === 'surge') {
        currentRadiation += Math.floor(Math.random() * 400) + 100;
        
        // Cap at reactor roof level
        if (currentRadiation >= radiationLevels.reactorRoof) {
          currentRadiation = radiationLevels.reactorRoof;
          phase = 'monitor';
        }
        
        updateRadiationDisplay();
        setTimeout(simulateRadiation, 80);
      } 
      // Phase 2: Monitoring mode (fluctuations)
      else {
        // Random fluctuations ±15%
        const fluctuation = Math.floor(radiationLevels.reactorRoof * 0.15 * (Math.random() > 0.5 ? 1 : -1));
        currentRadiation = radiationLevels.reactorRoof + fluctuation;
        
        updateRadiationDisplay();
        setTimeout(simulateRadiation, 2000);
      }
    }
  
    function updateRadiationDisplay() {
      radiationValue.textContent = Math.abs(currentRadiation).toLocaleString();
      
      // Visual feedback based on radiation level
      if (currentRadiation > 10000) {
        radiationValue.style.color = "#ff0000";
        radiationValue.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.8)";
      } else if (currentRadiation > 5000) {
        radiationValue.style.color = "#ff4500";
        radiationValue.style.textShadow = "0 0 6px rgba(255, 69, 0, 0.6)";
      } else if (currentRadiation > 1000) {
        radiationValue.style.color = "#ff8c00";
      }
    }
  
    // Start simulation after 1 second
    setTimeout(simulateRadiation, 1000);
  
    // ======================
    // 6. REACTOR DIAGRAM INTERACTION
    // ======================
    const diagramOverlay = document.getElementById('diagram-overlay');
    const reactorDiagram = document.querySelector('.reactor-diagram');
  
    if (reactorDiagram) {
      reactorDiagram.addEventListener('mousemove', (e) => {
        const rect = reactorDiagram.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        diagramOverlay.style.background = `
          radial-gradient(circle at ${x}px ${y}px, 
          rgba(231, 76, 60, 0.4) 0%, 
          transparent 70%)
        `;
      });
  
      reactorDiagram.addEventListener('mouseleave', () => {
        diagramOverlay.style.opacity = '0';
      });
    }
  
    // ======================
    // 7. GALLERY LOAD MORE
    // ======================
    const loadMoreBtn = document.getElementById('load-more');
    const galleryContainer = document.querySelector('.gallery-container');
  
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        // Simulated additional images
        const newImages = [
          {
            src: "https://i.imgur.com/5zYjXbW.jpg",
            caption: "Sala di controllo abbandonata"
          },
          {
            src: "https://i.imgur.com/8GtT7nF.jpg",
            caption: "Ruota panoramica di Pripyat"
          },
          {
            src: "https://i.imgur.com/3qNmR0x.jpg",
            caption: "Nuovo sarcofago (NSC)"
          },
          {
            src: "https://i.imgur.com/v2X9ZcY.jpg",
            caption: "Edifici abbandonati"
          }
        ];
  
        newImages.forEach(img => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
          
          galleryItem.innerHTML = `
            <img src="${img.src}" alt="${img.caption}">
            <div class="gallery-caption">${img.caption}</div>
          `;
          
          galleryContainer.appendChild(galleryItem);
        });
  
        loadMoreBtn.style.display = 'none';
      });
    }
  
    // ======================
    // 8. NEWSLETTER FORM
    // ======================
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.getElementById('form-message');
  
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        formMessage.textContent = 'Grazie per esserti iscritto! Riceverai aggiornamenti su Chernobyl.';
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        formMessage.style.color = '#2ecc71';
        
        newsletterForm.reset();
        
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }
  
    // ======================
    // 9. ACTIVE NAV LINK ON SCROLL
    // ======================
    const sections = document.querySelectorAll('section');
  
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        const anchor = link.querySelector('a');
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
      });
    });
  
    // ======================
    // 10. ANIMATIONS ON SCROLL
    // ======================
    function animateOnScroll() {
      const elements = document.querySelectorAll('.consequence-card, .gallery-item, .timeline-item');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
  
    // Initialize elements as hidden
    document.querySelectorAll('.consequence-card, .gallery-item, .timeline-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s, transform 0.5s';
    });
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  
    // ======================
    // BONUS: RADIATION UNIT CONVERTER
    // ======================
    function addRadiationConverter() {
      const radiationContainer = document.querySelector('.radiation-counter');
      
      if (radiationContainer) {
        const converterHTML = `
          <div class="converter">
            <select id="unit-select">
              <option value="μSv">μSv/h</option>
              <option value="mSv">mSv/h</option>
              <option value="Sv">Sv/h</option>
              <option value="rem">rem/h</option>
            </select>
          </div>
        `;
        
        radiationContainer.insertAdjacentHTML('beforeend', converterHTML);
        
        const unitSelect = document.getElementById('unit-select');
        unitSelect.addEventListener('change', (e) => {
          const unit = e.target.value;
          let convertedValue = currentRadiation;
          
          switch(unit) {
            case 'mSv': convertedValue = currentRadiation / 1000; break;
            case 'Sv': convertedValue = currentRadiation / 1000000; break;
            case 'rem': convertedValue = currentRadiation * 0.0001; break;
          }
          
          document.querySelector('.unit').textContent = unit;
          radiationValue.textContent = convertedValue.toFixed(unit === 'μSv' ? 0 : 2);
        });
      }
    }
  
    // Uncomment to enable unit conversion
    // addRadiationConverter();
  });

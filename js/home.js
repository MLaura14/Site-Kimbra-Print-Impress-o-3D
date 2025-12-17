 let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
      });
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function goToSlide(index) {
      showSlide(index);
    }

    setInterval(nextSlide, 2000);

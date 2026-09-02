window.addEventListener('scroll', function () {
    const nav = document.getElementById('mainNav');
    // Se o scroll passar de 300px (aproximadamente o fim do título do hero), mostra a navbar
    if (window.scrollY > 300) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
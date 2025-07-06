document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('volver-arriba');

    function scrollFunction() {
        if (window.scrollY > 200) { 
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    window.onscroll = function() {
        scrollFunction();
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollFunction();
});
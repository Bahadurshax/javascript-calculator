const theme_toggles = document.querySelectorAll('[name="theme"]');

theme_toggles.forEach(btn => {
    if (btn.checked) {
        document.body.className = btn.value;
    }

    btn.addEventListener('click', e => {
        document.body.className = e.target.value;
    })
})
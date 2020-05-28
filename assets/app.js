var shortcodes = document.querySelectorAll('.cov-container');
shortcodes.forEach( shortcode => {
    //console.log(shortcode.id);

    new Vue({
        el: '#'+shortcode.id
    });

})
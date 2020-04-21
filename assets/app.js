var host = 'coronavirus-monitor.p.rapidapi.com';
var key = 'cfd416e672msh1d31722e56ea3c4p1e4ffejsn11819d2d30f2';
var shortcodes = document.querySelectorAll('.cov-container');
shortcodes.forEach( shortcode => {

    new Vue({
        el: '#'+shortcode.id
    });

})
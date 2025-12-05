// Lưu gclid từ URL parameter vào sessionStorage
(function() {
    'use strict';
    
    // Hàm lấy parameter từ URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // Lấy gclid từ URL
    var gclid = getUrlParameter('gclid');
    
    // Nếu có gclid trong URL, lưu vào sessionStorage
    if (gclid) {
        try {
            sessionStorage.setItem('gclid', gclid);
            console.log('gclid saved to session:', gclid);
        } catch (e) {
            console.error('Error saving gclid to sessionStorage:', e);
        }
    }
    
    // Hàm để lấy gclid từ sessionStorage (có thể dùng ở nơi khác)
    window.getGclid = function() {
        try {
            return sessionStorage.getItem('gclid') || '';
        } catch (e) {
            console.error('Error reading gclid from sessionStorage:', e);
            return '';
        }
    };
})();


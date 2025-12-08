// Lưu gclid từ URL parameter vào localStorage
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
    
    // Nếu có gclid trong URL, lưu vào localStorage
    if (gclid) {
        try {
            localStorage.setItem('gclid', gclid);
        } catch (e) {
            // Silent fail
        }
    }
    
    // Hàm để lấy gclid từ localStorage (có thể dùng ở nơi khác)
    window.getGclid = function() {
        try {
            return localStorage.getItem('gclid') || '';
        } catch (e) {
            return '';
        }
    };
    
    // Hàm để lưu email vào localStorage
    window.setEmail = function(email) {
        try {
            // Lưu ngay cả khi email rỗng (để xóa khi người dùng xóa hết)
            localStorage.setItem('email', email || '');
        } catch (e) {
            // Silent fail
        }
    };
    
    // Hàm để lấy email từ localStorage
    window.getEmail = function() {
        try {
            return localStorage.getItem('email') || '';
        } catch (e) {
            return '';
        }
    };
    
    // Hàm để lưu phone vào localStorage
    window.setPhone = function(phone) {
        try {
            // Lưu ngay cả khi phone rỗng (để xóa khi người dùng xóa hết)
            localStorage.setItem('phone', phone || '');
        } catch (e) {
            // Silent fail
        }
    };
    
    // Hàm để lấy phone từ localStorage
    window.getPhone = function() {
        try {
            return localStorage.getItem('phone') || '';
        } catch (e) {
            return '';
        }
    };
    
    // Hàm để lưu name vào localStorage
    window.setName = function(name) {
        try {
            // Lưu ngay cả khi name rỗng (để xóa khi người dùng xóa hết)
            localStorage.setItem('name', name || '');
        } catch (e) {
            // Silent fail
        }
    };
    
    // Hàm để lấy name từ localStorage
    window.getName = function() {
        try {
            return localStorage.getItem('name') || '';
        } catch (e) {
            return '';
        }
    };
    
    // Hàm để setup event listeners cho một input field
    function setupInputListener(selector, storageKey, setterFunc) {
        var input = document.querySelector(selector);
        if (input && !input.dataset.trackerSetup) {
            input.dataset.trackerSetup = 'true';
            input.addEventListener('input', function(e) {
                var value = e.target.value.trim();
                // Lưu ngay khi người dùng nhập, kể cả khi chỉ có 1 ký tự
                setterFunc(value);
            });
            // Lưu giá trị mặc định nếu có
            if (input.value) {
                setterFunc(input.value.trim());
            }
        }
    }
    
    // Hàm để setup event listeners cho form booking
    function setupBookingFormListeners() {
        setupInputListener('input[name="full_name"]', 'name', window.setName);
        setupInputListener('input[name="phone"]', 'phone', window.setPhone);
        setupInputListener('input[name="email"]', 'email', window.setEmail);
    }
    
    // Setup listeners khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupBookingFormListeners);
    } else {
        // DOM đã sẵn sàng
        setupBookingFormListeners();
    }
    
    // Sử dụng MutationObserver để theo dõi khi form được thêm vào DOM (cho SPA)
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function(mutations) {
            var shouldSetup = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.matches && (node.matches('form#fromBook') || node.querySelector('form#fromBook'))) {
                                shouldSetup = true;
                            }
                        }
                    });
                }
            });
            if (shouldSetup) {
                setTimeout(setupBookingFormListeners, 100);
            }
        });
        
        // Bắt đầu quan sát khi body đã sẵn sàng
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    if (document.body) {
                        observer.observe(document.body, {
                            childList: true,
                            subtree: true
                        });
                    }
                });
            }
        }
    }
    
    // Sử dụng event delegation để lắng nghe input events trên toàn bộ document
    // Lưu ngay khi người dùng nhập, không cần đợi submit
    document.addEventListener('input', function(e) {
        var target = e.target;
        if (target && target.tagName === 'INPUT') {
            var name = target.getAttribute('name');
            var value = target.value.trim();
            
            if (name === 'full_name') {
                // Lưu ngay khi nhập, kể cả khi chỉ có 1 ký tự
                window.setName(value);
            } else if (name === 'phone') {
                // Lưu ngay khi nhập, kể cả khi chỉ có 1 ký tự
                window.setPhone(value);
            } else if (name === 'email') {
                // Lưu ngay khi nhập, kể cả khi chỉ có 1 ký tự
                window.setEmail(value);
            }
        }
    });
    
    // Cũng thử setup lại sau một khoảng thời gian ngắn để đảm bảo form đã được render (cho SPA)
    setTimeout(setupBookingFormListeners, 500);
    setTimeout(setupBookingFormListeners, 1000);
})();


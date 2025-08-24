export const formatPrice = (price: number | undefined, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currency
    }).format(price);
};

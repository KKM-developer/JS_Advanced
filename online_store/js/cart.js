let cart = {}; //корзина

$.getJSON('goods.json', function (data) {
    let goods = data;
    //console.log(goods);
    checkCart();
    showCart();
    function showCart() {
        //визуализация корзины
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            let out = 'Корзина пуста. Добавьте товар в корзину <a href="index.html">Главная</a>';
            $('#my-cart').html(out);
        }
        else {
            let out = '';
            let summ = 0;
            for (let key in cart) {
                out += '<button class="delete" data-art="'+key+'">X</button>';
                out += '<img src="' + goods[key].image + '" width="48">';
                out += goods[key].name;
                out += '<button class="minus" data-art="'+key+'">-</button>';
                out += cart[key];
                out += '<button class="plus" data-art="'+key+'">+</button>';
                out += cart[key] * goods[key].cost;
                out += '<br>';
                summ += goods[key].cost * cart[key];
            }
            out += '<br><p>Итого: </p>'+summ
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }


    }
    function plusGoods() {
        //увеличить количество товаров на 1
        let articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS();
        showCart();
    }
    function minusGoods() {
    //уменьшить количество товаров на 1
    let articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;

        }
        else {
            delete cart[articul];
        }
    saveCartToLS();
    showCart();
    }
    function deleteGoods() {
        //удалить товар из корзины
        let articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();
        showCart();        
    }
});

function checkCart() {
    //проверка товаров в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}
function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
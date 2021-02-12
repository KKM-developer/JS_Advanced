let cart = {}; //корзина
$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data) {
            out += '<div class="singleGoods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '">';
            out += '<button class="addToCard" data-art="'+key+'">Купить</button>';
            out += '</div>';
        }
        $('#goods').html(out);
        $('button.addToCard').on('click', addToCard);
    });
}

function addToCard() {
    //добавить в корзину
    let articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    showMiniCart();
}

function checkCart() {
    //проверка товаров в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}

function showMiniCart() {
    //показать содержимое корзины
    let out = '';
    for (let w in cart) {
        out += w + ' --- ' + cart[w] + '<br>';
    }
    out += '<br><a href="cart.html">Корзина</a>';
    $('#mini-cart').html(out);
}
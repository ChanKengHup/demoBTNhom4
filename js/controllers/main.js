// get product datas
import SPServices from '../services/ad-ProServices.js'

let spService = new SPServices()
var phoneList = []
let getSP = () => {
    spService.layDSSP()
    .then(result => {
        phoneList = result.data
        showSP(result.data)
    })
}
getSP()

function showSP (products){
    let content = ''
    products.map((product, index) => {
        content += `
        <div class="box">
        <div class="image">
            <img src="${product.img}" class="main-img" alt="">
            <div class="icons" onclick="addToCart('${product.name}')">
                <i class="fas fa-shopping-cart" ></i>
            </div>
        </div>
        <div class="content">
            <h3>${product.name}</h3>
            <div class="products-info">
                <p>price: ${product.price}$</p>
                <p>screen: ${product.screen}</p>
                <p>backCamera: ${product.backCamera}</p>
                <p>frontCamera: ${product.frontCamera}</p>
                <p>${product.desc}</p>
            </div>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
        </div>
    </div>
        `
    })
    document.getElementById("idProducts").innerHTML = content
    showResultCart()
}

// add product to cart

var carts = [];

function addToCart(phoneName) {
    let isNamePhone = true
    isNamePhone = carts.some(item => item.product.name === phoneName)

    if(isNamePhone) {
        carts.map(cart => {
            if(cart.product.name === phoneName) {
                cart.quanity++
            }
        })
    }
    else {
        phoneList.map(item => {
            if(item.name === phoneName) {
                var cartItems = {
                    product: item,
                    quanity : 1
                }
                carts.push(cartItems)
            }
        })
    }
    setPhoneLocal() 
    showResultCart()
}
export default carts
window.addToCart = addToCart
// show result to cart after add

function showResultCart () {
    let count = 0
    carts.map(cart => {
        count += cart.quanity
    })
    if(count === 0 || count === '') {
        document.getElementById("icons-quanity").style.display = "none"
    }
    else {
        document.getElementById("icons-quanity").style.display = "block"

    }
    document.getElementById("icons-quanity").innerHTML = count
}
export  function setPhoneLocal() {
    localStorage.setItem('Carts', JSON.stringify(carts))
}

export let idMoney = document.getElementById("idMoney")



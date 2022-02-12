import { setPhoneLocal } from "./main.js"
import { idMoney } from "./main.js"
var carts = []
function getPhoneLocal() {
    if (localStorage.getItem('Carts') != null) {
        carts = JSON.parse(localStorage.getItem('Carts'))
        renderSPCart()
    }
}
getPhoneLocal()
totalMoney()
// render products after choose at cart folder
function renderSPCart () {
    let content = ''
    
    carts.map(cart => {
        content += `
        <div class="box" id="box-${cart.product.name}">
        <i class="fas fa-times"></i>
        <img src="${cart.product.img}" alt="">
        <div class="content">
            <h3>${cart.product.name}</h3>
            <form action="">
                
                <span class="caculator-list">
                    <div class="caculator-item">
                        <div class="caculator-btn" onclick="caculatorDeincrease('${cart.product.name}')">
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <p>${cart.quanity}</p>
                        <div class="caculator-btn"  onclick="caculatorIncrease('${cart.product.name}')">
                            <i  class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </span>
            </form>
            <div id="price" class="price">$${cart.product.price * cart.quanity}</div>
        </div>
    </div>
        `
    })
    
    document.querySelector(".box-container").innerHTML = content
}
export default renderSPCart
function caculatorIncrease(namePhone) {
    carts.map(cart => {
        if(cart.product.name === namePhone) {
            cart.quanity++
        
        }
    })
    renderSPCart()
    setPhoneLocal()
    totalMoney()
}
window.caculatorIncrease = caculatorIncrease
function caculatorDeincrease(namePhone) {
    carts.map(cart => {
        if(cart.product.name === namePhone && cart.quanity > 1) {
            cart.quanity--
            
        }
    })
    renderSPCart()  
    setPhoneLocal()
    totalMoney()
}
window.caculatorDeincrease = caculatorDeincrease
// tính tổng tiền 
function totalMoney() {
    let totalMoney 
    totalMoney = carts.reduce((total, current) => {
      return (total + Number(current.product.price)*current.quanity)
    },0)
    idMoney.innerHTML = `$${totalMoney}` 
    console.log("ok");
    renderSPCart()  
    setPhoneLocal()
}

// notification when payment
document.getElementById("btnPayment").onclick = function () {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Bạn đã thanh toán thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

document.getElementById("btnPaymentDelete").onclick = function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed && carts != null) {
            carts = []

            setPhoneLocal()
            renderSPCart()
            totalMoney()
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })

}

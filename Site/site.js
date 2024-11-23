let cart = [];
let total = 0;

// إضافة منتج إلى السلة
function addToCart(productName, quantityId, price) {
  const quantity = parseInt(document.getElementById(quantityId).value);
  if (quantity > 0) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({ name: productName, quantity, price });
    }
    updateCart();
  } else {
    alert('يرجى تحديد كمية صحيحة.');
  }
}

// تحديث السلة
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} × ${item.quantity} - ${item.quantity * item.price} جنيه
      <button class="remove-btn" onclick="removeFromCart(${index})">حذف</button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.quantity * item.price;
  });

  cartTotalContainer.textContent = `الإجمالي: ${total} جنيه`;
}

// إزالة منتج من السلة
function removeFromCart(index) {
  cart.splice(index, 1); // إزالة المنتج باستخدام index
  updateCart(); // تحديث السلة بعد الحذف
}

// إتمام الطلب
// رقم هاتفك بصيغة دولية
const phoneNumber = "+201211140781";  

// إتمام الطلب
function checkout() {
  if (cart.length > 0) {
    let orderDetails = cart.map(item => `${item.name} × ${item.quantity}`).join(', ');
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `أرغب في شراء: ${orderDetails}. الإجمالي: ${total} جنيه.`
    )}`;
    window.open(whatsappLink, '_blank');
  } else {
    alert('سلة التسوق فارغة.');
  }
}


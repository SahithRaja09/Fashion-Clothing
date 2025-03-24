const cartContainer = document.getElementById('cart-items');
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
// let count = 1;
function displayCart() {
    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<div class="Empty-info">
        <p class="Empty">Your Cart is Empty</p>
        <a href="Products.html" class="willing">willing to add more products?<i class="bi bi-box-arrow-right i-right"></i></a>
        </div>`;
        return;
    }

    cartItems.forEach((item, index) => {
        item.count = item.count || 1;
        item.Originalprice=  item.Originalprice||item.price;
        item.price= item.count*item.Originalprice;
        let cartItem = document.createElement("div");
        cartItem.className = "Card";
        cartItem.innerHTML = `
                <img src="${item.image}" alt="images">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
                <span class="price">$${item.price}</span>
                             <div class="Progress">
                    <button class="inc" data="${index}">+</button>
                     <span class="Prog-count">${item.count}</span>
                    <button class="remove-item" data-index="${index}">-</button>
                </div>
            `;
        cartContainer.appendChild(cartItem);
        // Additem();
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
    document.querySelectorAll('.inc').forEach(button => {
        button.addEventListener('click', Additem);
    });
    document.querySelectorAll('.Prog-count').forEach(span=>{
        span.addEventListener('click',Pricing);
    })
}

function removeItem(event) {
    const index = event.target.getAttribute("data-index");
    //     for(let i=0;i<index.length;i++)
    //   {
    const item = cartItems[index];
    
    // count++;
    if(item.count>1)
  {
    item.count=item.count-1;
    item.price= item.count*item.Originalprice;
  }
    else
    {
    cartItems = cartItems.filter((val, indx) => indx != index)
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();
    console.log(cartItems);

    //   }
}
function Additem(event) {
    // const index= event.target.getAttribute("data");
    const index=parseInt(event.target.getAttribute("data"));
    const item = cartItems[index];
    if(item)
{
    item.count=(item.count || 0)+1;
    item.price= item.count*item.Originalprice;
}
    else
    cartItems[index]={...item,count:1};
    // item.count=1;
    // cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();        
    console.log(cartItems);
}

function Pricing(event)
{
 
}
displayCart();


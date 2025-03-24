document.addEventListener("DOMContentLoaded", () => {
    const Container = document.querySelector('.Container');
    let data = null;
    let filterdata = null;
    const nav = document.querySelector('.Nav');
    const Cart = document.getElementById('Cart');
    const cartItems = [];
     const viewCartButton = document.getElementById("view-cart");

     const search= document.getElementById('search');
    async function Apis() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            data = await response.json();
            filterdata = data;
            console.log(data);
            Apicall();
            Categories();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function Apicall() {
        Container.innerHTML = "";

        if (filterdata && filterdata.length > 0) {
            filterdata.forEach(api => {
                let Card = document.createElement("div");
                Card.className = "Card";
                Card.innerHTML = `
                    <img src="${api.image}" alt="images">
                    <h3 class="titles">${api.title}</h3>
                    <p class="categories">${api.category}</p>
                    <button class="add-to-cart" type="button">Add to Cart</button>`;

                Container.appendChild(Card);

                const addToCartButton = Card.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => addToCart(api));
            });
        } else {
            Container.innerHTML = "<p>No Products Found.</p>"; 
        }
    
    }

    // function addToCart(product) {
    //     cartItems.push(product);
    //     console.log("Cart Items:", cartItems);
    //     updateCartUI();
    // }

viewCartButton.addEventListener("click", () => {
    window.location.href = "Cart.html";
});

    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const existingitems= cartItems.find(item=>item.id=== product.id);
        if(existingitems)
            existingitems.count+=1;
        else
        {
            product.count=1;
            cartItems.push(product);
        }
       
        localStorage.setItem("cart", JSON.stringify(cartItems));
    
        console.log("Cart Updated:", cartItems);
    }
    

    // function updateCartUI() {
    //     if (!Cart) {
    //         console.error("Cart container not found!");
    //         return;
    //     }

    //     Cart.innerHTML = "<h3>Cart Items:</h3>"; 
    //     cartItems.forEach(item => {
    //         let cartItem = document.createElement("div");
    //         cartItem.className = "Card";
    //         cartItem.innerHTML = `
    //             <img src="${item.image}" alt="images">
    //             <h3>${item.title}</h3>
    //             <p>${item.category}</p>
                // <div class="Progress">
                //     <button class="inc">+</button>
                //     <button class="dec">-</button>
                // </div>`;

    //         Cart.appendChild(cartItem);
    //     });
    // }

    function Categories() {
        const catarray = [
            { name: "Mens", value: "men's clothing" },
            { name: "Womens", value: "women's clothing" },
            { name: "Electronics", value: "electronics" },
            { name: "Jewelry", value: "jewelery" }
        ];

        const filterContainer = document.createElement("div");
        filterContainer.className = "Filters";

        catarray.forEach(cat => {
            const label = document.createElement('label');
            label.textContent = cat.name;

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.value = cat.value;
            checkbox.classList.add("filter-checkbox");

            label.prepend(checkbox);
            filterContainer.appendChild(label);
            checkbox.addEventListener('change', Filtering);
        });

        nav.appendChild(filterContainer);
    }

    function Filtering() {
        const checkedCategories = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
            .map(cb => cb.value);

        console.log("Selected Categories:", checkedCategories);

        filterdata = checkedCategories.length > 0
            ? data.filter(item => checkedCategories.includes(item.category))
            : data;

        Apicall();
    }

    function Search()
    {
        search.addEventListener('click',e=>{
            let searcheditem=e.target.value.toLowerCase();
            console.log(searcheditem);
            let searchcategories=document.querySelectorAll('.category')
            searchcategories.forEach(searchcategorie=>
            {
                if(searchcategorie.textContent.toLowerCase().includes(searcheditem))
                    searchcategorie.style.block='block';
                else
                searchcategorie.style.block='none';
            }
            )
        });
    }

    Apis();
});

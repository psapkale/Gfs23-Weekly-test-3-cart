const productsList = document.getElementsByClassName("products__list")[0];
const cartList = document.getElementsByClassName("cart__list")[0];
const emptyTag = document.getElementsByClassName("empty__tag")[0];
const totalCost = document.getElementsByClassName("total__cost")[0];

const Products = [
   { id: 1, name: "Product-1", price: 100, quantity: 0 },
   { id: 2, name: "Product-2", price: 200, quantity: 0 },
   { id: 3, name: "Product-3", price: 300, quantity: 0 },
];

function renderProducts() {
   productsList.innerHTML = "";

   Products.forEach((product) => {
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const span = document.createElement("span");
      const actionsDiv = document.createElement("div");
      const decBtn = document.createElement("button");
      const addBtn = document.createElement("button");
      const quan = document.createElement("span");

      div.id = product.id;
      div.classList.add("products");
      h3.innerText = product.name;
      span.innerText = product.price;
      actionsDiv.classList.add("actions");
      decBtn.innerText = "-";
      decBtn.addEventListener("click", () => handleDecrement(product.id));
      quan.innerText = product.quantity;
      addBtn.innerText = "+";
      addBtn.addEventListener("click", () => handleIncrement(product.id));

      div.appendChild(h3);
      div.appendChild(span);
      actionsDiv.appendChild(decBtn);
      actionsDiv.appendChild(quan);
      actionsDiv.appendChild(addBtn);
      div.appendChild(actionsDiv);

      productsList.appendChild(div);
   });
}

function renderCart() {
   cartList.innerHTML = "";

   if (!isCartEmpty()) {
      emptyTag.style.display = "none";
      let t = 0;
      Products.forEach((product) => {
         if (product.quantity <= 0) return;

         t += product.quantity * product.price;

         const div = document.createElement("div");
         const h3 = document.createElement("h3");
         const span = document.createElement("span");

         div.classList.add("cart__item");
         h3.innerText = product.name;
         span.innerText = `${product.quantity} x ${product.price}`;

         div.appendChild(h3);
         div.appendChild(span);
         cartList.appendChild(div);
      });

      totalCost.innerText = t;
   } else {
      emptyTag.style.display = "block";
   }
}

function isCartEmpty() {
   let isEmpty = true;

   Products.forEach((product) => {
      if (product.quantity > 0) {
         isEmpty = false;
      }
   });

   return isEmpty;
}

function handleDecrement(id) {
   const product = Products.find((p) => p.id === id);

   if (!product) {
      alert("Product not found");
      return;
   }

   if (product.quantity === 0) {
      renderCart();
      return;
   }

   product.quantity--;
   renderProducts();
   renderCart();
}

function handleIncrement(id) {
   const product = Products.find((p) => p.id === id);

   if (!product) {
      alert("Product not found");
      return;
   }

   product.quantity = product.quantity + 1;
   renderProducts();
   renderCart();
}

renderProducts();
renderCart();

const fetchProducts = async () => {
  try {
    const res = await fetch("../products.json");
    const products = await res.json();
    loadProducts(products);
  } catch (error) {
    console.log(error);
  }
};

function loadProducts(products) {
  var output = "";

  for (let i = 0; i < products.length; i++) {
    output += `
            <div class="product">
                <img src="${products[i].imgUrl}">
                <div class="productInfo">
                    <div class="productTitle">
                        <span class="productModel">${products[i].Model}</span>
                        <span class="productBrand">${products[i].Brand}</span>
                    </div>
                    <span class="productSex">${products[i].Sex}</span>
                    <div class="productColors">
                        <span class="productColorTitle">Colores:</span>`;
    for (let s = 0; s < products[i].Color.length; s++) {
      output += `<span class="productThing">${products[i].Color[s]}</span>`;
    }
    output += `</div>
                    <div class="productSizes">
                        <span class="productThingTitle">Talles:</span>`;
    for (let c = 0; c < products[i].Size.length; c++) {
      output += `<span class="productThing">${products[i].Size[c]}</span>`;
    }
    output += `</div>
                    </div>
                    <span class="productPrice">$${products[i].price}</span>
                    <button onclick="addCart(${products[i].Id})"><span><i class="fa-solid fa-cart-plus"></i> Agregar al carrito</span></button>
                </div>
            </div>
        `;
  }

  document.getElementById("productContainer").innerHTML = output;
}

function addCart(id) {
  var cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  var product = cartProducts.find(function (product) {
    return product.Id === id;
  });

  if (product) {
    product.Quantity++;
  } else {
    cartProducts.push({
      Id: id,
      Quantity: 1,
    });
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  location.reload();
}

window.onload = function () {
  fetchProducts();
};

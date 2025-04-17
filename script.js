// Submit event for form
document.getElementById("makeupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const type = document.getElementById("productType").value.trim().toLowerCase();
  const url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=${type}`;

  // Fetch data from API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById("results");
      results.innerHTML = "";

      // Check if no products found
      if (data.length === 0) {
        results.innerHTML = "<p>No products found for this type.</p>";
        return;
      }

      // Loop through and display first 10 products
      data.slice(0, 10).forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image_link}" alt="${product.name}">
          <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
          <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
          <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
          <p>${product.description ? product.description.substring(0, 100) + "..." : "No description"}</p>
        `;

        results.appendChild(card);
      });
    })
    .catch(error => {
      document.getElementById("results").innerHTML = "<p>Error fetching products. Please try again later.</p>";
      console.error("Fetch error:", error);
    });
});

// Click event for clear button
document.getElementById("clearBtn").addEventListener("click", function() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("productType").value = "";
});

// Keyup event to track typing
document.getElementById("productType").addEventListener("keyup", function () {
  console.log("Typing:", this.value);
});

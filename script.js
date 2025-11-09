const products = [
  {
    name: "Quantum Computing System",
    category: "tech",
    desc: "Learn how quantum technology is transforming finance and trading.",
    link: "YOUR_DIGISTORE_LINK_1"
  },
  {
    name: "AI Freedom Accelerator",
    category: "tech",
    desc: "Build automated income streams using AI tools and strategies.",
    link: "YOUR_DIGISTORE_LINK_2"
  },
  {
    name: "Total Body Reset",
    category: "health",
    desc: "A 12-week wellness system to boost energy and focus naturally.",
    link: "YOUR_DIGISTORE_LINK_3"
  },
  {
    name: "Smart Fashion Bundle",
    category: "clothes",
    desc: "Discover AI-powered fashion trends and affiliate clothing stores.",
    link: "YOUR_DIGISTORE_LINK_4"
  },
  {
    name: "Plant-Based Chef Guide",
    category: "food",
    desc: "Healthy recipes and food prep ideas for modern lifestyles.",
    link: "YOUR_DIGISTORE_LINK_5"
  },
  {
    name: "Fiction Mastery Blueprint",
    category: "fiction",
    desc: "Learn to write captivating stories that sell online.",
    link: "YOUR_DIGISTORE_LINK_6"
  }
];

// Initial Load
window.onload = () => {
  displayProducts(products);
};

// Display Function
function displayProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  list.forEach((p) => {
    const card = `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="${p.link}" target="_blank">View Product</a>
      </div>
    `;
    grid.innerHTML += card;
  });
}

// Filter by Category
function filterProducts(category) {
  const filtered = products.filter((p) => p.category === category);
  displayProducts(filtered);
  window.scrollTo({ top: document.getElementById("products").offsetTop, behavior: "smooth" });
}

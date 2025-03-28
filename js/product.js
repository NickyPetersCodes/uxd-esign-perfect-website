// Product data - in a real application, this would come from a database
const products = {
  // Apparel products
  apparel1: {
    id: "apparel1",
    title: "System of a Down Goldhand Shirt",
    price: "$19.99",
    image: "images/apparel1.png",
    description:
      "This premium quality System of a Down Goldhand Shirt features the iconic gold hand design on a comfortable 100% cotton fabric. Perfect for concerts or casual wear, this shirt is a must-have for any true SOAD fan.",
    category: "apparel",
    hasSizes: true,
  },
  apparel2: {
    id: "apparel2",
    title: "System of a Down Hoodie",
    price: "$24.99",
    image: "images/apparel2.png",
    description:
      "Stay warm and show your love for System of a Down with this comfortable hoodie. Made from high-quality cotton blend material for maximum comfort and durability, this hoodie features the band's logo on the front and is perfect for cooler weather.",
    category: "apparel",
    hasSizes: true,
  },
  apparel3: {
    id: "apparel3",
    title: "System of a Down Hoodie Pink",
    price: "$29.99",
    image: "images/apparel3.png",
    description:
      "This eye-catching pink System of a Down hoodie is a unique addition to any fan's collection. Made from premium materials with a comfortable fit, this hoodie features the band's logo in a striking contrast against the pink background.",
    category: "apparel",
    hasSizes: true,
  },
  apparel4: {
    id: "apparel4",
    title: "System of a Down Holographic Shirt",
    price: "$34.99",
    image: "images/apparel4.png",
    description:
      "This unique System of a Down holographic shirt features a special print that changes appearance as it catches the light. The distressed print gives it an authentic worn-in look that pairs perfectly with jeans or shorts.",
    category: "apparel",
    hasSizes: true,
  },
  apparel5: {
    id: "apparel5",
    title: "System of a Down Longsleeve",
    price: "$39.99",
    image: "images/apparel5.png",
    description:
      "Our premium System of a Down longsleeve shirt features a unique design created exclusively for the latest world tour. Made from heavyweight cotton with reinforced stitching, this shirt is built to last through countless shows and provides extra warmth for cooler days.",
    category: "apparel",
    hasSizes: true,
  },

  // Music products - Updated all prices to $19.99
  music1: {
    id: "music1",
    title: "Toxicity",
    price: "$19.99",
    image: "images/toxicity.jpg",
    description:
      "Released in 2001, Toxicity is System of a Down's second studio album and their most commercially successful release. Featuring hit singles 'Chop Suey!', 'Toxicity', and 'Aerials', this album went on to be certified multi-platinum and is considered a nu metal classic.",
    category: "music",
    hasSizes: false,
  },
  music2: {
    id: "music2",
    title: "Mezmerize",
    price: "$19.99",
    image: "images/mezmerize.jpg",
    description:
      "Mezmerize is the first half of the Mezmerize/Hypnotize double album released in 2005. It features the singles 'B.Y.O.B.' and 'Question!' and showcases the band's unique blend of alternative metal, hard rock, and progressive elements.",
    category: "music",
    hasSizes: false,
  },
  music3: {
    id: "music3",
    title: "Hypnotize",
    price: "$19.99",
    image: "images/hypnotize.jpg",
    description:
      "Released six months after Mezmerize, Hypnotize completes the double album concept. With tracks like 'Hypnotize' and 'Lonely Day', this album continues the political and social themes while maintaining the band's signature sound.",
    category: "music",
    hasSizes: false,
  },
  music4: {
    id: "music4",
    title: "Steal This Album",
    price: "$19.99",
    image: "images/StealThisAlbum.jpg",
    description:
      "Steal This Album! was released in 2002 as a collection of previously unreleased tracks, many of which were early versions of songs that had leaked online. The album showcases the band's raw energy and experimental approach to songwriting.",
    category: "music",
    hasSizes: false,
  },
  music5: {
    id: "music5",
    title: "System of a Down",
    price: "$19.99",
    image: "images/SystemofaDown.jpg",
    description:
      "System of a Down's self-titled debut album was released in 1998 and introduced the world to their unique sound. Featuring tracks like 'Sugar' and 'Spiders', this album laid the groundwork for their future success.",
    category: "music",
    hasSizes: false,
  },
  music6: {
    id: "music6",
    title: "Protect the Land",
    price: "$19.99",
    image: "images/PTL.jpg",
    description:
      "Released in 2020, 'Protect The Land' is one of two singles released by System of a Down after a 15-year hiatus from recording new music. The song was released to raise awareness and funds for Armenia and Artsakh during the 2020 Nagorno-Karabakh war.",
    category: "music",
    hasSizes: false,
  },

  // Accessories products
  acc1: {
    id: "acc1",
    title: "System of a Down Beanie",
    price: "$19.99",
    image: "images/accessory1.png",
    description:
      "This high-quality System of a Down beanie features the band's iconic logo embroidered on a warm, comfortable knit hat. Perfect for keeping your head warm while showing your love for SOAD.",
    category: "accessories",
    hasSizes: false,
  },
  acc2: {
    id: "acc2",
    title: "System of a Down Hat",
    price: "$24.99",
    image: "images/accessory2.png",
    description:
      "This premium System of a Down hat features the band's logo embroidered on a high-quality adjustable cap. Perfect for sunny days or just showing your SOAD pride.",
    category: "accessories",
    hasSizes: false,
  },
  acc3: {
    id: "acc3",
    title: "System of a Down Necklace",
    price: "$29.99",
    image: "images/accessory3.png",
    description:
      "This collectible System of a Down necklace features the band's iconic symbol in durable metal. Perfect for fans who want to wear their SOAD pride close to their heart.",
    category: "accessories",
    hasSizes: false,
  },
}

// Get product ID from URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("id")
}

// Load product details
function loadProductDetails() {
  const productId = getProductIdFromUrl()

  if (!productId || !products[productId]) {
    // Handle invalid product ID
    document.getElementById("productTitle").textContent = "Product Not Found"
    document.getElementById("productDescription").textContent = "The requested product could not be found."
    document.getElementById("addToCartBtn").disabled = true
    return
  }

  const product = products[productId]

  // Set page title
  document.title = product.title + " - System of a Down Store"

  // Populate product details
  document.getElementById("productImage").src = product.image
  document.getElementById("productImage").alt = product.title
  document.getElementById("productTitle").textContent = product.title
  document.getElementById("productPrice").textContent = product.price
  document.getElementById("productDescription").textContent = product.description

  // Show/hide size selector and size chart for apparel
  if (product.hasSizes) {
    document.getElementById("sizeSelector").style.display = "block"
    document.getElementById("sizeChart").style.display = "block"
  } else {
    document.getElementById("sizeSelector").style.display = "none"
    document.getElementById("sizeChart").style.display = "none"
  }
}

// Handle quantity changes
function setupQuantityControls() {
  const quantityInput = document.getElementById("quantity")

  document.getElementById("decreaseQuantity").addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1
    }
  })

  document.getElementById("increaseQuantity").addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    quantityInput.value = currentValue + 1
  })

  // Ensure quantity is always at least 1
  quantityInput.addEventListener("change", function () {
    if (this.value < 1) {
      this.value = 1
    }
  })
}

// Update the setupSizeSelection function to handle ARIA attributes
function setupSizeSelection() {
  const sizeButtons = document.querySelectorAll(".size-btn")

  sizeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class and update ARIA-checked from all buttons
      sizeButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.setAttribute("aria-checked", "false")
      })

      // Add active class and update ARIA-checked to clicked button
      this.classList.add("active")
      this.setAttribute("aria-checked", "true")
    })
  })
}

// Handle add to cart
function setupAddToCart() {
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const productId = getProductIdFromUrl()

    if (!productId || !products[productId]) {
      alert("Product not found")
      return
    }

    const product = products[productId]
    const quantity = Number.parseInt(document.getElementById("quantity").value)

    // Get selected size for apparel products
    let size = null
    if (product.hasSizes) {
      const activeSize = document.querySelector(".size-btn.active")
      if (!activeSize) {
        alert("Please select a size")
        return
      }
      size = activeSize.getAttribute("data-size")
    }

    // Create cart item
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    }

    // Add size if applicable
    if (size) {
      cartItem.size = size
    }

    // Add to cart using the function from cart.js
    window.addToCart(cartItem)

    // Show confirmation
    // alert(`${product.title} has been added to your cart!`)
    // We'll use the notification system instead of an alert
  })
}

// Update the part where we set default size to Medium
document.addEventListener("DOMContentLoaded", () => {
  loadProductDetails()
  setupQuantityControls()
  setupSizeSelection()
  setupAddToCart()

  // Set default size to Medium
  const mediumSizeBtn = document.querySelector('.size-btn[data-size="M"]')
  if (mediumSizeBtn) {
    mediumSizeBtn.click()
    // This will trigger the click event which sets aria-checked
  }
})


// Cart management system
let cart = []

// Initialize cart from localStorage on page load
function initializeCart() {
  console.log("Initializing cart...")
  const savedCart = localStorage.getItem("soadCart")
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart)
      console.log("Cart loaded from localStorage:", cart)
    } catch (e) {
      console.error("Error parsing cart from localStorage:", e)
      cart = []
    }
  } else {
    console.log("No cart found in localStorage, starting with empty cart")
    cart = []
  }
  updateCartCount()
  console.log("Cart initialization complete")
}

// Add item to cart
window.addToCart = (product) => {
  console.log("Adding to cart:", product)

  if (!product || !product.id) {
    console.error("Invalid product data:", product)
    return
  }

  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(
    (item) => item.id === product.id && (product.size ? item.size === product.size : true),
  )

  if (existingProductIndex !== -1) {
    // Update quantity if product already exists
    cart[existingProductIndex].quantity += product.quantity
    console.log("Updated existing product quantity:", cart[existingProductIndex])
  } else {
    // Add new product to cart
    cart.push(product)
    console.log("Added new product to cart:", product)
  }

  // Save cart to localStorage
  saveCart()

  // Update cart count in UI
  updateCartCount()

  // Show confirmation message
  showCartNotification(product)

  // Announce to screen readers
  announceToScreenReader(`Added ${product.quantity} ${product.title} to cart`)
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("soadCart", JSON.stringify(cart))
}

// Update cart count in the header
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  console.log("Updating cart count to:", cartCount)
  const cartCountElement = document.getElementById("cartCount")
  const cartCountAnnounce = document.getElementById("cartCountAnnounce")

  if (cartCountElement) {
    if (cartCount > 0) {
      cartCountElement.textContent = cartCount
      cartCountElement.style.display = "inline-block"
      console.log("Cart badge displayed with count:", cartCount)
    } else {
      cartCountElement.style.display = "none"
      console.log("Cart badge hidden (empty cart)")
    }
  } else {
    console.error("Cart count element not found in the DOM")
  }

  // Update screen reader text
  if (cartCountAnnounce) {
    cartCountAnnounce.textContent = cartCount
  }
}

// Remove item from cart
function removeFromCart(index) {
  const removedItem = cart[index]
  cart.splice(index, 1)
  saveCart()
  updateCartCount()

  // If on cart page, update the cart display
  if (window.location.pathname.includes("cart.html")) {
    displayCart()
  }

  // Announce to screen readers
  announceToScreenReader(`Removed ${removedItem.title} from cart`)
}

// Update item quantity in cart
function updateCartItemQuantity(index, quantity) {
  if (quantity <= 0) {
    removeFromCart(index)
  } else {
    const prevQuantity = cart[index].quantity
    cart[index].quantity = quantity
    saveCart()
    updateCartCount()

    // If on cart page, update the cart display
    if (window.location.pathname.includes("cart.html")) {
      displayCart()
    }

    // Announce to screen readers
    if (quantity > prevQuantity) {
      announceToScreenReader(`Increased ${cart[index].title} quantity to ${quantity}`)
    } else if (quantity < prevQuantity) {
      announceToScreenReader(`Decreased ${cart[index].title} quantity to ${quantity}`)
    }
  }
}

// Display cart items on cart page
function displayCart() {
  const cartContainer = document.getElementById("cartItems")
  if (!cartContainer) return

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<div class="empty-cart"><div class="empty-cart-icon" aria-hidden="true">🛒</div><h3>Your cart is empty</h3><p>Looks like you haven\'t added any items to your cart yet.</p><a href="store.html" class="continue-shopping-btn">Continue Shopping</a></div>'
    document.getElementById("cartSummary").style.display = "none"
    return
  }

  let cartHTML = ""
  let subtotal = 0

  cart.forEach((item, index) => {
    const itemPrice = Number.parseFloat(item.price.replace("$", ""))
    const itemTotal = itemPrice * item.quantity
    subtotal += itemTotal

    cartHTML += `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="cart-item-details">
          <div class="cart-item-header">
            <h4>${item.title}</h4>
            <button class="remove-item" data-index="${index}" aria-label="Remove ${item.title} from cart">
              <span class="remove-icon" aria-hidden="true">×</span>
            </button>
          </div>
          <div class="cart-item-info">
            <p class="cart-item-price">Price: ${item.price}</p>
            ${item.size ? `<p class="cart-item-size">Size: ${item.size}</p>` : ""}
            ${item.details ? `<p class="cart-item-details-text">Details: ${item.details}</p>` : ""}
          </div>
          <div class="cart-item-actions">
            <div class="cart-quantity">
              <button class="quantity-btn decrease-quantity" data-index="${index}" aria-label="Decrease quantity">-</button>
              <input type="number" id="quantity-${index}" class="quantity-input item-quantity" value="${item.quantity}" min="1" data-index="${index}" aria-label="Quantity for ${item.title}">
              <button class="quantity-btn increase-quantity" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-total">
              Total: <span>$${itemTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    `
  })

  cartContainer.innerHTML = cartHTML

  // Show cart summary
  document.getElementById("cartSummary").style.display = "block"
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`

  // Calculate total
  const total = subtotal + tax
  document.getElementById("total").textContent = `$${total.toFixed(2)}`

  // Add event listeners for quantity changes and item removal
  addCartEventListeners()
}

// Add event listeners to cart items
function addCartEventListeners() {
  // Remove item buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      removeFromCart(index)
    })
  })

  // Quantity input fields
  document.querySelectorAll(".item-quantity").forEach((input) => {
    input.addEventListener("change", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      const quantity = Number.parseInt(this.value)
      updateCartItemQuantity(index, quantity)
    })
  })

  // Decrease quantity buttons
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      const input = document.getElementById(`quantity-${index}`)
      const currentValue = Number.parseInt(input.value)
      if (currentValue > 1) {
        updateCartItemQuantity(index, currentValue - 1)
      }
    })
  })

  // Increase quantity buttons
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      const input = document.getElementById(`quantity-${index}`)
      const currentValue = Number.parseInt(input.value)
      updateCartItemQuantity(index, currentValue + 1)
    })
  })
}

// Show notification when item is added to cart
function showCartNotification(product) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("cartNotification")
  if (!notification) {
    notification = document.createElement("div")
    notification.id = "cartNotification"
    notification.className = "cart-notification"
    notification.setAttribute("role", "alert")
    notification.setAttribute("aria-live", "polite")
    document.body.appendChild(notification)
  }

  // Set notification content
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon" aria-hidden="true">✓</div>
      <div class="notification-text">
        <strong>Added to Cart:</strong> ${product.title}
        <div>Quantity: ${product.quantity}</div>
        ${product.size ? `<div>Size: ${product.size}</div>` : ""}
      </div>
    </div>
    <a href="cart.html" class="notification-action">View Cart</a>
  `

  // Show notification
  notification.classList.add("show")

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Announce messages to screen readers
function announceToScreenReader(message) {
  let announcer = document.getElementById("sr-announcer")
  if (!announcer) {
    announcer = document.createElement("div")
    announcer.id = "sr-announcer"
    announcer.className = "sr-only"
    announcer.setAttribute("aria-live", "polite")
    document.body.appendChild(announcer)
  }

  // Set the message
  announcer.textContent = message

  // Clear after a short delay to ensure it can be announced again
  setTimeout(() => {
    announcer.textContent = ""
  }, 1000)
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeCart()

  // If on cart page, display cart items
  if (window.location.pathname.includes("cart.html")) {
    displayCart()
  }
})


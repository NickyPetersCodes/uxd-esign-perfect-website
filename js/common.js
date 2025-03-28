// Common JavaScript functions for all pages

// Return to Top button functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create return to top button if it doesn't exist
  if (!document.querySelector(".return-to-top")) {
    const returnButton = document.createElement("button")
    returnButton.className = "return-to-top"
    returnButton.setAttribute("aria-label", "Return to top of page")
    document.body.appendChild(returnButton)
  }

  const returnToTopBtn = document.querySelector(".return-to-top")

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      returnToTopBtn.classList.add("show")
    } else {
      returnToTopBtn.classList.remove("show")
    }
  })

  // Scroll to top when button is clicked
  returnToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})


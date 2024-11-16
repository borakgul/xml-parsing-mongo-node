function calculateIsDiscounted(price, discountedPrice) {
  // if discounted price is less than the original price, it is discounted
  return discountedPrice < price ? 1 : 0;
}

function isActive(quantity) {
  // if quantity is greater than 0, it is active
  return quantity > 0 ? 1 : 0;
}

module.exports = { calculateIsDiscounted, isActive };

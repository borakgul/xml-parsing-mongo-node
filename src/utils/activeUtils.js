// Function for checking if the quantity is active or not
function isActive(quantity) {
    return quantity > 0 ? 1 : 0;
  }
  
  //Export the function
  module.exports = { isActive };
  
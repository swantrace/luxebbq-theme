if (
  window.location.pathname.includes(
    '/products/test-product-shouldnt-delete-or-buy',
  )
) {
  init();
}

async function init() {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    // Add the item to the cart
    await addItemToCart();
  }

  // Redirect to the cart page
  window.location.href = '/cart';
}

async function getCartItems() {
  try {
    const response = await fetch('/cart.js');

    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error(error);
  }
}

async function addItemToCart() {
  let formData = {
    items: [
      {
        id: 39732995424318,
        quantity: 1,
      },
    ],
  };

  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

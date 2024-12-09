document.getElementById('add-item').addEventListener('click', () => {
    const itemInput = document.getElementById('item-input');
    const quantityInput = document.getElementById('item-quantity');
    const shoppingList = document.getElementById('shopping-list');

    const itemName = itemInput.value.trim();
    const itemQuantity = quantityInput.value;

    if (itemName && itemQuantity) {
        // Create a list item
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        // Add item name
        const itemNameEl = document.createElement('span');
        itemNameEl.classList.add('item-name');
        itemNameEl.textContent = itemName;

        // Add quantity
        const itemQuantityEl = document.createElement('span');
        itemQuantityEl.classList.add('item-quantity');
        itemQuantityEl.textContent = `x${itemQuantity}`;

        // Append to list item
        listItem.appendChild(itemNameEl);
        listItem.appendChild(itemQuantityEl);

        // Append list item to the shopping list
        shoppingList.appendChild(listItem);

        // Clear inputs
        itemInput.value = '';
        quantityInput.value = '';
    } else {
        alert('Please enter both item and quantity!');
    }
});

document.getElementById('clear-list').addEventListener('click', () => {
    document.getElementById('shopping-list').innerHTML = '';
});

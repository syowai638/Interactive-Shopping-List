   // Select DOM elements
const itemInput = document.getElementById('item-input');
const categoryInput = document.getElementById('item-category');
const quantityInput = document.getElementById('item-quantity');
const shoppingList = document.getElementById('shopping-list');

// Initialize shopping list array (from localStorage if available)
let shoppingListArray = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    shoppingList.innerHTML = '';
    shoppingListArray.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        if (item.purchased) {
            listItem.classList.add('purchased');
        }

        // Item name
        const itemNameEl = document.createElement('span');
        itemNameEl.classList.add('item-name');
        itemNameEl.textContent = item.name;
        itemNameEl.contentEditable = true;
        itemNameEl.addEventListener('blur', () => {
            item.name = itemNameEl.textContent.trim();
            updateLocalStorage();
        });

        // Item category
        const itemCategoryEl = document.createElement('span');
        itemCategoryEl.classList.add('item-category');
        itemCategoryEl.textContent = item.category;
        itemCategoryEl.contentEditable = true;
        itemCategoryEl.addEventListener('blur', () => {
            item.category = itemCategoryEl.textContent.trim();
            updateLocalStorage();
        });

        // Item quantity
        const itemQuantityEl = document.createElement('span');
        itemQuantityEl.classList.add('item-quantity');
        itemQuantityEl.textContent = `x${item.quantity}`;

        // Purchased toggle button
        const togglePurchasedBtn = document.createElement('button');
        togglePurchasedBtn.textContent = item.purchased ? 'Unmark' : 'Mark as Purchased';
        togglePurchasedBtn.classList.add('toggle-purchased');
        togglePurchasedBtn.addEventListener('click', () => {
            item.purchased = !item.purchased;
            updateLocalStorage();
            renderList();
        });

        // Append elements to the list item
        listItem.appendChild(itemNameEl);
        listItem.appendChild(itemCategoryEl);
        listItem.appendChild(itemQuantityEl);
        listItem.appendChild(togglePurchasedBtn);

        // Append the list item to the shopping list
        shoppingList.appendChild(listItem);
    });
}

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListArray));
}

// Add item to shopping list
document.getElementById('add-item').addEventListener('click', () => {
    const itemName = itemInput.value.trim();
    const itemCategory = categoryInput.value.trim();
    const itemQuantity = parseInt(quantityInput.value.trim());

    if (itemName && itemCategory && itemQuantity) {
        const newItem = {
            name: itemName,
            category: itemCategory,
            quantity: itemQuantity,
            purchased: false,
        };

        shoppingListArray.push(newItem);
        updateLocalStorage();
        renderList();

        // Clear inputs
        itemInput.value = '';
        categoryInput.value = '';
        quantityInput.value = '';
    } else {
        alert('Please enter item name, category, and quantity!');
    }
});

// Clear the shopping list
document.getElementById('clear-list').addEventListener('click', () => {
    shoppingListArray = [];
    updateLocalStorage();
    renderList();
});

// Initial render
renderList();

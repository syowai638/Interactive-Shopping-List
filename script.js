// Categories, Subcategories, and Items Data
const data = {
    "Cleaning & household": {
        "Cleaning Supplies": [
            { name: "Pride Multiliquid", quantities: ["5L", "2L", "1L", "500ml"] },
            { name: "Vim", quantities: ["1Kg", "500g"] },
            { name: "Menegai Bar", quantities: ["1Kg", "800g", "500g"] }
        ]
    },
    "Food": {
        "Food Items": [
            { name: "Rice", quantities: ["10Kg", "5Kg", "2Kg", "1Kg"] },
            { name: "Sugar", quantities: ["2Kg", "1Kg", "5Kg"] },
            { name: "Flour", quantities: ["5Kg", "2Kg", "1Kg"] }
        ]
    },
    "Beverages": {
        "Drinks": [
            { name: "Juices", quantities: ["5L", "2L", "1L"] },
            { name: "Tea", quantities: ["1Kg", "500G", "250G"] },
            { name: "Coffee", quantities: ["1Kg", "500G", "250G"] }
        ]
    }
};

// DOM Elements
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
const quantitySelect = document.getElementById('item-quantity');
const shoppingListContainer = document.getElementById('shopping-list');
const addItemButton = document.getElementById('add-item');
const clearListButton = document.getElementById('clear-list');

// Array to store shopping list items
let shoppingList = [];

// Load list from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (storedList) {
        shoppingList = storedList;
        updateShoppingListDOM();
    }
});

// Save shopping list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Update the shopping list DOM based on the array
function updateShoppingListDOM() {
    shoppingListContainer.innerHTML = ''; // Clear current DOM
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        // Add Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            shoppingList.splice(index, 1); // Remove item from array
            saveToLocalStorage(); // Save updated array
            updateShoppingListDOM(); // Sync DOM
        });

        // Add Mark Purchased Toggle
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('purchased');
        });

        // Add Editing Functionality (Double-Click to Edit)
        listItem.addEventListener('dblclick', () => {
            const oldText = item;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = oldText;

            listItem.innerHTML = '';
            listItem.appendChild(input);

            input.addEventListener('blur', () => {
                const newText = input.value.trim();
                if (newText) {
                    shoppingList[index] = newText; // Update array
                    saveToLocalStorage(); // Save updated array
                    updateShoppingListDOM(); // Sync DOM
                }
            });

            input.focus();
        });

        listItem.appendChild(deleteButton);
        shoppingListContainer.appendChild(listItem);
    });
}

// Populate Subcategories Based on Category
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    subcategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';

    if (data[selectedCategory]) {
        Object.keys(data[selectedCategory]).forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    }
    quantitySelect.innerHTML = '<option value="" disabled selected>Select Quantity</option>';
});

// Populate Items and Quantities Based on Subcategory
subcategorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    const selectedSubcategory = subcategorySelect.value;

    quantitySelect.innerHTML = '<option value="" disabled selected>Select Quantity</option>';
    const items = data[selectedCategory][selectedSubcategory];

    if (items) {
        items.forEach(item => {
            const optGroup = document.createElement('optgroup');
            optGroup.label = item.name;
            item.quantities.forEach(quantity => {
                const option = document.createElement('option');
                option.value = `${item.name} (${quantity})`;
                option.textContent = `${item.name} (${quantity})`;
                optGroup.appendChild(option);
            });
            quantitySelect.appendChild(optGroup);
        });
    }
});

// Add Item to Shopping List
addItemButton.addEventListener('click', () => {
    const selectedItem = quantitySelect.value;
    if (!selectedItem) {
        alert("Please select an item and quantity!");
        return;
    }

    // Add item to array
    shoppingList.push(selectedItem);
    saveToLocalStorage(); // Save updated array
    updateShoppingListDOM(); // Sync DOM
});

// Clear Shopping List
clearListButton.addEventListener('click', () => {
    shoppingList = []; // Clear array
    saveToLocalStorage(); // Save updated array
    updateShoppingListDOM(); // Sync DOM
});


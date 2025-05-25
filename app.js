// Villa POS System

// Define language translations
const translations = {
    en: {
        selectVilla: "Select Villa",
        newOrder: "New Order",
        drinks: "Drinks",
        services: "Services",
        gifts: "Gifts",
        custom: "Custom",
        searchItems: "Search items...",
        customItems: "Custom Items",
        itemName: "Item name",
        itemPrice: "Price in EUR",
        addItem: "Add Item",
        markAsGift: "Mark as gift",
        giftItems: "Gift Items",
        giftInfo: "Items added here will be marked as gifts and won't be charged",
        discounts: "Discounts",
        discountPercent: "%",
        discountAmount: "EUR",
        applyPercentDiscount: "Apply %",
        applyAmountDiscount: "Apply €",
        removeDiscount: "Remove Discount",
        totalItems: "Total Items",
        totalAmount: "Total Amount",
        giftValue: "Gift Value",
        discount: "Discount",
        discountValue: "Discount Value",
        finalTotal: "Final Total",
        proceedToPayment: "Proceed to Payment",
        clearOrder: "Clear Order",
        paymentMethod: "Payment Method",
        cash: "Cash",
        cashDescription: "Pay with cash",
        card: "Card",
        cardDescription: "Pay with credit/debit card",
        unpaid: "Unpaid",
        unpaidDescription: "Mark as unpaid (pay later)",
        completeOrder: "Complete Order",
        cancel: "Cancel",
        orderCompleted: "Order Completed",
        receipt: "RECEIPT",
        paidItems: "Paid Items",
        total: "Total",
        shareReceipt: "Share Receipt",
        saveAsPDF: "Save as PDF",
        newOrder: "New Order",
        orderHistory: "Order History",
        noOrders: "No orders yet",
        clearHistory: "Clear History",
        backToMain: "Back to Main",
        processing: "Processing...",
        beerKeg30: "Beer Keg 30L",
        beerKeg50: "Beer Keg 50L",
        freeItem: "Free",
        giftBeer: "Beer (Gift)",
        giftProsecco: "Prosecco (Gift)",
        giftCocktail: "Cocktail (Gift)",
        pleaseAddItems: "Please add items to your order",
        selectPaymentMethod: "Please select a payment method",
        receiptSaved: "Receipt saved as PDF",
        receiptShared: "Receipt shared successfully",
        errorSharing: "Error sharing receipt",
        sharingNotSupported: "Sharing not supported on this device",
        enterValidAmount: "Please enter a valid amount",
        enterItemNamePrice: "Please enter item name and price",
        discountApplied: "Discount applied",
        discountRemoved: "Discount removed",
        edit: "Edit",
        undo: "Undo",
        itemAdded: "Item added",
        itemRemoved: "Item removed"
    },
    cs: {
        selectVilla: "Vyberte vilu",
        newOrder: "Nová objednávka",
        drinks: "Nápoje",
        services: "Služby",
        gifts: "Dárky",
        custom: "Vlastní",
        searchItems: "Hledat položky...",
        customItems: "Vlastní položky",
        itemName: "Název položky",
        itemPrice: "Cena v EUR",
        addItem: "Přidat položku",
        markAsGift: "Označit jako dárek",
        giftItems: "Dárkové položky",
        giftInfo: "Položky přidané zde budou označeny jako dárky a nebudou účtovány",
        discounts: "Slevy",
        discountPercent: "%",
        discountAmount: "EUR",
        applyPercentDiscount: "Použít %",
        applyAmountDiscount: "Použít €",
        removeDiscount: "Odstranit slevu",
        totalItems: "Počet položek",
        totalAmount: "Celková částka",
        giftValue: "Hodnota dárků",
        discount: "Sleva",
        discountValue: "Hodnota slevy",
        finalTotal: "Konečná cena",
        proceedToPayment: "Pokračovat k platbě",
        clearOrder: "Vymazat objednávku",
        paymentMethod: "Způsob platby",
        cash: "Hotovost",
        cashDescription: "Platba v hotovosti",
        card: "Karta",
        cardDescription: "Platba kartou",
        unpaid: "Nezaplaceno",
        unpaidDescription: "Označit jako nezaplacené (platba později)",
        completeOrder: "Dokončit objednávku",
        cancel: "Zrušit",
        orderCompleted: "Objednávka dokončena",
        receipt: "ÚČTENKA",
        paidItems: "Placené položky",
        total: "Celkem",
        shareReceipt: "Sdílet účtenku",
        saveAsPDF: "Uložit jako PDF",
        newOrder: "Nová objednávka",
        orderHistory: "Historie objednávek",
        noOrders: "Zatím žádné objednávky",
        clearHistory: "Vymazat historii",
        backToMain: "Zpět na hlavní stránku",
        processing: "Zpracování...",
        beerKeg30: "Sud piva 30L",
        beerKeg50: "Sud piva 50L",
        freeItem: "Zdarma",
        giftBeer: "Pivo (Dárek)",
        giftProsecco: "Prosecco (Dárek)",
        giftCocktail: "Koktejl (Dárek)",
        pleaseAddItems: "Přidejte položky do objednávky",
        selectPaymentMethod: "Vyberte způsob platby",
        receiptSaved: "Účtenka uložena jako PDF",
        receiptShared: "Účtenka úspěšně sdílena",
        errorSharing: "Chyba při sdílení účtenky",
        sharingNotSupported: "Sdílení není na tomto zařízení podporováno",
        enterValidAmount: "Zadejte platnou částku",
        enterItemNamePrice: "Zadejte název a cenu položky",
        discountApplied: "Sleva aplikována",
        discountRemoved: "Sleva odstraněna",
        edit: "Upravit",
        undo: "Zpět",
        itemAdded: "Položka přidána",
        itemRemoved: "Položka odstraněna"
    }
};

// Define the items data
const itemsData = {
    "jagermeister": { name: "Jägermeister shot", priceCZK: 59, priceEUR: 2.40, category: "drinks" },
    "soda": { name: "Coca-Cola, Sprite, Fanta", priceCZK: 32, priceEUR: 1.3, category: "drinks" },
    "vitamin-water": { name: "Vitamin Water", priceCZK: 35, priceEUR: 1.4, category: "drinks" },
    "redbull": { name: "Red Bull", priceCZK: 60, priceEUR: 2.4, category: "drinks" },
    "jack-cola": { name: "Jack & Cola", priceCZK: 125, priceEUR: 5, category: "drinks" },
    "gin-tonic": { name: "Gin & Tonic", priceCZK: 75, priceEUR: 3, category: "drinks" },
    "moscow-mule": { name: "Moscow Mule", priceCZK: 100, priceEUR: 4, category: "drinks" },
    "mojito": { name: "Mojito", priceCZK: 100, priceEUR: 4, category: "drinks" },
    "pina-colada": { name: "Piña Colada", priceCZK: 100, priceEUR: 4, category: "drinks" },
    "beer": { name: "Beer", priceCZK: 60, priceEUR: 2.4, category: "drinks" },
    "prosecco": { name: "Prosecco", priceCZK: 475, priceEUR: 19, category: "drinks" },
    "grill-gas": { name: "Gas for grill", priceCZK: 500, priceEUR: 20, category: "services" },
    "fire-table-gas": { name: "Gas for fire table", priceCZK: 300, priceEUR: 12, category: "services" },
    "city-tax": { name: "City Tax", priceCZK: 50, priceEUR: 2, category: "services", isPerPersonDay: true },
    "wellness-fee": { name: "Wellness fee", priceCZK: 0, priceEUR: 0, category: "services", isCustom: true },
    "beer-keg-30": { name: translations.en.beerKeg30, priceCZK: 3000, priceEUR: 120, category: "drinks" },
    "beer-keg-50": { name: translations.en.beerKeg50, priceCZK: 4375, priceEUR: 175, category: "drinks" },
    "gift-beer": { name: translations.en.giftBeer, priceCZK: 60, priceEUR: 2.4, category: "gifts", isGift: true },
    "gift-prosecco": { name: translations.en.giftProsecco, priceCZK: 475, priceEUR: 19, category: "gifts", isGift: true },
    "gift-cocktail": { name: translations.en.giftCocktail, priceCZK: 100, priceEUR: 4, category: "gifts", isGift: true }
};

// App state
let currentVilla = "";
let currentOrder = {};
let currentPayment = "";
let orderHistory = [];
let currentLanguage = "en";
let currentDiscount = { type: null, value: 0, amountEUR: 0 };
let lastActions = []; // Store last 5 actions for undo/edit

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    loadOrderHistory();
    setupEventListeners();
    setupSearch();
    setupLanguage();
    setupSwipeNavigation();
    setupUndoBar();
});

// Set up language switcher
function setupLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchLanguage(btn.dataset.lang);
        });
    });
    updateLanguageText();
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguageText();
}

// Update UI text based on selected language
function updateLanguageText() {
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[currentLanguage][key]) el.textContent = translations[currentLanguage][key];
    });
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[currentLanguage][key]) el.placeholder = translations[currentLanguage][key];
    });
    updateItemNames();
}

// Update item names based on language
function updateItemNames() {
    Object.keys(itemsData).forEach(itemId => {
        const itemRow = document.querySelector(`.item-row[data-item="${itemId}"]`);
        if (itemRow) {
            const itemName = itemRow.querySelector('.item-name');
            itemName.textContent = itemsData[itemId].name;
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    document.querySelectorAll('.villa-card').forEach(card => {
        card.addEventListener('click', () => {
            currentVilla = card.dataset.villa;
            showScreen('orderScreen');
            initializeOrder();
        });
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            document.querySelectorAll('.category-content').forEach(content => content.style.display = 'none');
            document.getElementById(`${category}Category`).style.display = 'block';
        });
    });

    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', () => {
            const itemRow = input.closest('.item-row');
            const itemId = itemRow.dataset.item;
            const newQty = parseInt(input.value) || 0;
            const currentQty = currentOrder[itemId] ? currentOrder[itemId].qty : 0;
            handleQuantityChange(itemId, newQty, currentQty);
            updateOrderSummary();
        });
    });

    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemRow = e.target.closest('.item-row');
            const itemId = itemRow.dataset.item;
            const qtyInput = itemRow.querySelector('.qty-input');
            let qty = parseInt(qtyInput.value) || 0;
            handleQuantityIncrease(itemId);
            qtyInput.value = qty + 1;
            updateOrderSummary();
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemRow = e.target.closest('.item-row');
            const itemId = itemRow.dataset.item;
            const qtyInput = itemRow.querySelector('.qty-input');
            let qty = parseInt(qtyInput.value) || 0;
            if (qty > 0) {
                removeItem(itemId, 1);
                qtyInput.value = qty - 1;
                updateOrderSummary();
            }
        });
    });

    document.getElementById('cityTaxPeople').addEventListener('change', updateCityTax);
    document.getElementById('cityTaxDays').addEventListener('change', updateCityTax);
    document.getElementById('wellnessFeeAmount').addEventListener('change', updateWellnessFee);
    document.getElementById('addCustomItem').addEventListener('click', addCustomItem);
    document.querySelectorAll('.wellness-quick-amount').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = e.target.dataset.amount;
            handleWellnessQuickAmount(amount);
        });
    });

    document.getElementById('applyPercentDiscount').addEventListener('click', () => {
        const percent = parseFloat(document.getElementById('discountPercent').value);
        if (!percent || percent <= 0 || percent > 100) {
            showNotification(translations[currentLanguage].enterValidAmount);
            return;
        }
        applyDiscount('percent', percent);
    });

    document.getElementById('applyAmountDiscount').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('discountAmount').value);
        if (!amount || amount <= 0) {
            showNotification(translations[currentLanguage].enterValidAmount);
            return;
        }
        applyDiscount('amount', amount);
    });

    document.getElementById('removeDiscount').addEventListener('click', removeDiscount);
    document.getElementById('backToVilla').addEventListener('click', () => showScreen('villaScreen'));
    document.getElementById('proceedToPayment').addEventListener('click', proceedToPayment);
    document.getElementById('clearOrder').addEventListener('click', clearOrder);
    document.getElementById('backToOrder').addEventListener('click', () => showScreen('orderScreen'));
    document.getElementById('cancelPayment').addEventListener('click', () => showScreen('orderScreen'));
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            currentPayment = option.dataset.payment;
        });
    });
    document.getElementById('completeOrder').addEventListener('click', completeOrder);
    document.getElementById('shareReceipt').addEventListener('click', shareReceipt);
    document.getElementById('saveReceipt').addEventListener('click', saveReceiptAsPDF);
    document.getElementById('newOrder').addEventListener('click', () => showScreen('villaScreen'));
    document.getElementById('homeButton').addEventListener('click', () => showScreen('villaScreen'));
    document.getElementById('backToMain').addEventListener('click', () => showScreen('villaScreen'));
    document.getElementById('backToMainFromHistory').addEventListener('click', () => showScreen('villaScreen'));
    document.getElementById('undoAction').addEventListener('click', undoLastAction);
    document.getElementById('editAction').addEventListener('click', editLastAction);
    document.getElementById('clearHistory').addEventListener('click', clearHistory);
}

// Set up search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchItems');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.item-row').forEach(row => {
            const itemName = row.querySelector('.item-name').textContent.toLowerCase();
            row.style.display = itemName.includes(searchTerm) || searchTerm === '' ? 'flex' : 'none';
        });
    });
}

// Set up swipe navigation
function setupSwipeNavigation() {
    let touchstartX = 0;
    let touchendX = 0;
    document.body.addEventListener('touchstart', e => touchstartX = e.changedTouches[0].screenX);
    document.body.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        if (touchendX - touchstartX > 50) showScreen('villaScreen');
    });
}

// Set up undo bar
function setupUndoBar() {
    const undoBar = document.getElementById('undoBar');
    undoBar.addEventListener('click', (e) => e.stopPropagation());
}

// Initialize a new order
function initializeOrder() {
    currentOrder = {};
    currentDiscount = { type: null, value: 0, amountEUR: 0 };
    currentPayment = "";
    document.querySelectorAll('.qty-input').forEach(input => input.value = "0");
    document.getElementById('discountPercent').value = "";
    document.getElementById('discountAmount').value = "";
    document.getElementById('customItemName').value = "";
    document.getElementById('customItemPrice').value = "";
    document.getElementById('customItemGift').checked = false;
    document.getElementById('wellnessFeeAmount').value = "0";
    document.getElementById('wellnessFeeNote').value = "";
    document.getElementById('cityTaxPeople').value = "1";
    document.getElementById('cityTaxDays').value = "1";
    removeDiscount();
    updateOrderSummary();
}

// Handle quantity changes
function handleQuantityChange(itemId, newQty, currentQty) {
    if (newQty > currentQty) {
        if (itemId === 'city-tax') {
            const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
            const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
            addItem(itemId, newQty - currentQty, people, days);
        } else if (itemId === 'wellness-fee') {
            const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
            const note = document.getElementById('wellnessFeeNote').value || '';
            if (amount > 0) {
                addCustomItem(itemId, newQty - currentQty, amount, note);
                showNotification(translations[currentLanguage].itemAdded);
            } else {
                showNotification(translations[currentLanguage].enterValidAmount);
                document.querySelector(`.item-row[data-item="${itemId}"] .qty-input`).value = currentQty;
                return;
            }
        } else if (itemId.startsWith('gift-')) {
            addGiftItem(itemId, newQty - currentQty);
        } else {
            addItem(itemId, newQty - currentQty);
        }
    } else if (newQty < currentQty) {
        removeItem(itemId, currentQty - newQty);
    }
}

// Handle quantity increase
function handleQuantityIncrease(itemId) {
    if (itemId === 'city-tax') {
        const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
        const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
        addItem(itemId, 1, people, days);
    } else if (itemId === 'wellness-fee') {
        const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
        const note = document.getElementById('wellnessFeeNote').value || '';
        if (amount > 0) {
            addCustomItem(itemId, 1, amount, note);
            showNotification(translations[currentLanguage].itemAdded);
        } else {
            showNotification(translations[currentLanguage].enterValidAmount);
            return;
        }
    } else if (itemId.startsWith('gift-')) {
        addGiftItem(itemId, 1);
    } else {
        addItem(itemId, 1);
    }
}

// Handle wellness quick amount buttons
function handleWellnessQuickAmount(amount) {
    const wellnessAmountInput = document.getElementById('wellnessFeeAmount');
    const wellnessNoteInput = document.getElementById('wellnessFeeNote');
    if (amount === 'custom') {
        wellnessAmountInput.style.display = 'block';
        wellnessNoteInput.style.display = 'block';
        wellnessAmountInput.value = "";
    } else {
        wellnessAmountInput.style.display = 'none';
        wellnessNoteInput.style.display = 'block';
        wellnessAmountInput.value = amount;
        updateWellnessFee();
    }
}

// Update city tax
function updateCityTax() {
    const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
    const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
    if (currentOrder['city-tax']) {
        currentOrder['city-tax'].people = people;
        currentOrder['city-tax'].days = days;
        currentOrder['city-tax'].totalEUR = itemsData['city-tax'].priceEUR * people * days * currentOrder['city-tax'].qty;
        currentOrder['city-tax'].totalCZK = itemsData['city-tax'].priceCZK * people * days * currentOrder['city-tax'].qty;
        updateOrderSummary();
    }
}

// Update wellness fee
function updateWellnessFee() {
    const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
    const note = document.getElementById('wellnessFeeNote').value || '';
    if (currentOrder['wellness-fee']) {
        currentOrder['wellness-fee'].customAmount = amount;
        currentOrder['wellness-fee'].note = note;
        currentOrder['wellness-fee'].totalEUR = amount * currentOrder['wellness-fee'].qty;
        currentOrder['wellness-fee'].totalCZK = (amount * 25) * currentOrder['wellness-fee'].qty;
        updateOrderSummary();
    }
}

// Add custom item
function addCustomItem() {
    const name = document.getElementById('customItemName').value.trim();
    const priceEUR = parseFloat(document.getElementById('customItemPrice').value);
    const isGift = document.getElementById('customItemGift').checked;
    if (!name || !priceEUR || priceEUR <= 0) {
        showNotification(translations[currentLanguage].enterItemNamePrice);
        return;
    }
    const itemId = `custom-${Date.now()}`;
    if (isGift) {
        addCustomGiftItem(itemId, name, priceEUR);
    } else {
        addCustomRegularItem(itemId, name, priceEUR);
    }
    const customItemsList = document.getElementById('customItemsList');
    const itemRow = document.createElement('div');
    itemRow.className = `item-row ${isGift ? 'gift-item' : ''}`;
    itemRow.dataset.item = itemId;
    itemRow.innerHTML = `
        <div class="item-info">
            <div class="item-name">${name}</div>
            <div class="item-price">${isGift ? translations[currentLanguage].freeItem : priceEUR.toFixed(2) + ' EUR'}</div>
        </div>
        <div class="item-quantity">
            <button class="decrease-qty">-</button>
            <input type="number" class="qty-input" value="1" min="0">
            <button class="increase-qty">+</button>
        </div>
    `;
    customItemsList.appendChild(itemRow);
    document.getElementById('customItemName').value = '';
    document.getElementById('customItemPrice').value = '';
    document.getElementById('customItemGift').checked = false;
    updateOrderSummary();
    showNotification(translations[currentLanguage].itemAdded);

    // Re-attach event listeners for new item row
    itemRow.querySelector('.increase-qty').addEventListener('click', () => {
        const qtyInput = itemRow.querySelector('.qty-input');
        let qty = parseInt(qtyInput.value) || 0;
        if (isGift) addCustomGiftItem(itemId, name, priceEUR);
        else addCustomRegularItem(itemId, name, priceEUR);
        qtyInput.value = qty + 1;
        updateOrderSummary();
    });
    itemRow.querySelector('.decrease-qty').addEventListener('click', () => {
        const qtyInput = itemRow.querySelector('.qty-input');
        let qty = parseInt(qtyInput.value) || 0;
        if (qty > 0) {
            removeItem(itemId, 1);
            qtyInput.value = qty - 1;
            if (qty - 1 === 0) itemRow.remove();
            updateOrderSummary();
        }
    });
    itemRow.querySelector('.qty-input').addEventListener('change', () => {
        const newQty = parseInt(itemRow.querySelector('.qty-input').value) || 0;
        const currentQty = currentOrder[itemId] ? currentOrder[itemId].qty : 0;
        if (newQty > currentQty) {
            if (isGift) addCustomGiftItem(itemId, name, priceEUR, newQty - currentQty);
            else addCustomRegularItem(itemId, name, priceEUR, newQty - currentQty);
        } else if (newQty < currentQty) {
            removeItem(itemId, currentQty - newQty);
        }
        if (newQty === 0) itemRow.remove();
        updateOrderSummary();
    });
}

// Add a regular item
function addItem(itemId, quantity = 1, people = 1, days = 1) {
    const item = itemsData[itemId];
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name: item.name,
            priceEUR: item.priceEUR,
            priceCZK: item.priceCZK,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0,
            isGift: false
        };
    }
    currentOrder[itemId].qty += quantity;
    if (item.isPerPersonDay) {
        currentOrder[itemId].people = people;
        currentOrder[itemId].days = days;
        currentOrder[itemId].totalEUR = item.priceEUR * people * days * currentOrder[itemId].qty;
        currentOrder[itemId].totalCZK = item.priceCZK * people * days * currentOrder[itemId].qty;
    } else {
        currentOrder[itemId].totalEUR = item.priceEUR * currentOrder[itemId].qty;
        currentOrder[itemId].totalCZK = item.priceCZK * currentOrder[itemId].qty;
    }
    recordAction({ type: 'add', itemId, quantity, people, days });
    showNotification(translations[currentLanguage].itemAdded);
}

// Add a gift item
function addGiftItem(itemId, quantity = 1) {
    const item = itemsData[itemId];
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name: item.name,
            priceEUR: item.priceEUR,
            priceCZK: item.priceCZK,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0,
            isGift: true
        };
    }
    currentOrder[itemId].qty += quantity;
    currentOrder[itemId].totalEUR = item.priceEUR * currentOrder[itemId].qty;
    currentOrder[itemId].totalCZK = item.priceCZK * currentOrder[itemId].qty;
    recordAction({ type: 'add', itemId, quantity });
    showNotification(translations[currentLanguage].itemAdded);
}

// Add a custom regular item
function addCustomRegularItem(itemId, name, priceEUR, quantity = 1) {
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name,
            priceEUR,
            priceCZK: priceEUR * 25,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0,
            isGift: false,
            isCustom: true
        };
    }
    currentOrder[itemId].qty += quantity;
    currentOrder[itemId].totalEUR = priceEUR * currentOrder[itemId].qty;
    currentOrder[itemId].totalCZK = (priceEUR * 25) * currentOrder[itemId].qty;
    recordAction({ type: 'add', itemId, quantity, name, priceEUR });
    showNotification(translations[currentLanguage].itemAdded);
}

// Add a custom gift item
function addCustomGiftItem(itemId, name, priceEUR, quantity = 1) {
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name,
            priceEUR,
            priceCZK: priceEUR * 25,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0,
            isGift: true,
            isCustom: true
        };
    }
    currentOrder[itemId].qty += quantity;
    currentOrder[itemId].totalEUR = priceEUR * currentOrder[itemId].qty;
    currentOrder[itemId].totalCZK = (priceEUR * 25) * currentOrder[itemId].qty;
    recordAction({ type: 'add', itemId, quantity, name, priceEUR });
    showNotification(translations[currentLanguage].itemAdded);
}

// Add a custom item (like wellness fee)
function addCustomItem(itemId, quantity = 1, amount = 0, note = '') {
    const item = itemsData[itemId];
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name: item.name,
            customAmount: amount,
            note,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0,
            isGift: false,
            isCustom: true
        };
    }
    currentOrder[itemId].qty += quantity;
    currentOrder[itemId].customAmount = amount;
    currentOrder[itemId].note = note;
    currentOrder[itemId].totalEUR = amount * currentOrder[itemId].qty;
    currentOrder[itemId].totalCZK = (amount * 25) * currentOrder[itemId].qty;
    recordAction({ type: 'add', itemId, quantity, amount, note });
}

// Remove an item
function removeItem(itemId, quantity = 1) {
    if (currentOrder[itemId]) {
        const prevQty = currentOrder[itemId].qty;
        currentOrder[itemId].qty -= quantity;
        if (currentOrder[itemId].qty <= 0) {
            delete currentOrder[itemId];
        } else if (itemsData[itemId] && itemsData[itemId].isPerPersonDay) {
            const people = currentOrder[itemId].people || 1;
            const days = currentOrder[itemId].days || 1;
            currentOrder[itemId].totalEUR = itemsData[itemId].priceEUR * people * days * currentOrder[itemId].qty;
            currentOrder[itemId].totalCZK = itemsData[itemId].priceCZK * people * days * currentOrder[itemId].qty;
        } else if (itemsData[itemId] && itemsData[itemId].isCustom) {
            const amount = currentOrder[itemId].customAmount || currentOrder[itemId].priceEUR;
            currentOrder[itemId].totalEUR = amount * currentOrder[itemId].qty;
            currentOrder[itemId].totalCZK = (amount * 25) * currentOrder[itemId].qty;
        } else {
            currentOrder[itemId].totalEUR = currentOrder[itemId].priceEUR * currentOrder[itemId].qty;
            currentOrder[itemId].totalCZK = currentOrder[itemId].priceCZK * currentOrder[itemId].qty;
        }
        recordAction({ type: 'remove', itemId, quantity, prevQty });
        showNotification(translations[currentLanguage].itemRemoved);
    }
}

// Apply discount
function applyDiscount(type, value) {
    currentDiscount.type = type;
    currentDiscount.value = value;
    const subtotal = getTotalAmount(false);
    currentDiscount.amountEUR = type === 'percent' ? (subtotal * value / 100) : value;
    updateOrderSummary();
    showNotification(translations[currentLanguage].discountApplied);
    recordAction({ type: 'discount', discount: { type, value } });
}

// Remove discount
function removeDiscount() {
    currentDiscount = { type: null, value: 0, amountEUR: 0 };
    updateOrderSummary();
    document.querySelectorAll('.discount-summary').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.final-total').forEach(el => el.style.display = 'none');
    showNotification(translations[currentLanguage].discountRemoved);
    recordAction({ type: 'removeDiscount' });
}

// Update order summary
function updateOrderSummary() {
    const totalItems = getTotalItems();
    const totalGiftItems = getTotalGiftItems();
    const totalAmount = getTotalAmount(false);
    const totalGiftAmount = getTotalGiftAmount();
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2) + ' EUR';
    document.getElementById('totalGiftItems').textContent = totalGiftItems;
    document.getElementById('totalGiftAmount').textContent = totalGiftAmount.toFixed(2) + ' EUR';
    if (currentDiscount.type) {
        document.querySelectorAll('.discount-summary').forEach(el => el.style.display = 'flex');
        document.querySelectorAll('.final-total').forEach(el => el.style.display = 'flex');
        document.getElementById('discountType').textContent = currentDiscount.type === 'percent' ? currentDiscount.value + '%' : currentDiscount.value.toFixed(2) + ' EUR';
        document.getElementById('discountValue').textContent = currentDiscount.amountEUR.toFixed(2) + ' EUR';
        const finalTotalAmount = Math.max(0, totalAmount - currentDiscount.amountEUR);
        document.getElementById('finalTotalAmount').textContent = finalTotalAmount.toFixed(2) + ' EUR';
    } else {
        document.querySelectorAll('.discount-summary').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.final-total').forEach(el => el.style.display = 'none');
    }
}

// Update payment summary
function updatePaymentSummary() {
    const totalItems = getTotalItems();
    const totalGiftItems = getTotalGiftItems();
    const totalAmount = getTotalAmount(false);
    const totalGiftAmount = getTotalGiftAmount();
    document.getElementById('paymentTotalItems').textContent = totalItems;
    document.getElementById('paymentTotalAmount').textContent = totalAmount.toFixed(2) + ' EUR';
    document.getElementById('paymentTotalGiftItems').textContent = totalGiftItems;
    document.getElementById('paymentTotalGiftAmount').textContent = totalGiftAmount.toFixed(2) + ' EUR';
    if (currentDiscount.type) {
        document.querySelector('#paymentScreen .discount-summary').style.display = 'flex';
        document.querySelector('#paymentScreen .final-total').style.display = 'flex';
        document.getElementById('paymentDiscountType').textContent = currentDiscount.type === 'percent' ? currentDiscount.value + '%' : currentDiscount.value.toFixed(2) + ' EUR';
        document.getElementById('paymentDiscountValue').textContent = currentDiscount.amountEUR.toFixed(2) + ' EUR';
        const finalTotalAmount = Math.max(0, totalAmount - currentDiscount.amountEUR);
        document.getElementById('paymentFinalTotalAmount').textContent = finalTotalAmount.toFixed(2) + ' EUR';
    } else {
        document.querySelector('#paymentScreen .discount-summary').style.display = 'none';
        document.querySelector('#paymentScreen .final-total').style.display = 'none';
    }
}

// Get total items
function getTotalItems() {
    let total = 0;
    for (const itemId in currentOrder) {
        if (!currentOrder[itemId].isGift) total += currentOrder[itemId].qty;
    }
    return total;
}

// Get total gift items
function getTotalGiftItems() {
    let total = 0;
    for (const itemId in currentOrder) {
        if (currentOrder[itemId].isGift) total += currentOrder[itemId].qty;
    }
    return total;
}

// Get total amount
function getTotalAmount(includeGifts = false) {
    let total = 0;
    for (const itemId in currentOrder) {
        if (includeGifts || !currentOrder[itemId].isGift) total += currentOrder[itemId].totalEUR;
    }
    return total;
}

// Get total gift amount
function getTotalGiftAmount() {
    let total = 0;
    for (const itemId in currentOrder) {
        if (currentOrder[itemId].isGift) total += currentOrder[itemId].totalEUR;
    }
    return total;
}

// Get final total amount
function getFinalTotalAmount() {
    const subtotal = getTotalAmount(false);
    return currentDiscount.type ? Math.max(0, subtotal - currentDiscount.amountEUR) : subtotal;
}

// Proceed to payment
function proceedToPayment() {
    if (getTotalItems() === 0 && getTotalGiftItems() === 0) {
        showNotification(translations[currentLanguage].pleaseAddItems);
        return;
    }
    updatePaymentSummary();
    showScreen('paymentScreen');
}

// Clear order
function clearOrder() {
    initializeOrder();
    document.querySelectorAll('.payment-option').forEach(option => option.classList.remove('selected'));
    currentPayment = "";
    recordAction({ type: 'clear' });
}

// Complete order
function completeOrder() {
    if (!currentPayment) {
        showNotification(translations[currentLanguage].selectPaymentMethod);
        return;
    }
    showLoading();
    setTimeout(() => {
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        const dateTimeStr = `${dateStr} ${timeStr}`;
        const subtotal = getTotalAmount(false);
        const finalTotal = getFinalTotalAmount();
        const giftTotal = getTotalGiftAmount();
        const order = {
            id: Date.now(),
            villa: getVillaName(currentVilla),
            villaId: currentVilla,
            date: dateTimeStr,
            timestamp: now.getTime(),
            items: { ...currentOrder },
            totalItems: getTotalItems(),
            totalGiftItems: getTotalGiftItems(),
            subtotalAmount: subtotal,
            discount: { ...currentDiscount },
            finalAmount: finalTotal,
            giftAmount: giftTotal,
            payment: currentPayment
        };
        orderHistory.unshift(order);
        saveOrderHistory();
        generateReceipt(order);
        hideLoading();
        showScreen('receiptScreen');
        recordAction({ type: 'complete', order });
    }, 1000);
}

// Generate receipt
function generateReceipt(order) {
    document.getElementById('receiptVilla').textContent = order.villa;
    document.getElementById('receiptDate').textContent = order.date;
    const receiptPaidItemsContainer = document.getElementById('receiptPaidItems');
    receiptPaidItemsContainer.innerHTML = "";
    const receiptGiftItemsContainer = document.getElementById('receiptGiftItems');
    receiptGiftItemsContainer.innerHTML = "";
    const receiptGiftSection = document.getElementById('receiptGiftSection');
    let hasGiftItems = false;

    for (const itemId in order.items) {
        const item = order.items[itemId];
        const itemElement = document.createElement('div');
        itemElement.className = 'receipt-item';
        let itemDescription = `${item.name} × ${item.qty}`;
        if (item.people && item.days) {
            itemDescription += ` (${item.people} people, ${item.days} days)`;
        }
        if (item.note) {
            itemDescription += ` [${item.note}]`;
        }
        itemElement.innerHTML = `
            <div class="receipt-item-left">
                <div class="receipt-item-name">${itemDescription}</div>
                <div class="receipt-item-qty">${item.isGift ? translations[currentLanguage].freeItem : ''}</div>
            </div>
            <div class="receipt-item-price">${item.isGift ? '0.00 EUR' : item.totalEUR.toFixed(2) + ' EUR'}</div>
        `;
        if (item.isGift) {
            receiptGiftItemsContainer.appendChild(itemElement);
            hasGiftItems = true;
        } else {
            receiptPaidItemsContainer.appendChild(itemElement);
        }
    }

    receiptGiftSection.style.display = hasGiftItems ? 'block' : 'none';
    document.getElementById('receiptPaidTotal').textContent = order.finalAmount.toFixed(2) + ' EUR';
    document.getElementById('receiptGiftTotal').textContent = order.giftAmount.toFixed(2) + ' EUR';
    if (order.discount.type) {
        document.getElementById('receiptDiscount').style.display = 'block';
        document.getElementById('receiptDiscountType').textContent = order.discount.type === 'percent' ? order.discount.value + '%' : order.discount.value.toFixed(2) + ' EUR';
        document.getElementById('receiptDiscountValue').textContent = '-' + order.discount.amountEUR.toFixed(2) + ' EUR';
    } else {
        document.getElementById('receiptDiscount').style.display = 'none';
    }
    document.getElementById('receiptPayment').textContent = translations[currentLanguage][order.payment] || order.payment;
    document.getElementById('receiptPayment').className = `receipt-payment ${order.payment === 'unpaid' ? 'receipt-unpaid' : ''}`;
}

// Share receipt
function shareReceipt() {
    const receiptContent = document.getElementById('receiptContent').innerText;
    if (navigator.share) {
        navigator.share({
            title: translations[currentLanguage].receipt,
            text: receiptContent
        }).then(() => {
            showNotification(translations[currentLanguage].receiptShared);
        }).catch(() => {
            showNotification(translations[currentLanguage].errorSharing);
        });
    } else {
        showNotification(translations[currentLanguage].sharingNotSupported);
    }
}

// Save receipt as PDF
function saveReceiptAsPDF() {
    showLoading();
    const receiptElement = document.getElementById('receiptContent');
    html2canvas(receiptElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`receipt_${Date.now()}.pdf`);
        hideLoading();
        showNotification(translations[currentLanguage].receiptSaved);
    });
}

// Record action for undo/edit
function recordAction(action) {
    lastActions.unshift(action);
    if (lastActions.length > 5) lastActions.pop();
    showUndoBar();
}

// Show undo bar
function showUndoBar() {
    const undoBar = document.getElementById('undoBar');
    undoBar.style.display = 'flex';
    undoBar.classList.add('active');
    setTimeout(() => {
        undoBar.classList.remove('active');
        undoBar.style.display = 'none';
    }, 5000);
}

// Undo last action
function undoLastAction() {
    if (lastActions.length === 0) return;
    const action = lastActions.shift();
    switch (action.type) {
        case 'add':
            removeItem(action.itemId, action.quantity);
            document.querySelector(`.item-row[data-item="${action.itemId}"] .qty-input`).value = (currentOrder[action.itemId]?.qty || 0);
            break;
        case 'remove':
            if (action.itemId === 'city-tax') {
                addItem(action.itemId, action.quantity, action.people || 1, action.days || 1);
            } else if (action.itemId === 'wellness-fee') {
                addCustomItem(action.itemId, action.quantity, action.amount || 0, action.note || '');
            } else if (action.itemId.startsWith('gift-')) {
                addGiftItem(action.itemId, action.quantity);
            } else if (action.itemId.startsWith('custom-')) {
                if (currentOrder[action.itemId]?.isGift) {
                    addCustomGiftItem(action.itemId, action.name, action.priceEUR, action.quantity);
                } else {
                    addCustomRegularItem(action.itemId, action.name, action.priceEUR, action.quantity);
                }
            } else {
                addItem(action.itemId, action.quantity);
            }
            document.querySelector(`.item-row[data-item="${action.itemId}"] .qty-input`).value = action.prevQty;
            break;
        case 'discount':
            removeDiscount();
            break;
        case 'removeDiscount':
            applyDiscount(action.discount.type, action.discount.value);
            break;
        case 'clear':
            // Restore previous order state (simplified for demo)
            showNotification(translations[currentLanguage].undo + " not fully supported for clear");
            break;
        case 'complete':
            orderHistory.shift();
            saveOrderHistory();
            currentOrder = { ...action.order.items };
            updateOrderSummary();
            document.querySelectorAll('.qty-input').forEach(input => {
                const itemId = input.closest('.item-row').dataset.item;
                input.value = currentOrder[itemId]?.qty || 0;
            });
            showScreen('orderScreen');
            break;
    }
    updateOrderSummary();
    document.getElementById('undoBar').style.display = 'none';
}

// Edit last action
function editLastAction() {
    if (lastActions.length === 0) return;
    const action = lastActions[0];
    if (action.type === 'add' || action.type === 'remove') {
        const itemId = action.itemId;
        if (itemId === 'wellness-fee') {
            document.getElementById('wellnessFeeAmount').focus();
            document.getElementById('wellnessFeeAmount').style.display = 'block';
            document.getElementById('wellnessFeeNote').style.display = 'block';
        } else if (itemId === 'city-tax') {
            document.getElementById('cityTaxPeople').focus();
        } else if (itemId.startsWith('custom-')) {
            document.getElementById('customItemName').focus();
        } else {
            document.querySelector(`.item-row[data-item="${itemId}"] .qty-input`).focus();
        }
    } else if (action.type === 'discount') {
        if (action.discount.type === 'percent') {
            document.getElementById('discountPercent').focus();
        } else {
            document.getElementById('discountAmount').focus();
        }
    }
    document.getElementById('undoBar').style.display = 'none';
}

// Save order history
function saveOrderHistory() {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    updateOrderHistory();
}

// Load order history
function loadOrderHistory() {
    const storedHistory = localStorage.getItem('orderHistory');
    if (storedHistory) orderHistory = JSON.parse(storedHistory);
    updateOrderHistory();
}

// Update order history UI
function updateOrderHistory() {
    const historyList = document.getElementById('orderHistoryList');
    historyList.innerHTML = '';
    if (orderHistory.length === 0) {
        historyList.className = 'empty-state';
        historyList.innerHTML = `
            <i class="fas fa-history"></i>
            <div data-lang-key="noOrders">${translations[currentLanguage].noOrders}</div>
        `;
        return;
    }
    historyList.className = '';
    orderHistory.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-history-item';
        orderElement.innerHTML = `
            <div class="order-history-header">
                <div class="order-history-villa">${order.villa}</div>
                <div class="order-history-date">${order.date}</div>
            </div>
            <div class="order-history-total">${order.finalAmount.toFixed(2)} EUR</div>
            <div class="order-history-payment ${order.payment === 'unpaid' ? 'unpaid' : ''}">${translations[currentLanguage][order.payment] || order.payment}</div>
        `;
        historyList.appendChild(orderElement);
    });
}

// Clear history
function clearHistory() {
    orderHistory = [];
    saveOrderHistory();
    showNotification(translations[currentLanguage].clearHistory);
}

// Get villa name
function getVillaName(villaId) {
    const villaMap = {
        'little-castle': 'The Little Castle',
        'amazing-villa': 'Amazing Villa',
        'oh-yeah-villa': 'Oh Yeah Villa'
    };
    return villaMap[villaId] || villaId;
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'historyScreen') updateOrderHistory();
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Show loading
function showLoading() {
    document.querySelector('.loading').style.display = 'flex';
}

// Hide loading
function hideLoading() {
    document.querySelector('.loading').style.display = 'none';
}
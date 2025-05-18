// Villa POS System

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
    "wellness-fee": { name: "Wellness fee", priceCZK: 0, priceEUR: 0, category: "services", isCustom: true }
};

// App state
let currentVilla = "";
let currentOrder = {};
let currentPayment = "";
let orderHistory = [];

// Inicializace IndexedDB pro offline použití
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('bary-db', 1);
        
        request.onerror = () => {
            console.error('Nepodařilo se otevřít IndexedDB');
            // Fallback na localStorage
            resolve(false);
        };
        
        request.onsuccess = (event) => {
            console.log('IndexedDB připravena');
            resolve(true);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Vytvoření objektových úložišť
            if (!db.objectStoreNames.contains('items')) {
                db.createObjectStore('items', { keyPath: 'id' });
            }
            
            if (!db.objectStoreNames.contains('invoices')) {
                db.createObjectStore('invoices', { keyPath: 'id' });
            }
            
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'id' });
            }
            
            if (!db.objectStoreNames.contains('pending-operations')) {
                db.createObjectStore('pending-operations', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Upravená funkce pro načítání dat
async function loadDataAsync(key, fallback) {
    // Nejprve zkusíme IndexedDB
    try {
        const db = await openDB();
        const tx = db.transaction(getStoreFromKey(key), 'readonly');
        const store = tx.objectStore(getStoreFromKey(key));
        const result = await store.get(key);
        
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.warn('Chyba při načítání z IndexedDB, fallback na localStorage', error);
    }
    
    // Fallback na localStorage
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    } catch (error) {
        console.error(`Chyba při načítání dat (${key}):`, error);
        return fallback;
    }
}

// Upravená funkce pro ukládání dat
async function saveDataAsync(key, data) {
    // Nejprve zkusíme IndexedDB
    try {
        const db = await openDB();
        const tx = db.transaction(getStoreFromKey(key), 'readwrite');
        const store = tx.objectStore(getStoreFromKey(key));
        await store.put({ id: key, data: data });
        
        // Přidání do fronty operací pro synchronizaci, pokud je offline
        if (!navigator.onLine) {
            const syncTx = db.transaction('pending-operations', 'readwrite');
            const syncStore = syncTx.objectStore('pending-operations');
            await syncStore.add({
                type: 'save',
                key: key,
                data: data,
                timestamp: Date.now()
            });
            
            // Registrovat sync-event, když bude online
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                const sw = await navigator.serviceWorker.ready;
                try {
                    await sw.sync.register('sync-invoices');
                } catch (error) {
                    console.error('Registrace synchronizace selhala:', error);
                }
            }
        }
        
        return true;
    } catch (error) {
        console.warn('Chyba při ukládání do IndexedDB, fallback na localStorage', error);
    }
    
    // Fallback na localStorage
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Chyba při ukládání dat (${key}):`, error);
        return false;
    }
}

// Pomocná funkce pro mapování klíčů na úložiště v IndexedDB
function getStoreFromKey(key) {
    if (key.includes('items')) return 'items';
    if (key.includes('hist')) return 'invoices';
    return 'settings';
}

// Pomocná funkce pro otevření IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('bary-db', 1);
        
        request.onerror = () => {
            reject('Nepodařilo se otevřít IndexedDB');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Initialize the app
document.addEventListener("DOMContentLoaded", async () => {
    // Inicializace IndexedDB
    await initDB();
    
    // Load order history from localStorage or IndexedDB
    await loadOrderHistory();
    
    // Set up event listeners
    setupEventListeners();
    
    // Setup search functionality
    setupSearch();
    
    // Zaregistrovat service worker
    registerServiceWorker();
    
    // Poslouchání změn online/offline
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    // Inicializace stavu online/offline
    handleOnlineStatusChange();
});

// Registrace service workeru
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registrován úspěšně:', registration.scope);
                })
                .catch(error => {
                    console.error('Registrace Service Workeru selhala:', error);
                });
        });
    }
}

// Aktualizace stavu online/offline
function handleOnlineStatusChange() {
    const isOnline = navigator.onLine;
    document.body.classList.toggle('offline-mode', !isOnline);
    
    if (isOnline) {
        notifyInfo('Připojeno k internetu');
        // Spustit synchronizaci
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then(sw => {
                sw.sync.register('sync-invoices');
            });
        }
    } else {
        notifyWarning('Nepřipojeno k internetu, pracujete v offline režimu');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Villa selection
    document.querySelectorAll('.villa-card').forEach(card => {
        card.addEventListener('click', () => {
            currentVilla = card.dataset.villa;
            showScreen('orderScreen');
            initializeOrder();
        });
    });
    
    // Category tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            document.querySelectorAll('.category-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`${category}Category`).style.display = 'block';
        });
    });
    
    // Ruční zadávání množství přes input
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', () => {
            const itemRow = input.closest('.item-row');
            const itemId = itemRow.dataset.item;
            const newQty = parseInt(input.value) || 0;
            const currentQty = currentOrder[itemId] ? currentOrder[itemId].qty : 0;
            
            if (newQty > currentQty) {
                // Přidání položek
                if (itemId === 'city-tax') {
                    const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
                    const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
                    addItem(itemId, newQty - currentQty, people, days);
                } else if (itemId === 'wellness-fee') {
                    const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
                    if (amount > 0) {
                        addCustomItem(itemId, newQty - currentQty, amount);
                    } else {
                        showNotification("Please enter a valid amount");
                        input.value = currentQty;
                        return;
                    }
                } else {
                    addItem(itemId, newQty - currentQty);
                }
            } else if (newQty < currentQty) {
                // Odebrání položek
                removeItem(itemId, currentQty - newQty);
            }
            
            updateOrderSummary();
        });
    });
    
    // Quantity buttons
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemRow = e.target.closest('.item-row');
            const itemId = itemRow.dataset.item;
            const qtyInput = itemRow.querySelector('.qty-input');
            let qty = parseInt(qtyInput.value) || 0;
            
            // If it's a special item with custom fields
            if (itemId === 'city-tax') {
                const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
                const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
                addItem(itemId, 1, people, days);
            } else if (itemId === 'wellness-fee') {
                const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
                if (amount > 0) {
                    addCustomItem(itemId, 1, amount);
                } else {
                    showNotification("Please enter a valid amount");
                    return;
                }
            } else {
                addItem(itemId, 1);
            }
            
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
    
    // Special inputs for city tax
    document.getElementById('cityTaxPeople').addEventListener('change', () => {
        if (currentOrder['city-tax'] && currentOrder['city-tax'].qty > 0) {
            const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
            const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
            currentOrder['city-tax'].people = people;
            currentOrder['city-tax'].days = days;
            currentOrder['city-tax'].totalEUR = people * days * itemsData['city-tax'].priceEUR;
            currentOrder['city-tax'].totalCZK = people * days * itemsData['city-tax'].priceCZK;
            updateOrderSummary();
        }
    });
    
    document.getElementById('cityTaxDays').addEventListener('change', () => {
        if (currentOrder['city-tax'] && currentOrder['city-tax'].qty > 0) {
            const people = parseInt(document.getElementById('cityTaxPeople').value) || 1;
            const days = parseInt(document.getElementById('cityTaxDays').value) || 1;
            currentOrder['city-tax'].people = people;
            currentOrder['city-tax'].days = days;
            currentOrder['city-tax'].totalEUR = people * days * itemsData['city-tax'].priceEUR;
            currentOrder['city-tax'].totalCZK = people * days * itemsData['city-tax'].priceCZK;
            updateOrderSummary();
        }
    });
    
    // Special input for wellness fee
    document.getElementById('wellnessFeeAmount').addEventListener('change', () => {
        if (currentOrder['wellness-fee'] && currentOrder['wellness-fee'].qty > 0) {
            const amount = parseFloat(document.getElementById('wellnessFeeAmount').value) || 0;
            currentOrder['wellness-fee'].customAmount = amount;
            currentOrder['wellness-fee'].totalEUR = amount;
            currentOrder['wellness-fee'].totalCZK = amount * 25; // Approximate conversion
            updateOrderSummary();
        }
    });
    
    // Navigation buttons
    document.getElementById('backToVilla').addEventListener('click', () => {
        showScreen('villaScreen');
    });
    
    document.getElementById('proceedToPayment').addEventListener('click', () => {
        if (getTotalItems() > 0) {
            updatePaymentSummary();
            showScreen('paymentScreen');
        } else {
            showNotification("Please add items to your order");
        }
    });
    
    document.getElementById('clearOrder').addEventListener('click', () => {
        initializeOrder();
        document.querySelectorAll('.qty-input').forEach(input => {
            input.value = "0";
        });
        updateOrderSummary();
    });
    
    document.getElementById('backToOrder').addEventListener('click', () => {
        showScreen('orderScreen');
    });
    
    document.getElementById('cancelPayment').addEventListener('click', () => {
        showScreen('orderScreen');
    });
    
    // Payment options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => {
                o.classList.remove('selected');
            });
            option.classList.add('selected');
            currentPayment = option.dataset.payment;
        });
    });
    
    // Complete order
    document.getElementById('completeOrder').addEventListener('click', () => {
        if (!currentPayment) {
            showNotification("Please select a payment method");
            return;
        }
        
        completeOrder();
    });
    
    // Receipt actions
    document.getElementById('shareReceipt').addEventListener('click', () => {
        shareReceipt();
    });
    
    document.getElementById('saveReceipt').addEventListener('click', () => {
        saveReceiptAsPDF();
    });
    
    document.getElementById('newOrder').addEventListener('click', () => {
        showScreen('villaScreen');
    });
}

// Set up search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchItems');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.item-row').forEach(row => {
            const itemName = row.querySelector('.item-name').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || searchTerm === '') {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize a new order
function initializeOrder() {
    currentOrder = {};
    updateOrderSummary();
}

// Add an item to the current order
function addItem(itemId, quantity = 1, people = 1, days = 1) {
    const item = itemsData[itemId];
    
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name: item.name,
            priceEUR: item.priceEUR,
            priceCZK: item.priceCZK,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0
        };
        
        if (item.isPerPersonDay) {
            currentOrder[itemId].people = people;
            currentOrder[itemId].days = days;
        }
    }
    
    currentOrder[itemId].qty += quantity;
    
    if (item.isPerPersonDay) {
        currentOrder[itemId].totalEUR = currentOrder[itemId].priceEUR * people * days;
        currentOrder[itemId].totalCZK = currentOrder[itemId].priceCZK * people * days;
    } else {
        currentOrder[itemId].totalEUR = currentOrder[itemId].priceEUR * currentOrder[itemId].qty;
        currentOrder[itemId].totalCZK = currentOrder[itemId].priceCZK * currentOrder[itemId].qty;
    }
}

// Add a custom item (like wellness fee)
function addCustomItem(itemId, quantity = 1, amount = 0) {
    const item = itemsData[itemId];
    
    if (!currentOrder[itemId]) {
        currentOrder[itemId] = {
            name: item.name,
            customAmount: amount,
            qty: 0,
            totalEUR: 0,
            totalCZK: 0
        };
    }
    
    currentOrder[itemId].qty += quantity;
    currentOrder[itemId].totalEUR = amount;
    currentOrder[itemId].totalCZK = amount * 25; // Approximate conversion
}

// Remove an item from the current order
function removeItem(itemId, quantity = 1) {
    if (currentOrder[itemId]) {
        currentOrder[itemId].qty -= quantity;
        
        if (currentOrder[itemId].qty <= 0) {
            delete currentOrder[itemId];
        } else {
            if (itemsData[itemId].isPerPersonDay) {
                const people = currentOrder[itemId].people;
                const days = currentOrder[itemId].days;
                currentOrder[itemId].totalEUR = currentOrder[itemId].priceEUR * people * days;
                currentOrder[itemId].totalCZK = currentOrder[itemId].priceCZK * people * days;
            } else if (itemsData[itemId].isCustom) {
                const amount = currentOrder[itemId].customAmount;
                currentOrder[itemId].totalEUR = amount;
                currentOrder[itemId].totalCZK = amount * 25;
            } else {
                currentOrder[itemId].totalEUR = currentOrder[itemId].priceEUR * currentOrder[itemId].qty;
                currentOrder[itemId].totalCZK = currentOrder[itemId].priceCZK * currentOrder[itemId].qty;
            }
        }
    }
}

// Update the order summary
function updateOrderSummary() {
    const totalItems = getTotalItems();
    const totalAmount = getTotalAmount();
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2) + ' EUR';
}

// Update the payment summary
function updatePaymentSummary() {
    const totalItems = getTotalItems();
    const totalAmount = getTotalAmount();
    
    document.getElementById('paymentTotalItems').textContent = totalItems;
    document.getElementById('paymentTotalAmount').textContent = totalAmount.toFixed(2) + ' EUR';
}

// Get the total number of items in the order
function getTotalItems() {
    let total = 0;
    
    for (const itemId in currentOrder) {
        total += currentOrder[itemId].qty;
    }
    
    return total;
}

// Get the total amount of the order in EUR
function getTotalAmount() {
    let total = 0;
    
    for (const itemId in currentOrder) {
        total += currentOrder[itemId].totalEUR;
    }
    
    return total;
}

// Complete the order
async function completeOrder() {
    // Show loading indicator
    showLoading();
    
    try {
        // Get the current date and time
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        const dateTimeStr = `${dateStr} ${timeStr}`;
        
        // Create order object for history
        const order = {
            id: Date.now(),
            villa: getVillaName(currentVilla),
            villaId: currentVilla,
            date: dateTimeStr,
            timestamp: now.getTime(),
            items: { ...currentOrder },
            totalItems: getTotalItems(),
            totalAmount: getTotalAmount(),
            payment: currentPayment
        };
        
        // Add to order history
        orderHistory.unshift(order);
        
        // Save to localStorage and IndexedDB
        await saveOrderHistory();
        
        // Generate receipt
        generateReceipt(order);
        
        // Hide loading indicator
        hideLoading();
        
        // Show receipt screen
        showScreen('receiptScreen');
    } catch (error) {
        console.error('Chyba při dokončování objednávky:', error);
        hideLoading();
        showNotification('Došlo k chybě při dokončování objednávky');
    }
}

// Generate receipt
function generateReceipt(order) {
    document.getElementById('receiptVilla').textContent = order.villa;
    document.getElementById('receiptDate').textContent = order.date;
    
    const receiptItemsContainer = document.getElementById('receiptItems');
    receiptItemsContainer.innerHTML = '';
    
    for (const itemId in order.items) {
        const item = order.items[itemId];
        
        const receiptItem = document.createElement('div');
        receiptItem.className = 'receipt-item';
        
        const itemLeft = document.createElement('div');
        itemLeft.className = 'receipt-item-left';
        
        const itemName = document.createElement('div');
        itemName.className = 'receipt-item-name';
        itemName.textContent = item.name;
        
        const itemQty = document.createElement('div');
        itemQty.className = 'receipt-item-qty';
        
        if (itemId === 'city-tax') {
            itemQty.textContent = `${item.qty}x (${item.people} people, ${item.days} days)`;
        } else {
            itemQty.textContent = `${item.qty}x`;
        }
        
        itemLeft.appendChild(itemName);
        itemLeft.appendChild(itemQty);
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'receipt-item-price';
        itemPrice.textContent = `${item.totalEUR.toFixed(2)} EUR`;
        
        receiptItem.appendChild(itemLeft);
        receiptItem.appendChild(itemPrice);
        
        receiptItemsContainer.appendChild(receiptItem);
    }
    
    document.getElementById('receiptTotal').textContent = `${order.totalAmount.toFixed(2)} EUR`;
    
    const paymentText = {
        'cash': 'Paid with Cash',
        'card': 'Paid with Card',
        'unpaid': 'Unpaid (Pay Later)'
    };
    
    const receiptPayment = document.getElementById('receiptPayment');
    receiptPayment.textContent = paymentText[order.payment];
    
    if (order.payment === 'unpaid') {
        receiptPayment.classList.add('receipt-unpaid');
    } else {
        receiptPayment.classList.remove('receipt-unpaid');
    }
}

// Share receipt
function shareReceipt() {
    if (navigator.share) {
        const receiptText = generateReceiptText();
        
        navigator.share({
            title: 'Villa Receipt',
            text: receiptText
        }).catch(error => {
            console.error('Error sharing:', error);
        });
    } else {
        showNotification("Sharing is not supported on this device");
    }
}

// Generate receipt text for sharing
function generateReceiptText() {
    const villa = document.getElementById('receiptVilla').textContent;
    const date = document.getElementById('receiptDate').textContent;
    const total = document.getElementById('receiptTotal').textContent;
    const payment = document.getElementById('receiptPayment').textContent;
    
    let text = `RECEIPT\n${villa}\n${date}\n\n`;
    
    const items = currentOrder;
    for (const itemId in items) {
        const item = items[itemId];
        text += `${item.name} x${item.qty}: ${item.totalEUR.toFixed(2)} EUR\n`;
    }
    
    text += `\nTotal: ${total}\n${payment}`;
    
    return text;
}

// Save receipt as PDF
function saveReceiptAsPDF() {
    showNotification("Preparing PDF...");
    
    const { jsPDF } = window.jspdf;
    const receiptElement = document.getElementById('receiptContent');
    
    html2canvas(receiptElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5'
        });
        
        const imgWidth = 148; // A5 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('receipt.pdf');
    });
}

// Load order history from localStorage or IndexedDB
async function loadOrderHistory() {
    try {
        orderHistory = await loadDataAsync('orderHistory', []);
        renderOrderHistory();
    } catch (error) {
        console.error('Chyba při načítání historie objednávek:', error);
        orderHistory = [];
    }
}

// Save order history to localStorage and IndexedDB
async function saveOrderHistory() {
    try {
        await saveDataAsync('orderHistory', orderHistory);
    } catch (error) {
        console.error('Chyba při ukládání historie objednávek:', error);
        // Fallback na localStorage
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
}

// Render order history
function renderOrderHistory() {
    const historyContainer = document.getElementById('orderHistory');
    
    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <div>No orders yet</div>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = '';
    
    orderHistory.forEach(order => {
        const historyItem = document.createElement('div');
        historyItem.className = 'order-history-item';
        
        const header = document.createElement('div');
        header.className = 'order-history-header';
        
        const villaDate = document.createElement('div');
        
        const villa = document.createElement('div');
        villa.className = 'order-history-villa';
        villa.textContent = order.villa;
        
        const date = document.createElement('div');
        date.className = 'order-history-date';
        date.textContent = order.date;
        
        villaDate.appendChild(villa);
        villaDate.appendChild(date);
        
        const total = document.createElement('div');
        total.className = 'order-history-total';
        total.textContent = `${order.totalAmount.toFixed(2)} EUR`;
        
        header.appendChild(villaDate);
        header.appendChild(total);
        
        const payment = document.createElement('div');
        payment.className = order.payment === 'unpaid' ? 'order-history-payment unpaid' : 'order-history-payment';
        
        const paymentText = {
            'cash': 'Paid with Cash',
            'card': 'Paid with Card',
            'unpaid': 'Unpaid (Pay Later)'
        };
        
        payment.textContent = paymentText[order.payment];
        
        historyItem.appendChild(header);
        historyItem.appendChild(payment);
        
        historyItem.addEventListener('click', () => {
            showOrderDetails(order);
        });
        
        historyContainer.appendChild(historyItem);
    });
}

// Show order details
function showOrderDetails(order) {
    currentOrder = { ...order.items };
    currentVilla = order.villaId;
    currentPayment = order.payment;
    
    generateReceipt(order);
    showScreen('receiptScreen');
}

// Show a specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    document.getElementById(screenId).classList.add('active');
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

// Show success notification
function notifySuccess(message) {
    showNotification(message);
}

// Show info notification
function notifyInfo(message) {
    showNotification(message);
}

// Show warning notification
function notifyWarning(message) {
    showNotification(message);
}

// Show loading indicator
function showLoading() {
    document.querySelector('.loading').style.display = 'flex';
}

// Hide loading indicator
function hideLoading() {
    document.querySelector('.loading').style.display = 'none';
}

// Get villa name from ID
function getVillaName(villaId) {
    const villaNames = {
        'little-castle': 'The Little Castle',
        'amazing-villa': 'Amazing Villa',
        'oh-yeah-villa': 'Oh Yeah Villa'
    };
    
    return villaNames[villaId] || 'Unknown Villa';
}

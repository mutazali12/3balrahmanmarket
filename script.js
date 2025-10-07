// بيانات المنتجات (كمثال)
const products = [
    {
        id: 1,
        title: "سماعة بلوتوث لاسلكية (Pro V3)",
        description: "سماعات أذن لاسلكية عالية الجودة، صوت نقي، وعمر بطارية يصل إلى 30 ساعة. مقاومة للماء والتعرق. مثالية للرياضة والاستخدام اليومي.",
        price: 199.99,
        image: "https://via.placeholder.com/400x400/0070f3/FFFFFF?text=Bluetooth+Headset",
        category: "سماعات"
    },
    {
        id: 2,
        title: "جراب حماية شفاف فائق النحافة",
        description: "جراب من السيليكون المرن يحمي هاتفك من الصدمات والخدوش دون إضافة حجم كبير. تصميم شفاف لإظهار لون الهاتف الأصلي.",
        price: 49.50,
        image: "https://via.placeholder.com/400x400/94A3B8/FFFFFF?text=Clear+Case",
        category: "جرابات"
    },
    {
        id: 3,
        title: "شاحن لاسلكي سريع (15W)",
        description: "قاعدة شحن لاسلكية بتصميم أنيق. شحن سريع بقوة 15 واط متوافق مع جميع الهواتف التي تدعم Qi.",
        price: 99.00,
        image: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Wireless+Charger",
        category: "شواحن"
    },
    {
        id: 4,
        title: "استيكر حماية شاشة نانو كريستال",
        description: "طبقة حماية من الزجاج المقوى (Nano-Crystal) لحماية شاشتك من الكسر والخدوش. شفافية عالية جداً ولا يؤثر على اللمس.",
        price: 29.99,
        image: "https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Screen+Protector",
        category: "استيكرات"
    }
    // يمكن إضافة المزيد من المنتجات هنا
];

let cart = []; // سلة المشتريات
const productsGrid = document.querySelector('.products-grid');
const cartCountElement = document.getElementById('cart-count');
const modal = document.getElementById("product-modal");
const modalDetails = document.getElementById("modal-details");
const closeModalButton = document.querySelector(".close-button");

/**
 * دالة إنشاء بطاقة المنتج (Product Card)
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // صورة المنتج
    const image = document.createElement('img');
    image.classList.add('product-image');
    image.src = product.image;
    image.alt = product.title;

    // معلومات المنتج
    const info = document.createElement('div');
    info.classList.add('product-info');

    const title = document.createElement('h2');
    title.classList.add('product-title');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = `${product.price.toFixed(2)} ر.س`; // تنسيق السعر

    // زر إضافة للسلة
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.textContent = '🛒 إضافة للسلة';
    addToCartButton.addEventListener('click', (e) => {
        e.stopPropagation(); // منع فتح الـ Modal عند الضغط على الزر
        addToCart(product);
    });

    // تجميع العناصر
    info.appendChild(title);
    info.appendChild(price);
    info.appendChild(addToCartButton);

    card.appendChild(image);
    card.appendChild(info);

    // إضافة مستمع لفتح تفاصيل المنتج عند النقر على البطاقة (عدا زر الإضافة)
    card.addEventListener('click', () => showProductDetails(product));

    return card;
}

/**
 * دالة عرض المنتجات في الصفحة
 */
function renderProducts() {
    products.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

/**
 * دالة لإضافة منتج إلى السلة وتحديث العدد في الهيدر
 */
function addToCart(product) {
    cart.push(product);
    cartCountElement.textContent = cart.length;
    // يمكن هنا إضافة منطق لحفظ السلة في localStorage وعرض قائمة مفصلة
    alert(`${product.title} تمت إضافته إلى السلة بنجاح!`);
}

/**
 * دالة لعرض تفاصيل المنتج في نافذة Modal
 */
function showProductDetails(product) {
    // بناء محتوى الـ Modal
    modalDetails.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="modal-text-content">
            <h2>${product.title}</h2>
            <p class="modal-description">${product.description}</p>
            <p class="modal-price">${product.price.toFixed(2)} ر.س</p>
            <button class="add-to-cart-btn" id="modal-add-to-cart">🛒 اطلب الآن</button>
        </div>
    `;

    // إضافة مستمع لزر "اطلب الآن" داخل النافذة
    document.getElementById('modal-add-to-cart').addEventListener('click', () => {
        addToCart(product);
        modal.style.display = "none"; // إغلاق النافذة بعد الإضافة
    });

    modal.style.display = "block"; // إظهار النافذة
}

// ------------------ منطق الـ Modal ------------------
// إغلاق الـ Modal عند الضغط على زر الإغلاق (X)
closeModalButton.onclick = function() {
    modal.style.display = "none";
}

// إغلاق الـ Modal عند الضغط خارجها
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// عرض رسالة بسيطة عند النقر على أيقونة السلة في الهيدر
document.getElementById('cart-icon').addEventListener('click', () => {
    alert(`لديك ${cart.length} منتج في السلة. (هذا المكان مخصص لصفحة السلة الكاملة)`);
});

// بدء عرض المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderProducts);

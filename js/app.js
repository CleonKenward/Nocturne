// Atur nomor WhatsApp toko di sini, gunakan format internasional tanpa tanda + atau spasi.
// Contoh Indonesia: 6281234567890. Kosongkan untuk membuka WhatsApp dengan pesan siap salin.
const WHATSAPP_NUMBER = '';
const CART_STORAGE_KEY = 'nocturne-cart-v1';

const products = [
  {
    id: 'velvet-dusk',
    name: 'Velvet Dusk',
    category: 'Woody',
    size: '50 ml',
    price: 189000,
    description: 'Kayu cedar, amber hangat, dan sedikit misteri.',
    visual: 'amber',
    badge: 'Bestseller',
    number: '01'
  },
  {
    id: 'moonlit-bloom',
    name: 'Moonlit Bloom',
    category: 'Floral',
    size: '30 ml',
    price: 149000,
    description: 'Melati malam yang lembut dengan sentuhan musk.',
    visual: 'violet',
    badge: 'Favorit',
    number: '02'
  },
  {
    id: 'witching-hour',
    name: 'Witching Hour',
    category: 'Sweet',
    size: '50 ml',
    price: 199000,
    description: 'Vanila gelap, tonka, dan rempah yang memikat.',
    visual: 'moss',
    badge: 'Edisi malam',
    number: '03'
  },
  {
    id: 'velvet-rose',
    name: 'Velvet Rose',
    category: 'Floral',
    size: '30 ml',
    price: 159000,
    description: 'Mawar merah, buah beri, dan jejak amber.',
    visual: 'rose',
    badge: '',
    number: '04'
  },
  {
    id: 'ghost-in-the-woods',
    name: 'Ghost in the Woods',
    category: 'Fresh',
    size: '50 ml',
    price: 179000,
    description: 'Bergamot segar yang berakhir dengan vetiver.',
    visual: 'midnight',
    badge: 'Baru',
    number: '05'
  },
  {
    id: 'pumpkin-noir',
    name: 'Pumpkin Noir',
    category: 'Sweet',
    size: '30 ml',
    price: 139000,
    description: 'Labu panggang, kayu manis, dan gula karamel.',
    visual: 'cream',
    badge: '',
    number: '06'
  }
];

const money = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

const productGrid = document.querySelector('[data-product-grid]');
const searchInput = document.querySelector('[data-search]');
const filterList = document.querySelector('[data-filter-list]');
const emptyResults = document.querySelector('[data-empty-results]');
const resultsNote = document.querySelector('[data-results-note]');
const cartDialog = document.querySelector('[data-cart-dialog]');
const cartItems = document.querySelector('[data-cart-items]');
const cartEmpty = document.querySelector('[data-cart-empty]');
const cartFooter = document.querySelector('[data-cart-footer]');
const cartSubtotal = document.querySelector('[data-cart-subtotal]');
const checkoutButton = document.querySelector('[data-checkout-button]');
const checkoutStatus = document.querySelector('[data-checkout-status]');
const checkoutForm = document.querySelector('[data-checkout-form]');
const toast = document.querySelector('[data-toast]');

let activeCategory = 'Semua';
let toastTimeout;
let cart = loadCart();

function loadCart() {
  try {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
    if (!storedCart || typeof storedCart !== 'object' || Array.isArray(storedCart)) return {};
    return Object.fromEntries(
      Object.entries(storedCart)
        .filter(([id, quantity]) => products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0)
        .map(([id, quantity]) => [id, Math.min(quantity, 99)])
    );
  } catch {
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    showToast('Keranjang hanya tersimpan selama halaman ini dibuka.');
  }
}

function formatPrice(price) {
  return money.format(price).replace(/\u00a0/g, '');
}

function productArt(product, compact = false) {
  return `
    <div class="product-art${compact ? ` cart-item-art product-art--${product.visual}` : ` product-art--${product.visual}`}" >
      ${compact ? '' : `<span class="product-badge">${product.badge || product.category}</span><span class="art-moon" aria-hidden="true"></span><span class="art-spark" aria-hidden="true">✳</span><span class="art-spark art-spark--second" aria-hidden="true">✦</span><span class="art-number">${product.number} / 06</span>`}
      <div class="product-bottle" aria-hidden="true"><div class="product-bottle-core"><span class="bottle-label">NOCTURNE<small>EAU DE PARFUM</small></span></div></div>
    </div>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase('id-ID');
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('id-ID').includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      ${productArt(product)}
      <div class="product-info">
        <div class="product-meta"><span>${product.category}</span><span>${product.size}</span></div>
        <div class="product-title-row"><h3>${product.name}</h3><strong>${formatPrice(product.price)}</strong></div>
        <p class="product-description">${product.description}</p>
        <button class="add-button" type="button" data-add-to-cart="${product.id}" aria-label="Tambah ${product.name} ke tas">Tambah ke tas <span aria-hidden="true">+</span></button>
      </div>
    </article>`).join('');

  emptyResults.hidden = visibleProducts.length > 0;
  productGrid.hidden = visibleProducts.length === 0;
  resultsNote.textContent = `${visibleProducts.length} aroma untuk ditemukan`;
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function getCartCount() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function getCartTotal() {
  return getCartEntries().reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
}

function renderCart() {
  const entries = getCartEntries();
  const count = getCartCount();
  const countLabel = count > 99 ? '99+' : String(count);
  document.querySelector('[data-cart-count]').textContent = countLabel;
  document.querySelector('[data-open-cart]').setAttribute('aria-label', `Buka keranjang, ${count} item`);
  cartEmpty.hidden = entries.length > 0;
  cartFooter.hidden = entries.length === 0;
  checkoutButton.disabled = entries.length === 0;
  cartSubtotal.textContent = formatPrice(getCartTotal());

  cartItems.innerHTML = entries.map(({ product, quantity }) => `
    <article class="cart-item">
      ${productArt(product, true)}
      <div>
        <h3 class="cart-item-name">${product.name}</h3>
        <div class="cart-item-price">${product.size} · ${formatPrice(product.price)}</div>
        <div class="quantity-control" aria-label="Jumlah ${product.name}">
          <button type="button" data-cart-action="decrease" data-product-id="${product.id}" aria-label="Kurangi ${product.name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-cart-action="increase" data-product-id="${product.id}" aria-label="Tambah ${product.name}">+</button>
        </div>
      </div>
      <div class="cart-item-end"><strong class="cart-line-total">${formatPrice(product.price * quantity)}</strong><button class="remove-item" type="button" data-cart-action="remove" data-product-id="${product.id}">Hapus</button></div>
    </article>`).join('');
}

function updateCart() {
  saveCart();
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  cart[id] = Math.min((cart[id] || 0) + 1, 99);
  updateCart();
  showToast(`${product.name} masuk ke tas.`);
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add-to-cart]');
  if (button) addToCart(button.dataset.addToCart);
});

filterList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  filterList.querySelectorAll('[data-category]').forEach((chip) => {
    const isActive = chip === button;
    chip.classList.toggle('is-active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
  renderProducts();
});

searchInput.addEventListener('input', renderProducts);
document.querySelector('[data-reset-filters]').addEventListener('click', () => {
  activeCategory = 'Semua';
  searchInput.value = '';
  filterList.querySelectorAll('[data-category]').forEach((chip) => {
    const isActive = chip.dataset.category === 'Semua';
    chip.classList.toggle('is-active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
  renderProducts();
  searchInput.focus();
});

document.querySelectorAll('[data-open-cart]').forEach((button) => button.addEventListener('click', () => {
  renderCart();
  checkoutStatus.textContent = '';
  cartDialog.showModal();
}));

document.querySelector('[data-close-cart]').addEventListener('click', () => cartDialog.close());
document.querySelector('[data-continue-shopping]').addEventListener('click', () => cartDialog.close());
cartDialog.addEventListener('click', (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-cart-action]');
  if (!button) return;
  const { productId, cartAction } = button.dataset;
  if (!cart[productId]) return;
  if (cartAction === 'increase') cart[productId] = Math.min(cart[productId] + 1, 99);
  if (cartAction === 'decrease') cart[productId] -= 1;
  if (cartAction === 'remove' || cart[productId] <= 0) delete cart[productId];
  checkoutStatus.textContent = '';
  updateCart();
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const entries = getCartEntries();
  if (!entries.length) return;
  const formData = new FormData(checkoutForm);
  const customerName = String(formData.get('name') || '').trim();
  const address = String(formData.get('address') || '').trim();
  if (!customerName) {
    checkoutStatus.textContent = 'Isi nama kamu terlebih dahulu.';
    checkoutForm.elements.name.focus();
    return;
  }

  const orderLines = entries.map(({ product, quantity }) => `• ${product.name} (${product.size}) x${quantity} — ${formatPrice(product.price * quantity)}`);
  const message = [
    'Halo Nocturne, saya ingin memesan:',
    '',
    ...orderLines,
    '',
    `Subtotal: ${formatPrice(getCartTotal())}`,
    `Nama: ${customerName}`,
    ...(address ? [`Alamat: ${address}`] : [])
  ].join('\n');
  const phone = WHATSAPP_NUMBER.replace(/\D/g, '');
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  checkoutStatus.textContent = phone
    ? 'Pesan WhatsApp sudah disiapkan. Silakan kirim untuk konfirmasi.'
    : 'Pilih kontak toko di WhatsApp. Atur nomor toko di js/app.js agar chat terbuka langsung.';
});

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Buka navigasi' : 'Tutup navigasi');
  primaryNav.classList.toggle('is-open', !isOpen);
});
primaryNav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  primaryNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Buka navigasi');
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
renderProducts();
renderCart();

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "accademia-futuro-state-v1";
  const ADMIN_SESSION_KEY = "accademia-futuro-admin-session";
  const ADMIN_CODE = "Luca10082004!";

  const defaultState = {
    settings: {
      contactEmail: "Accademiafuturo@gmail.com",
      notificationEmail: "Accademiafuturo@gmail.com",
      contactNote: "Tempi di risposta: 24 Ore. In questa fase il progetto è operativo in modo leggero e progressivo."
    },
    faq: [
      {
        question: "Che tipo di prodotti troverò qui?",
        answer: "E-book digitali pratici, guide operative e risorse pensate per l’apprendimento autonomo."
      },
      {
        question: "Come riceverò il prodotto?",
        answer: "Se il prodotto è disponibile e collegato a un checkout esterno, dopo il pagamento riceverai l’accesso o il download secondo il flusso impostato."
      },
      {
        question: "Serve un account per leggere gli e-book?",
        answer: "No. L’obiettivo è mantenere un’esperienza semplice, leggera e accessibile."
      }
    ],
    products: [
      {
        id: "p1",
        slug: "guida-pratica-ai-lavorare-meglio",
        title: "Guida pratica all’AI per lavorare meglio",
        shortDescription: "Un e-book introduttivo per capire come usare strumenti AI in modo concreto, semplice e utile nella vita professionale.",
        description: "Una guida introduttiva, semplice ma operativa, per chi vuole usare l’AI con più criterio nel lavoro quotidiano. Pensata per utenti non tecnici e orientata a casi d’uso reali.",
        features: [
          "Una spiegazione semplice di cosa può fare davvero l’AI",
          "Esempi d’uso pratico nel lavoro quotidiano",
          "Consigli per evitare errori comuni",
          "Un approccio orientato all’utilità, non all’hype"
        ],
        price: null,
        format: "PDF",
        audience: "Principianti",
        category: "AI e strumenti digitali",
        badge: "In evidenza",
        status: "available",
        featured: true,
        checkoutUrl: "[MISSING_CHECKOUT_URL]",
        downloadUrl: "[MISSING_DOWNLOAD_URL]"
      },
      {
        id: "p2",
        slug: "metodo-personale-lavorare-ordine",
        title: "Metodo personale per lavorare con più ordine",
        shortDescription: "Una guida digitale per migliorare organizzazione, concentrazione e gestione del tempo in modo sostenibile.",
        description: "Una risorsa pratica per chi vuole costruire un metodo personale più ordinato, sostenibile e utile nel tempo.",
        features: [
          "Organizzazione personale più chiara",
          "Routine e struttura minima sostenibile",
          "Riduzione del caos operativo",
          "Metodo semplice da applicare"
        ],
        price: null,
        format: "PDF",
        audience: "Pratico",
        category: "Produttività e metodo",
        badge: "Nuovo",
        status: "coming_soon",
        featured: true,
        checkoutUrl: "",
        downloadUrl: ""
      },
      {
        id: "p3",
        slug: "comunicare-meglio-online",
        title: "Comunicare meglio online in modo semplice",
        shortDescription: "Un e-book pensato per migliorare chiarezza, tono, struttura e qualità dei messaggi nel lavoro digitale.",
        description: "Una guida pensata per migliorare chiarezza, tono, struttura e qualità dei messaggi nel lavoro digitale.",
        features: [
          "Messaggi più chiari e leggibili",
          "Meno fraintendimenti nel lavoro digitale",
          "Miglior tono professionale",
          "Struttura semplice e replicabile"
        ],
        price: null,
        format: "PDF",
        audience: "Lavoro",
        category: "Comunicazione e competenze pratiche",
        badge: "Essenziale",
        status: "coming_soon",
        featured: true,
        checkoutUrl: "",
        downloadUrl: ""
      }
    ]
  };

  const state = loadState();

  const dom = {
    featuredGrid: document.getElementById("featured-grid"),
    catalogGrid: document.getElementById("catalog-grid"),
    faqGrid: document.getElementById("faq-grid"),
    productLayout: document.getElementById("product-layout"),
    contactsCard: document.getElementById("contacts-card"),
    catalogSummary: document.getElementById("catalog-summary"),
    categoryFilter: document.getElementById("category-filter"),
    statusFilter: document.getElementById("status-filter"),
    sortFilter: document.getElementById("sort-filter"),
    searchInput: document.getElementById("search-input"),
    heroCategories: document.getElementById("hero-categories"),
    toast: document.getElementById("toast"),

    navToggle: document.querySelector("[data-toggle-nav]"),
    navLinks: document.getElementById("nav-links"),
    openAdminButtons: document.querySelectorAll("[data-open-admin], [data-open-admin-link]"),

    adminLoginForm: document.getElementById("admin-login-form"),
    adminPassword: document.getElementById("admin-password"),
    adminLoginBox: document.getElementById("admin-login-box"),
    adminSessionBox: document.getElementById("admin-session-box"),
    logoutAdmin: document.getElementById("logout-admin"),
    adminTabButtons: document.querySelectorAll("[data-admin-tab]"),
    adminPanels: document.querySelectorAll(".admin-panel"),
    auditGrid: document.getElementById("audit-grid"),
    auditList: document.getElementById("audit-list"),
    runAudit: document.getElementById("run-audit"),

    productForm: document.getElementById("product-form"),
    productId: document.getElementById("product-id"),
    productTitle: document.getElementById("product-title"),
    productSlug: document.getElementById("product-slug"),
    productPrice: document.getElementById("product-price"),
    productCategory: document.getElementById("product-category"),
    productBadge: document.getElementById("product-badge"),
    productStatus: document.getElementById("product-status"),
    productFormat: document.getElementById("product-format"),
    productAudience: document.getElementById("product-audience"),
    productCheckoutUrl: document.getElementById("product-checkout-url"),
    productDownloadUrl: document.getElementById("product-download-url"),
    productFeatured: document.getElementById("product-featured"),
    productShortDescription: document.getElementById("product-short-description"),
    productDescription: document.getElementById("product-description"),
    productFeatures: document.getElementById("product-features"),
    deleteProduct: document.getElementById("delete-product"),
    resetProductForm: document.getElementById("reset-product-form"),
    productAdminList: document.getElementById("product-admin-list"),

    settingsForm: document.getElementById("settings-form"),
    contactEmail: document.getElementById("contact-email"),
    notificationEmail: document.getElementById("notification-email"),
    contactNote: document.getElementById("contact-note"),

    backupOutput: document.getElementById("backup-output"),
    backupInput: document.getElementById("backup-input"),
    refreshBackup: document.getElementById("refresh-backup"),
    importBackup: document.getElementById("import-backup"),
    resetDemoData: document.getElementById("reset-demo-data")
  };

  let uiState = {
    selectedProductId: state.products[0]?.id || null,
    search: "",
    category: "all",
    status: "all",
    sort: "featured"
  };

  init();

  function init() {
    bindEvents();
    hydrateSettingsForm();
    renderAll();
    syncAdminSession();
    openProductFromHash();
  }

  function bindEvents() {
    dom.searchInput.addEventListener("input", (event) => {
      uiState.search = event.target.value.trim().toLowerCase();
      renderCatalog();
    });

    dom.categoryFilter.addEventListener("change", (event) => {
      uiState.category = event.target.value;
      renderCatalog();
    });

    dom.statusFilter.addEventListener("change", (event) => {
      uiState.status = event.target.value;
      renderCatalog();
    });

    dom.sortFilter.addEventListener("change", (event) => {
      uiState.sort = event.target.value;
      renderCatalog();
    });

    dom.navToggle?.addEventListener("click", () => {
      const isOpen = dom.navLinks.classList.toggle("open");
      dom.navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    dom.openAdminButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("admin").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    dom.adminLoginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const code = dom.adminPassword.value.trim();

      if (!code) {
        toast("Inserisci un codice admin.");
        return;
      }

      if (code !== ADMIN_CODE) {
        toast("Codice admin non corretto.");
        return;
      }

      localStorage.setItem(ADMIN_SESSION_KEY, "active");
      dom.adminPassword.value = "";
      syncAdminSession();
      toast("Vista admin sbloccata.");
    });

    dom.logoutAdmin.addEventListener("click", () => {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      syncAdminSession();
      toast("Sessione admin chiusa.");
    });

    dom.adminTabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        dom.adminTabButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const target = button.dataset.adminTab;
        dom.adminPanels.forEach((panel) => {
          panel.classList.toggle("active", panel.id === `admin-panel-${target}`);
        });
      });
    });

    dom.runAudit.addEventListener("click", () => {
      renderAudit();
      toast("Controlli aggiornati.");
    });

    dom.productForm.addEventListener("submit", (event) => {
      event.preventDefault();
      upsertProductFromForm();
    });

    dom.deleteProduct.addEventListener("click", () => {
      const id = dom.productId.value;
      if (!id) {
        toast("Seleziona prima un prodotto da rimuovere.");
        return;
      }

      const index = state.products.findIndex((product) => product.id === id);
      if (index === -1) {
        toast("Prodotto non trovato.");
        return;
      }

      state.products.splice(index, 1);

      if (uiState.selectedProductId === id) {
        uiState.selectedProductId = state.products[0]?.id || null;
      }

      persist();
      clearProductForm();
      renderAll();
      toast("Prodotto rimosso.");
    });

    dom.resetProductForm.addEventListener("click", () => {
      clearProductForm();
      toast("Form pronto per un nuovo prodotto.");
    });

    dom.settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.settings.contactEmail = dom.contactEmail.value.trim() || "[MISSING_EMAIL]";
      state.settings.notificationEmail = dom.notificationEmail.value.trim() || "[MISSING_NOTIFICATION_EMAIL]";
      state.settings.contactNote = dom.contactNote.value.trim() || "[MISSING]";
      persist();
      renderContacts();
      renderAudit();
      refreshBackup();
      toast("Impostazioni salvate.");
    });

    dom.refreshBackup.addEventListener("click", () => {
      refreshBackup();
      toast("Export JSON aggiornato.");
    });

    dom.importBackup.addEventListener("click", () => {
      try {
        const parsed = JSON.parse(dom.backupInput.value);
        if (!parsed || typeof parsed !== "object") {
          throw new Error("Formato non valido");
        }
        if (!Array.isArray(parsed.products) || !parsed.settings) {
          throw new Error("JSON incompleto");
        }

        state.settings = parsed.settings;
        state.products = parsed.products;
        state.faq = Array.isArray(parsed.faq) ? parsed.faq : defaultState.faq;

        uiState.selectedProductId = state.products[0]?.id || null;

        persist();
        hydrateSettingsForm();
        clearProductForm();
        renderAll();
        toast("Import completato.");
      } catch (error) {
        toast("JSON non valido. Controlla il contenuto incollato.");
      }
    });

    dom.resetDemoData.addEventListener("click", () => {
      const fresh = structuredClone(defaultState);
      state.settings = fresh.settings;
      state.products = fresh.products;
      state.faq = fresh.faq;
      uiState.selectedProductId = state.products[0]?.id || null;
      persist();
      hydrateSettingsForm();
      clearProductForm();
      renderAll();
      toast("Dati demo ripristinati.");
    });

    window.addEventListener("hashchange", openProductFromHash);
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return structuredClone(defaultState);

      const parsed = JSON.parse(saved);
      return {
        settings: {
          ...defaultState.settings,
          ...(parsed.settings || {})
        },
        faq: Array.isArray(parsed.faq) ? parsed.faq : structuredClone(defaultState.faq),
        products: Array.isArray(parsed.products) && parsed.products.length
          ? parsed.products
          : structuredClone(defaultState.products)
      };
    } catch (error) {
      return structuredClone(defaultState);
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshBackup();
  }

  function renderAll() {
    renderHeroCategories();
    renderFeatured();
    renderCatalog();
    renderProductDetail();
    renderFaq();
    renderContacts();
    renderProductAdminList();
    renderAudit();
    refreshBackup();
  }

  function renderHeroCategories() {
    const categories = [...new Set(state.products.map((product) => product.category).filter(Boolean))];
    dom.heroCategories.innerHTML = categories
      .slice(0, 4)
      .map((category) => `<li>${escapeHtml(category)}</li>`)
      .join("");
  }

  function renderFeatured() {
    const featured = state.products.filter((product) => product.featured).slice(0, 3);

    if (!featured.length) {
      dom.featuredGrid.innerHTML = `<div class="empty-state">Nessun prodotto in evidenza configurato.</div>`;
      return;
    }

    dom.featuredGrid.innerHTML = featured.map((product) => productCard(product, true)).join("");
    bindProductButtons(dom.featuredGrid);
  }

  function renderCatalog() {
    populateCategoryFilter();

    const filtered = getFilteredProducts();
    dom.catalogSummary.textContent = `${filtered.length} prodotto/i mostrato/i su ${state.products.length}.`;

    if (!filtered.length) {
      dom.catalogGrid.innerHTML = `
        <div class="empty-state">
          Nessun prodotto trovato con i filtri attuali. Modifica ricerca o filtri per vedere altri risultati.
        </div>
      `;
      return;
    }

    dom.catalogGrid.innerHTML = filtered.map((product) => productCard(product, false)).join("");
    bindProductButtons(dom.catalogGrid);
  }

  function renderProductDetail() {
    const product = state.products.find((item) => item.id === uiState.selectedProductId) || state.products[0];

    if (!product) {
      dom.productLayout.innerHTML = `<div class="empty-state">Nessun prodotto disponibile.</div>`;
      return;
    }

    uiState.selectedProductId = product.id;

    const priceLabel = formatPrice(product.price);
    const statusLabel = getStatusLabel(product.status);
    const purchaseButton = product.status === "available" && product.checkoutUrl && !product.checkoutUrl.includes("[MISSING")
      ? `<a class="btn btn-primary" href="${escapeAttribute(product.checkoutUrl)}" target="_blank" rel="noopener noreferrer">Acquista ora</a>`
      : `<button class="btn btn-primary btn-disabled" type="button" disabled>Checkout da collegare</button>`;

    dom.productLayout.innerHTML = `
      <div class="product-box">
        <div class="badge ${statusClass(product.status)}">${escapeHtml(product.badge || statusLabel)}</div>
        <h2>${escapeHtml(product.title)}</h2>
        <p>${escapeHtml(product.description || product.shortDescription || "")}</p>

        <h2>Cosa troverai dentro</h2>
        <ul class="list-clean">
          ${(product.features || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>

        <h2>Per chi è pensato</h2>
        <p>${escapeHtml(product.audience || "[MISSING]")}</p>

        <h2>Formato</h2>
        <p>${escapeHtml(product.format || "[MISSING]")}</p>

        <h2>Categoria</h2>
        <p>${escapeHtml(product.category || "[MISSING]")}</p>

        <h2>Nota</h2>
        <p>
          Questa scheda prodotto vive nella stessa pagina del sito e si aggiorna dinamicamente.
          Il pagamento, quando attivato, avviene tramite checkout esterno.
        </p>
      </div>

      <aside class="product-box">
        <div class="product-cover">${escapeHtml(product.title).replaceAll(" ", "<br />")}</div>

        <div style="margin-top:20px;">
          <div class="badge ${statusClass(product.status)}">${escapeHtml(statusLabel)}</div>

          <div class="meta">
            <span>${escapeHtml(product.format || "PDF")}</span>
            <span>${escapeHtml(product.audience || "[MISSING]")}</span>
            <span>${escapeHtml(product.category || "[MISSING]")}</span>
          </div>

          <div class="price-row" style="margin-top:8px;">
            <div class="price">
              <strong>${escapeHtml(priceLabel)}</strong>
              <small>${product.price == null ? "prezzo da definire" : "checkout esterno"}</small>
            </div>
          </div>

          <div class="product-side-actions">
            ${purchaseButton}
            <a class="btn btn-secondary" href="#catalogo">Torna al catalogo</a>
          </div>
        </div>
      </aside>
    `;
  }

  function renderFaq() {
    dom.faqGrid.innerHTML = state.faq.map((item) => `
      <article class="faq-item card">
        <h4>${escapeHtml(item.question)}</h4>
        <p>${escapeHtml(item.answer)}</p>
      </article>
    `).join("");
  }

  function renderContacts() {
    dom.contactsCard.innerHTML = `
      <h2>Scrivici</h2>
      <p>Email di progetto: <strong>${escapeHtml(state.settings.contactEmail || "[MISSING_EMAIL]")}</strong></p>

      <h2>Email notifiche</h2>
      <p><strong>${escapeHtml(state.settings.notificationEmail || "[MISSING_NOTIFICATION_EMAIL]")}</strong></p>

      <h2>Tempi di risposta / nota</h2>
      <p>${escapeHtml(state.settings.contactNote || "[MISSING]")}</p>

      <h2>Nota</h2>
      <p>
        In una fase successiva puoi aggiungere un modulo contatti semplice, una vera casella supporto
        e un sistema di gestione ordini più strutturato.
      </p>
    `;
  }

  function renderProductAdminList() {
    if (!state.products.length) {
      dom.productAdminList.innerHTML = `<div class="empty-state">Nessun prodotto presente.</div>`;
      return;
    }

    dom.productAdminList.innerHTML = state.products.map((product) => `
      <div class="product-admin-item">
        <div>
          <div class="badge ${statusClass(product.status)}">${escapeHtml(getStatusLabel(product.status))}</div>
          <h4>${escapeHtml(product.title)}</h4>
          <p>${escapeHtml(product.category || "[MISSING]")} • ${escapeHtml(formatPrice(product.price))}</p>
        </div>
        <div class="product-admin-actions">
          <button class="btn btn-secondary btn-small" type="button" data-edit-product="${escapeAttribute(product.id)}">Modifica</button>
          <button class="btn btn-secondary btn-small" type="button" data-open-product="${escapeAttribute(product.id)}">Apri scheda</button>
        </div>
      </div>
    `).join("");

    dom.productAdminList.querySelectorAll("[data-edit-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = state.products.find((item) => item.id === button.dataset.editProduct);
        if (!product) return;
        fillProductForm(product);
        document.getElementById("admin-panel-products").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    dom.productAdminList.querySelectorAll("[data-open-product]").forEach((button) => {
      button.addEventListener("click", () => {
        uiState.selectedProductId = button.dataset.openProduct;
        renderProductDetail();
        document.getElementById("prodotto").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderAudit() {
    const products = state.products;
    const missingPrices = products.filter((product) => product.price == null || Number.isNaN(Number(product.price)));
    const availableWithoutCheckout = products.filter((product) => product.status === "available" && !isFilledValue(product.checkoutUrl));
    const missingDescriptions = products.filter((product) => !isFilledValue(product.shortDescription) || !isFilledValue(product.description));
    const duplicateSlugs = getDuplicates(products.map((product) => product.slug).filter(Boolean));
    const missingContactEmail = !isFilledValue(state.settings.contactEmail);
    const missingNotificationEmail = !isFilledValue(state.settings.notificationEmail);

    const issues = [];

    if (products.length === 0) {
      issues.push({ type: "bad", title: "Catalogo vuoto", text: "Non hai nessun prodotto nel catalogo." });
    } else {
      issues.push({ type: "good", title: "Catalogo presente", text: `Prodotti attuali: ${products.length}.` });
    }

    if (missingPrices.length > 0) {
      issues.push({
        type: "warn",
        title: "Prezzi mancanti",
        text: `${missingPrices.length} prodotto/i non hanno un prezzo reale.`
      });
    } else {
      issues.push({
        type: "good",
        title: "Prezzi completi",
        text: "Tutti i prodotti hanno un prezzo valorizzato."
      });
    }

    if (availableWithoutCheckout.length > 0) {
      issues.push({
        type: "bad",
        title: "Prodotti disponibili senza checkout",
        text: `${availableWithoutCheckout.length} prodotto/i risultano disponibili ma non hanno un checkout URL valido.`
      });
    } else {
      issues.push({
        type: "good",
        title: "Checkout coerente",
        text: "I prodotti disponibili hanno un checkout configurato oppure sono correttamente non acquistabili."
      });
    }

    if (missingDescriptions.length > 0) {
      issues.push({
        type: "warn",
        title: "Descrizioni incomplete",
        text: `${missingDescriptions.length} prodotto/i hanno descrizioni mancanti o troppo deboli.`
      });
    } else {
      issues.push({
        type: "good",
        title: "Descrizioni complete",
        text: "Tutti i prodotti hanno descrizione breve e completa."
      });
    }

    if (duplicateSlugs.length > 0) {
      issues.push({
        type: "bad",
        title: "Slug duplicati",
        text: `Slug duplicati trovati: ${duplicateSlugs.join(", ")}.`
      });
    } else {
      issues.push({
        type: "good",
        title: "Slug coerenti",
        text: "Nessun conflitto slug rilevato."
      });
    }

    if (missingContactEmail || missingNotificationEmail) {
      issues.push({
        type: "warn",
        title: "Email non complete",
        text: "Email di contatto o notifiche non ancora configurate in modo reale."
      });
    } else {
      issues.push({
        type: "good",
        title: "Email configurate",
        text: "Email di contatto e notifiche valorizzate."
      });
    }

    dom.auditGrid.innerHTML = `
      <div class="audit-stat">
        <strong>${products.length}</strong>
        <span>Prodotti</span>
      </div>
      <div class="audit-stat">
        <strong>${products.filter((p) => p.status === "available").length}</strong>
        <span>Disponibili</span>
      </div>
      <div class="audit-stat">
        <strong>${missingPrices.length}</strong>
        <span>Prezzi mancanti</span>
      </div>
      <div class="audit-stat">
        <strong>${availableWithoutCheckout.length}</strong>
        <span>Checkout mancanti</span>
      </div>
    `;

    dom.auditList.innerHTML = issues.map((issue) => `
      <div class="audit-item ${issue.type}">
        <h4>${escapeHtml(issue.title)}</h4>
        <p>${escapeHtml(issue.text)}</p>
      </div>
    `).join("");
  }

  function hydrateSettingsForm() {
    dom.contactEmail.value = state.settings.contactEmail || "";
    dom.notificationEmail.value = state.settings.notificationEmail || "";
    dom.contactNote.value = state.settings.contactNote || "";
  }

  function populateCategoryFilter() {
    const currentValue = uiState.category;
    const categories = [...new Set(state.products.map((product) => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it"));

    dom.categoryFilter.innerHTML = `
      <option value="all">Tutte le categorie</option>
      ${categories.map((category) => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join("")}
    `;

    dom.categoryFilter.value = categories.includes(currentValue) || currentValue === "all" ? currentValue : "all";
    uiState.category = dom.categoryFilter.value;
  }

  function getFilteredProducts() {
    const products = [...state.products].filter((product) => {
      const matchSearch = !uiState.search || [
        product.title,
        product.shortDescription,
        product.description,
        product.category,
        product.badge
      ].some((field) => String(field || "").toLowerCase().includes(uiState.search));

      const matchCategory = uiState.category === "all" || product.category === uiState.category;
      const matchStatus = uiState.status === "all" || product.status === uiState.status;

      return matchSearch && matchCategory && matchStatus;
    });

    switch (uiState.sort) {
      case "title-asc":
        products.sort((a, b) => (a.title || "").localeCompare(b.title || "", "it"));
        break;
      case "price-asc":
        products.sort((a, b) => normalizePrice(a.price) - normalizePrice(b.price));
        break;
      case "price-desc":
        products.sort((a, b) => normalizePrice(b.price) - normalizePrice(a.price));
        break;
      case "featured":
      default:
        products.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        break;
    }

    return products;
  }

  function productCard(product, compact) {
    const statusLabel = getStatusLabel(product.status);
    const priceLabel = formatPrice(product.price);
    const primaryAction = product.status === "available" ? "Vedi scheda" : "Scopri dettagli";

    return `
      <article class="course-card">
        <div class="badge ${statusClass(product.status)}">${escapeHtml(product.badge || statusLabel)}</div>
        <h3>${escapeHtml(product.title)}</h3>
        <p>${escapeHtml(product.shortDescription || "")}</p>
        <div class="meta">
          <span>${escapeHtml(product.format || "PDF")}</span>
          <span>${escapeHtml(product.audience || "[MISSING]")}</span>
          <span>${escapeHtml(product.category || "[MISSING]")}</span>
        </div>
        <div class="price-row">
          <div class="price">
            <strong>${escapeHtml(priceLabel)}</strong>
            <small>${product.price == null ? "prezzo da definire" : statusLabel}</small>
          </div>
          <button class="btn btn-primary" type="button" data-product-id="${escapeAttribute(product.id)}">
            ${compact ? "Vedi scheda" : primaryAction}
          </button>
        </div>
      </article>
    `;
  }

  function bindProductButtons(container) {
    container.querySelectorAll("[data-product-id]").forEach((button) => {
      button.addEventListener("click", () => {
        uiState.selectedProductId = button.dataset.productId;
        const product = state.products.find((item) => item.id === uiState.selectedProductId);
        if (product?.slug) {
          history.replaceState(null, "", `#prodotto-${product.slug}`);
        } else {
          history.replaceState(null, "", "#prodotto");
        }
        renderProductDetail();
        document.getElementById("prodotto").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function openProductFromHash() {
    const hash = window.location.hash || "";
    if (!hash.startsWith("#prodotto-")) return;
    const slug = hash.replace("#prodotto-", "");
    const product = state.products.find((item) => item.slug === slug);
    if (!product) return;
    uiState.selectedProductId = product.id;
    renderProductDetail();
  }

  function fillProductForm(product) {
    dom.productId.value = product.id || "";
    dom.productTitle.value = product.title || "";
    dom.productSlug.value = product.slug || "";
    dom.productPrice.value = product.price ?? "";
    dom.productCategory.value = product.category || "";
    dom.productBadge.value = product.badge || "";
    dom.productStatus.value = product.status || "draft";
    dom.productFormat.value = product.format || "";
    dom.productAudience.value = product.audience || "";
    dom.productCheckoutUrl.value = product.checkoutUrl || "";
    dom.productDownloadUrl.value = product.downloadUrl || "";
    dom.productFeatured.checked = Boolean(product.featured);
    dom.productShortDescription.value = product.shortDescription || "";
    dom.productDescription.value = product.description || "";
    dom.productFeatures.value = (product.features || []).join("\n");
  }

  function clearProductForm() {
    dom.productForm.reset();
    dom.productId.value = "";
    dom.productStatus.value = "available";
  }

  function upsertProductFromForm() {
    const id = dom.productId.value.trim() || `p-${Date.now()}`;
    const title = dom.productTitle.value.trim();
    const providedSlug = dom.productSlug.value.trim();
    const slug = sanitizeSlug(providedSlug || title);
    const features = dom.productFeatures.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title) {
      toast("Il titolo prodotto è obbligatorio.");
      return;
    }

    if (!slug) {
      toast("Serve uno slug valido.");
      return;
    }

    const currentProduct = state.products.find((product) => product.id === id);
    const isSlugTaken = state.products.some((product) => product.slug === slug && product.id !== id);
    if (isSlugTaken) {
      toast("Questo slug è già in uso da un altro prodotto.");
      return;
    }

    const rawPrice = dom.productPrice.value.trim();
    const price = rawPrice === "" ? null : Number(rawPrice);

    const product = {
      id,
      slug,
      title,
      shortDescription: dom.productShortDescription.value.trim(),
      description: dom.productDescription.value.trim(),
      features,
      price: Number.isFinite(price) ? price : null,
      format: dom.productFormat.value.trim() || "PDF",
      audience: dom.productAudience.value.trim() || "[MISSING]",
      category: dom.productCategory.value.trim() || "[MISSING]",
      badge: dom.productBadge.value.trim() || getStatusLabel(dom.productStatus.value),
      status: dom.productStatus.value,
      featured: dom.productFeatured.checked,
      checkoutUrl: dom.productCheckoutUrl.value.trim(),
      downloadUrl: dom.productDownloadUrl.value.trim()
    };

    if (currentProduct) {
      Object.assign(currentProduct, product);
      toast("Prodotto aggiornato.");
    } else {
      state.products.unshift(product);
      toast("Prodotto aggiunto.");
    }

    uiState.selectedProductId = id;
    persist();
    renderAll();
    fillProductForm(product);
  }

  function syncAdminSession() {
    const active = localStorage.getItem(ADMIN_SESSION_KEY) === "active";
    dom.adminLoginBox.classList.toggle("hidden", active);
    dom.adminSessionBox.classList.toggle("hidden", !active);
  }

  function refreshBackup() {
    dom.backupOutput.value = JSON.stringify(state, null, 2);
  }

  function formatPrice(value) {
    if (value == null || Number.isNaN(Number(value))) return "€ [MISSING]";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR"
    }).format(Number(value));
  }

  function normalizePrice(value) {
    if (value == null || Number.isNaN(Number(value))) return Number.POSITIVE_INFINITY;
    return Number(value);
  }

  function sanitizeSlug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getStatusLabel(status) {
    const labels = {
      available: "Disponibile",
      coming_soon: "In preparazione",
      draft: "Bozza"
    };
    return labels[status] || "Stato";
  }

  function statusClass(status) {
    return `status-${status}`;
  }

  function getDuplicates(items) {
    const seen = new Set();
    const duplicates = new Set();

    items.forEach((item) => {
      if (seen.has(item)) duplicates.add(item);
      seen.add(item);
    });

    return [...duplicates];
  }

  function isFilledValue(value) {
    const normalized = String(value || "").trim();
    return normalized !== "" && !normalized.includes("[MISSING");
  }

  function toast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("show");
    clearTimeout(dom.toast._timer);
    dom.toast._timer = setTimeout(() => {
      dom.toast.classList.remove("show");
    }, 2400);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
});

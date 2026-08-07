/* =========================================================
   OSOTTO
   ========================================================= */

/* Sayfa yenilenince eski scroll konumuna dönmesini engeller */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});


/* Loader */
window.addEventListener("load", () => {

  window.scrollTo(0, 0);

  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 700);
  }

});


/* Header */
const header = document.querySelector(".header");

const setHeader = () => {
  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 24
  );
};

setHeader();

window.addEventListener(
  "scroll",
  setHeader,
  { passive: true }
);


/* Mobil Menü */
const menu = document.querySelector(".menu");

if (menu) {

  menu.addEventListener("click", () => {
    document.body.classList.toggle("open");
  });

}

document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", () => {
    document.body.classList.remove("open");
  });

});


/* Scroll animasyonları */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  reveals.forEach(item => {
    observer.observe(item);
  });

} else {

  reveals.forEach(item => {
    item.classList.add("visible");
  });

}


/* Hero Slider */
const slides = [
  ...document.querySelectorAll(".slide")
];

const current = document.getElementById("current");

let slideIndex = 0;

if (slides.length > 1) {

  setInterval(() => {

    slides[slideIndex].classList.remove("active");

    slideIndex =
      (slideIndex + 1) % slides.length;

    slides[slideIndex].classList.add("active");

    if (current) {
      current.textContent =
        String(slideIndex + 1).padStart(2, "0");
    }

  }, 4800);

}


/* Bayilik Formu */
const form = document.getElementById("form");

if (form) {

  form.addEventListener("submit", event => {

    event.preventDefault();

    const data = new FormData(form);

    const text =
`Merhaba, OSOTTO toptan satış / bayilik başvurusu yapmak istiyorum.

Ad Soyad: ${data.get("name") || ""}
Firma: ${data.get("company") || ""}
Şehir: ${data.get("city") || ""}
Telefon: ${data.get("phone") || ""}
E-posta: ${data.get("email") || ""}`;

    const url =
      "https://wa.me/905431945858?text=" +
      encodeURIComponent(text);

    window.open(
      url,
      "_blank",
      "noopener"
    );

  });

}


/* Ürün Detay Modalı */
const modal =
  document.getElementById("modal");

const modalTitle =
  document.getElementById("modalTitle");

const modalImg =
  document.getElementById("modalImg");

const modalLink =
  document.getElementById("modalLink");


document
  .querySelectorAll(".card")
  .forEach(card => {

    const button =
      card.querySelector("button");

    if (!button) return;

    button.addEventListener(
      "click",
      () => {

        const name =
          card.dataset.name || "";

        const image =
          card.querySelector("img");

        if (modalTitle) {
          modalTitle.textContent = name;
        }

        if (modalImg && image) {

          modalImg.src = image.src;
          modalImg.alt = name;

        }

        if (modalLink) {

          const message =
`Merhaba, OSOTTO ${name} modeli hakkında toptan bilgi almak istiyorum.`;

          modalLink.href =
            "https://wa.me/905431945858?text=" +
            encodeURIComponent(message);

        }

        if (
          modal &&
          typeof modal.showModal === "function"
        ) {
          modal.showModal();
        }

      }
    );

  });


/* Modal kapatma */
const closeButton =
  document.querySelector(".close");

if (closeButton && modal) {

  closeButton.addEventListener(
    "click",
    () => {
      modal.close();
    }
  );

}


/* Modal dışına basınca kapanır */
if (modal) {

  modal.addEventListener(
    "click",
    event => {

      const rect =
        modal.getBoundingClientRect();

      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) {
        modal.close();
      }

    }
  );

}

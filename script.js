if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

/* Yenilemede section adresini temizle */
if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}


/* SAYFAYI HER YENİLEMEDE EN YUKARI AL */
function forceTop() {

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  window.scrollTo(0, 0);
}

forceTop();


window.addEventListener("DOMContentLoaded", () => {

  forceTop();

});


window.addEventListener("pageshow", () => {

  forceTop();

  requestAnimationFrame(() => {
    forceTop();
  });

  setTimeout(() => {
    forceTop();
  }, 50);

  setTimeout(() => {
    forceTop();
  }, 150);

});


window.addEventListener("load", () => {

  forceTop();

  const loader =
    document.getElementById("loader");

  if (loader) {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 700);

  }

  requestAnimationFrame(() => {
    forceTop();
  });

  setTimeout(() => {
    forceTop();
  }, 50);

  setTimeout(() => {
    forceTop();
  }, 150);

});


/* HEADER */

const header =
  document.getElementById("header");


function updateHeader() {

  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 24
  );

}


updateHeader();


window.addEventListener(
  "scroll",
  updateHeader,
  { passive:true }
);


/* MOBİL MENÜ */

const menuButton =
  document.getElementById("menuButton");


if (menuButton) {

  menuButton.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "menu-open"
      );

    }
  );

}


document
  .querySelectorAll("nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        document.body.classList.remove(
          "menu-open"
        );

      }
    );

  });


/* SCROLL ANİMASYONLARI */

const revealItems =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold:0.12
      }

    );


  revealItems.forEach(item => {

    observer.observe(item);

  });

}

else {

  revealItems.forEach(item => {

    item.classList.add("visible");

  });

}


/* HERO SLIDER */

const slides =
  [...document.querySelectorAll(".slide")];

const currentSlide =
  document.getElementById("currentSlide");

let slideIndex = 0;


if (slides.length > 1) {

  setInterval(() => {

    slides[slideIndex]
      .classList.remove("active");


    slideIndex =
      (slideIndex + 1) %
      slides.length;


    slides[slideIndex]
      .classList.add("active");


    if (currentSlide) {

      currentSlide.textContent =
        String(slideIndex + 1)
          .padStart(2, "0");

    }

  }, 4800);

}


/* BAYİLİK FORMU */

const dealerForm =
  document.getElementById("dealerForm");


if (dealerForm) {

  dealerForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const data =
        new FormData(dealerForm);


      const text =

`Merhaba, OSOTTO toptan satış / bayilik başvurusu yapmak istiyorum.

Ad Soyad: ${data.get("name") || "-"}
Firma: ${data.get("company") || "-"}
Şehir: ${data.get("city") || "-"}
Telefon: ${data.get("phone") || "-"}
E-posta: ${data.get("email") || "-"}`;


      const url =

        "https://wa.me/905431945858?text=" +

        encodeURIComponent(text);


      window.open(
        url,
        "_blank",
        "noopener"
      );

    }
  );

}


/* ÜRÜN DETAYLARI */

const modal =
  document.getElementById("productModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalImage =
  document.getElementById("modalImage");

const modalWhatsapp =
  document.getElementById("modalWhatsapp");

const modalClose =
  document.getElementById("modalClose");


document
  .querySelectorAll(".card")
  .forEach(card => {

    const button =
      card.querySelector(
        ".product-button"
      );


    if (!button) return;


    button.addEventListener(
      "click",
      () => {

        const name =
          card.dataset.name || "";


        const image =
          card.querySelector("img");


        if (modalTitle) {

          modalTitle.textContent =
            name;

        }


        if (
          modalImage &&
          image
        ) {

          modalImage.src =
            image.src;

          modalImage.alt =
            "OSOTTO " + name;

        }


        if (modalWhatsapp) {

          const message =

            `Merhaba, OSOTTO ${name} modeli hakkında toptan bilgi almak istiyorum.`;


          modalWhatsapp.href =

            "https://wa.me/905431945858?text=" +

            encodeURIComponent(message);

        }


        if (
          modal &&
          typeof modal.showModal ===
          "function"
        ) {

          modal.showModal();

        }

      }
    );

  });


/* MODAL KAPAT */

if (
  modalClose &&
  modal
) {

  modalClose.addEventListener(
    "click",
    () => {

      modal.close();

    }
  );

}


/* MODAL DIŞINA BASINCA KAPAT */

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

import {
  loadPopUpScript,
  prepareStoreSearchAndOpen,
} from "./store-search-utils.js";

function initStoreSearch() {
  if (window.hasOwnProperty("storeSearchInit")) {
    return;
  }
  window.storeSearchInit = true;

  const detectedRegion = sessionStorage.getItem("detected-region");
  if (detectedRegion) {
    // show pop-up with detectedRegion stored in sessionStorage after page reload
    loadPopUpScript().then(() => {
      const event = new CustomEvent("open-store-search-pop-up", {
        detail: {
          detectedRegion: detectedRegion,
          showAltPopUp: true,
        },
      });
      sessionStorage.removeItem("detected-region");
      window.dispatchEvent(event);
    });
  }

  function createStoreSearch() {
    const usedButtons = [
      "store-selector-flyer-addon",
      "store-search-button",
      "store-rating-button",
    ].filter((type) => document.querySelector(type));
    Promise.all(
      usedButtons.map((type) => customElements.whenDefined(type)),
    ).then(() => {
      let openToggle = document.querySelectorAll(
        "[data-map-search-toggle-preload]",
      );
      openToggle.forEach((toggle) => {
        if (toggle.hasAttribute("data-store-rating") && toggle.isLink) {
          return;
        }

        toggle.addEventListener("click", (event) => {
          let hasRatingButton = event.target.hasAttribute("data-store-rating");
          let storeData = {
            type: hasRatingButton ? "storeRating" : "storeSearch",
          };
          prepareStoreSearchAndOpen(storeData);
        });
      });
    });

    //Search Field
    let searchFields = document.querySelectorAll("[data-map-search-field]");
    if (searchFields && searchFields.length === 1) {
      let storeData = {
        type: "storeSearch",
        searchFieldStandalone: true,
      };
      prepareStoreSearchAndOpen(storeData);
    }

    //Store StoreStock event
    window.addEventListener(
      "product:open-store-stock-dialog",
      function storeSearchOpen(e) {
        let storeData = {
          type: "storeStock",
          erp: e.detail.erp,
          storeId: e.detail.storeId,
        };
        prepareStoreSearchAndOpen(storeData);
      },
    );

    //General StoreSearch event
    window.addEventListener("mapsearch", function storeSearchOpen(e) {
      let type = null;
      if (e && e.detail) {
        type = e.detail.type;
      }
      let productId = null;
      if (typeof type == "undefined") {
        type = "storeSearch";
      }

      if (type === "default") {
        type = "storeSearch";
      } else if (type === "rating") {
        type = "storeRating";
      } else if (type === "storeStock") {
        type = "storeStock";
        productId = e.detail.erp;
      }
      let storeData = {
        type: type,
        erp: productId,
        storeId: null,
      };
      prepareStoreSearchAndOpen(storeData);
    });

    if (window.mindShiftNav.country === "ES") {
      window.addEventListener("open-store-search-pop-up", (e) => {
        loadPopUpScript().then(() => {
          let detectedRegion = null;
          let showAltPopUp = null;
          if (e && e.detail) {
            detectedRegion = e.detail.detectedRegion;
            showAltPopUp = e.detail.showAltPopUp;
          }
          const popUpComponent = document.createElement("store-search-pop-up");
          popUpComponent.setAttribute("detected-region", detectedRegion);
          popUpComponent.setAttribute("show-alt-pop-up", showAltPopUp);
          document.body.appendChild(popUpComponent);
        });
      });
    }
  }

  function checkMindshiftNav() {
    // language switching for multi language countries
    if (window.location.href.indexOf("/s/") !== -1) {
      (async () => {
        if (window.hasOwnProperty("mindShiftNav")) {
          const multilanguageLocales = new Map();
          for (const lang of window.mindShiftNav.availableLangs) {
            multilanguageLocales.set(
              lang,
              lang + "-" + window.mindShiftNav.country,
            );
          }
          if (window.hasOwnProperty("navLangUrls")) {
            let type;
            if (document.querySelector("[data-store-search-page-type]")) {
              const typeFromPage = document.querySelector(
                "[data-store-search-page-type]",
              ).dataset.storeSearchPageType;
              if (typeFromPage !== null && typeFromPage !== undefined) {
                type = typeFromPage;
              }
            }
            let navLangs = {};
            let pathname = decodeURIComponent(window.location.pathname);
            const currentLanguageShortURL = await _getShortUrlPart(
              window.mindShiftNav.locale,
              type,
            );
            // if another language is set from the mindshift cookie, "window.mindShiftNav.locale" and locale in pathname do not match
            if (!pathname.includes(currentLanguageShortURL)) {
              for (let language of multilanguageLocales.keys()) {
                const languageShortURL = await _getShortUrlPart(
                  multilanguageLocales.get(language),
                  type,
                );
                if (pathname.includes(languageShortURL)) {
                  // set pathname to the desired value to bring it inline with header
                  pathname = pathname.replace(
                    multilanguageLocales.get(language) + languageShortURL,
                    window.mindShiftNav.locale + currentLanguageShortURL,
                  );
                }
              }
            }
            for (let language of multilanguageLocales.keys()) {
              const languageShortURL = await _getShortUrlPart(
                multilanguageLocales.get(language),
                type,
              );
              navLangs[language] = decodeURIComponent(pathname).replace(
                window.mindShiftNav.locale + currentLanguageShortURL,
                multilanguageLocales.get(language) + languageShortURL,
              );
            }
            if (window.navLangUrls) {
              window.navLangUrls.replace(navLangs);
            } else {
              window.navLangUrls = navLangs;
            }
          }
        }
      })();
    }
  }

  async function _getShortUrlPart(locale, type) {
    let stage = "";
    if (window.location.href.indexOf("https://dev.lidl") !== -1) {
      stage = "dev";
    } else if (window.location.href.indexOf("https://test.lidl") !== -1) {
      stage = "test";
    } else if (window.location.href.indexOf("https://qa.lidl") !== -1) {
      stage = "qas";
    } else {
      stage = "live";
    }
    const queryUrl =
      "https://" +
      stage +
      ".api.schwarz/odj/stores-api/v2/myapi/stores-frontend/config?locale=" +
      locale;
    try {
      let response = await fetch(queryUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "KxboQtt40BG4VpBL16IhaRd2CXh0QbAc",
        },
      });
      if (response.ok) {
        const config = await response.json();

        if (type === "NEO") {
          return "/" + config.data.newOpeningsPath;
        } else if (type === "SPECIAL_SALES") {
          //TODO proof once config is extended by be
          return "/" + config.data.specialSalesPath;
        } else {
          return "/" + config.data.detailPagePath;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("unable to fetch config");
      console.log(error);
      return null;
    }
  }

  createStoreSearch();
  checkMindshiftNav();
}

initStoreSearch();

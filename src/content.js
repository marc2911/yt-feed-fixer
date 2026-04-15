const LOG_PREFIX = "[YT Cleaner]";
let lastUrl = location.href;
let styleElement = null;

function isSubscriptionsPage() {
  return location.pathname === "/feed/subscriptions";
}

function addCSS() {
  if (styleElement) return;

  styleElement = document.createElement("style");
  styleElement.id = "yt-cleaner-style";

  styleElement.textContent = `
    ytd-rich-section-renderer {
      display: none !important;
    }
  `;

  document.head.appendChild(styleElement);

  console.log(`${LOG_PREFIX} Hiding sections`);
}

function removeCSS() {
  if (!styleElement) return;

  styleElement.remove();
  styleElement = null;

  // console.log(`${LOG_PREFIX} Restoring sections`);
}

function handlePageChange() {
  if (isSubscriptionsPage()) {
    addCSS();
  } else {
    removeCSS();
  }
}

function watchUrlChanges() {
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;

      // console.log(`${LOG_PREFIX} New Page: ${location.href}`);

      handlePageChange();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function main() {
  handlePageChange();
  watchUrlChanges();
}

main();

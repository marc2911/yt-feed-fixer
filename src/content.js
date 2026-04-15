const LOG_PREFIX = "[YT Cleaner]";
let lastUrl = location.href;

function isSubscriptionsPage() {
  return location.pathname === "/feed/subscriptions";
}

function handlePageChange() {
  if (isSubscriptionsPage()) {
    console.log(`${LOG_PREFIX} Hiding sections`);
    document.body.classList.add("yt-cleaner-active");
  } else {
    // console.log(`${LOG_PREFIX} Restoring sections`);
    document.body.classList.remove("yt-cleaner-active");
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

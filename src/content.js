const LOG_PREFIX = "[YT Cleaner]";
let browseSection = null;

function findBrowseSection() {
  browseSection = document.querySelector("ytd-browse");
}

function removeRichSections() {
  if (!browseSection) {
    findBrowseSection();
  }

  if (!browseSection) return;

  const sections = browseSection.querySelectorAll("ytd-rich-section-renderer");
  if (sections.length === 0) return;

  console.log(`${LOG_PREFIX} Removing ${sections.length} sections...`);

  sections.forEach((section) => section.remove());
}

function main() {
  // Run once initially
  removeRichSections();

  // Watch for dynamically added content
  const observer = new MutationObserver(() => {
    removeRichSections();
  });

  observer.observe(browseSection ?? document.body, {
    childList: true,
    subtree: true,
  });
}

main();

// var observer = null;
// document.addEventListener("yt-navigate-finish", () => {
//   console.log("YT navigation detected");

//   if (observer) {
//     observer.disconnect();
//   }

//   browse = null;

//   main();
// });

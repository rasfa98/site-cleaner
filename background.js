/**
 * Extract origin from current page
 */
const getOrigin = tab => {
  const fullUrl = tab.url;
  const pathArray = fullUrl.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  const url = protocol + '//' + host;

  return url;
};

/**
 * Clear browser data for active page
 */
const clearData = origins => {
  return new Promise((resolve, reject) => {
    chrome.browsingData.remove(
      {
        origins,
      },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        serviceWorkers: true,
        webSQL: true,
      },
      () => resolve()
    );
  });
};

/**
 * Executed when extension icon is clicked
 */
chrome.browserAction.onClicked.addListener(async tab => {
  chrome.browserAction.disable(tab.id);

  const origins = [getOrigin(tab)];

  await clearData(origins);

  // Make it more clear to the user that an action has been performed by delaying the button state
  window.setTimeout(() => {
    chrome.browserAction.enable(tab.id);
  }, 1000);
});

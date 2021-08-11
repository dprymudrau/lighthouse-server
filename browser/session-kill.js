module.exports = async function killBrowser(currentState) {
  await currentState.browser.disconnect();
  await currentState.chrome.kill();
}
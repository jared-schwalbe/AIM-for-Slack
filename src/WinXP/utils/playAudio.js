export default function playAudio(fileName) {
  const file = chrome.runtime.getURL(`WinXP/assets/audio/${fileName}`);
  const audio = new Audio(file);
  audio.play().catch(() => {});
}

const ENDPOINT = "https://translate.google.com/translate_tts";
const LIMIT = 200; // max ~200 chars
const encoder = new TextEncoder();

window.onload = () => {
  const textarea = document.getElementById("text");
  const counter = document.getElementById("charcount");

  textarea.addEventListener("input", () => {
    const length = encoder.encode(textarea.value).length;
    counter.textContent = `${length}/${LIMIT}`;
    counter.style.color = length > LIMIT ? "red" : "black";
  });

  document.getElementById("submit").addEventListener("click", speakText);
};

function speakText() {
  const textarea = document.getElementById("text");
  const voice = document.getElementById("voice").value;
  const audio = document.getElementById("audio");
  const status = document.getElementById("status");
  const downloadBtn = document.getElementById("download");

  const text = textarea.value.trim();
  const length = encoder.encode(text).length;

  status.textContent = "";
  audio.src = "";
  downloadBtn.style.display = "none";

  if (!text) {
    status.textContent = "⚠️ Please enter some text.";
    return;
  }
  if (voice === "none") {
    status.textContent = "⚠️ Please select a voice.";
    return;
  }
  if (length > LIMIT) {
    status.textContent = `⚠️ Text must be under ${LIMIT} characters.`;
    return;
  }

  // Build TTS URL
  const url = `${ENDPOINT}?ie=UTF-8&q=${encodeURIComponent(
    text
  )}&tl=${voice}&client=tw-ob`;

  // Play audio
  audio.src = url;
  audio.play().catch(() => {
    status.textContent = "⚠️ Could not play audio.";
  });

  // Setup download
  downloadBtn.href = url;
  downloadBtn.download = `tts-${voice}.mp3`;
  downloadBtn.style.display = "inline-block";
}

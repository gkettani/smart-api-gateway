document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('container');
  const urlParams = new URLSearchParams(window.location.search);
  const file_id = urlParams.get('file');

  let btn = document.createElement("button");
  btn.innerHTML = "Transcribe";
  btn.classList.add('btn');

  btn.addEventListener('click', async function (e) {
    e.preventDefault();

    const res = await fetch(`/api/files/${file_id}/transcribe`, {
      method: 'POST',
    });

    if (res.ok) {
      btn.innerHTML = 'Transcribing...';
      btn.disabled = true;
      let counter = 0;
      let it = setInterval(async function () {
        const file = await getFile(file_id);
        counter++;
        if (file.transcript) {
          clearInterval(it);
          btn.remove();
          container.innerHTML += ` <p>Transcript:<br /> ${file.transcript}</p>`;
        }
        if (counter > 10) {
          clearInterval(it);
          btn.remove();
          container.innerHTML += ` <p>Transcription failed</p>`;
        }
      }, 5000);
    }
  });

  async function getFile(file_id) {
    const res = await fetch(`/api/files/${file_id}`);
    if (res.ok) {
      return await res.json();
    }
    return null;
  }

  (async function init() {
    const file = await getFile(file_id);
    if (!file) {
      container.innerHTML = '<h1>File not found</h1>';
      return;
    }
    container.innerHTML = `
      <h1>${file.name}</h1>
      <p>Type: ${file.mimetype}</p>
      ${file.mimetype.includes('video') ? `
        <video width="60%" controls>
          <source src="/api/files/${file.fs_file}/download" type="${file.mimetype}">
          Your browser does not support the video tag.
        </video>
      ` : ''}
      ${file.mimetype.includes('audio') ? `
        <audio controls>
          <source src="/api/files/${file.fs_file}/download" type="${file.mimetype}">
          Your browser does not support the audio element.
        </audio>
      ` : ''}
    `;
    if (file.transcript) {
      container.innerHTML += ` <p>Transcript:<br /> ${file.transcript}</p>`;
    } else {
      container.appendChild(btn);
    }
  })()


});
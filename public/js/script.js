document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('upload-form');
  const file_container = document.getElementById('file-container');
  let transcribe_btn = document.getElementById('transcribe-btn');
  let localFile = null;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    console.log('Form submitted!');

    let response = await fetch('/api/files/upload', {
      method: 'POST',
      body: new FormData(form)
    });

    localFile = await response.json();
    console.log(localFile);
    updateView();
    transcribe_btn = document.getElementById('transcribe-btn');
    transcript = document.getElementById('transcript');
    transcribe_btn.addEventListener('click', async function (e) {
      e.preventDefault();
      const response = await fetch(`/api/files/${localFile.fs_file}/transcribe`, {
        method: 'POST',
      });
      if (response.ok) {
        transcript.innerHTML = `<p>Transcription in progress...</p>`;
        let it = setInterval(async () => {
          const res = await fetch(`/api/files/${localFile._id}`);
          const file = await res.json();
          if (file.transcript) {
            localFile.transcript = file.transcript;
            updateView();
            clearInterval(it);
          }
        }, 5000);
      }
    });
  });

  function updateView() {
    if (!localFile) return;
    file_container.innerHTML = `
      <h2>File uploaded successfully!</h2>
      <p>Filename: ${localFile.name}</p>
      <audio controls>
        <source src="/api/files/${localFile.fs_file}/download" type="${localFile.mimetype}">
      </audio>
      <div id="transcript">
      ${localFile.transcript ? `<p>Transcript: ${localFile.transcript}</p>` : 
        `<button id="transcribe-btn" style="display: block;">Transcribe</button>`}</div>
    `;
  }
});

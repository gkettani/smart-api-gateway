document.addEventListener('DOMContentLoaded', function () {
  const files_container = document.getElementById('files-container');
  const upload_form = document.getElementById('upload-form');

  async function listFiles() {
    const res = await fetch('/api/files');
    if (res.ok) {
      return await res.json();
    }
    return [];
  }

  function updateView(files) {
    let html = '';
    for (let file of files) {
      html += `
        <div class="file">
          <h3>${file.name}</h3>
          <p>Type: ${file.mimetype}</p>
          <p>Transcript: ${file.transcript ? 'Available' : 'Not available'}</p>
          <button class="btn" onclick="window.location.href='/file.html?file=${file._id}'">Open</button>
        </div>
      `;
    }
    files_container.innerHTML = html;
  }

  upload_form.addEventListener('submit', async function (e) {
    e.preventDefault();

    let response = await fetch('/api/files/upload', {
      method: 'POST',
      body: new FormData(upload_form)
    });

    if (response.ok) {
      const files = await listFiles();
      updateView(files);
      return;
    }
    alert('Error uploading file');
  });

  (async function init() {
    const files = await listFiles();
    updateView(files);
  })();
});

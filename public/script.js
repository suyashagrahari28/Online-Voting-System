// ===============================
// public/script.js
// ===============================
let selectedCandidate = null;

fetch("/candidates")
.then(res => res.json())
.then(data => {
  let html = "";
  data.forEach(c => {
    html += `
      <p>
        <input type="radio" name="candidate" value="${c.id}">
        ${c.name} (Votes: ${c.votes})
      </p>
    `;
  });
  document.getElementById("candidateList").innerHTML = html;
});

function submitVote() {
  const username = document.getElementById("username").value;
  const candidateId = document.querySelector('input[name="candidate"]:checked')?.value;

  fetch("/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, candidateId })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("msg").innerText = data.message;
    location.reload();
  });
}
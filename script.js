/* ========== AUTH ========== */
function signup(){
  const email=document.getElementById("email").value;
  localStorage.setItem("user",email);
  window.location="login.html";
}

function login(){
  const email=document.getElementById("email").value;
  if(email===localStorage.getItem("user")){
    window.location="shboard.html";
  } else alert("Invalid login");
}

function logout(){
  localStorage.clear();
  window.location="index.html";
}

/* ========== BOOK OPEN ========== */
function openBook(id){
  localStorage.setItem("currentBook",id);
  window.location="ook.html";
}

/* ========== READER SETTINGS ========== */
let fontSize = 18;

function increaseFont(){
  fontSize += 2;
  document.getElementById("bookContent").style.fontSize = fontSize + "px";
}

function decreaseFont(){
  fontSize = Math.max(14, fontSize - 2);
  document.getElementById("bookContent").style.fontSize = fontSize + "px";
}

function toggleReaderMode(){
  document.body.classList.toggle("dark-reader");
}

/* ========== LOAD BOOK ========== */
if(location.pathname.includes("ook.html")){
  loadBook();
}

function loadBook(){
  const id = localStorage.getItem("currentBook");
  const title = document.getElementById("bookTitle");
  const content = document.getElementById("bookContent");

  const books = {
    fantasy: "The Wizard’s Legacy",
    science: "Beyond Time and Space",
    romance: "Hearts Across Seasons",
    thriller: "Shadows of the Unknown"
  };

  title.innerText = books[id];
  content.innerHTML = generateBook(id);
  loadBookmarks(id);
}

/* ========== BOOK CONTENT (30 CHAPTERS) ========== */
function generateBook(bookId){
  let html="";
  for(let i=1;i<=30;i++){
    html += `
      <div class="chapter" id="chapter${i}">
        <h2>Chapter ${i}</h2>
        <button onclick="bookmarkChapter(${i})">🔖 Bookmark</button>
        <textarea placeholder="Write notes..." 
          oninput="saveNote(${i}, this.value)"></textarea>

        <p>
        This chapter explores themes of ${bookId}, focusing on emotional
        growth, conflict, and discovery. The narrative deepens with
        meaningful reflection and immersive storytelling.
        </p>

        <p>
        As events unfold, characters face challenges that test their
        strength and values. Each paragraph builds tension and insight,
        pulling the reader deeper into the story.
        </p>
      </div>
    `;
  }
  return html;
}

/* ========== BOOKMARKS ========== */
function bookmarkChapter(ch){
  const book = localStorage.getItem("currentBook");
  let data = JSON.parse(localStorage.getItem(book+"_bookmarks") || "[]");

  if(!data.includes(ch)){
    data.push(ch);
    localStorage.setItem(book+"_bookmarks", JSON.stringify(data));
    loadBookmarks(book);
  }
}

function loadBookmarks(book){
  const list = document.getElementById("bookmarkList");
  if(!list) return;

  list.innerHTML="";
  const data = JSON.parse(localStorage.getItem(book+"_bookmarks") || "[]");

  data.forEach(ch=>{
    const li=document.createElement("li");
    li.innerHTML=`<a href="#chapter${ch}">Chapter ${ch}</a>`;
    list.appendChild(li);
  });
}

/* ========== NOTES ========== */
function saveNote(ch, text){
  const book = localStorage.getItem("currentBook");
  localStorage.setItem(book+"_note_"+ch, text);
}

/* ========== PDF DOWNLOAD ========== */
function downloadPDF(){
  window.print();
}

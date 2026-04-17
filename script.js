function getElement(id) {
  return document.getElementById(id);
}

function setContent(html) {
  const content = getElement("content");
  if (!content) {
    console.warn("Missing #content element.");
    return;
  }
  content.innerHTML = html;
}

function register() {
  const regUser = getElement("regUser");
  const regPass = getElement("regPass");
  if (!regUser || !regPass || !regUser.value || !regPass.value) {
    alert("Please enter username and password.");
    return;
  }
  const agree = getElement("agree");
  if (agree && !agree.checked) {
    alert("Please agree to the terms before signing up.");
    return;
  }
  localStorage.setItem(regUser.value, regPass.value);
  alert("Registered successfully.");
  window.location = "login.html";
}

function login() {
  const loginUser = getElement("loginUser");
  const loginPass = getElement("loginPass");
  if (!loginUser || !loginPass || !loginUser.value || !loginPass.value) {
    alert("Please enter username and password.");
    return;
  }
  if (localStorage.getItem(loginUser.value) == loginPass.value) {
    window.location = "home.html";
  } else {
    alert("Invalid username or password.");
  }
}

function logout() {
  window.location = "login.html";
}

async function getData() {
  let res = await fetch('data.json');
  return await res.json();
}

function loadHome() {
  showPlaces();
}

function showSection(sec) {
  if (sec == 'places') showPlaces();
  if (sec == 'hotels') showHotels();
  if (sec == 'restaurants') showRestaurants();
  if (sec == 'profile') showProfile();
  if (sec == 'report') showReport();
  if (sec == 'contact') showContact();
  if (sec == 'terms') showTerms();
}

function selectPlace(name) {
  localStorage.setItem("selectedPlace", name);
  alert(name + " selected");
}

/* PROFILE */
function showProfile() {
  content.innerHTML = `
  <div class="profile-box">
    <h2>Profile</h2>
    <input placeholder="Name">
    <input placeholder="Mobile">
    <input placeholder="Email">
    <input placeholder="Profession">
    <select>
      <option disabled selected>Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    <input type="file">
  </div>`;
}

/* Places */
async function showPlaces() {
  let data = await getData();
  let html = '';
  data.places.forEach(p => {
    html += `
    <div class="card" onclick="selectPlace('${p.name}')">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a href="${p.website}" target="_blank">Official Site</a>
    </div>`;
  });
  content.innerHTML = html;
}

/* Hotels */
async function showHotels() {
  let data = await getData();
  let place = localStorage.getItem("selectedPlace");
  let html = '';
  data.hotels.filter(h => h.place == place).forEach(h => {
    html += `
    <div class="card">
      <img src="${h.image}">
      <h3>${h.name}</h3>
      <p>${h.desc}</p>
      <p>₹${h.price}</p>
      <a href="${h.website}" target="_blank">Visit</a>
    </div>`;
  });
  content.innerHTML = html || "⚠ Select place first";
}

/* Restaurants */
async function showRestaurants() {
  let data = await getData();
  let place = localStorage.getItem("selectedPlace");
  let html = '';
  data.restaurants.filter(r => r.place == place).forEach(r => {
    html += `
    <div class="card">
      <img src="${r.image}">
      <h3>${r.name}</h3>
      <p>${r.desc}</p>
      <a href="${r.website}" target="_blank">Visit</a>
    </div>`;
  });
  content.innerHTML = html || "⚠ Select place first";
}

/* Report */
function showReport() {
  content.innerHTML = `
  <div class="report-box">
    <h2>Report Problem</h2>
    <textarea rows="5" placeholder="Write your problem..."></textarea>
    <button>Submit</button>
  </div>`;
}

/* Contact */
function showContact() {
  content.innerHTML = `
  <h2>Contact</h2>
  <p>Email: support@tourism.com</p>
  <p>Phone: 9876543210</p>
  <p>Privacy Policy: Your personal information will not be shared</p>`;
}

/* Terms */
function showTerms() {
  content.innerHTML = `
<h2>Terms & Conditions</h2>

<p>
Welcome to <b>Smart Tourism Explorer</b>. By using this website, you agree to follow the terms and conditions mentioned below.
</p>

<h3>1. Usage of Website</h3>
<p>
This website is developed for educational and tourism guidance purposes. Users can explore places, hotels, and restaurants for informational use only.
</p>

<h3>2. User Responsibility</h3>
<p>
Users must provide correct and genuine information while using features like Profile and Report. Any misuse of the platform is strictly prohibited.
</p>

<h3>3. Data & Privacy</h3>
<p>
Your personal information (such as name, email, etc.) is stored locally in your browser and will not be shared with any third party.
</p>

<h3>4. Content Accuracy</h3>
<p>
We try to keep all information accurate and updated, but we do not guarantee 100% correctness of hotel prices, availability, or details.
</p>

<h3>5. External Links</h3>
<p>
This website may contain links to external websites (like hotel booking or official sites). We are not responsible for their content or services.
</p>

<h3>6. Limitation of Liability</h3>
<p>
We are not responsible for any loss, damage, or inconvenience caused while using this website or relying on its information.
</p>

<h3>7. Changes to Terms</h3>
<p>
We may update these terms and conditions at any time without prior notice.
</p>

<h3>8. Agreement</h3>
<p>
By continuing to use this website, you agree to all the above terms and conditions.
</p>
`;
}
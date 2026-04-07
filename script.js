function register(){
  localStorage.setItem(regUser.value, regPass.value);
  alert("Registered");
}

function login(){
  if(localStorage.getItem(loginUser.value)==loginPass.value){
    window.location="home.html";
  } else alert("Invalid");
}

function logout(){
  window.location="index.html";
}

async function getData(){
  let res=await fetch('data.json');
  return await res.json();
}

function loadHome(){
  showPlaces();
}

function showSection(sec){
  if(sec=='places') showPlaces();
  if(sec=='hotels') showHotels();
  if(sec=='restaurants') showRestaurants();
  if(sec=='profile') showProfile();
  if(sec=='report') showReport();
  if(sec=='contact') showContact();
  if(sec=='terms') showTerms();   // ✅ FIX
}

function selectPlace(name){
  localStorage.setItem("selectedPlace",name);
  alert(name+" selected");
}

/* Places */
async function showPlaces(){
  let data=await getData();
  let html='';
  data.places.forEach(p=>{
    html+=`
    <div class="card" onclick="selectPlace('${p.name}')">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a href="${p.website}" target="_blank">Official Site</a>
    </div>`;
  });
  content.innerHTML=html;
}

/* Hotels */
async function showHotels(){
  let data=await getData();
  let place=localStorage.getItem("selectedPlace");
  let html='';
  data.hotels.filter(h=>h.place==place).forEach(h=>{
    html+=`
    <div class="card">
      <img src="${h.image}">
      <h3>${h.name}</h3>
      <p>${h.desc}</p>
      <p>₹${h.price}</p>
      <a href="${h.website}" target="_blank">Visit</a>
    </div>`;
  });
  content.innerHTML=html || "⚠ Select place first";
}

/* Restaurants */
async function showRestaurants(){
  let data=await getData();
  let place=localStorage.getItem("selectedPlace");
  let html='';
  data.restaurants.filter(r=>r.place==place).forEach(r=>{
    html+=`
    <div class="card">
      <img src="${r.image}">
      <h3>${r.name}</h3>
      <p>${r.desc}</p>
      <a href="${r.website}" target="_blank">Visit</a>
    </div>`;
  });
  content.innerHTML=html || "⚠ Select place first";
}

/* Profile */
function showProfile(){
  content.innerHTML=`
  <h2>Profile</h2>
  <input placeholder="Name">
  <input placeholder="Mobile">
  <input placeholder="Email">
  <input placeholder="Profession">
  <select required>
    <option value="" disabled selected hidden>Select Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
  <input type="file">`;
}

/* Report */
function showReport(){
  content.innerHTML=`
  <h2>Report Problem</h2>

  <textarea rows="5" placeholder="Write your problem..."></textarea>

  <br><br>

  <button>Submit</button>`;
}


/* Contact */
function showContact(){
  content.innerHTML=`
  <h2>Contact</h2>
  <p>Email: support@tourism.com</p>
  <p>Phone: 9876543210</p>
  <p>Privacy Policy: Your personal information will not be shared with third parties</p>`;
}

/* ✅ FIXED TERMS FUNCTION */
function showTerms(){
content.innerHTML = `
<h2>Terms & Conditions</h2>

<p>
Welcome to Smart Tourism Explorer. By using this website,
you agree to follow the rules and policies mentioned below.
</p>

<h3>1. User Responsibility</h3>
<p>Users must provide correct information while using profile and report features.</p>

<h3>2. Privacy Policy</h3>
<p>Your personal information will not be shared with third parties.</p>

<h3>3. Website Usage</h3>
<p>This website is developed for educational and tourism guidance purposes only.</p>

<h3>4. Content Accuracy</h3>
<p>We try to keep information updated but do not guarantee 100% accuracy.</p>

<h3>5. Agreement</h3>
<p>By continuing to use this website, you agree to these terms and conditions.</p>
`;
}
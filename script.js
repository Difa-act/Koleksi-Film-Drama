const collection = {
    film: [
      {
        title: "Barbie",
        genre: ["Comedy", "Fantasy"],
        rating: "8.0",
        year: 2023,
        img: "barbie.jpg",
        sinopsis: "Barbie dan Ken menikmati hidup mereka di dunia Barbie Land yang tampaknya sempurna. Namun, ketika mereka mendapat kesempatan untuk pergi ke dunia luar, mereka segera menemukan suka duka hidup di antara manusia biasa.",

        title: "Inception",
        genre: ["Sci-Fi", "Action", "Thriller"],
        rating: "8.8",
        year: 2010,
        img: "inception.jpg",
        sinopsis: "Cobb, mata-mata ahli, mencuri informasi dari targetnya dengan masuk ke dalam mimpi mereka. Ia diburu atas pembunuhan istrinya, dan satu-satunya cara untuk menebus semua ini, adalah degan Inception.",
      },
      {
        title: "Interstellar",
        genre: ["Sci-Fi", "Action"],
        rating: "8.6",
        year: 2014,
        img: "Interstellar.jpg",
        sinopsis: "Sebuah tim penjelajah antar galaksi harus melewati lubang cacing dan terjebak di dimensi waktu ruang angkasa dalam upaya untuk menjamin kelangsungan hidup umat manusia di planet bumi.",
      },
      {
        title: "Parasite",
        genre: ["Sci-Fi", "Action", "Thriller"],
        rating: "9.0",
        year: 2019,
        img: "Parasite.jpg",
        sinopsis: "Keluarga Ki-taek beranggotakan empat orang pengangguran dengan masa depan suram menanti mereka. Suatu hari Ki-woo anak laki-laki tertua direkomendasikan oleh sahabatnya yang merupakan seorang mahasiswa dari universitas bergengsi agar Ki-woo menjadi guru les yang dibayar mahal dan membuka secercah harapan penghasilan tetap. Dengan penuh restu serta harapan besar dari keluarga, Ki-woo menuju ke rumah keluarga Park untuk wawancara. Setibanya di rumah Mr. Park pemilik perusahaan IT global, Ki-woo bertemu dengan Yeon-kyo, wanita muda yang cantik di rumah itu. Setelah pertemuan itu, serangkaian kejadian dimulai.",
      },
    {
      title: "The Silence of the Lambs",
      genre: ["Horror", "Thriller"],
      rating: "8.6",
      year: 1991,
      img: "The_Silence_of_the_Lambs_poster.jpg",
      sinopsis: "Agen FBI Clarice Starling harus mewawancarai Hannibal Lecter...",
    },
    {
    title: "Weapons",
    genre: ["Action", "Sci-Fi"],
    rating: "7.8",
    year: 2025,
    img: "weapons.jpg",
    sinopsis: "Weapons adalah film horor misteri yang berlatar di sebuah kota kecil di mana 17 murid dari satu kelas yang sama menghilang secara misterius pada pukul 02.17 pagi. Hanya satu murid, Alex Lilly, yang tersisa, memicu kecurigaan terhadap guru kelasnya, Justine Gandy, dan ayah murid lain, Archer Graff. Bersama-sama, Justine dan Archer mencoba mengungkap misteri tersebut, yang ternyata melibatkan kejadian supranatural dan ritual yang berkaitan dengan seorang wanita bernama Gladys.",
    }
  ],
  
  drama: [
    {
      title: "Breaking Bad",
      genre: ["Sci-Fi", "Action", "Thriller"],
      rating: "9.5",
      year: 2008,
      img: "Breaking Bad.jpg",
      sinopsis: "Guru kimia yang berubah menjadi produsen sabu untuk keluarganya.",
    },
    {
    title: "Game of Thrones",
    genre: ["Fantasy", "Drama", "Adventure"],
    rating: "9.2",
    year: 2011,
    img: "got.jpg",
    sinopsis: "Pertarungan antara keluarga bangsawan untuk memperebutkan Iron Throne di Westeros.",
    },
    {
      title: "Squid Game",
      genre: ["Sci-Fi", "Action", "Thriller"],
      rating: "8.0",
      year: 2021,
      img: "Squid Game.jpg",
      sinopsis: "Ratusan pemain yang kekurangan uang menerima undangan aneh untuk berkompetisi dalam permainan anak-anak. Hadiah menggiurkan menanti, tetapi dengan taruhan yang sangat tinggi.",
    }
  ]
};

// DOM Elements
const container = document.getElementById("collectionContainer");
const tabs = document.querySelectorAll(".tab");
const genreSelect = document.getElementById("genreSelect");
const searchInput = document.getElementById("searchInput");
const detailPage = document.getElementById("detailPage");
const detailHeader = document.getElementById("detailHeader");
const detailSinopsis = document.getElementById("detailSinopsis");
const detailGallery = document.getElementById("detailGallery");
const backBtn = document.getElementById("backBtn");

let currentCategory = "film";

// Load genre dropdown
function loadGenres() {
  const genres = new Set();
  Object.values(collection).flat().forEach(item => {
    item.genre.forEach(g => genres.add(g));
  });
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}

// Load collection cards
function loadCollection(category, genreFilter="all") {
  container.innerHTML = "";
  const data = collection[category].filter(item =>
    genreFilter === "all" ? true : item.genre.includes(genreFilter)
  );
  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.genre.join(", ")} | ⭐ ${item.rating}</p>
        <p>${item.year}</p>
      </div>`;
    card.addEventListener("click", () => showDetail(item));
    container.appendChild(card);
  });
}

// Open detail page
function showDetail(item) {
  document.querySelector(".grid-container").style.display = "none";
  detailPage.classList.add("active");

  detailHeader.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <h2>${item.title}</h2>
    <p>${item.genre.join(", ")} | ⭐ ${item.rating} | ${item.year}</p>
  `;
  detailSinopsis.textContent = item.sinopsis;

  detailGallery.innerHTML = "";
  item.gallery.forEach(img => {
    const im = document.createElement("img");
    im.src = img;
    detailGallery.appendChild(im);
  });
}

// Back button
backBtn.addEventListener("click", () => {
  detailPage.classList.remove("active");
  document.querySelector(".grid-container").style.display = "grid";
});

// Tab switching
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.dataset.category;
    loadCollection(currentCategory, genreSelect.value);
  });
});

// Genre filter
genreSelect.addEventListener("change", () =>
  loadCollection(currentCategory, genreSelect.value)
);

// Search filter
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = collection[currentCategory].filter(item =>
    item.title.toLowerCase().includes(term)
  );

  container.innerHTML = "";
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.genre.join(", ")} | ⭐ ${item.rating}</p>
        <p>${item.year}</p>
      </div>`;
    card.addEventListener("click", () => showDetail(item));
    container.appendChild(card);
  });
});

// Dark mode
const toggleBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Mode Terang";
} else {
  toggleBtn.textContent = "🌙 Mode Gelap";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Mode Terang";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Mode Gelap";
  }
});

// Init
loadGenres();
loadCollection("film");

// ================= Scroll To Top =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================= Booking Form =================

const bookingForm = document.getElementById("bookingForm");

const modal = document.getElementById("successModal");

const closeBtn = document.getElementById("closeModal");

bookingForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const bookingData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        package: document.getElementById("package").value,

        event: document.getElementById("event").value,

        date: document.getElementById("date").value,

        message: document.getElementById("message").value

    };

    try{

        const response = await fetch("http://localhost:5000/booking",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(bookingData)

        });

        const data = await response.json();

if (data.success) {

    modal.style.display = "flex";

    bookingForm.reset();

} else {

    alert("Booking Failed!");

}

console.log(data);

    }

    catch (error) {

    console.log(error);

    alert(error.message);

}

});

closeBtn.addEventListener("click",function(){

    modal.style.display="none";

});

window.addEventListener("click",function(event){

    if(event.target==modal){

        modal.style.display="none";

    }

});

/* ================= IMAGE LIGHTBOX ================= */

const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach((image) => {

    image.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = image.src;

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (event) => {

    if(event.target === lightbox){

        lightbox.style.display = "none";

    }

});

/*================ GALLERY FILTER ================*/

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelector(".filter-btn.active").classList.remove("active");

button.classList.add("active");

const filter=button.dataset.filter;

galleryItems.forEach(item=>{

if(filter==="all"){

item.style.display="block";

}

else if(item.classList.contains(filter)){

item.style.display="block";

}

else{

item.style.display="none";

}

});

});

});

/*================ ANIMATED COUNTERS ================*/

const counters = document.querySelectorAll(".counter");

let started = false;

window.addEventListener("scroll", () => {

    const statsSection = document.querySelector(".stats");

    if (!started && window.scrollY > statsSection.offsetTop - 400) {

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count);

                    setTimeout(updateCounter, 20);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

        });

        started = true;

    }

});

/*================ LOADER =================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 2200);

});

/*================ HERO BOOK BUTTON ================*/

document.addEventListener("DOMContentLoaded", function () {

    const bookBtn = document.getElementById("bookBtn");

    bookBtn.addEventListener("click", function () {

        document.getElementById("contact").scrollIntoView({

            behavior: "smooth"

        });

    });

});
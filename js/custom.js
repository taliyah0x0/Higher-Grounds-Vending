var menu_visible = 0;

document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const menu = document.getElementById("menu");
    menuIcon.addEventListener("click", () => {
        let sandwich = document.getElementsByClassName("sandwich")[0];
        if (menu_visible) {
            sandwich.classList.toggle("fa-bars");
            sandwich.innerHTML = "";
            menu_visible = 0;
            if (window.matchMedia("(max-width: 1152px)").matches) {
                document.getElementsByClassName("cover")[0].classList.remove("active");
            }
        } else {
            sandwich.classList.remove("fa-bars");
            sandwich.innerHTML = "X";
            menu_visible = 1;
            if (window.matchMedia("(max-width: 1152px)").matches) {
                document.getElementsByClassName("cover")[0].classList.toggle("active");
            }
        }
        menu.classList.toggle("active");
        let header = document.getElementsByTagName("header");
        for (var i = 0; i < header.length; i++) {
            header[i].classList.toggle("active");
        }
        let footer = document.getElementsByTagName("footer");
        footer[0].classList.toggle("active");
    });

    window.addEventListener('resize', function() {
        if (window.matchMedia("(max-width: 1152px)").matches) {
            document.getElementById("map-arrow").innerHTML = "See map below ↓";
        } else {
            document.getElementById("map-arrow").innerHTML = "See map on right →";
        }
    });

    const nutrition = document.getElementsByClassName("nutrition");
    for (var i = 0; i < nutrition.length; i++) {
      nutrition[i].style.display = "none";
    }
});

document.querySelectorAll(".scroll-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default anchor behavior
      const targetId = link.getAttribute("href").substring(1); // Get the target ID
      const targetElement = document.getElementById(targetId);

      // Calculate offset position (5rem above the element)
      const remToPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
      let offsetPosition = 0;
      if (window.matchMedia("(max-width: 1152px)").matches) {
        offsetPosition = targetElement.offsetTop - (4 * remToPixels);
      } else {
        offsetPosition = targetElement.offsetTop - (7 * remToPixels);
      }

      // Scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      if (menu_visible) {
        const menuIcon = document.getElementById("menu-icon");
        menuIcon.click();
        menu_visible = 0;
      }
    });
  });

function toggleNutrition(index) {
  let info = document.getElementsByClassName("nutrition-title")[index].innerHTML;
  let char = info.substring(info.length - 1);
  if (char == "+") {
    document.getElementsByClassName("nutrition-title")[index].style.borderBottom = "0.5px solid white";
    document.getElementsByClassName("nutrition")[index].style.display = "flex";
    setTimeout (() => { document.getElementsByClassName("nutrition")[index].style.opacity = "1"; }, 150);
    document.getElementsByClassName("nutrition-title")[index].innerHTML = info.substring(0, info.length - 1) + "-";
  } else {
    document.getElementsByClassName("nutrition-title")[index].style.borderBottom = "none";
    setTimeout (() => { document.getElementsByClassName("nutrition")[index].style.display = "none"; }, 150);
    document.getElementsByClassName("nutrition")[index].style.opacity = "0";
    document.getElementsByClassName("nutrition-title")[index].innerHTML = info.substring(0, info.length - 1) + "+";
  }
}

window.addEventListener('mousedown', function() {
  setTimeout(() => {
  document.getElementById("ad-popup").style.display = "none";
  document.getElementById("linkform").style.display = "none";
  }, 500);

});
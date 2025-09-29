var menu_visible = 0;
var drink_names = ["Thai Milk Tea", "Americano", "Banana Latte", "Banana Taro", "Banana Milk", "Choco Banana", "Hokkaido Milk Tea", "Latte", "Matcha Latte", "Mocha", "Oolong Milk Tea", "Taro Matcha", "Taro Milk Tea", "Mango Lassi"];
var hidden_drinks = ["Oolong Milk Tea"]
let nutrition_info = []; // global variable
Papa.parse("HGV_Nutrition.csv", {
  download: true,
  header: true,
  complete: function(results) {
    nutrition_info = results.data; // now other scripts can access it
  }
});

var indices = Array.from({length: drink_names.length}, (_, i) => i);
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
shuffle(indices);

function find_drink(index, type) {
  for (let i = 0; i < nutrition_info.length; i++) {
    if (nutrition_info[i]["Website ID"] == index && nutrition_info[i]["Temperature"] == type) {
      return nutrition_info[i];
    }
  }
}

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

        if (window.innerWidth > 1152) {
          document.getElementsByClassName("special")[0].href = "#menu-a";
          document.getElementsByClassName("special-arrow")[0].style.display = "none";
        } else {
          document.getElementsByClassName("special")[0].href = "#";
          document.getElementsByClassName("special-arrow")[0].style.display = "block";
        }
    });

    const nutrition = document.getElementsByClassName("nutrition");
    for (var i = 0; i < nutrition.length; i++) {
      nutrition[i].style.display = "none";
    }

    if (window.innerWidth > 1152) {
      document.getElementsByClassName("special")[0].href = "#menu-a";
      document.getElementsByClassName("special-arrow")[0].style.display = "none";
    }

    setTimeout(() => {
      const content_section = document.getElementById("drinks_content");
      for (var i = 0; i < drink_names.length; i++) {
        var drink_name = indices.map(i => drink_names[i]);
        console.log(drink_name[i])
        if (hidden_drinks.includes(drink_name[i])) {
          continue;
        }
        var cold_drink = find_drink(indices[i], "Cold");
        var hot_drink = find_drink(indices[i], "Hot");
        content_section.innerHTML += `
        <section>
          <header style="padding-left: 2rem; margin-top: 3rem" class="menu-header">
            <h3>${drink_name[i]}</h3>
              <p>${hot_drink["Caption"]} ${hot_drink["Allergen Info"]}</p>
              <p class="nutrition-title" onclick="toggleNutrition(${i})">Nutrition Information +</p>
              <div class="nutrition">
                <div><p class="lists">Hot: ${hot_drink["Total Calories"]} Calories<li>${hot_drink["Total Fat"]}g Fat<li>${hot_drink["Total Sodium"]}mg Sodium<li>${hot_drink["Total Sugar"]}g Sugar<li>${hot_drink["Total Protein"]}g Protein</p></div>
                <div><p class="lists">Cold: ${cold_drink["Total Calories"]} Calories<li>${cold_drink["Total Fat"]}g Fat<li>${cold_drink["Total Sodium"]}mg Sodium<li>${cold_drink["Total Sugar"]}g Sugar<li>${cold_drink["Total Protein"]}g Protein</p></div>
              </div>
          </header>
          <div class="content">
              <span class="image main main-block"><img src="images/drinks/${indices[i]}.png" alt=""/></span>
          </div>
        </section>`;
      }
    },500);
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

window.addEventListener('click', function() {
  setTimeout(() => {
    document.getElementById("ad-popup").style.display = "none";
    document.getElementById("linkform").style.display = "none";
  }, 500);

});

window.addEventListener('touchend', function() {
  setTimeout(() => {
    document.getElementById("ad-popup").style.display = "none";
    document.getElementById("linkform").style.display = "none";
  }, 500);

});
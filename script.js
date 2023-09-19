$(document).ready(function () {
  $.getJSON("./data.json", function (jsonData) {
    data = jsonData;
    const sneakersData = jsonData.sneakers;
    const parentElement = document.getElementById("product-container");

    // ...

    let imgUrls = [];

    for (
      let sneakerIndex = 0;
      sneakerIndex < sneakersData.length;
      sneakerIndex++
    ) {
      let imgObj = sneakersData[sneakerIndex];
      imgUrls.push(imgObj);
    }

    imgUrls.forEach((imgUrl) => {
      const divElement = document.createElement("div");
      const divElement2 = document.createElement("div");
      const divElement3 = document.createElement("div");

      const nameElement = document.createElement("p");
      const priceElement = document.createElement("p");
      nameElement.classList.add("nameE");
      priceElement.classList.add("priceE");

      divElement.classList.add("custom-div");
      divElement2.classList.add("custom-div2");
      divElement3.classList.add("custom-div3");

      const imgElement = document.createElement("img");
      imgElement.src = imgUrl.main_picture_url;
      imgElement.alt = "Image Description"; // Add appropriate alt text

      priceElement.innerHTML = `$${imgUrl.retail_price_cents / 100}`;
      nameElement.innerHTML = `${imgUrl.name}`;

      divElement2.appendChild(nameElement);
      divElement2.appendChild(priceElement);

      divElement3.appendChild(imgElement);

      divElement.appendChild(divElement3);
      divElement.appendChild(divElement2);
      parentElement.appendChild(divElement);
      background();
    });

    let minValue = document.getElementById("min-value");
    let maxValue = document.getElementById("max-value");

    function validateRange(minPrice, maxPrice) {
      if (minPrice > maxPrice) {
        // Swap to Values
        let tempValue = maxPrice;
        maxPrice = minPrice;
        minPrice = tempValue;
      }

      minValue.innerHTML = "$" + minPrice;
      maxValue.innerHTML = "$" + maxPrice;
      checkPrice(minPrice, maxPrice);
    }

    //const inputElements = document.querySelectorAll("input");
    var inputElements = document.querySelectorAll(".slider-input");

    inputElements.forEach((element) => {
      element.addEventListener("input", (e) => {
        let minPrice = parseInt(inputElements[0].value);
        let maxPrice = parseInt(inputElements[1].value);

        validateRange(minPrice, maxPrice);
      });
    });

    //validateRange(inputElements[0].value, inputElements[1].value);
    function checkPrice(min, max) {
      let data = [];
      for (
        let sneakerIndex = 0;
        sneakerIndex < sneakersData.length;
        sneakerIndex++
      ) {
        //divide by 100 beacuse the price need to convert to dollars
        if (
          sneakersData[sneakerIndex].retail_price_cents / 100 >= min &&
          sneakersData[sneakerIndex].retail_price_cents / 100 <= max
        ) {
          //console.log("max"); // when console logging its running all the sneakers at that price

          data.push(sneakersData[sneakerIndex]);
        }
      }
      displayFilterPrice(data);
    }

    function displayFilterPrice(data) {
      parentElement.innerHTML = "";
      data.forEach((datas) => {
        const divElement = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = datas.main_picture_url;

        imgElement.alt = "Image Description"; // Add appropriate alt text
        priceElement.innerHTML = `$${datas.retail_price_cents / 100}`;
        nameElement.innerHTML = `${datas.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();
      });
    }

    function category(target) {
      const subtitle = document.getElementById("subtitle");

      parentElement.innerHTML = "";
      let data = [];
      for (
        let sneakerIndex = 0;
        sneakerIndex < sneakersData.length;
        sneakerIndex++
      ) {
        if (sneakersData[sneakerIndex].category.includes(target)) {
          data.push(sneakersData[sneakerIndex]);
        }
      }
      data.forEach((datas) => {
        const divElement = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = datas.main_picture_url;
        imgElement.alt = "Image Description"; // Add appropriate alt text

        //parentElement.appendChild(imgElement);

        priceElement.innerHTML = `$${datas.retail_price_cents / 100}`;
        nameElement.innerHTML = `${datas.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();
      });
    }

    function amount(target) {
      parentElement.innerHTML = "";
      let data = [];
      for (
        let sneakerIndex = 0;
        sneakerIndex < sneakersData.length;
        sneakerIndex++
      ) {
        if (sneakersData[sneakerIndex].category.includes(target)) {
          data.push(sneakersData[sneakerIndex]);
        }
      }

      const x = data.length;
      x.toString;
      return x;
    }

    const lifestyleLink = document.getElementById("lifestyle");
    const basketballLink = document.getElementById("basketball");
    const subtitle = document.getElementById("subtitle");

    const number1 = document.querySelector(".number");
    const number2 = document.querySelector(".number2");
    const num1 = amount("lifestyle");
    const num2 = amount("basketball");
    number1.innerHTML = `(${num1})`;
    number2.innerHTML = `(${num2})`;

    lifestyleLink.addEventListener("click", function () {
      category("lifestyle");
      subtitle.innerHTML = "LIFESTYLE SNEAKERS";
    });

    basketballLink.addEventListener("click", function () {
      category("basketball");
      subtitle.innerHTML = "BASKETBALL SNEAKERS";
    });

    // Function to display products based on price filter

    const searchInput = document.getElementById("searchInput");

    function renderResults(filterItems) {
      parentElement.innerHTML = "";
      if (filterItems.length === 0) {
        parentElement.textContent = "No results found.";
        return;
      }

      filterItems.forEach((item) => {
        const divElement = document.createElement("div");

        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = item.main_picture_url;
        imgElement.alt = "Image Description"; // Add appropriate alt text

        priceElement.innerHTML = `$${item.retail_price_cents / 100}`;
        nameElement.innerHTML = `${item.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();

        console.log(item);
      });
    }

    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();

      const filterItems = sneakersData.filter(
        (item) =>
          item.name.toString().toLowerCase().includes(query) ||
          item.keywords.some((keyword) =>
            keyword.toString().toLowerCase().includes(query)
          ) ||
          item.color.toString().toLowerCase().includes(query) ||
          item.brand_name.toLowerCase().includes(query) // Corrected this line
      );

      renderResults(filterItems);
    });

    function lowestToHighest() {
      parentElement.innerHTML = "";
      const temp = sneakersData;
      temp.sort((a, b) => a.retail_price_cents - b.retail_price_cents);

      temp.forEach((item) => {
        const divElement = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = item.main_picture_url;
        imgElement.alt = "Image Description"; // Add appropriate alt text

        priceElement.innerHTML = `$${item.retail_price_cents / 100}`;
        nameElement.innerHTML = `${item.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();
      });
    }

    function highestToLowest() {
      parentElement.innerHTML = "";
      const temp = sneakersData;
      temp.sort((a, b) => b.retail_price_cents - a.retail_price_cents);
      temp.forEach((item) => {
        const divElement = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = item.main_picture_url;
        imgElement.alt = "Image Description"; // Add appropriate alt text

        priceElement.innerHTML = `$${item.retail_price_cents / 100}`;
        nameElement.innerHTML = `${item.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();
      });
    }

    const dropDown = document.getElementById("sortOrder");

    dropDown.addEventListener("change", () => {
      if (dropDown.value === "lowestToHighest") {
        lowestToHighest();
      } else if (dropDown.value === "highestToLowest") {
        highestToLowest();
      } else {
        return;
      }
    });

    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("click", function () {
      console.log("hihihihiihhh");
    });

    function background() {
      const bc = document.getElementsByClassName("custom-div3");
      const colors = [
        "#50BDDE",
        "#5FCA64",
        "#B0EDBC",
        "#411FD6",
        "#E5ED73",
        "#B2249B",
        "#C65343",
        "#B876CE",
      ];
      for (let i = 0; i < bc.length; i++) {
        const colorIndex = i % colors.length;
        bc[i].style.backgroundColor = colors[colorIndex];
      }
    }
    let data1 = [];
    for (
      let sneakerIndex = 0;
      sneakerIndex < sneakersData.length;
      sneakerIndex++
    ) {
      //divide by 100 beacuse the price need to convert to dollars

      data1.push(sneakersData[sneakerIndex]);
    }

    displayFilterPrice(data1);

    function colorDisplay(color) {
      parentElement.innerHTML = "";
      let data = [];
      for (
        let sneakerIndex = 0;
        sneakerIndex < sneakersData.length;
        sneakerIndex++
      ) {
        if (sneakersData[sneakerIndex].color.includes(color)) {
          data.push(sneakersData[sneakerIndex]);
        }
      }
      data.forEach((datas) => {
        const divElement = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        const nameElement = document.createElement("p");
        const priceElement = document.createElement("p");
        nameElement.classList.add("nameE");
        priceElement.classList.add("priceE");

        divElement.classList.add("custom-div");
        divElement2.classList.add("custom-div2");
        divElement3.classList.add("custom-div3");

        const imgElement = document.createElement("img");
        imgElement.src = datas.main_picture_url;
        imgElement.alt = "Image Description"; // Add appropriate alt text

        //parentElement.appendChild(imgElement);

        priceElement.innerHTML = `$${datas.retail_price_cents / 100}`;
        nameElement.innerHTML = `${datas.name}`;

        divElement2.appendChild(nameElement);
        divElement2.appendChild(priceElement);

        divElement3.appendChild(imgElement);

        divElement.appendChild(divElement3);
        divElement.appendChild(divElement2);
        parentElement.appendChild(divElement);
        background();
      });
    }

    function colorFilter(id) {
      if (id === "rgb(0, 0, 0)") {
        return colorDisplay("Black");
      } else if (id === "rgb(244, 240, 240)") {
        return colorDisplay("White");
      } else if (id === "rgb(150, 75, 0)") {
        return colorDisplay("Brown");
      } else if (id === "rgb(255, 253, 208)") {
        return colorDisplay("Cream");
      } else if (id === "rgb(128, 128, 128)") {
        return colorDisplay("Grey");
      } else if (id === "rgb(254, 180, 74)") {
        return colorDisplay("Orange");
      } else if (id === "rgb(51, 170, 255)") {
        return colorDisplay("Blue");
      } else if (id === "rgb(246, 107, 219)") {
        return colorDisplay("Pink");
      } else if (id === "rgb(204, 107, 246)") {
        return colorDisplay("Purple");
      } else if (id === "rgb(241, 48, 53)") {
        return colorDisplay("Red");
      } else if (id === "rgb(251, 246, 150)") {
        return colorDisplay("Yellow");
      } else if (id === "rgb(210, 180, 140)") {
        return colorDisplay("Tan");
      } else if (id === "rgba(0, 0, 0, 0)") {
        return colorDisplay("Multi-Color");
      } else {
        console.log("error");
      }
    }

    let colors = document.querySelectorAll(".btn");
    colors.forEach((color) => {
      color.addEventListener("click", function () {
        // colorFilter(this.style.backgroundColor);
        const bc = window.getComputedStyle(this);
        const bcc = bc.backgroundColor;

        colorFilter(bcc);
      });
    });
  }).fail(function () {
    console.log("check ya code");
  });
});

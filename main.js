let categ = document.querySelector(".details span");
let foot = document.querySelector(".foot");
let letters = document.querySelector(".letters");
let Arr = Array.from(letters.children);
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let right = 0;
let wrong = 0;
let Timer = 0;
let count = 0;
let counter;
let object = {
    Countries: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Japan", "India"],
    Currencies: ["Dollar", "Euro", "Pound", "Yen", "Rupee", "Franc", "Real", "Won", "Peso", "Ruble", "Dinar"],
    Languages: ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Hindi", "Russian", "Portuguese", "Japanese"],
}
let Keys = Object.keys(object);
let randomKeyInObject = Keys[Math.floor(Keys.length * Math.random())];
let randomElementInKey = object[randomKeyInObject][Math.floor(object[randomKeyInObject].length * Math.random())];
let arrOfWord = randomElementInKey.split('');
categ.innerHTML = randomKeyInObject;
arrOfWord.forEach(char => {
    let span = document.createElement("span");
    if (char === " ") {
        span.textContent = "-";
    }
    foot.appendChild(span);
    let spans = document.querySelectorAll(".foot span");
    Arr.forEach(letter => {
        letter.onclick = function () {
            if (arrOfWord.includes(letter.innerHTML.toLowerCase()) || arrOfWord.includes(letter.innerHTML)) {
                
                if (arrOfWord.includes(letter.innerHTML)) {
                    spans[arrOfWord.indexOf(letter.innerHTML)].innerHTML = letter.innerHTML;
                    arrOfWord[arrOfWord.indexOf(letter.innerHTML)] = null;
                }
                else {
                    spans[arrOfWord.indexOf(letter.innerHTML.toLowerCase())].innerHTML = letter.innerHTML.toLowerCase();
                    arrOfWord[arrOfWord.indexOf(letter.innerHTML.toLowerCase())] = null;
                }
                right++;
                if (right === arrOfWord.length) {
                    letters.style.pointerEvents = "none";
                    let div = document.createElement("div");
                    div.innerHTML = `Congratulations You Win After ${wrong - count} Wrong Tries`;
                    div.style.cssText = "color:#009688;font-weight:bold";
                    foot.after(div);
                    clearInterval(counter);
                }
                if (!arrOfWord.includes(letter.innerHTML.toLowerCase()) && !arrOfWord.includes(letter.innerHTML)) {
                    letter.classList.add("active");
                    letter.style.pointerEvents = "none";
                }
            } else {
                if (wrong < 9) {
                    letter.classList.add("active");
                    letter.style.pointerEvents = "none";
                    document.querySelector(`.part-${wrong++ + 1}`).classList.remove("no-active");
                }
                if (wrong === 9) {
                    letters.style.pointerEvents = "none";
                    let div = document.createElement("div");
                    div.innerHTML = `Game Over The Word Is <span>${randomElementInKey}</span>`;
                    foot.after(div);
                    clearInterval(counter);
                }
            }
        }
    });
})
function Time() {
    counter = setInterval(() => {
        seconds.innerHTML--;
        Timer++;
        if (seconds.innerHTML == 0) {
            if (minutes.innerHTML == 0) {
                Timer++;
                clearInterval(counter);
            } else {
                minutes.innerHTML--;
                if (Number(minutes.innerHTML) < 10)
                    minutes.innerHTML = `0${Number(minutes.innerHTML)}`;
                seconds.innerHTML = "59";
            }
        }
        if (parseInt(seconds.innerHTML) < 10)
            seconds.innerHTML = `0${Number(seconds.innerHTML)}`;
        if (Timer == 10) {
            Timer = 0;
            document.querySelector(`.part-${wrong++ + 1}`).classList.remove("no-active");
            count++;
            if (wrong == 9) {
                letters.style.pointerEvents = "none";
                let div = document.createElement("div");
                div.innerHTML = `Game Over The Word Is <span>${randomElementInKey}</span>`;
                foot.after(div);
                clearInterval(counter);
            }
        }
    }, 1000)
}
Time();
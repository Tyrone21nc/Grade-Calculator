let categories = [
    {
        type: "Exams",
        catPercent: "",
        avgScore: ""
    },
    {
        type: "Homeworks",
        catPercent: "",
        avgScore: ""
    }
];

function renderCategories(){
    let elementsContainer = document.querySelector(".elements-container");
    let htmlElements = "";
    for(let i=0; i<categories.length; i++){
        const type = categories[i].type;
        const catPercent = categories[i].catPercent;
        const avgScore = categories[i].avgScore;


        htmlElements += `
        <p class="elements">
            <label>${type}</label>
            <input type="textbox" class="s" value="${catPercent}" placeholder="percent" required>
            <input type="textbox" class="t" value="${avgScore}" placeholder="average score" required>
        </p>
        `;
    }
    elementsContainer.innerHTML = htmlElements;
    console.log(elementsContainer);
}
function categoryName(cName){
    // we create the new category element with our cName parameter
    let newCatElement = {
        type: cName.value,
        catPercent: "",
        avgScore: "",
    };
    // then we push it onto the categories array
    categories.push(newCatElement);
    console.log("I have just pushed ", newCatElement.type);
}

function addCategory(){
    let newCatInfo = document.querySelector(".new-category-info");
    newCatInfo.innerHTML = `
    <label>Enter a category name <input type="textbox" placeholder="new category" class="name background-color-textbox"></label>
    <button class="newCatSubmit">Submit</button>
    <button class="btn">Cancel</button>
    `;
    let catName = document.querySelector(".name");
    let newCatSubmit = document.querySelector(".newCatSubmit");

    newCatSubmit.onclick = function(){
        // when I click the submit button on the new category
        // I need to register the values -> save them in our categories array
        // so I call the registerValues function
        registerValues();
        console.log(categories);
        categoryName(catName);
        newCatInfo.innerHTML = ``;
        renderCategories();
    }
}
/* ************************************* */
function registerValues(){
    let one = document.getElementsByClassName("s");  // catPercent
    let two = document.getElementsByClassName("t");  // avgScore

    for(let i=0; i<categories.length; i++){
        console.log("\t\t\t*****");
        console.log(`This is one: ${one[i].value}`);
        console.log(`This is two: ${two[i].value}`);
        console.log("\t\t\t*****");
    }
    console.log("\n\n\n\n\n");
    for(let i=0; i<categories.length; i++){
        if(one[i].value === undefined){
            one[i].value = ""
        }
        if(two[i].value === undefined){
            two[i].value = ""
        }
        categories[i].catPercent = one[i].value;
        categories[i].avgScore = two[i].value;
    }
    console.log(categories);
}
/* ************************************* */
function getLetterGrade(grade){
    if(grade >= 100){
        return ["A+", "rgb(0, 150, 0)"];
    }
    else if(grade >= 90 && grade <= 99){
        return ["A", "rgb(0, 100, 40)"];
    }
    else if(grade >= 80 && grade <= 89){
        return ["B", "rgb(0, 120, 200)"];
    }
    else if(grade >= 70 && grade <= 79){
        return ["C", "rgb(220, 200, 0)"];
    }
    else if(grade >= 60 && grade <= 69){
        return ["D", "rgb(200, 100, 0)"];
    }
    else{
        return ["F", "rgb(255, 0, 0)"];
    }
}

function getGrade(){
    registerValues();

    let totalGrade = 0;
    for(let i=0; i<categories.length; i++){
        let val1 = Number(categories[i].catPercent);
        let val2 = Number(categories[i].avgScore);

        console.log(val1);
        console.log(val2);
        if(val1 === undefined){
            val1 = 0;
        }
        if(val2 === undefined){
            val2 = 0;
        }
        totalGrade += (val1 * val2);
    }

    totalGrade /= 100;  // then get the percent value
    if(totalGrade.value == NaN){
        totalGrade = 0;
    }
    console.log(`Course Grade: ${totalGrade}%`);
    let result = document.querySelector("#result").textContent = 
    `Course Grade: ${totalGrade}%`;
    const letGrade = getLetterGrade(totalGrade);
    let letterGrade = document.getElementById("letterGrade");
    letterGrade.textContent = letGrade[0];
    letterGrade.style.color = letGrade[1];
    
}


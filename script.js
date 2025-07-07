const keyexp = {
    "data collection": "They collect information about you, like your name, email, or what you do on the app.",
    "third parties": "They might share your data with other companies or partners.",
    "cookies": "Small files stored on your device to remember things like login or preferences.",
    "personal information": "Details that can identify you—like your name, phone number, or email.",
    "location data": "They may track your GPS or where you are using the service.",
    "tracking": "They follow what you do on the site or other sites to personalize ads or content.",
    "advertising": "They may use your data to show you targeted ads.",
    "opt-out": "You can say no to some data collection or emails, but not always everything.",
    "account termination": "They can delete or block your account if you break their rules.",
    "intellectual property": "They own the site content and dont let you copy or sell it.",
    "user content": "Anything you post—like photos or comments—can be used by the service.",
    "license": "You give them permission to use your content, sometimes forever and without pay.",
    "modification": "They can change the rules at any time, often without telling you.",
    "disclaimer": "They arent responsible if something goes wrong when you use the service.",
    "liability": "They limit how much they can be blamed or sued for if problems happen.",
    "arbitration": "You cant sue them; you must resolve problems privately, often without court.",
    "governing law": "They choose which country or states rules apply to the terms.",
    "automatic renewal": "Your subscription may renew by itself unless you cancel it.",
    "subscription": "You might be paying regularly (monthly/yearly) for using the service.",
    "age restriction": "You must be a certain age (like 13 or 18) to use the service.",
};

const highRiskTerms = [
    "arbitration",
    "liability",
    "account termination",
    "license",
];

const elevatedRiskTerms = [
    "data collection",
    "third parties",
    "location data",
    "tracking",
    "advertising",
    "cookies",
];

const moderateRiskTerms = [
    "modification",
    "subscription",
    "automatic renewal",
    "age restriction",
    "governing law",
];

const lowRiskTerms = [
    "opt-out",
    "disclaimer",
    "personal information",
    "user content",
    "intellectual property",
];

const keywords = Object.keys(keyexp);
const obj = Object.values(keyexp);

let arr = [];


const scan = (inpval) => {
    arr = [];
    const text = inpval.toLowerCase();
    for (let i = 0; i < keywords.length; i++) {
        if (text.includes(keywords[i])) {
            arr.push(keywords[i]);
        }
    }
    display();
};

function display() {
    let high = 0, elevated = 0, moderate = 0, low = 0;
    let ohtml = '';
    for (let i = 0; i < arr.length; i++) {
        const term = arr[i];

        if (highRiskTerms.includes(term)) {
            high++;
        }
        else if (elevatedRiskTerms.includes(term)) {
            elevated++;
        }
        else if (moderateRiskTerms.includes(term)) {
            moderate++;
        }
        else {
            low++;
        }

        let desc = keyexp[arr[i]];
        ohtml += `<p>${arr[i]}: ${desc}</p>`;
    }

    const score = (high * 30) + (elevated * 20) + (moderate * 10) + (low * 5);
    const normalized = Math.min(100, Math.floor((score / 240) * 100)); 
    document.getElementById("scorecard").innerText = normalized;
    


    let vibe = '';
    if (normalized <= 39) {
        vibe = 'Dangerous';
    } else if (normalized <= 59) {
        vibe = 'Suspicious';
    } else if (normalized <= 79) {
        vibe = 'Meh';
    } else {
        vibe = 'Friendly';
    }

    ohtml = ohtml +`<h2>Vibe Score</h2>`;
    document.getElementsByClassName("score")[0].style.display = "block";
    document.getElementById("explain").style.display = "block";
    document.getElementById("h4").style.display = "block";
    document.getElementById("output").innerHTML = ohtml;
    document.getElementById("button2").style.display = "inline";
}


const button = document.getElementById("button");

button.addEventListener("click", function () {
    const inp = document.getElementById("text");
    const inpval = inp.value;

    if (inpval === '') {
        document.getElementsByClassName("popup")[0].style.display = "flex";
    }
    else {
        scan(inpval);

    }
});

const button2 = document.getElementById("button2");

button2.addEventListener("click", function () {
    document.getElementById("text").value = '';
    document.getElementById("explain").style.display = "none";
    button2.style.display = 'none';
});

const popbutton = document.getElementById("pop");

popbutton.addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].style.display = "none";
});


// 2.29 hr s
// 33 min


const passwordInput = document.getElementById("password");
const meterFill = document.getElementById("meter-fill");
const strengthText = document.getElementById("strength");
const entropyText = document.getElementById("entropy");
const crackText = document.getElementById("crack");
const tipsList = document.getElementById("tips");

const toggleBtn = document.getElementById("toggleBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const commonPasswords = [
"123456",
"password",
"qwerty",
"admin",
"welcome",
"password123"
];

passwordInput.addEventListener("input", analyzePassword);

toggleBtn.addEventListener("click",()=>{
passwordInput.type =
passwordInput.type==="password" ? "text" : "password";
});

generateBtn.addEventListener("click",()=>{
passwordInput.value = generatePassword(16);
analyzePassword();
});

copyBtn.addEventListener("click",()=>{
navigator.clipboard.writeText(passwordInput.value);
alert("Password copied!");
});

function analyzePassword(){

const password = passwordInput.value;

let score = 0;
let tips = [];

if(password.length >= 12){
score += 20;
}else{
tips.push("Use at least 12 characters.");
}

if(/[A-Z]/.test(password)){
score += 20;
}else{
tips.push("Add uppercase letters.");
}

if(/[a-z]/.test(password)){
score += 20;
}else{
tips.push("Add lowercase letters.");
}

if(/[0-9]/.test(password)){
score += 20;
}else{
tips.push("Include numbers.");
}

if(/[^A-Za-z0-9]/.test(password)){
score += 20;
}else{
tips.push("Include special characters.");
}

if(commonPasswords.includes(password.toLowerCase())){
score = 10;
tips.push("Common password detected.");
}

updateMeter(score);

const entropy = calculateEntropy(password);
entropyText.textContent = entropy;

crackText.textContent =
estimateCrackTime(entropy);

tipsList.innerHTML = "";

tips.forEach(t=>{
const li = document.createElement("li");
li.textContent = t;
tipsList.appendChild(li);
});
}

function updateMeter(score){

meterFill.style.width = score + "%";

if(score < 40){
meterFill.style.background = "#ef4444";
strengthText.textContent = "Weak";
}
else if(score < 70){
meterFill.style.background = "#f59e0b";
strengthText.textContent = "Moderate";
}
else if(score < 90){
meterFill.style.background = "#22c55e";
strengthText.textContent = "Strong";
}
else{
meterFill.style.background = "#00ffff";
strengthText.textContent = "Very Strong";
}
}

function calculateEntropy(password){

let charset = 0;

if(/[a-z]/.test(password)) charset += 26;
if(/[A-Z]/.test(password)) charset += 26;
if(/[0-9]/.test(password)) charset += 10;
if(/[^A-Za-z0-9]/.test(password)) charset += 32;

if(charset === 0) return 0;

return Math.round(
password.length *
Math.log2(charset)
);
}

function estimateCrackTime(entropy){

if(entropy < 28)
return "Instant";

if(entropy < 36)
return "Few Hours";

if(entropy < 60)
return "Several Years";

if(entropy < 80)
return "Thousands of Years";

return "Millions of Years";
}

function generatePassword(length){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

let result = "";

for(let i=0;i<length;i++){
result += chars.charAt(
Math.floor(Math.random()*chars.length)
);
}

return result;
}

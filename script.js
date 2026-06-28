const password = document.getElementById("password");

const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    update("length", hasLength);
    update("upper", hasUpper);
    update("lower", hasLower);
    update("number", hasNumber);
    update("special", hasSpecial);

    if(hasLength) score++;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNumber) score++;
    if(hasSpecial) score++;

    const percent = score * 20;
    strengthFill.style.width = percent + "%";

    if(score <= 2){
        strengthFill.style.background = "red";
        strengthText.textContent = "Weak Password";
    }
    else if(score === 3){
        strengthFill.style.background = "orange";
        strengthText.textContent = "Moderate Password";
    }
    else if(score === 4){
        strengthFill.style.background = "yellow";
        strengthText.textContent = "Strong Password";
    }
    else{
        strengthFill.style.background = "lime";
        strengthText.textContent = "Very Strong Password";
    }

});

function update(id,status){
    const item = document.getElementById(id);

    if(status){
        item.innerHTML = "✅ " + item.textContent.substring(2);
    }else{
        item.innerHTML = "❌ " + item.textContent.substring(2);
    }
}

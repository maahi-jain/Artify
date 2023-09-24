const spinner = document.getElementById("spinner");
const content = document.getElementById("content");

export const loadSpinner=()=>{
  content.style.display="none";
  spinner.style.display = "block";
}

export const removeSpinner=()=>{
    spinner.style.display="none";
    content.style.display="block";
}
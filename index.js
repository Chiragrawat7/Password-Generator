const inputslider=document.querySelector("[data-lengthslider]");
const lengthdisplay=document.querySelector("[data-lengthno]");
const passworddisplay=document.querySelector("[data-passworddisplay]");
const copybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-copymsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#numbers");
const symbolcheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generate");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
let symbols='!@#$%^&*();[]><?":~`';


let password="";
let passwordlength=10;
let checkcount=1;

handleCheckbox();
handelSlider();
setIndicator("#ccc")
function handelSlider(){
   inputslider.value=passwordlength;
   lengthdisplay.innerText=passwordlength;
     //or kuch bhi karna chahiye ? - HW
     const min = inputslider.min;
     const max = inputslider.max;
     inputslider.style.backgroundSize = ( (passwordlength - min)*100/(max - min)) + "% 100%";
}
function setIndicator(color){
   indicator.style.backgroundColor=color;
   indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}
function getRandomInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNo(){
   return getRandomInteger(0,9);
}
function generateLowerCase(){
   return String.fromCharCode(getRandomInteger(97,122));
}
function generateUpperCase(){
   return String.fromCharCode(getRandomInteger(65,90));
}
function generateSymbol(){
   return symbols.charAt(getRandomInteger(0,symbols.length));
}

function calcStrength() {
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;
   if (uppercasecheck.checked) hasUpper = true;
   if (lowercasecheck.checked) hasLower = true;
   if (numbercheck.checked) hasNum = true;
   if (symbolcheck.checked) hasSym = true;
 
   if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
     setIndicator("#0f0");
   } else if (
     (hasLower || hasUpper) &&
     (hasNum || hasSym) &&
     passwordlength >= 6
   ) {
     setIndicator("#ff0");
   } else {
     setIndicator("#f00");
   }
}

function handleCheckbox(){
   checkcount=0;
   allcheckbox.forEach((checkbox)=>{
      if(checkbox.checked)
         checkcount++;
   })
   if(passwordlength<checkcount){
      passwordlength=checkcount;
      handelSlider();
   }
   console.log("cheking");
}
allcheckbox.forEach((checkbox)=>{
   checkbox.addEventListener('change', handleCheckbox);
})
async function copyContent(){
   try{
   await navigator.clipboard.writeText(passworddisplay.value);
   copymsg.innerText="coiped"
   }
   catch(e){
      copymsg.innerText="failed to copy";
   }
   copymsg.classList.add("active");
   setTimeout(() => {
      copymsg.classList.remove("active");
      console.log("removing")
   }, 2000);
}

inputslider.addEventListener('input',e=>{
   passwordlength=e.target.value;
   handelSlider();
   // console.log(e);
})
copybtn.addEventListener('click',()=>{
   if(passworddisplay.value)
      copyContent();
})
function shufflePassword(...array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
generatebtn.addEventListener('click',()=>{
   if(checkcount==0)
      return;
   if(passwordlength<checkcount){
      passwordlength=checkcount;
      handelSlider();
   }
   password="";
   // if(uppercasecheck.checked)
   //    password+=generateUpperCase();
   // if(lowercasecheck.checked)
   //    password+=generateLowerCase();
   // if(numbercheck.checked)
   //    password+=generateRandomNo();
   // if(symbolcheck.checked)
   //    password+=generateSymbol();
   let funarr=[];
   if(uppercasecheck.checked)
      funarr.push(generateUpperCase);
   if(lowercasecheck.checked)
      funarr.push(generateLowerCase);
   if(numbercheck.checked)
      funarr.push(generateRandomNo);
   if(symbolcheck.checked)
      funarr.push(generateSymbol);
   
   // compulsory addition
   for(let i=0;i<funarr.length;i++){
      password+=funarr[i]();
   }
   // remaining addition
   for(let i=0;i<passwordlength-funarr.length;i++){
      let rnd=getRandomInteger(0,funarr.length-1);
      password+=funarr[rnd]();
   }
   // shuffle the password 
   
   password=shufflePassword(password);
   passworddisplay.value=password

   
   // to calculate streangth
   calcStrength();
   console.log("done");

})
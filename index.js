var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");
var event = document.getElementsByClassName("active-link");
function openTab(tabName){
for(tabLink of tabLinks){
tabLink.classList.remove("active-link");

}


for(tabContent of  tabContents){


    tabContent.classList.remove("active-tab");

}
 addEventListener;{
 document.getElementById(tabName).classList.add("active-tab");
}
}
var sideMenu = document.getElementById("sideMenu");
function openMenu(){
    sideMenu.style.right = "0";
    }
function closeMenu(){
    sideMenu.style.right = "-200px";
}




const scriptURL = 'https://script.google.com/macros/s/AKfycbxsNWCBGFNAB2jeqJGPoPER1PqbC03Duj6NNmkTJhDPgx8YssQGF5sgYEZFG0uZjaL0/exec'
        const form = document.forms['submit-to-google-sheet']
      
        form.addEventListener('submit', e => {
          e.preventDefault()
          fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        })
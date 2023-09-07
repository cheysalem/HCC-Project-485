//NMSU CS485 Fall 2023 Project Pebble Village 

const rngModifier = 0;

//example script from w3
//generates a cookie with a name, text value, and expiration value
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();

    //cookie is actually created here
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    //collect visitor data run getCookie
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
        //assign random number to user
       //rngModifier++;
       //user = Math.random()*100 + rngModifier;
       user = prompt("Cookie test. Enter a username:", "");
       if (user != "" && user != null) {
        //save visitor data setCookie
         setCookie("username", user, 30);
       }
    }
  } 

  //secret button listener (just messing around)
  document.getElementById("showCookiesBtn").addEventListener("click", showCookies());
  function showCookies(){
    //display cookie data somehow
  }
//NMSU CS485 Fall 2023 Project Pebble Village 
//if you told me my part of the project would involve doing OOP in Javascript I would've said no
//and yet
//i did most of this it's mine - david

//generate unique id on execution
const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

//example script from w3
//generates a cookie with a name, text value, and expiration value
  function setCookie(cname, cvalue, exdays) {
    //set expiration date
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    //bake the cookie
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
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

  //collect as much information about the user in the background as possible
  //store it in a key value pair object
  //and sends it to the database...
  function fingerprint(){
    const fp = {
      dID : id, //device visit id
      //navigator properties
      cookies : navigator.cookieEnabled,//cookieenabled
      langu : navigator.languages,//languages
      useragent : navigator.userAgent,//useragent
      platform : navigator.platform,//browser platform
      engine : navigator.engine,//browser engine
      //TODO add these categories to database
      java : navigator.java,//java enabled?
      dnt : navigator.doNotTrack,//donottrack enabled
      cores : navigator.hardwareConcurrency,//number of cores or idk
      //screen properties
      h : screen.height,//height
      ah : screen.availHeight,//available height
      w : screen.width,//width
      sw : screen.availWidth,//available width
      getID : function(){
        return id;
      }
    };
    //send visitor data to database
    let fpOUT = JSON.stringify(fp);
    console.log(fpOUT);

    return fp;
  }
  
  //sets cookie if there is none
  //if a cookie exists already it will avoid overwriting it
  //to maintain a single fingerprint per visitor
  function checkCookie() {
    let did = getCookie("visitorID");
    if (document.cookie && did != "") {
      //dont do anything
      console.log("Welcome again " + did);
    } else {
      //execute fingerprint
      let morsel = fingerprint();
      let vID = morsel.dID;
      //save visitor data setCookie
      setCookie("visitorID", vID, 150);
    }
  } 

  //secret cookie button function
  function showCookies(){
    if(document.cookie != ""){
      fpee = JSON.stringify(document.cookie);
      window.alert(fpee);
    }else{
      window.alert("no cookies for you");
    }
  }
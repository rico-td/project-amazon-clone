const xhr = new XMLHttpRequest();

let  response;
xhr.addEventListener("load", () => {
    response = xhr.response;
    console.log(response);
    // console.log(JSON.parse(response));  
});

xhr.open("GET", "https://supersimplebackend.dev/images/apple.jpg");    
xhr.send(); 


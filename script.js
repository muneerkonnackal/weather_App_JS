   let tempdegree = document.querySelector(".temp")
   let tempSection = document.querySelector(".temparature")
   let tempspan = document.querySelector(".temparature span")
    let cityweather = document.getElementById("city_N")
    let ticon =document.getElementById("tempicon")

    let citytemp= document.getElementById("tmpCity")
    let weatherInputArray = []
    let cityName;


function setLocalStorage(){
    localStorage.setItem("wcity",cityName);
}

function getLocalStorage(){
    cityName =localStorage.getItem("wcity")
    console.log(cityName);

   
}


  function search() {
     cityName = input_Name.value;
    setLocalStorage();
     getLocalStorage();
     weatherInputArray.push(cityName);
     console.log(cityName);
        if (cityName) {
        const http = new XMLHttpRequest();
        http.open('get', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=503aad77471cd1b27eeb94e1c79232c4`)
        http.send()
        console.log(http.readyState);
        http.onreadystatechange = () => {
            console.log(http.readyState);
            if (http.readyState == 4) {
                if (http.status >= 200 && http.status < 300) {
                    console.log(http.responseText);
                    let data = JSON.parse(http.responseText)
                    console.log(data);
                    let city = data.name
                    console.log(city);
                    let country = data.sys.country
                    console.log(country);
                    let citytemp = Math.floor(data.main.temp - 273)
                    //Formula for farenheit
                    let farenheit = (citytemp*9/5)+32;
                    // change deg to farenheit
                    tempSection.addEventListener("click",()=>{
                        if(tempspan.innerHTML==="°C"){
                            tempspan.innerHTML="°F";
                            tempdegree.innerHTML=Math.floor(farenheit)
                            

                        }
                        else{
                            tempspan.innerHTML ="°C"
                            tempdegree.innerHTML=citytemp
                        }
                    })


                    console.log(citytemp);
                    let Id=data.weather[0].id
                    console.log(Id);
                    let desc=data.weather[0].description
                    console.log(desc);
                    let Main=data.weather[0].main
                    console.log(Main);
                    let wicon =data.weather[0].icon
                    console.log(wicon);
                    (tempicon.src).innerHTML=wicon
                    if(wicon){
                        tempicon.src =`https://openweathermap.org/img/wn/${wicon}@2x.png`
                    }
                    // let { id, main ,icon } = data.weather[0]
                    // console.log(main);
                    // console.log(id);
                    // console.log(icon);
                    
                    let wind = data.wind.speed
                    console.log(wind);
                    let visibility = data.visibility / 1000
                    console.log(visibility);
                    let pressure = data.main.pressure
                    console.log(pressure);
                    let humidity = data.main.humidity
                    let time = data.timezone
                    // in this api timezone in seconds so we convert to hours and seconds 
                    let hours = Math.floor(time / 3600);
                    let minutes = (time % 3600) / 60
                    //get the current utc time
                    const currentTime = new Date()
                    //calculate the local time
                    const localtime = new Date(currentTime.getTime() + (hours * 60 + minutes) * 60 * 1000)
                    // var x = localtime.toLocaleString("en-US",{timeStyle:"medium",hourCycle:"h24"})
                    // console.log(`local time is: ${localtime}`);
                    // console.log(x);
                    // get the hour,minute, and second components of the local time
                    const daydate = localtime.getUTCDate()
                    const daymmonth = localtime.getUTCMonth() + 1;
                    const dayyear = localtime.getUTCFullYear()
                    const hrs = localtime.getUTCHours()
                    const mins = localtime.getUTCMinutes()

                    // add am or pm
                    const ampm = hrs < 12 ? "AM" : "PM";
                    // format the local time as a string

                    const formattedTime = `${hrs}:${mins< 10 ?"0" : ''}${mins} ${ampm}`
                    console.log(formattedTime);
                    const formattedDate = `${daydate}:${daymmonth}:${dayyear}`
                    console.log(formattedDate);



                    tmpCity.innerHTML = `${citytemp}`
                    city_N.innerHTML = `${city.slice(0,9)}`
                    tm.innerHTML = `${formattedTime}`
                    dt.innerHTML = `${formattedDate}`
                    conditions.innerHTML = `${desc}`
                    Pressure.innerHTML = `${pressure} mb`
                    Humidity.innerHTML = `${humidity} %`
                    Visibility.innerHTML = `${visibility} km`
                    Wind.innerHTML = `${wind} km/hr`
                    contentBox.style.backgroundImage.innerHTML=   Id
                    if (Id < 250) {
                        // Change the background image based on the condition
                        contentBox.style.backgroundImage = 'url("https://www.wallpaperup.com/uploads/wallpapers/2015/06/13/721047/c662bf907ac9a79e0083602db9997c8c.jpg")';
                    }
                    else if (Id < 350) {
                        contentBox.style.backgroundImage = 'url("https://cdn.youpic.com/large/521254_O3sArmBiaL50Q9lr_399945.JPG")';
                    }
                    else if (Id < 550) {
                        if(wicon.endsWith("n.png") || (wicon.includes("n")) ){
                            contentBox.style.backgroundImage = 'url("https://wallpapercave.com/wp/wp2529697.jpg")';
                        }
                        else{contentBox.style.backgroundImage = 'url("https://wallpapercave.com/wp/NxcohWv.jpg")';}
                    }
                    else if (Id < 650) { 
                        contentBox.style.backgroundImage = 'url("https://www.wallpaperup.com/uploads/wallpapers/2014/02/28/281164/4c768b06fa0695824f7fd60e795d8031.jpg")';
                    }
                    else if (Id < 800) {
                        contentBox.style.backgroundImage = 'url("https://cdn.wallpapersafari.com/4/90/Hb38VD.jpg")';
                    }
                    else if (Id == 800) {
                       if(wicon.endsWith("n.png") || (wicon.includes("n")) ){ contentBox.style.backgroundImage = 'url("https://i.pinimg.com/originals/45/4c/e9/454ce90dd1844e58cd177f7e8c354c47.jpg")';
                    }else{
                        contentBox.style.backgroundImage = 'url("https://wallpapersmug.com/download/3840x2160/73c030/blue-sky-above-clouds.jpg")';
                    }
                    }
                    else if (Id > 800) {
                        if(wicon.endsWith("n.png") || (wicon.includes("n"))){contentBox.style.backgroundImage = 'url("https://lh3.googleusercontent.com/proxy/dwD59nh-09rAJvCgSBt5i_D5ex9cfMpmB-k-62u5efgFRJCwIwTz0SKQBPBBtDrawypgkh7tnvyqZ1hMUgnxeAOIsKDPQvf0QUrFUA=w1200-h630-p-k-no-nu")';
                    }
                    else{
                        contentBox.style.backgroundImage = 'url("https://wallpapercave.com/wp/wp6486568.jpg")';
                    }
                        
                        
                    }

                    
                   




                }

            }
        }
    }
    else {
        alert("Please enter city name");
    }
    add()
    
  
   

}





function Reset() {
     
    // input_Name.value = '';
    // input_Name.focus();
    searchHistory.innerHTML = "";
}





function add() {
    const input_Name = document.getElementById("input_Name");
    const searchHistory = document.getElementById("searchHistory");

    if (input_Name.value) {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i>  ${input_Name.value}`

        // Insert the new <li> at the beginning of the list (top)
        searchHistory.insertBefore(li, searchHistory.firstChild);

        // Remove the oldest <li> if there are more than 3
        if (searchHistory.children.length > 2) {
            searchHistory.removeChild(searchHistory.lastChild);
        }

        // Clear the input field and give it focus
        input_Name.value = "";
        input_Name.focus();
    }
    
}


// setLocalStorage();
  
getLocalStorage();


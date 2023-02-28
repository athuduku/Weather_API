window.onload = function(){
  var API_KEY = "e7704bc895b4a8d2dfd4a29d404285b6";

  var input = document.getElementById("input");
  var button = document.getElementById("button");

  var cityTag = document.getElementById("cityTag");
  var tempTag = document.getElementById("tempTag");

  var iconTag = document.getElementById("iconTag");
  var descTag = document.getElementById("descTag");

  var weather = document.getElementById("weather");

  var dateTag = document.getElementById("dateTag");
  var timeTag = document.getElementById("timeTag");

  async function fetchCityTime(cityName){
    
    const options = {
      method: 'GET',
      url: 'https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime',
      params: {city: cityName},
      headers: {
        'X-RapidAPI-Key': '2162afedebmshdd220cf5ca1d97bp10a6f2jsn0a3e05f23ace',
        'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
      }
    };

    const data = axios.request(options).then(function (response) {
      return new Date(response.data.datetime);
    }).catch(function (error) {
      console.error(error);
    });
    return await data;
  }

  async function fetchWeather(cityName){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
      const data = axios.get(url).then((response)=>{
        let resp = response.data;
        let city = resp.name+", "+resp.sys.country;
        let temp = Math.round((resp.main.temp - 32)*(5/9));
        let weatherDesc = resp.weather[0].description;
        let weatherIcon = resp.weather[0].icon;
        
        return {city, temp, weatherDesc, weatherIcon};
      }).catch((error) =>{
        console.error(error);
      })
      return await data;
  }

  button.addEventListener("click",async() => {	
    console.log("start");
    if(input.value != ""){
      let inputData = input.value;
      const result = await Promise.all([fetchWeather(inputData), fetchCityTime(inputData)]);
      
      let [data, date] = result;
        
      const {city, temp, weatherDesc, weatherIcon} = data;
      
      let hours = date.getHours();
      
      if(hours >= 4 && hours < 9){
        weather.style.background = 'linear-gradient(16deg, rgba(238,174,202,1) 33%, rgba(148,187,233,1) 100%)';
      }
      else if(hours >= 17 && hours <= 19){
        weather.style.background = 'linear-gradient(16deg, rgba(238,174,202,1) 46%, rgba(233,232,137,1) 91%)';
      }
      else if(hours > 19 || hours < 4){
        weather.style.background = 'linear-gradient(176deg, rgba(45,45,41,1) 0%, rgba(27,17,29,1) 0%)';
      }
      else{
        weather.style.background = '#5DADE2';
      }
      
      console.log(weather.style);
      
      cityTag.innerText = city;

      const degrees = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'celsius',
      });

      tempTag.innerText = degrees.format(temp);
      iconTag.src = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
      descTag.innerText = weatherDesc;
      
      dateTag.innerText = date.toDateString();
      if(hours >= 12 && (hours <= 23 && date.getMinutes() < 59)){
        timeTag.innerText = ('0'+hours).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+" PM";
      }
      else{
        timeTag.innerText = ('0'+hours).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+" AM";
      }
    }
    else{
      alert("enter some city name");
    }
    console.log("end");
    input.value = "";
        
  })``
}


function decode(location) {  
  
  var response = Maps.newGeocoder()
  .setBounds(49.3457868, -124.7844079, -66.9513812, 24.7433195)
  .geocode(location);
  
  
  // Add each result to the map and doc.
  for (var i = 0; i < response.results.length && i < 9; i++) {
    var result = response.results[i];
   
    //doc.appendListItem(result.formatted_address);
    //Logger.log(result.formatted_address)
    return result.geometry.location.lat + "," + result.geometry.location.lng;
  }
  
}


function calculateDistance(e) {
  var range = e.range;
  var col = range.getColumn();
  var date;
  if (col == 3) {
    var row = range.getRow();    
    var sheet = range.getSheet();  
    var changedMiliageCell = sheet.getRange("E"+row);    
    
    date = new Date(sheet.getRange("A"+row).getValue());
    var checkinTime = sheet.getRange("J"+row).getDisplayValue();        
    
    var checkinPM = checkinTime.split(" ")[1];
    var checkinHour = checkinTime.split(":")[0];
    var checkinMin = checkinHour.split(" ")[0];        
    if (checkinPM[1] == "PM") {
      checkinHour = checkinHour + 12;
    }    
    date.setHours(checkinHour);
    date.setMinutes(checkinMin);
        
    
    var directions = Maps.newDirectionFinder()
    .setOrigin('47.2419296,-122.3652816')//home
    .setDestination(range.getValue())
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .setArrive(date)
    .getDirections();
    var textDistance = directions.routes[0].legs[0].distance.text;//34mi
    var textDuration = directions.routes[0].legs[0].duration.text;//1 hour 35 mins
    
    Logger.log(textDuration);
    
    var days = 0;
    var durHours = 0;    
    var durMin = 0;
    
    var textSplit = textDuration.split(" ");
    var i;
    for (i = 0; i < textSplit.length; i++) {
      var n = textSplit[i];
      var text = textSplit[i+1];
      if (text === "day") {
        days += n;
      }
      if (text === "days") {
        days += n;
      }
      if (text === "hour") {
        durHours += n;
      }
      if (text === "hours") {
        durHours += n;
      }
      if (text === "min") {
        durMin += n;
      }
      if (text === "mins") {
        durMin += n;
      }
      i++;      
    }
        
    
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - durHours);
    date.setMinutes(date.getMinutes() - durMin);   
    
    var distancePlain = textDistance.replace(",", "");
  
    var distanceMiNumber = parseFloat(distancePlain.replace("mi", ""));
    var roundTripMi = Math.ceil(distanceMiNumber * 2.0);
    changedMiliageCell.setComment(textDistance + " ONEWAY\n" + roundTripMi + " mi ROUND-TRIP" + "\nDuration: " + textDuration + "\nLeave By: " + date);        
  }  
}

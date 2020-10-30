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
  if (col == 3) {
    var row = range.getRow();    
    var sheet = range.getSheet();  
    var changedMiliageCell = sheet.getRange("E"+row);    
    
    var date = sheet.getRange("A"+row).getValue();
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
    
    var durHour = textDuration.split("hour")[0];
    var durMin  = textDuration.split(" ")[2];
    
    date.setHours(date.getHours() - durHour);
    date.setMinutes(date.getMinutes() - durMin);   
  
    var distanceMiNumber = parseFloat(textDistance.replace("mi", ""));
    var roundTripMi = Math.ceil(distanceMiNumber * 2.0);
    changedMiliageCell.setComment(textDistance + " ONEWAY\n" + roundTripMi + " mi ROUND-TRIP" + "\nDuration: " + textDuration + "\nLeave By: " + date);        
  }  
}


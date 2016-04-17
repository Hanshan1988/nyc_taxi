var debug = false;
// Turn variables into appropriate forms as input for modelling
function getManhattan(lon1, lat1, lon2, lat2) {
	var lon_dist = Math.abs(lon2 - lon1);
    var lat_dist = Math.abs(lat2 - lat1);
    var result = 111 * (lon_dist + lat_dist);
	return +(result.toFixed(6));
};

if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * 3.14 / 180;
    };
};

function getHaversine(latA, longA, latB, longB){
	var dLat = (latA - latB).toRad(); 
	var dLon = (longA - longB).toRad();
	var dLatDiv2 = dLat / 2;
	var dLonDiv2 = dLon / 2;
	var latBRad = latB.toRad();
	var latBRadCos = Math.cos(latBRad);
	var dLatDiv2Sin = Math.sin(dLatDiv2);
	var dLonDiv2Sin = Math.sin(dLonDiv2);
	var a = dLatDiv2Sin * dLatDiv2Sin + latBRadCos * latBRadCos * dLonDiv2Sin * dLonDiv2Sin;
	var result = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //6371 radius of earth in km
	return +(result.toFixed(6));
};

function getWeekdayDummy(weekday) {
	var zeros = [];
	var numzeros = 7;
	for (var i = 0; i < numzeros; i++) zeros.push(0);
	zeros[weekday] = 1;
	return zeros
};

function getHourDummy(hour) {
	var zeros = [];
	var numzeros = 24;
	for (var i = 0; i < numzeros; i++) zeros.push(0);
	zeros[hour] = 1;
	return zeros
};

function getThatTimeOfDayDummy(hour) {
    if (hour >= 5 && hour <= 9) {
        return [0, 0, 0, 1, 0]; //"Morning"
	} else if (hour >= 10 && hour <= 11) {
		return [0, 0, 1, 0, 0]; //"Mid-morning"
    } else if (hour >= 12 && hour <= 15) {
        return [1, 0, 0, 0, 0]; //"Afternoon"
    } else if (hour >= 16 && hour <= 21) {
        return [0, 1, 0, 0, 0]; //"Evening"
    } else {
        return [0, 0, 0, 0, 1]; //"Night"    
	};
};

function getGrid(coord) {
	return +((coord - .005).toFixed(2))
};

function getLonDummy(lon1) {
	var lon1_grid = +((lon1 - .005).toFixed(2))
	var zeros = [];
	var numzeros = 13;
	for (var i = 0; i < numzeros; i++) zeros.push(0);
	var lon_index = +((lon1_grid * 100 + 7402).toFixed(0))
	zeros[lon_index] = 1;
	return zeros
};

function getLatDummy(lat1) {
	var lat1_grid = +((lat1 - .005).toFixed(2))
	var zeros = [];
	var numzeros = 14;
	for (var i = 0; i < numzeros; i++) zeros.push(0);
	var lat_index = +((lat1_grid * 100 - 4070).toFixed(0))
	zeros[lat_index] = 1;
	return zeros
};

function getOutputArray(lon1, lat1, lon2, lat2, day, hour, isRain) {
	//return order: that_time_of_day, p_lon, p_lat, d_lon, d_lat, weekday, hour, h_dist, m_dist, isRaining
	var arrays = [getThatTimeOfDayDummy(hour), getLonDummy(lon1), getLatDummy(lat1), getLonDummy(lon2), getLatDummy(lat2), 
		getWeekdayDummy(day), getHourDummy(hour), getHaversine(lon1, lat1, lon2, lat2), getManhattan(lon1, lat1, lon2, lat2), isRain]
	// Change into flat list
	var merged = [].concat.apply([], arrays);
	// var merged = arrays.join();
	return merged
};


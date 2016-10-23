function Shelter() {
    this.geo = {lat:0,lon:0,address:""};
    this.name = "";
    this.currentBeds = 0;
    return this;
}

var shelters = [];
var thisShelterIndex = -1;
var thisShelterName = "";

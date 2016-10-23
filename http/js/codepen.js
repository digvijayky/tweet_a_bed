function generateGeoJSON() {
    var obj = {
        type: "FeatureCollection",
        features: []
    };
    shelters.forEach(shelter=>{
        var feature ={
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [shelter.geo.lon, shelter.geo.lat]
            },
            properties: {
                address: shelter.geo.address,
                name: shelter.name,
                'marker-color': '#e30',
                'marker-size': 'large'
            }
        }
        if (shelter == shelters[thisShelterIndex]) {
            feature.properties['marker-color'] = '#ea0';
        } else {
            feature.properties['marker-symbol'] = shelter.currentBeds;
        }
        if (shelter.currentBeds == 0 && shelter != shelters[thisShelterIndex]) {
            feature.properties['marker-color'] = '#999';
        }
        obj.features.push(feature);
    });
    return obj;
}

var map;

function draw() {
    var thisShelter = shelters[thisShelterIndex];
    document.getElementById('shelterHeader').innerHTML = thisShelter.name;
    document.getElementById('numBeds').innerHTML = thisShelter.currentBeds;
    L.mapbox.accessToken='pk.eyJ1IjoidHdlZXRhYmVkIiwiYSI6ImNpdWt6YmFmZjAwMXIyb251dWZkdDN5dmUifQ.nIYbK0rsjYDAPTkH9bVaSg'
    map = L.mapbox.map('map', 'mapbox.streets') // update with your own map id
        .setView([thisShelter.geo.lat, thisShelter.geo.lon], 12);

    var listings = document.getElementById('listings');
    var locations = L.mapbox.featureLayer().addTo(map);

    locations.setGeoJSON(generateGeoJSON());
    drawMap();

    function setActive(el) {
        var siblings = listings.getElementsByTagName('div');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className
                .replace(/active/, '').replace(/\s\s*$/, '');
        }

        el.className += ' active';
    }

    function drawMap() {
        console.log("Locations ready to draw");
        console.dir(locations);
        locations.eachLayer(function(locale) {
            console.log("Drawing location...");
            // Shorten locale.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = locale.feature.properties;

            // Each marker on the map.
            var popup = '<h3>' + prop.name + '</h3><div>' + prop.address;

            var listing = listings.appendChild(document.createElement('div'));
            listing.className = 'item';

            var link = listing.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';

            link.innerHTML = prop.name;
            if (prop.crossStreet) {
                link.innerHTML += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
                popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
            }

            var details = listing.appendChild(document.createElement('div'));
            details.innerHTML = prop.address;
            if (prop.phone) {
                details.innerHTML += ' &middot; ' + prop.phoneFormatted;
            }

            link.onclick = function() {
                setActive(listing);

                // When a menu item is clicked, animate the map to center
                // its associated locale and open its popup.
                map.setView(locale.getLatLng(), 16);
                locale.openPopup();
                return false;
            };

            // Marker interaction
            locale.on('click', function(e) {
                // 1. center the map on the selected marker.
                map.panTo(locale.getLatLng());

                // 2. Set active the markers associated listing.
                setActive(listing);
            });

            popup += '</div>';
            popup += '<div><a href="#">Reserve Beds</a></div>';
            locale.bindPopup(popup);
        });
    };
}

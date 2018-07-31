let map;
let mapInfo = document.getElementById("info");
let tracks_kml_url = "https://s3.ca-central-1.amazonaws.com/maps-miguel/railway(1).kml";
// let tracks_kml_url = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';

const markers = [
    {
        name: "Norwester Buildings",
        location: [53.570356, -113.441410],
        description: "This is a fantastic freestanding building with office, showroom, warehouse and dock loading. This property is located east of 167 Street, and abutting the southside of 118 Avenue. Access to the property is available via a single paved ingress point along an interior service road at the northern perimeter.",
        type: "Industrial"
    },
    {
        name: "Santa Fe Plaza",
        location: [53.543409, -113.635578],
        description: "This space is located in the Santa Fe Plaza in northwest Edmonton just off of 184 Street and Stony Plain Road in a well-maintained and nicely landscaped plaza, and is close to all major routes in the northwest.",
        type: "Office"
    },
    {
        name: "Opus Building",
        location: [53.573551,-113.602895],
        description: "Easy access to Yellowhead Trail, 170 Street and 156 Street.",
        type: "Office"
    },
    {
        name: "Pattison Building",
        location: [53.553529,-113.626491],
        description: "This industrial business zoned site is located on the northeast corner of 178th Street and 107th Avenue in the McNamara Industrial subdivision, occupying a favorable location in the northwest sector of Edmonton. This property benefits from the proximity to the Anthony Henday Freeway and the Yellowhead Highway.",
        type: "Office / Industrial"
    },
    {
        name: "Overland Place",
        location: [53.588524,-113.565500],
        description: "This space is located on St. Albert Trail with exposure to approximately 45,000 vehicles per day.",
        type: "Retail / Office / Industrial"
    },
    {
        name: "McIntyre Junction",
        location: [53.490890,-113.455853],
        description: "The subject vacancy is the northern building on site, which occupies a prominent corner position in the McIntyre Industrial neighborhood. This property sits near major arterials including 91st Street, 99th Street, Whitemud Drive, and Anthony Henday.",
        type: "Industrial"
    },
    {
        name: "Centre 99",
        location: [53.478153,-113.487275],
        description: "The subject property is located at the southwest corner of 99 Street and 42 Avenue, in the Strathcona Industrial Park subdivision. There is excellent access to Whitemud Freeway, 99 Street, Calgary Trail, and the Anthony Henday.",
        type: "Office / Industrial"
    },
    {
        name: "Strathcona Buildings",
        location: [53.478647,-113.477536],
        description: "This space is located in Strathcona Industrial Park in south Edmonton. With a complete building facelift, this space is located in a busy part of SE Edmonton’s retail and industrial corridor and is perfect for tenants wanting to be central to the City while being in a building with a fresh appearance. It offers quick and convenient access to 99 Street, Calgary Trail, Gateway Boulevard, and Whitemud Drive. The space is ideal for office, showroom industrial, or retail tenants. Water and natural gas are included in the operating costs.",
        type: "Office / Industrial"
    },
    {
        name: "76 Avenue Building",
        location: [53.513343,-113.407962],
        description: "This space is located in Southeast Edmonton, just off 50 Street and 76 Avenue. With great access to major routes in the very busy industrial SE corridor of Edmonton, this space is ideally situated for Warehouse and Manufacturing users who also need space for office. Site features include convenient access to major routes, ample parking, and surface storage behind the space",
        type: "Office / Industrial"
    }
];

function initMap() {

    mapSettings = {
        zoom: 11,
        center: new google.maps.LatLng(53.5444, -113.4909),
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapSettings);

    for (marker of markers) {
        let newMarker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(marker.location[0], marker.location[1]),
            title: marker.name
        });

        addEventListenerToMarker(newMarker, marker);
    }

    // Add KML layer.
    let railwayLayer = new google.maps.KmlLayer(tracks_kml_url, {
        supressInfoWindows: true,
        preserveViewport: true
    });

    let railwayButton = document.getElementById("toggle-railway");
    railwayButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(railwayLayer.getMap());
        if (railwayLayer.getMap() === undefined) {
            railwayLayer.setMap(map);
        } else {
            railwayLayer.setMap(undefined);
        }
    });
}

function addEventListenerToMarker(marker, data) {
    marker.addListener("click", function() {
        while(mapInfo.firstChild) {
            mapInfo.removeChild(mapInfo.firstChild);
        }
        // Add the new content to #map-info.
        mapInfo.innerHTML = `<h3>${data.name}</h3><p>${data.description}</p><h4>Type: ${data.type}</h4>`;
    });
}
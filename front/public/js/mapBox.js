/*   eslint-disable*/

const locations = JSON.parse(document.getElementById("map").dataset.locations);
// console.log(locations);
mapboxgl.accessToken =
	"pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h",
	scrollZoom: false,
});

const geojson = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-112.987418, 37.198125],
			},
			properties: {
				description: "Zion Canyon National Park",
			},
		},
		{
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-111.376161, 36.86438],
			},
			properties: {
				description: "Antelope Canyon",
			},
		},
		{
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-112.115763, 36.058973],
			},
			properties: {
				description: "Grand Canyon National Park",
			},
		},
		{
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-116.107963, 34.011646],
			},
			properties: {
				description: "Joshua Tree National Park",
			},
		},
	],
};

const bounds = new mapboxgl.LngLatBounds();

geojson.features.forEach(function (marker) {
	var el = document.createElement("div");
	el.classNameName = "marker";

	new mapboxgl.Marker({
		element: el,
		anchor: "bottom",
	})
		.setLngLat(marker.geometry.coordinates)
		.addTo(map);

	new mapboxgl.Popup({
		offset: 30,
		closeOnClick: false,
	})
		.setLngLat(marker.geometry.coordinates)
		.setHTML("<p>" + marker.properties.description + "</p>")
		.addTo(map);

	bounds.extend(marker.geometry.coordinates);
});

map.fitBounds(bounds, {
	padding: {
		top: 200,
		bottom: 150,
		left: 50,
		right: 50,
	},
});

map.on("load", function () {
	map.addLayer({
		id: "route",
		type: "line",
		source: {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: [
						[-112.987418, 37.198125],
						[-111.376161, 36.86438],
						[-112.115763, 36.058973],
						[-116.107963, 34.011646],
					],
				},
			},
		},
		layout: {
			"line-join": "round",
			"line-cap": "round",
		},
		paint: {
			"line-color": "#55c57a",
			"line-opacity": 0.6,
			"line-width": 3,
		},
	});
});

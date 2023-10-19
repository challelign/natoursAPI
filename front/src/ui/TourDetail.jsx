import React from "react";
import { getToursUsingSlug } from "../api/NatoursAPI";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import PageTitle from "./PageTitle";
import { OverViewBox, ReviewCard } from "./OverViewBox";
import moment from "moment";
import { url } from "../url";
import StarRating from "./review/StarRating";

const TourDetail = () => {
	const { slug } = useParams();
	const {
		isLoading,
		isError,
		data: product,
		status,
		error,
	} = useQuery({
		queryKey: ["tours", slug],
		queryFn: () => getToursUsingSlug(slug),
	});

	if (isError) {
		return ` Error : ${error.message}`;
	}
	if (isLoading) {
		return <Spinner />;
	}
	console.log(product);
	return (
		<>
			<PageTitle title={product.name} />
			<section class="section-header">
				<div className="header__hero">
					<div className="header__hero-overlay ">
						<img
							src={`${url}/img/tours/${product?.imageCover}`}
							alt={product?.name}
							className="header__hero-img"
						/>
					</div>
				</div>
				<div class="heading-box">
					<h1 className="heading-primary">
						<span>{product?.name} Tour</span>
					</h1>
					<div className="heading-box__group">
						<div className="heading-box__detail">
							<svg className="heading-box__icon">
								<use href="img/icons.svg#icon-clock"></use>
							</svg>
							<span className="heading-box__text">
								{product?.duration} days
							</span>
						</div>
						<div className="heading-box__detail">
							<svg className="heading-box__icon">
								<use href="img/icons.svg#icon-map-pin"></use>
							</svg>
							<span className="heading-box__text">
								{product?.startLocation?.description}
							</span>
						</div>
					</div>
				</div>
			</section>

			<section className="section-description">
				<div className="overview-box">
					<div>
						<div className="overview-box__group">
							<h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
							<OverViewBox
								key={product?.id}
								label={"Next date"}
								text={moment(product?.startDates[0]).format("ll")}
								icon="calendar"
							/>
							<OverViewBox
								key={product?.id}
								label={"Difficulty"}
								text={product?.difficulty}
								icon="trending-up"
							/>
							<OverViewBox
								key={product?.id}
								label={"Participants"}
								text={`${product?.maxGroupSize} people`}
								icon="user"
							/>
							<OverViewBox
								label={"Rating"}
								key={product?.id}
								text={`${product?.ratingsAverage} /5`}
								icon="star"
							/>
						</div>

						<div className="overview-box__group">
							<h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

							{product?.guides?.map((guid, index) => (
								<div className="overview-box__detail" key={index}>
									<img
										src={`${url}/img/users/${guid?.photo}`}
										alt={guid?.name}
										className="overview-box__img"
									/>
									{guid?.role === "guide" ? (
										<span className="overview-box__label"> Tour Guid</span>
									) : (
										""
									)}
									{guid?.role === "lead-guide" ? (
										<span className="overview-box__label"> Lead Guid</span>
									) : (
										""
									)}

									<span className="overview-box__text">{guid?.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="description-box">
					<h2 className="heading-secondary ma-bt-lg">
						About {product?.name} Tour
					</h2>
					{product?.description?.split("\n").map((pra, index) => (
						<p className="description__text" key={index}>
							{pra}
						</p>
					))}
				</div>
			</section>

			<section className="section-pictures">
				{product?.images?.map((image, index) => (
					<div className="picture-box" key={index}>
						<img
							className={`picture-box__img picture-box__img--${index + 1}`}
							src={`${url}/img/tours/${image}`}
							alt={`The Park Camper Tour ${index}`}
						/>
					</div>
				))}
			</section>

			<section className="section-map">
				<div id="map">
					{/* #map(data-locations=`${JSON.stringify(product.locations)}`) */}
					{JSON.stringify(product?.locations)}
					{/* const locations = JSON.parse("${JSON.stringify(product.locations)}"); */}

					{/* {JSON.parse(`${JSON.stringify(product.locations)}`).map(
						(location, index) => (
							<p key={index}>{location} </p>
						)
					)} */}
				</div>
				{/*    <script>
        mapboxgl.accessToken =
          'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-112.987418, 37.198125]
              },
              properties: {
                description: 'Zion Canyon National Park'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-111.376161, 36.86438]
              },
              properties: {
                description: 'Antelope Canyon'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-112.115763, 36.058973]
              },
              properties: {
                description: 'Grand Canyon National Park'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-116.107963, 34.011646]
              },
              properties: {
                description: 'Joshua Tree National Park'
              }
            }
          ]
        };

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h',
          scrollZoom: false
        });

        const bounds = new mapboxgl.LngLatBounds();

        geojson.features.forEach(function(marker) {
          var el = document.createElement('div');
          el.classNameName = 'marker';

          new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
          })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          new mapboxgl.Popup({
            offset: 30,
            closeOnClick: false
          })
            .setLngLat(marker.geometry.coordinates)
            .setHTML('<p>' + marker.properties.description + '</p>')
            .addTo(map);

          bounds.extend(marker.geometry.coordinates);
        });

        map.fitBounds(bounds, {
          padding: {
            top: 200,
            bottom: 150,
            left: 50,
            right: 50
          }
        });

        map.on('load', function() {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [-112.987418, 37.198125],
                    [-111.376161, 36.86438],
                    [-112.115763, 36.058973],
                    [-116.107963, 34.011646]
                  ]
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#55c57a',
              'line-opacity': 0.6,
              'line-width': 3
            }
          });
        });
      </script> */}
			</section>

			<section className="section-reviews">
				<div className="reviews">
					{product?.reviews?.map((rev, index) => (
						<ReviewCard review={rev} key={index} tourId={product._id} />
					))}
				</div>
			</section>

			<section className="section-cta">
				<div className="cta">
					<StarRating tourId={product._id} />
				</div>
			</section>
			<section className="section-cta">
				<div className="cta">
					<div className="cta__img cta__img--logo">
						<img src={`img/logo-white.png`} alt="Natours logo" className="" />
					</div>
					<img
						src={`${url}/img/tours/${product?.images[1]}`}
						alt="Tour Pictures"
						className="cta__img cta__img--1"
					/>
					<img
						src={`${url}/img/tours/${product?.images[2]}`}
						alt="Tour Pictures"
						className="cta__img cta__img--2"
					/>

					<div className="cta__content">
						<h2 className="heading-secondary">What are you waiting for?</h2>
						<p className="cta__text">
							{`${product?.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
						</p>
						<button className="btn btn--green span-all-rows">
							Book tour now!
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default TourDetail;

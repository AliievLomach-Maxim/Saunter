import { useEffect, useMemo, useState } from 'react'
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api'
import { defaultTheme } from '../../utils/MapTheme/theme'

export const Map = ({
	path,
	clearMap,
	setClearMap,
	setLength,
	setPath,
}: any) => {
	const [polylinePaths, setPolylinePaths] = useState<
		google.maps.LatLng[] | google.maps.LatLngLiteral[] | undefined
	>()
	useEffect(() => {
		setPolylinePaths(path)
	}, [path])

	useEffect(() => {
		if (clearMap) {
			setPolylinePaths(undefined)
			setClearMap(false)
		}
	}, [clearMap])

	const center = useMemo(() => ({ lat: 40, lng: -80 }), [])
	const defaultOptions = {
		panControl: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		clickableIcons: false,
		keyboardShortcuts: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		fullscreenControl: false,
		styles: defaultTheme,
	}

	const handleClickMap = (event: any) => {
		const directionsService = new google.maps.DirectionsService()
		if (!path) {
			const points = { lat: event.latLng.lat(), lng: event.latLng.lng() }
			setPolylinePaths((prev) => (!prev ? [points] : [...prev, points]))
			setPath(
				(
					prev: google.maps.LatLng[] | google.maps.LatLngLiteral[] | undefined
				) => (!prev ? [points] : [...prev, points])
			)
			polylinePaths &&
				directionsService
					.route({
						origin: polylinePaths[polylinePaths.length - 1],
						destination: points,
						travelMode: google.maps.TravelMode.DRIVING,
					})
					.then((resul) => {
						setLength((prev: number) =>
							prev && resul.routes[0].legs[0].distance?.value
								? prev + resul.routes[0].legs[0].distance.value
								: resul?.routes[0]?.legs[0]?.distance?.value
						)
					})
		}
	}

	return (
		<GoogleMap
			options={defaultOptions}
			center={center}
			zoom={17}
			mapContainerStyle={{ height: '100%', width: '100%' }}
			mapContainerClassName='map'
			onClick={handleClickMap}
		>
			{!clearMap && (
				<Polyline
					options={{
						strokeColor: 'green',
						strokeOpacity: 1.0,
						strokeWeight: 3,
					}}
					path={polylinePaths}
				/>
			)}
			{polylinePaths?.map((e) => {
				return <Marker animation={google.maps.Animation.DROP} position={e} />
			})}
		</GoogleMap>
	)
}

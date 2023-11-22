import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const hospitals = [
  {
    name: "RS. Adi Husada Kapasari",
    address: "Jl. Kapasari 97-101 Surabaya 60141",
    coordinates: {
      latitude: -7.242337511861117,
      longitude: 112.7519088660089,
    },
  },
  {
    name: "RS. Al-Irsyad",
    address: "Jl. KH. Mas Mansyur 210-214",
    coordinates: {
      latitude: -7.227746446849997,
      longitude: 112.74036590833754,
    },
  },
  {
    name: "RS. Angkatan Laut Dr. Ramelan",
    address: "Jl. Gadung 1 Sby",
    coordinates: {
      latitude: -7.308101167427172,
      longitude: 112.73666137053729,
    },
  },
  {
    name: "RS. Bhakti Rahayu",
    address: "Jl. Ketintang Madya I/16 Sby",
    coordinates: {
      latitude: -7.311566660802281,
      longitude: 112.7230157678581,
    },
  },
  {
    name: "RS. Brawijaya",
    address: "Jl. Ksatrian 17 Sby",
    coordinates: {
      latitude: -7.29705303803393,
      longitude: 112.72331657860074,
    },
  },

  {
    name: "RS. Adi Husada Undaan Wetan",
    address: "Jl. Undaan Wetan 40-44 Surabaya 60272",
    coordinates: {
      latitude: -7.2514642474283075,
      longitude: 112.74592886785737,
    },
  },
  {
    name: "RSIA Perdana Medica",
    address:
      "Jl. Kutisari No.6, Siwalankerto, Kec. Wonocolo, Surabaya, Jawa Timur 60291",
    coordinates: {
      latitude: -7.3292635033376135,
      longitude: 112.74290343692275,
    },
  },
  {
    name: "RS Royal Surabaya",
    address:
      "Jl. Rungkut Industri I No.1, Kendangsari, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292",
    coordinates: {
      latitude: -7.328864498483362,
      longitude: 112.7509942697069,
    },
  },
  {
    name: "RS Bhayangkara Surabaya",
    address:
      "Jl. Ahmad Yani No.116, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60231",
    coordinates: {
      latitude: -7.324557597253331,
      longitude: 112.73148553717418,
    },
  },
  {
    name: "Rumah Sakit Islam Jemursari",
    address:
      "Jl. Raya Jemursari No.51-57, Jemur Wonosari, Kec. Wonocolo, Surabaya, Jawa Timur 60237",
    coordinates: {
      latitude: -7.322422565969629,
      longitude: 112.73965970649022,
    },
  },
  {
    name: "RSU. Bhakti Rahayu Surabaya",
    address:
      "Jl. Ketintang Madya I No.16, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60232",
    coordinates: {
      latitude: -7.311619868785259,
      longitude: 112.7229835813516,
    },
  },
  {
    name: "RS Premier Surabaya",
    address:
      "Jl. Nginden Intan Barat No.Blok B, Nginden Jangkungan, Kec. Sukolilo, Surabaya, Jawa Timur 60118",
    coordinates: {
      latitude: -7.30437083326368,
      longitude: 112.76522753717396,
    },
  },
  {
    name: "RS. Bunda",
    address: "Jl. Kandangan No.23-24 Sby",
    coordinates: {
      latitude: -7.250751058372733,
      longitude: 112.6507200579725,
    },
  },
  {
    name: "RS. Darmo",
    address: "Jl. Raya Darmo 90 Sby",
    coordinates: {
      latitude: -7.287200049231642,
      longitude: 112.73865035621277,
    },
  },
  {
    name: "RS. Dr. Soepomo",
    address: "Jl. Laksda M.Nazir 56 Sby",
    coordinates: {
      latitude: -7.211282504697505,
      longitude: 112.72408458884743,
    },
  },
  {
    name: "RS. Husada Utama",
    address: "Jl. Mayjend Prof.Dr.Moestopo",
    coordinates: {
      latitude: -7.264348710275185,
      longitude: 112.756304166009,
    },
  },
  {
    name: "RS. Islam",
    address: "Jl. A.Yani 2-4 Sby",
    coordinates: {
      latitude: -7.305877942569565,
      longitude: 112.73491099499624,
    },
  },
  {
    name: "RS. Muji Rahayu",
    address: "Jl. Raya Manukan Wetan 68-68a",
    coordinates: {
      latitude: -7.256980420712106,
      longitude: 112.6708801641605,
    },
  },
  {
    name: "RS. Polda Bhayangkara",
    address: "Jl. A.Yani Sby",
    coordinates: {
      latitude: -7.324348084410605,
      longitude: 112.73147277067892,
    },
  },
  {
    name: "RS. Surabaya Internasional",
    address: "Jl. Nginden Intan Barat Sby",
    coordinates: {
      latitude: -7.304459168350946,
      longitude: 112.7652532019292,
    },
  },
  {
    name: "RSUD. Bhakti Dharma Husada",
    address: "Jl.Raya Kendung 115-117 Sby",
    coordinates: {
      latitude: -7.2552963765764975,
      longitude: 112.63550373717341,
    },
  },
  {
    name: "RSB. Sayang Ibu",
    address:
      "Jl. Letjen Suprapto No.33, Baru Ilir, Kec. Balikpapan Bar., Kota Balikpapan, Kalimantan Timur 76131",
    coordinates: {
      latitude: -1.2341628767596104,
      longitude: 116.82131524095719,
    },
  },
  {
    name: "RSIA. IBI",
    address: "Jl.Dupak N0.15 A Sby",
    coordinates: {
      latitude: -7.245233917896822,
      longitude: 112.72789118135081,
    },
  },
  {
    name: "RSIA. Siti Aisyah",
    address: "Jl. Pacar Keling No.15a Sby",
    coordinates: {
      latitude: -7.258799964512751,
      longitude: 112.75653867950247,
    },
  },
  {
    name: "RSIA. Cempaka Putih",
    address: "Jl. Jambangan Kebon Agung 8",
    coordinates: {
      latitude: -7.32136910682638,
      longitude: 112.7141320966937,
    },
  },
  {
    name: "RSB. Pura Raharja",
    address: "Jl. Pucang Adi Xii/14 Sby4",
    coordinates: {
      latitude: -7.283151453671148,
      longitude: 112.7527645484859,
    },
  },
];

const Masak = () => {
  const [focusLocation, setFocusLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.2,
    longitudeDelta: 0.421,
  });

  const [nearestHospital, setNearestHospital] = useState(null);
  const [minDistance, setMinDistance] = useState(Infinity);
  const [errorMsg, setErrorMsg] = useState(null);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    } else {
      setErrorMsg(null);
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0421,
      });

      findNearestHospital(location.coords.latitude, location.coords.longitude);
      setFocusLocation(nearestHospital ? nearestHospital.coordinates : null);
    }
  };

  const findNearestHospital = (userLatitude, userLongitude) => {
    let nearestHospital = null;
    let minDistance = Infinity;

    hospitals.forEach((hospital) => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        hospital.coordinates.latitude,
        hospital.coordinates.longitude
      );

      if (distance < minDistance) {
        setMinDistance(distance);
        nearestHospital = hospital;
      }
    });

    setNearestHospital(nearestHospital);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    userLocation();
    setMapRegion({
      latitude: focusLocation ? focusLocation.latitude : mapRegion.latitude,
      longitude: focusLocation ? focusLocation.longitude : mapRegion.longitude,
      latitudeDelta: focusLocation ? 0.00122 : mapRegion.latitudeDelta,
      longitudeDelta: focusLocation ? 0.00421 : mapRegion.longitudeDelta,
    });
  }, [focusLocation]);

  return (
    <View style={styles.container}>
      {errorMsg && <Text>{errorMsg}</Text>}
      <MapView style={styles.sasa} region={mapRegion}>
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hospital.coordinates.latitude,
              longitude: hospital.coordinates.longitude,
            }}
            title={hospital.name}
            description={`Distance: ${calculateDistance(
              mapRegion.latitude,
              mapRegion.longitude,
              hospital.coordinates.latitude,
              hospital.coordinates.longitude
            ).toFixed(2)} km`}
          />
        ))}

        {nearestHospital && (
          <Marker
            coordinate={{
              latitude: nearestHospital.coordinates.latitude,
              longitude: nearestHospital.coordinates.longitude,
            }}
            title={nearestHospital.name}
            description={`Distance: ${minDistance.toFixed(2)} km (Nearest)`}
            pinColor="red" // Set pin color for the nearest hospital
          />
        )}
        <Marker
          coordinate={mapRegion}
          title="Your location"
          icon={require("../../assets/molang-superman-removebg.png")}
        />
      </MapView>
      <TouchableOpacity
        style={{
          backgroundColor: "pink",
          width: 180,
          padding: 15,
          borderRadius: 100,
          top: 28,
          alignSelf: "center",
          position: "absolute",
        }}
        onPress={userLocation}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            textAlign: "center",
          }}
        >
          NEARBY LOCATION
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sasa: {
    flex: 1,
  },
});

export default Masak;

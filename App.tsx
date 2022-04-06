import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LatLng, LeafletView, WebViewLeafletEvents } from 'react-native-leaflet-view';

export default function App() {
  return (
  <LeafletView
  mapLayers={[
    {
      baseLayerName: "MapTiler",
      baseLayerIsChecked: true,
      baseLayer: true,
      url: "https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
    },
  ]}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

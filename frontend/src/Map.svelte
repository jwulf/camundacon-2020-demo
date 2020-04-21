<script lang="ts">
  import Map from "ol/Map";
  import View from "ol/View";
  import { fromLonLat } from "ol/proj";
  import Point from "ol/geom/Point";
  import Feature from "ol/Feature";
  import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
  import VectorSource from "ol/source/Vector";
  import { Circle as CircleStyle, Stroke, Style } from "ol/style";
  import OSM from "ol/source/OSM";
  import { onMount } from "svelte/internal";
  import { easeOut } from "ol/easing";
  import { unByKey } from "ol/Observable";
  import { getVectorContext } from "ol/render";
  import { latitude, longitude } from "./stores";
  import { get } from "svelte/store";
  let spinnerClass = "none";
  let map: Map;
  let source: VectorSource;
  let tileLayer: TileLayer;

  function handleClick(e: any) {
    e.preventDefault();
    spinnerClass = "spinner-border spinner-border-sm";
    navigator.geolocation.getCurrentPosition(success, console.error);
  }

  // https://openlayers.org/en/latest/examples/feature-animation.html
  // Create map
  onMount(async () => {
    tileLayer = new TileLayer({
      source: new OSM()
    });
    map = new Map({
      target: "map",
      layers: [tileLayer],
      view: new View({
        center: fromLonLat([get(longitude), get(latitude)]),
        zoom: 0
      })
    });
    source = new VectorSource({
      wrapX: false
    });
    source.on("addfeature", function(e: any) {
      flash(e.feature);
    });
    const vector = new VectorLayer({
      source
    });
    map.addLayer(vector);
  });

  function success(position: any) {
    latitude.set(position.coords.latitude);
    longitude.set(position.coords.longitude);

    const pin = new Feature(
      new Point(fromLonLat([get(longitude), get(latitude)]))
    );

    const view = map.getView();
    view.setCenter(fromLonLat([get(longitude), get(latitude)]));
    view.setZoom(10);
    spinnerClass = "none";
    source.addFeature(pin);
  }

  const duration = 3000;
  function flash(feature: Feature) {
    const start = new Date().getTime();
    const listenerKey = tileLayer.on("postrender", animate);

    function animate(event: any) {
      const vectorContext = getVectorContext(event);
      const frameState = event.frameState;
      const flashGeom = feature.getGeometry().clone();
      const elapsed = frameState.time - start;
      const elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end.
      const radius = easeOut(elapsedRatio) * 25 + 5;
      const opacity = easeOut(1 - elapsedRatio);

      const style = new Style({
        image: new CircleStyle({
          radius: radius,
          stroke: new Stroke({
            color: "rgba(0, 0, 255, " + opacity + ")",
            width: 0.5 + opacity
          })
        })
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      if (elapsed > duration) {
        unByKey(listenerKey);
        return;
      }
      map.render();
    }
  }
</script>

<div class="card">
  <div class="card-header">
    <h5>Where in the world are you?</h5>
  </div>
  <div class="card-body">
    <form>
      <div class="input-group mb-3">
        <div class="row ">

          <!-- <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Latitude:</span>
          </div>
          <input type="text" bind:value={latitude} />

          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Longitude:</span>
          </div>
          <input type="text" bind:value={longitude} /> -->

          <!-- Locate Me Button -->
          <div class="d-flex justify-content-end">

            <button
              class="rounded-pill btn btn-primary float-right"
              on:click={handleClick}>
              <span
                class={spinnerClass}
                role="status"
                aria-hidden="true"
                visible="false" />
              Locate me
            </button>
          </div>
        </div>
      </div>
    </form>

    <div id="map" style="height:350px" />
  </div>
</div>

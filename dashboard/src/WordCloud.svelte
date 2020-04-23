<script>
  import WordCloud from "wordcloud";
  import { data, point } from "./stores";

  const likes = [];
  const longLat = {};
  data.subscribe(value => {
    console.log(value);
    value.forEach(v => {
      likes[v.likes] = likes[v.likes] ? likes[v.likes] + 1 : 1;
      if (!longLat[v.longitude]) {
        longLat[v.longitude] = {};
      }
      if (!longLat[v.longitude][v.latitude]) {
        const { longitude, latitude } = v;
        longLat[longitude][latitude] = {
          longitude,
          latitude
        };
        point.set({ longitude, latitude });
      }
    });
    const words = Object.entries(likes);
    render(words);
  });

  function render(words) {
    const el = document.getElementById("wordcloud");
    console.log(el);
    if (!el) {
      return;
    }
    WordCloud(el, {
      gridSize: Math.round((16 * el.width) / 1024),
      weightFactor: function(size) {
        return (Math.pow(size, 2.3) * el.width) / 1024;
      },
      fontFamily: "Times, serif",
      color: function(word, weight) {
        return weight === 12 ? "#f02222" : "#c09292";
      },
      rotateRatio: 0,
      rotationSteps: 2,
      backgroundColor: "#ffe0e0",
      list: words
    });
  }
</script>

<canvas
  id="wordcloud"
  class="canvas"
  width="1170"
  height="560"
  style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" />

<script>
  import WordCloud from "wordcloud";

  const list = [["Niall", 12], ["Niall's Beard", 8]];
  console.log();
  setTimeout(() => {
    const el = document.getElementById("wordcloud");
    console.log(el);
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
      list
    }),
      1000;
  });
</script>

<canvas
  id="wordcloud"
  class="canvas"
  width="1170"
  height="560"
  style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" />

<script lang="ts">
  import { message, latitude, longitude, likes } from "./stores";
  import { get } from "svelte/store";

  let text = "Submit";
  const url = "https://camundacon-live.joshwulf.com/";
  function clickSubmit() {
    console.log(
      JSON.stringify({
        message: get(message),
        latitude: get(latitude),
        longitude: get(longitude),
        likes: get(likes)
      })
    );
    text = "Submitting...";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*"
      },
      body: JSON.stringify({
        message: get(message),
        latitude: get(latitude),
        longitude: get(longitude),
        likes: get(likes)
      })
    })
      .then(res =>
        res.json().then(res => {
          alert(JSON.stringify(res));
          text = "Submit";
        })
      )
      .catch(console.log);
  }
</script>

<!-- Submit Button -->
<input
  type="button"
  value={text}
  class="rounded-pill btn btn-success float-right p-l-2 p-r-2 m-2"
  on:click={clickSubmit} />

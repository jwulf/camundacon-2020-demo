<script lang="ts">
  import { likes } from "./stores";
  let like;
  $: if (like) {
    likes.set(like);
  }
</script>

<div class="card">
  <div class="card-header">
    <h5>What I like the most about Camunda...</h5>
  </div>
  <div class="card-body">

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={"It's Open Source"} />
      <label class="form-check-label">It's Open Source</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'Consistent Releases'} />
      <label class="form-check-label">Consistent Releases</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'Innovation'} />
      <label class="form-check-label">Innovation</label>
    </div>
    <div class="form-check">

      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'Niall'} />
      <label class="form-check-label">Niall</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'Developer Friendly Approach'} />
      <label class="form-check-label">Developer Friendly Approach</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'The variety of possible ways of using it'} />
      <label class="form-check-label">
        The variety of possible ways of using it
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={"Niall's Beard"} />
      <label class="form-check-label">Niall's Beard</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        bind:group={like}
        value={'Strong Community'} />
      <label class="form-check-label">Strong Community</label>
    </div>
  </div>
</div>

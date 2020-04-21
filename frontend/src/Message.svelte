<script lang="ts">
  import { message } from "./stores";

  function change() {
    message.set(msg);
  }
  let msg = "";
</script>

<div class="card">
  <div class="card-header">
    <h5>My message to the Camunda Community...</h5>
  </div>
  <div class="card-body">
    <form>
      <div class="form-group">
        <!-- <label for="exampleFormControlTextarea1"></label> -->
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Enter your message to the Camunda Community here..."
          bind:value={msg}
          on:input={change}
          rows="3" />
      </div>
    </form>
  </div>
</div>

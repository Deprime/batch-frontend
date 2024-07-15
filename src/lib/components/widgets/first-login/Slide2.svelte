<script lang="ts">
  import { StarIcon } from "lucide-svelte";

  // Components
  import Button from "$lib/components/ui/button/Button.svelte";
  import girlService from "$lib/services/girls";
  import { delay } from "$lib/helpers/async";

  import { FIRST_GIRL_PRICE } from "$lib/constants/app";

  // Data
  let loading = false;

  // Methods
  /**
   * On click
   */
  const onClick = async () => {
    try {
      loading = true;
      await delay(1000);
      await girlService.buyyGirl();
    }
    catch (err) {
      console.log(err)
    }
    finally {
      loading = false;
    }
  }
</script>


<div class="h-full w-full flex flex-col justify-center items-center text-white">
  <h2 class="h2 mb-4">
    Ready to earn real money?
  </h2>

  <p class="text-sm flex mb-2 text-center">
    Buy your first lolly girl <br>and start to bloom her!
  </p>

  <p class="text-sm flex mb-8 text-center">
    Cherish your cute lolli girls with candis  so that they bring you more tokens!
  </p>

  <div>
    <Button
      {loading}
      disabled={loading}
      variant="yellow"
      class="!w-28"
      on:click={onClick}
    >
      {FIRST_GIRL_PRICE} <StarIcon class="w-5 h-5 ml-2" />
    </Button>
  </div>
</div>

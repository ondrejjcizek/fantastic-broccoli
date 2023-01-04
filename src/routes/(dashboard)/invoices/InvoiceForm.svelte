<script lang="ts">
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { slide } from 'svelte/transition';
  import { v4 as uuidv4 } from 'uuid';
  import Button from '$components/Button.svelte';
  import Trash from '$components/Icon/Trash.svelte';
  import type { LineItem } from 'src/global';
  import LineItemRows from './LineItemRows.svelte';
  import { states } from '$utils/states';
  import { onMount } from 'svelte';
  import { today } from '$lib/utils/dateHelpers';

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    quantity: 0,
    amount: 0
  };

  let lineItems: LineItem[] = [{ ...blankLineItem }];
  let isNewClient: boolean = false;

  const AddLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: uuidv4() }];
  };

  const RemoveLineItem = (event) => {
    lineItems = lineItems.filter((item) => item.id !== event.detail);
    console.log('remove line item');
  };

  const UpdateLineItem = () => {
    lineItems = lineItems;
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Vytvořit fakturu</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- client -->
  <div class="field col-span-4">
    {#if !isNewClient}
      <label for="client">Klient</label>
      <div class="flex items-end gap-x-5">
        <select name="client" id="client">
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold leading-[3.5rem] text-monsoon">nebo</div>
        <Button
          label="Přidat klienta"
          onClick={() => {
            isNewClient = true;
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {:else}
      <label for="NewClient">Nový klient</label>
      <div class="flex items-end gap-x-5">
        <input type="text" name="newClient" />
        <div class="text-base font-bold leading-[3.5rem]">nebo</div>
        <Button
          label="Existující klient"
          onClick={() => {
            isNewClient = false;
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- invoice id -->
  <div class="field col-span-2">
    <label for="invoiceNumber">Číslo faktury</label>
    <input class="p-4" type="number" name="invoiceNumber" required />
  </div>

  <!-- new client -->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-5" transition:slide={{ duration: 300 }}>
      <div class="field col-span-6">
        <label for="email">E-mail klienta</label>
        <input class="p-4" type="email" name="email" id="email" />
      </div>

      <div class="field col-span-6">
        <label for="street">Ulice</label>
        <input class="p-4" type="text" name="stret" id="street" />
      </div>

      <div class="field col-span-2">
        <label for="city">Město</label>
        <input class="p-4" type="text" name="city" id="city" />
      </div>

      <div class="field col-span-2">
        <label for="state">Kraj</label>
        <select class="p-4" name="name" id="state">
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="zip">PSČ</label>
        <input class="p-4" type="text" name="zip" id="id" />
      </div>
    </div>
  {/if}

  <!-- due date -->
  <div class="field col-span-2">
    <label for="dueDate">Splatnost</label>
    <input class="p-4" type="date" name="dueDate" min={today} required />
  </div>

  <!-- issue date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Vystaveno</label>
    <input class="p-4" type="date" name="issueDate" min={today} />
  </div>

  <!-- subject -->
  <div class="field col-span-6">
    <label for="subject">Text před položkami faktury</label>
    <input class="p-4" type="text" name="subject" />
  </div>

  <!-- line items -->
  <div class="field col-span-6">
    <LineItemRows {lineItems} on:addLineItem={AddLineItem} on:removeLineItem={RemoveLineItem} on:updateLineItem={UpdateLineItem} />
  </div>

  <div class="field col-span-6">
    <label for="subject">Text za položkami faktury</label>
    <input
      class="p-4"
      type="text"
      name="subject"
      placeholder="Dovolujeme si Vás upozornit, že v případně nedodržení data splatnosti uvedeného na faktuře Vám můžeme účtovat zákonný úrok z prodlení."
    />
  </div>

  <!-- notes -->
  <div class="field col-span-6">
    <label for="notes">Poznámka <span class="font-normal">(je určeno pouze pro vás, příjemce faktury ji neuvidí)</span></label>
    <textarea class="p-4" name="notes" id="notes" />
  </div>

  <!-- terms -->
  <div class="field col-span-6">
    <label for="terms">Podmínky <span class="font-normal">(je určeno pouze pro vás, příjemce faktury je neuvidí)</span></label>
    <textarea class="p-4" name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Tipy k formátování: <strong>*bold*</strong>, <em>_italics_</em>
    </div>
  </div>

  <!-- buttons -->
  <div class="field col-span-2">
    <!-- only be visible if editing -->
    <Button style="textOnlyDesctructive" label="Smazat" isAnimated={false} onClick={() => {}} iconLeft={Trash} />
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button style="secondary" label="Zavřít" isAnimated={false} onClick={() => {}} />
    <button class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-1 hover:shadow-coloredHovered" type="submit">Uložit</button>
  </div>
</form>

<style lang="postcss">
  /* your styles go here */
</style>

<script lang="ts">
  import AdditionalOptions from '$components/AdditionalOptions.svelte';
  import ThreeDots from '$components/Icon/ThreeDots.svelte';
  import View from '$components/Icon/View.svelte';
  import Tag from '$components/Tag.svelte';
  import { convertDate, isLate } from '$lib/utils/dateHelpers';
  import { sumLineItems, centsToDollars } from '$lib/utils/moneyHelpers';
  import type { Invoice } from 'src/global';
  import Send from '$components/Icon/Send.svelte';
  import Trash from '$components/Icon/Trash.svelte';
  import Edit from '$components/Icon/Edit.svelte';
  import Modal from '$components/Modal.svelte';
  import Button from '$components/Button.svelte';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';

  export let invoice: Invoice;
  let isAdditionalMenuShowing = false;
  let isOptionsDisabled = false;
  let isModalShowing = false;

  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleEdit = () => {
    console.log('editing');
  };

  const handleSendInvoice = () => {
    console.log('sending');
  };

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') {
      return 'draft';
    } else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'sent';
    } else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'late';
    } else if (invoice.invoiceStatus === 'paid') {
      isOptionsDisabled = true;
      return 'paid';
    }
  };
</script>

<div class="invoice-table invoice-area items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
  <div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
  <div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(sumLineItems(invoice.lineItems))}
  </div>
  <div class="center viewButton hidden text-sm lg:flex lg:text-lg">
    <a href="#" class="text-pastelPurple transition-colors hover:text-darkBroccoli">
      <View />
    </a>
  </div>
  <div class="center moreButton relative hidden text-sm lg:flex lg:text-lg">
    <button
      class="text-pastelPurple transition-colors hover:text-darkBroccoli"
      on:click={() => {
        isAdditionalMenuShowing = !isAdditionalMenuShowing;
      }}
    >
      <ThreeDots />
    </button>
    {#if isAdditionalMenuShowing}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
          { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
          { label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
        ]}
      />
    {/if}
  </div>
</div>

<Modal
  isVisible={isModalShowing}
  on:close={() => {
    isModalShowing = false;
  }}
>
  <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
    <div class="text-center text-xl font-bold text-darkBroccoli">
      Are you sure you want to delete <span class="text-scarlet">{invoice.client.name}</span> for <span class="text-scarlet">${centsToDollars(sumLineItems(invoice.lineItems))}</span>?
    </div>
    <div class="flex gap-4">
      <Button
        isAnimated={false}
        label="Cancel"
        onClick={() => {
          isModalShowing = false;
        }}
        style="secondary"
      />
      <Button
        isAnimated={false}
        label="Yes, Delete It"
        onClick={() => {
          deleteInvoice(invoice);
          isModalShowing = false;
        }}
        style="desctructive"
      />
    </div>
  </div>
</Modal>

<style lang="postcss">
  .invoice-area {
    grid-template-areas:
      'invoiceNumber invoiceNumber'
      'clientName amount'
      'dueDate status';
  }

  @media (min-width: 1024px) {
    .invoice-area {
      grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
    }
  }

  .invoice-area .status {
    grid-area: status;
  }

  .invoice-area .dueDate {
    grid-area: dueDate;
  }

  .invoice-area .invoiceNumber {
    grid-area: invoiceNumber;
  }

  .invoice-area .clientName {
    grid-area: clientName;
  }

  .invoice-area .amount {
    grid-area: amount;
  }

  .invoice-area .viewButton {
    grid-area: viewButton;
  }

  .invoice-area .moreButton {
    grid-area: moreButton;
  }
</style>

<script lang="ts">
  import ThreeDots from '$components/Icon/ThreeDots.svelte';
  import View from '$components/Icon/View.svelte';
  import Tag from '$components/Tag.svelte';
  import { convertDate, isLate } from '$lib/utils/dateHelpers';
  import { sumLineItems, centsToDollars } from '$lib/utils/moneyHelpers';
  import type { Invoice } from 'src/global';

  export let invoice: Invoice;

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') {
      return 'draft';
    } else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      return 'sent';
    } else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      return 'late';
    } else if (invoice.invoiceStatus === 'paid') {
      return 'paid';
    }
  };
</script>

<div
  class="invoice-table invoice-area items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
  <div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
  <div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(sumLineItems(invoice.lineItems))}
  </div>
  <div class="center viewButton hidden text-sm lg:block lg:text-lg">
    <a href="#" class="text-pastelPurple transition-colors hover:text-daisyBush">
      <View />
    </a>
  </div>
  <div class="center moreButton hidden text-sm lg:block lg:text-lg">
    <button class="text-pastelPurple transition-colors hover:text-daisyBush">
      <ThreeDots />
    </button>
  </div>
</div>

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

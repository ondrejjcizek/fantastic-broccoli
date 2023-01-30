<script lang="ts">
    import InvoiceRowHeader from './InvoiceRowHeader.svelte';
    import BlankRow from '$components/BlankRow.svelte';
</script>

<div class="mt-20 lg:-mt-14">
    <div class="ml-2 mb-10 bg-arrowLeftUp bg-no-repeat pl-28 pt-14">
        <h2 class="font-handwriting text-4xl font-bold text-caribbeanGreen">Bohužel :(</h2>
        <p class="text-xl font-bold text-caribbeanGreen">
            Nenašli jsme nic co by se shodovalo s tím co hledáte.
        </p>
    </div>

    <InvoiceRowHeader className="text-fog" />
    <BlankRow />
    <BlankRow />
    <BlankRow />
</div>

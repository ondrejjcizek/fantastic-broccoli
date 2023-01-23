declare namespace svelteHTML {
    // enhance attributes
    interface HTMLAttributes<HTMLDivElement> {
        // If you want to use on:neforeinstallpromt
        'on:outofview'?: (event) => void;
    }
}

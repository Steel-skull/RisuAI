<input 
    class={"border border-darkborderc focus:border-borderc rounded-md shadow-sm bg-transparent numinput focus:ring-borderc focus:ring-2 focus:outline-none transition-colors duration-200" + ((className) ? (' ' + className) : '')} 
    class:text-sm={size === 'sm'}
    class:text-md={size === 'md'}
    class:text-lg={size === 'lg'}
    class:text-textcolor={!disabled}
    class:text-textcolor2={disabled}
    class:px-4={size === 'md' && padding}
    class:py-2={size === 'md' && padding}
    class:px-2={size === 'sm' && padding}
    class:py-1={size === 'sm' && padding}
    class:px-6={size === 'lg' && padding}
    class:py-3={size === 'lg' && padding}
    class:mb-4={marginBottom}
    class:w-full={fullwidth}
    class:h-full={fullh}
    type="number"
    min={min}
    max={max}
    id={id}
    disabled={disabled}
    bind:value
    on:change={onChange}
/>

<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    export let min:number = undefined
    export let max:number = undefined
    export let size: 'sm'|'md'|'lg' = 'sm'
    export let value:number
    export let id:string = undefined
    export let padding = true
    export let marginBottom = false
    export let fullwidth = false
    export let fullh = false
    export let onChange:ChangeEventHandler<HTMLInputElement> = () => {}
    export let className = ''
    export let disabled = false
</script>

<style>
    .numinput::-webkit-outer-spin-button,
    .numinput::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    .numinput {
        -moz-appearance: textfield;
        appearance: textfield;
    }
</style>
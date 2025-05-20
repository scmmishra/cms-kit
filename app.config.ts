export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
    formField: {
      slots: {
        label: 'font-mono uppercase text-[11px] tracking-widest',
      },
    },
    button: {
      slots: {
        base: 'font-mono uppercase text-xs tracking-widest',
      },
    },
  },
})

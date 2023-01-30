import { addons } from '@storybook/addons'

addons.setConfig({
    panelPosition: 'bottom'
})

addons.register('dummy', (_api) => {   
    addons.getChannel().on('currentStoryWasSet', () => focusIframe())
})
  
const focusIframe = () => {
    const previewIframe = document.querySelector('#storybook-preview-iframe')
    if (!previewIframe) {
        console.log(`Preview iframe not found`)
    }
    previewIframe.focus()
}
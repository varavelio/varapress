import Alpine from 'alpinejs'
import { initTheme } from './theme'
import { initDocs } from './docs'

initTheme()
initDocs()

window.Alpine = Alpine
Alpine.start()

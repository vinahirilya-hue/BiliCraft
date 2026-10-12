import {build} from 'esbuild';
await build({entryPoints:['src/visual.js'],bundle:true,format:'iife',target:'chrome120',minify:true,outfile:'visual.js',legalComments:'eof'});

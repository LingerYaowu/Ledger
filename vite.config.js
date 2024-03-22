import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins : [
        vue(),
    ],
    resolve : {
        alias : {
 			'@' : resolve(__dirname, 'src'),
            '@cs' : resolve(__dirname, 'src/components')
        }
    },
    server : {
        proxy : {
            '/php' : {
                target : 'http://www.lovefree.asia/php',
                changeOrigin : true,
                rewrite : path=>path.replace(/^\/php/, '')
            }
        }
    }
});
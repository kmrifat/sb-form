import {defaultTheme, defineUserConfig} from 'vuepress'
import {searchPlugin} from '@vuepress/plugin-search'


export default defineUserConfig({
    lang: 'en-US',
    title: 'SB From',
    description: 'Dynamic Form Builder For Vue',
    markdown: {
        lineNumbers: true
    },
    plugins: [
        searchPlugin()
    ],
    theme: defaultTheme({
        sidebar: [
            // SidebarItem
            {
                text: 'Getting Start',
                link: '/'
            },
            {
                text: 'Installation',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/',
                children: [
                    {
                        text: 'start',
                        link: 'https://github.com'
                    },
                    {
                        text: 'end',
                        link: 'https://github.com'
                    }
                ]
            },
            // string - page file path
            '/bar/README.md',
        ],
    })
})
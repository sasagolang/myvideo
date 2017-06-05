'use strict'

import { app, BrowserWindow, globalShortcut } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:${require('../../../config').port}` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
            height: 600,
            width: 800,
            "web-preferences": {
                "web-security": false
            }
        })
        // mainWindow.webContents.openDevTools();
    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
    globalShortcut.register('Command+i', () => {
            mainWindow.webContents.openDevTools();
        })
        // //let installExtension = require('electron-devtools-installer')
        // installExtension.default(installExtension.VUEJS_DEVTOOLS)
        //     .then(() => {})
        //     .catch(err => {
        //         console.log('Unable to install `vue-devtools`: \n', err)
        //     })
        // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}
//require('electron-debug')({ showDevTools: true })
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.commandLine.appendSwitch('allow-file-access');
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }

})
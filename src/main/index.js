'use strict'

import { app, BrowserWindow, Notification, globalShortcut } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// const EVENTS = {
//   NOTIFICATE: 'notificate'
// }

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    // transparent: true,
    movable: true,
    titleBarStyle: 'hidden',
    skipTaskbar: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('devtools-closed', (event) => {
    let _notificate = new Notification({
      title: '提示',
      body: mainWindow.webContents.getTitle() + ', ' + mainWindow.webContents.getURL()
    })
    _notificate.show()
  })

  mainWindow.webContents.on('devtools-opened', (event) => {
    let _notificate = new Notification({
      title: '提示',
      body: app.getName()
    })
    _notificate.show()
    // mainWindow.webContents.on('before-input-event', (event, input) => {
    //   console.log('....', event, input)
    //   event.preventDefault()
    // })
  })

  globalShortcut.register('CommandOrControl+shift+N', () => {
    let _notificate = new Notification({
      title: '提示',
      body: '全局快捷键'
    })
    _notificate.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

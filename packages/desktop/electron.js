const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({ 
    width: 1920, 
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  
  // Using the Vercel URL as requested
  win.loadURL('https://hendrixlamar.space') 
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

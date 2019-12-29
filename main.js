const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const APP_NAME = 'electron-app';
const INDEX_FILE = 'index.html';
const DIST_DIR = 'dist';

let mainWindow;

// Create new window
createWindow = () => {
    mainWindow = new BrowserWindow({});
    
    // Load HTML file into windows
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/${DIST_DIR}/${APP_NAME}/${INDEX_FILE}`),
            protocol: 'file:',
            slashes: true
        })
    );
        
    // Open Dev Tools
    mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', () => { mainWindow = null; });
}

// Listen for app to be ready
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () => { 
    if(mainWindow !== null) createWindow();
});




import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
import { environment } from './src/environments/environment';
import * as url from 'url';
import * as path from 'path';

const APP_NAME = 'electron-app';
const INDEX_FILE = 'index.html';
const DIST_DIR = 'dist';
const args = process.argv;


let mainWindow: BrowserWindow;



// Create new window
let createWindow = (): BrowserWindow => {
    const electronScreen = screen;
    const serve = args.includes('--serve');
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: serve
        }
    }); 
    
    // Hot Reloading Electron and Angular App
    if(serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });

        mainWindow.loadURL(`http://${environment.BASE_URL}:${environment.PORT}`);
        console.log('reloadxxx');
    } else {
         // Load HTML file into windows
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, `/${DIST_DIR}/${APP_NAME}/${INDEX_FILE}`),
                protocol: 'file:',
                slashes: true
            })
        );
    }
    

    console.log('reload');

    // Open Dev Tools
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => { mainWindow = null; });

    return mainWindow;
}

// Listen for app to be ready
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () => { 
    if(mainWindow !== null) createWindow();
});




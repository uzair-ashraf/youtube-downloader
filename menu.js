const { shell, BrowserWindow } = require('electron')
const path = require('path');


const isMac = process.platform === 'darwin'

const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About',
        click: () => {
          const disclaimer = new BrowserWindow({
            width: 400,
            height: 600
          })
          disclaimer.removeMenu();
          disclaimer.loadFile('disclaimer.html')
        }
      },
      {
        label: 'GitHub',
        click: async () => {
          await shell.openExternal('https://github.com/uzair-ashraf/youtube-downloader')
        }
      },
      {
        label: 'Author',
        click: async () => {
          await shell.openExternal('https://uzairashraf.dev/')
        }
      }
    ]
  },
  {
    label: 'Development',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
    ]
  },
  {
    label: 'Troubleshooting',
    submenu: [
      {
        label: 'Windows',
        submenu: [
          {
            label: 'Error Code: 3221225781',
            click: async () => {
              try {
                await shell.openItem(path.join(__dirname, 'assets/executables/vcredist_x86.exe'))
              } catch(err) {
                console.error(err);
              }
          }
        }
        ]
      }
    ]
  }
]


module.exports = template;

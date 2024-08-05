import * as React from 'react';


const Versions = () => {

  const electron = window.electronAPI;

  return (
    <div id="app-versions">
      <p>This is versions page.</p>
      <p>The home directory is @ { electron.homeDir() }</p>
      <p>The OS version is @ { electron.osVersion() }</p>
      <p>The OS arch is @ { electron.arch() }</p>
    </div>
  );
};


export default Versions;

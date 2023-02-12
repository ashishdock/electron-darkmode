document
  .getElementById('toggle-dark-mode')
  .addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    console.log('isDarkMode: ', isDarkMode);
    document.getElementById('theme-source').innerHTML = isDarkMode
      ? 'Dark'
      : 'Light';
  });

document
  .getElementById('reset-to-system')
  .addEventListener('click', async () => {
    await window.darkMode.system();
    console.log('Mode: system');
    document.getElementById('theme-source').innerHTML = 'System';
  });

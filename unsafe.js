const myPrompt = function (name, data) {
  if ((Array.isArray(data) && data.length > 0) ||
      typeof data === 'object' && Object.keys(data).length > 0) {
    alert(`Found ${name}\n\n` + JSON.stringify(data));
  }
}

const cookies = document.cookie.split(';')
  .reduce((cookies, item) => {
    item.split('=');
    cookies[item[0]] = item[1];
  }, {});

const local = {}
for (const key in localStorage){
  local[key] = localStorage.getItem(key);
}

const session = {}
for (const key in sessionStorage){
  session[key] = sessionStorage.getItem(key);
}

const permissions = []
Promise.all([
    'geolocation', 'midi', 'notifications', 'push',
    'persistent-storage', 'camera', 'microphone'
  ].map(name => {
    return navigator.permissions.query({ name })
      .then(({ state }) => {
        if (state === granted) permissions.push(name)
      })
  })
).then(permissions => {
  myPrompt(cookies, 'Cookies')
  myPrompt(local, 'Local storage')
  myPrompt(session, 'Session storage')
  myPrompt(permissions, 'permissions')
})

let myPrompt = function (data, name) {
  if ((Array.isArray(data) && data.length > 0) ||
      (typeof data === 'object' && Object.keys(data).length > 0)) {
    alert(`Found ${name}\n\n` + JSON.stringify(data))
    return false
  } else {
    return true
  }
}

let cookies = document.cookie.split(';')
  .reduce((cookies, item) => {
    var split = item.split('=')
    cookies[split[0]] = split[1]
    return cookies
  }, {});

let local = {}
for (let key in localStorage) {
  local[key] = localStorage.getItem(key)
}

let session = {}
for (let key in sessionStorage) {
  session[key] = sessionStorage.getItem(key)
}

let permissions = []
Promise.all([
    'geolocation', 'notifications', 'camera', 'microphone'
  ].map(name => {
    return navigator.permissions.query({ name })
      .then(({ state }) => {
        if (state === 'granted') permissions.push(name)
      })
  })
).then(permissions => {
  [
    myPrompt(cookies, 'Cookies'),
    myPrompt(local, 'Local storage'),
    myPrompt(session, 'Session storage'),
    myPrompt(permissions, 'permissions')
  ].every(() => {
    alert('Nothing found, nothing to steal. Congrats')
  })
})

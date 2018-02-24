'strict mode';
let myPrompt = function (data, name) {
  if ((Array.isArray(data) && data.length > 0) ||
      (typeof data === 'object' && Object.keys(data).length > 0)) {
    alert(`Found ${name}:\n\n` + JSON.stringify(data, null, '  '))
  } else {
    return false
  }
}

let cookies = document.cookie.split(';')
  .reduce((cookies, item) => {
    var split = item.split('=')
    cookies[split[0].trim()] = split[1]
    return cookies
  }, {});

let local = Object.keys(localStorage).reduce((local, keys) => {
  local[key] = localStorage.getItem(key)
  return local
}, {})

let session = Object.keys(sessionStorage).reduce((session, keys) => {
  session[key] = localStorage.getItem(key)
  return session
}, {})

let permissions = []
Promise.all([
    'geolocation', 'notifications', 'camera', 'microphone'
  ].map(name => {
    return navigator.permissions.query({ name })
      .then(({ state }) => {
        if (state === 'granted') permissions.push(name)
      })
  })
).then(() => {
  if ([
    myPrompt(cookies, 'Cookies'),
    myPrompt(local, 'Local storage'),
    myPrompt(session, 'Session storage'),
    myPrompt(permissions, 'permissions')
  ].every(i => i === false)) {
    alert('Nothing found, nothing to steal. Congrats')
  }
})

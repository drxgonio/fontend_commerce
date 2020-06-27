/* utils/window.js */
export function loadScriptAsync(src) {
    const script = window.document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIxGwCWle2c-G_9_SfBOUawIO0rmZ6aGk&libraries=places"
    script.async = true
    script.defer = true
  
    const promise = new Promise((resolve, reject) => {
      script.addEventListener('load', (event) => {
        resolve(event)
      }, false)
  
      script.addEventListener('error', (error) => reject(error))
    })
  
    window.document.body.appendChild(script)
    return promise
  }
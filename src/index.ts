import Sample from './sample1'

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1]
  console.log(path)

  Sample()
})

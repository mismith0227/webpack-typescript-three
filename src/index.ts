import Sample from './sample1'
import Sample2 from './sample2'
import Study from './study1'

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1]
  console.log(path)

  path === 'sample' && Sample()
  path === 'sample2' && Sample2()
  path === 'study1' && Study()
})

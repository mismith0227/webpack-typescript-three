import Sample from './sample1'
import Sample2 from './sample2'
import Study from './study1'
import Study2 from './study2'
import Study3 from './study3'

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1]
  console.log(path)

  path === 'sample' && Sample()
  path === 'sample2' && Sample2()
  path === 'study1' && Study()
  path === 'study2' && Study2()
  path === 'study3' && Study3()
})

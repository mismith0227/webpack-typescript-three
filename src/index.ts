import Sample from './sample1'
import Sample2 from './sample2'
import Study from './study1'
import Study2 from './study2'
import Study3 from './study3'

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1]
  location.pathname.includes('sample')

  location.pathname.includes('sample') && Sample()
  location.pathname.includes('sample2') && Sample2()
  location.pathname.includes('study1') && Study()
  location.pathname.includes('study2') && Study2()
  location.pathname.includes('study3') && Study3()
})

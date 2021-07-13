import Sample from './sample1'
import Sample2 from './sample2'
import Sample3 from './sample3'
import Sample4 from './sample4'
import Study from './study1'
import Study2 from './study2'
import Study3 from './study3'
import Study4 from './study4'
import Study5 from './study5'

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1]

  location.pathname.includes('sample1') && Sample()
  location.pathname.includes('sample2') && Sample2()
  location.pathname.includes('sample3') && Sample3()
  location.pathname.includes('sample4') && Sample4()
  location.pathname.includes('study1') && Study()
  location.pathname.includes('study2') && Study2()
  location.pathname.includes('study3') && Study3()
  location.pathname.includes('study4') && Study4()
  location.pathname.includes('study5') && Study5()
})

var nightmare = require('nightmare')({
  show: false,
});

nightmare
  .goto('https://sws.rosi.utoronto.ca/sws/reg/course/edit.do?editCourse.dispatch')
  .wait('#personForm')
  .type('#personId', 'xxxxxxx')
  .type('#pin', 'xxxxxxx')
  .click('#personForm [type=submit]')
  .wait('#content #right')
  .goto('https://sws.rosi.utoronto.ca/sws/reg/course/edit.do?editCourse.dispatch')
  .wait('#courseForm')
  .type('#code', 'CSC2511H')
  .type('#sectionCode', 'S')
  .click('#courseForm [type=submit]')
  .wait(3000)
  .evaluate(function () {
    return document.querySelector('#right table .section').textContent.replace(/\n/g, '').replace(/\s\s+/g, ' ');
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
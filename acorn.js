const nightmare = require('nightmare')({
  show: true,
});

const authenticationInfo = require('./config');

const findCourse = ({
  courseTitle,
  username,
  password,
}) => (() => {
  nightmare
  .goto('https://acorn.utoronto.ca/sws/welcome.do?welcome.dispatch#/courses/0')
  .wait('#query')
  .type('#inputID', username)
  .type('#inputPassword', password)
  .click('#query [type=submit]')
  .wait('#main-content')
  .goto('https://acorn.utoronto.ca/sws/welcome.do?welcome.dispatch#/courses/0')
  .wait('#typeaheadInput')
  .type('#typeaheadInput', courseTitle)
  .wait(1000)
  .wait(() => {
    function eventFire(el, etype){
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }

    eventFire(document.querySelector('#typeahead-search .ut-typeahead-results-list ul li'), 'click');
    return true;
  })
  .wait(1000)
  .evaluate(function () {
    return document.querySelector('#course-modal .spaceAvailability .spaceAvailabilityDetails span').textContent.trim();
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
});

// setInterval(findCourse({
//   courseTitle: 'CSC2511',
// }), 10000);

// const authenticationInfo = process.argv
// .slice(2)
// .map(e => e.split('='))
// .reduce((prev, next) => {
//   return Object.assign(prev, {
//     [next[0]]: next[1],
//   })
// }, {});

findCourse(authenticationInfo)();
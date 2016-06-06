(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global $ */
window.$ = window.jQuery = require('jquery');
require('bootstrap');

var d3 = require('d3');
var fc = require('d3fc');
var _ = require('lodash');

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var gigsByArtist = require('./gig-data.json');

$('.content').ready(setup);

function setup() {
  var width = 500;
  var height = 250;
  var svgAttrs = {
    'width': width,
    'height': height
  };

  var root = d3.select('.content').html('');

  gigsByMonth(root.append('svg').attr(svgAttrs));
  popularArtists(root.append('svg').attr(svgAttrs));
}

function popularArtists(selection) {
  var gigs = _.chain(gigsByArtist).mapValues(function (v, k) {
    return {
      'artist': k,
      'count': v.gigs.length
    };
  }).values().filter(function (artist) {
    return artist.count > 2;
  }).value();

  var xScale = d3.scale.ordinal().domain(_.map(gigs, function (d) {
    return d.artist;
  })).rangePoints([0, 500], 1);

  var yScale = d3.scale.linear().domain([0, 10]).range([250, 0]);

  var series = fc.series.bar().xValue(function (d) {
    return d.artist;
  }).yValue(function (d) {
    return d.count;
  }).xScale(xScale).yScale(yScale);

  selection.datum(gigs).call(series);
}

function gigsByMonth(selection) {
  var gigsByMonth = _.chain(gigsByArtist).map(function (artist) {
    return artist.gigs;
  }).flattenDeep().map(function (gig) {
    var gigDate = new Date(gig.date);
    return {
      'month': months[gigDate.getMonth()]
    };
  }).countBy(_.property('month')).mapValues(function (v, k) {
    return {
      'month': k,
      'count': v
    };
  }).values().value();

  var yExtent = fc.util.extent().include(0).pad([0, 0.5]).fields(['count']);

  var chart = fc.chart.cartesian(d3.scale.ordinal(), d3.scale.linear()).chartLabel('Gigs By Month').xDomain(months).yDomain(yExtent(gigsByMonth)).yTicks(5).yNice();

  var series = fc.series.bar().xValue(function (d) {
    return d.month;
  }).yValue(function (d) {
    return d.count;
  });

  chart.plotArea(series);

  selection.datum(gigsByMonth).call(chart);
}

},{"./gig-data.json":2,"bootstrap":"bootstrap","d3":"d3","d3fc":"d3fc","jquery":"jquery","lodash":"lodash"}],2:[function(require,module,exports){
module.exports={
  "Meursault": {
    "echonestId": "ARRXGGS1187FB5C23E",
    "genres": [
      "scottish rock"
    ],
    "gigs": [
      {
        "date": "2011-03-09T19:30:00.000Z"
      },
      {
        "date": "2008-12-05T00:00:00.000Z"
      },
      {
        "date": "2010-05-20T23:00:00.000Z"
      }
    ]
  },
  "Gogol Bordello": {
    "echonestId": "AR0YME61187FB3B544",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2011-03-14T19:00:00.000Z"
      }
    ]
  },
  "Andrew Jackson Jihad": {
    "echonestId": "ARFUZN61187FB4CBA9",
    "genres": [
      "folk punk",
      "anti-folk",
      "folk christmas"
    ],
    "gigs": [
      {
        "date": "2011-05-27T18:30:00.000Z"
      },
      {
        "date": "2014-10-03T18:30:00.000Z"
      },
      {
        "date": "2010-10-04T23:00:00.000Z"
      },
      {
        "date": "2015-06-14T18:00:00.000Z"
      }
    ]
  },
  "Cake": {
    "echonestId": "ARQRQRA12131B4B5A8",
    "genres": [
      "alternative rock",
      "pop rock",
      "post-grunge",
      "funk metal",
      "funk rock",
      "garage rock",
      "rap rock",
      "neo mellow"
    ],
    "gigs": [
      {
        "date": "2011-11-16T19:30:00.000Z"
      }
    ]
  },
  "Franz Nicolay": {
    "echonestId": "ARILYKD1187B9B6760",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2011-12-06T00:00:00.000Z"
      },
      {
        "date": "2013-11-20T00:00:00.000Z"
      },
      {
        "date": "2011-01-14T20:00:00.000Z"
      }
    ]
  },
  "Sparks": {
    "echonestId": "AR040JZ1187FB399A9",
    "genres": [
      "zolo",
      "glam rock",
      "art rock",
      "new wave",
      "dance rock",
      "protopunk",
      "new romantic",
      "experimental",
      "new wave pop"
    ],
    "gigs": [
      {
        "date": "2012-10-20T23:00:00.000Z"
      }
    ]
  },
  "Lucero": {
    "echonestId": "ARBW1J61187B9B8B54",
    "genres": [
      "alternative country",
      "cowpunk",
      "roots rock"
    ],
    "gigs": [
      {
        "date": "2012-11-24T00:00:00.000Z"
      },
      {
        "date": "2016-02-05T19:30:00.000Z"
      }
    ]
  },
  "Colin Hay": {
    "echonestId": "AR9QONM1187B9A0A8C",
    "genres": [
      "neo mellow",
      "acoustic pop",
      "singer-songwriter",
      "pop rock"
    ],
    "gigs": [
      {
        "date": "2013-05-03T18:00:00.000Z"
      },
      {
        "date": "2009-11-13T00:00:00.000Z"
      }
    ]
  },
  "Dave Hause ": {
    "echonestId": "ARNYVOR12086C121CB",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2013-11-15T20:00:00.000Z"
      }
    ]
  },
  "Trampled By Turtles": {
    "echonestId": "ARONNX51187B98DD47",
    "genres": [
      "progressive bluegrass",
      "new americana",
      "bluegrass"
    ],
    "gigs": [
      {
        "date": "2014-01-25T19:30:00.000Z"
      },
      {
        "date": "2014-11-18T19:30:00.000Z"
      }
    ]
  },
  "Lindi Ortega": {
    "echonestId": "ARVVSPP11EBCD78BA3",
    "genres": [
      "ectofolk",
      "alternative country",
      "folk christmas",
      "country christmas"
    ],
    "gigs": [
      {
        "date": "2014-01-16T20:00:00.000Z"
      }
    ]
  },
  "Iron Chic": {
    "echonestId": "ARZBFIT12086C16B0D",
    "genres": [
      "orgcore",
      "alternative emo"
    ],
    "gigs": [
      {
        "date": "2014-05-06T19:00:00.000Z"
      },
      {
        "date": "2011-05-14T18:30:00.000Z"
      }
    ]
  },
  "Old Crow Medicine Show": {
    "echonestId": "ARYO9H11187FB57945",
    "genres": [
      "new americana",
      "folk",
      "progressive bluegrass",
      "old-time",
      "bluegrass",
      "alternative country",
      "traditional folk"
    ],
    "gigs": [
      {
        "date": "2014-10-22T18:30:00.000Z"
      }
    ]
  },
  "Wheatus": {
    "echonestId": "AR07KSC1187B9BA606",
    "genres": [
      "pop rock",
      "post-grunge",
      "pop punk",
      "alternative rock"
    ],
    "gigs": [
      {
        "date": "2014-10-19T18:30:00.000Z"
      },
      {
        "date": "2008-10-23T23:00:00.000Z"
      },
      {
        "date": "2011-10-14T23:00:00.000Z"
      },
      {
        "date": "2010-06-11T23:00:00.000Z"
      },
      {
        "date": "2012-05-28T18:30:00.000Z"
      },
      {
        "date": "2001-11-19T00:00:00.000Z"
      }
    ]
  },
  "Tim Barry": {
    "echonestId": "ARN21XK1187B995CC1",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2015-02-27T19:30:00.000Z"
      },
      {
        "date": "2013-06-28T18:00:00.000Z"
      }
    ]
  },
  "Laibach": {
    "echonestId": "AR0OXS51187FB4F85A",
    "genres": [
      "industrial",
      "industrial rock",
      "ebm",
      "electro-industrial",
      "martial industrial",
      "experimental",
      "industrial metal"
    ],
    "gigs": [
      {
        "date": "2015-03-31T18:30:00.000Z"
      },
      {
        "date": "2010-12-16T00:00:00.000Z"
      }
    ]
  },
  "Yo La Tengo": {
    "echonestId": "ARUG48S1187B9BA142",
    "genres": [
      "lo-fi",
      "indie rock",
      "noise pop",
      "slow core",
      "alternative rock",
      "dream pop",
      "neo-psychedelic",
      "space rock",
      "nu gaze",
      "permanent wave",
      "chamber pop",
      "indie pop",
      "experimental rock",
      "indie folk"
    ],
    "gigs": [
      {
        "date": "2015-10-16T18:30:00.000Z"
      },
      {
        "date": "2009-11-06T00:00:00.000Z"
      },
      {
        "date": "2013-03-22T19:00:00.000Z"
      },
      {
        "date": "2011-06-05T23:00:00.000Z"
      }
    ]
  },
  "Wilhelm Scream": {
    "echonestId": "ARIRCKD13B71CE69A3",
    "genres": [],
    "gigs": [
      {
        "date": "2015-08-19T18:00:00.000Z"
      }
    ]
  },
  "Teenage Bottlerocket": {
    "echonestId": "ARE5LT91187B9B04DE",
    "genres": [
      "power-pop punk",
      "melodic hardcore",
      "orgcore",
      "skate punk",
      "punk"
    ],
    "gigs": [
      {
        "date": "2015-08-21T18:00:00.000Z"
      }
    ]
  },
  "Steve Earle": {
    "echonestId": "ARRX7Z01187B9AC449",
    "genres": [
      "alternative country",
      "folk",
      "cowpunk",
      "country rock",
      "roots rock",
      "outlaw country",
      "texas country",
      "alternative roots rock",
      "traditional folk"
    ],
    "gigs": [
      {
        "date": "2015-10-27T19:00:00.000Z"
      }
    ]
  },
  "Hayes Carll": {
    "echonestId": "ARTMZYW1187B9A7ECB",
    "genres": [
      "outlaw country",
      "texas country",
      "alternative country",
      "cowpunk",
      "folk",
      "folk christmas",
      "country christmas"
    ],
    "gigs": [
      {
        "date": "2015-09-06T18:30:00.000Z"
      }
    ]
  },
  "Titus Andronicus": {
    "echonestId": "ARBFY7A119B8669827",
    "genres": [
      "noise pop",
      "lo-fi",
      "noise rock",
      "indie rock",
      "nu gaze",
      "neo-psychedelic",
      "indie pop"
    ],
    "gigs": [
      {
        "date": "2015-11-13T19:00:00.000Z"
      }
    ]
  },
  "Kris Drever": {
    "echonestId": "AR4SEOV1187FB5476F",
    "genres": [
      "british folk",
      "traditional british folk"
    ],
    "gigs": [
      {
        "date": "2016-05-14T18:30:00.000Z"
      }
    ]
  },
  "Muncie Girls": {
    "echonestId": "ARDDMRR138BEC188F8",
    "genres": [],
    "gigs": [
      {
        "date": "2016-03-30T18:00:00.000Z"
      }
    ]
  },
  "Drive-By Truckers": {
    "echonestId": "AROMCEV1187B9B3F58",
    "genres": [
      "alternative country",
      "cowpunk",
      "roots rock",
      "country rock",
      "folk",
      "new americana",
      "outlaw country",
      "southern rock"
    ],
    "gigs": [
      {
        "date": "2008-08-06T18:00:00.000Z"
      },
      {
        "date": "2014-05-11T18:30:00.000Z"
      },
      {
        "date": "2003-12-02T21:30:00.000Z"
      },
      {
        "date": "2011-05-09T18:00:00.000Z"
      },
      {
        "date": "2010-11-10T00:00:00.000Z"
      }
    ]
  },
  "Tom Waits": {
    "echonestId": "ARERLPG1187FB3BB39",
    "genres": [
      "singer-songwriter"
    ],
    "gigs": [
      {
        "date": "2008-07-26T23:00:00.000Z"
      }
    ]
  },
  "Arrogant Worms": {
    "echonestId": "ARR96K01187B98D520",
    "genres": [
      "comic",
      "geek rock"
    ],
    "gigs": [
      {
        "date": "2006-05-24T19:00:00.000Z"
      }
    ]
  },
  "Clorox Girls": {
    "echonestId": "AR14BJQ1187B9ACC2E",
    "genres": [
      "garage punk"
    ],
    "gigs": [
      {
        "date": "2006-06-29T23:00:00.000Z"
      }
    ]
  },
  "Tom Paxton": {
    "echonestId": "AR2JSO31187FB5405E",
    "genres": [
      "traditional folk",
      "folk",
      "folk christmas",
      "folk rock",
      "british folk",
      "singer-songwriter"
    ],
    "gigs": [
      {
        "date": "2008-01-21T00:00:00.000Z"
      },
      {
        "date": "2009-02-17T00:00:00.000Z"
      },
      {
        "date": "2005-02-24T00:00:00.000Z"
      }
    ]
  },
  "Hold Steady": {
    "echonestId": "AREFFQF1187FB3F845",
    "genres": [
      "indie rock",
      "lo-fi"
    ],
    "gigs": [
      {
        "date": "2008-02-25T00:00:00.000Z"
      }
    ]
  },
  "Kimya Dawson": {
    "echonestId": "ARN3PMH1187FB3C8AA",
    "genres": [
      "anti-folk",
      "folk punk",
      "indie folk"
    ],
    "gigs": [
      {
        "date": "2008-05-13T18:00:00.000Z"
      }
    ]
  },
  "Hot Leg": {
    "echonestId": "ARDQ77S11C8A415CB4",
    "genres": [
      "sleaze rock",
      "deep melodic hard rock",
      "glam rock",
      "glam metal",
      "hard rock",
      "rock"
    ],
    "gigs": [
      {
        "date": "2009-03-05T00:00:00.000Z"
      }
    ]
  },
  "Lau": {
    "echonestId": "ARXRHWZ1187FB4ED8B",
    "genres": [
      "british folk",
      "traditional british folk"
    ],
    "gigs": [
      {
        "date": "2009-03-19T00:00:00.000Z"
      },
      {
        "date": "2009-12-05T00:00:00.000Z"
      },
      {
        "date": "2015-11-28T19:00:00.000Z"
      },
      {
        "date": "2016-01-28T19:30:00.000Z"
      },
      {
        "date": "2013-11-28T00:00:00.000Z"
      },
      {
        "date": "2010-08-19T23:00:00.000Z"
      },
      {
        "date": "2010-11-24T00:00:00.000Z"
      },
      {
        "date": "2012-11-06T00:00:00.000Z"
      },
      {
        "date": "2012-02-04T19:00:00.000Z"
      },
      {
        "date": "2011-12-02T19:00:00.000Z"
      }
    ]
  },
  "Bruce Springsteen": {
    "echonestId": "AR91C8S1187B990901",
    "genres": [
      "singer-songwriter",
      "roots rock",
      "folk rock",
      "folk",
      "mellow gold",
      "country rock",
      "traditional folk",
      "permanent wave",
      "folk-pop",
      "rock",
      "pop christmas"
    ],
    "gigs": [
      {
        "date": "2009-07-13T23:00:00.000Z"
      }
    ]
  },
  "Frank Turner": {
    "echonestId": "ARVVUSC1187FB4BDAC",
    "genres": [
      "indie folk"
    ],
    "gigs": [
      {
        "date": "2009-10-14T23:00:00.000Z"
      },
      {
        "date": "2010-03-16T00:00:00.000Z"
      },
      {
        "date": "2010-12-02T00:00:00.000Z"
      },
      {
        "date": "2011-05-11T18:00:00.000Z"
      },
      {
        "date": "2011-11-25T19:30:00.000Z"
      },
      {
        "date": "2014-02-08T19:00:00.000Z"
      },
      {
        "date": "2012-11-18T00:00:00.000Z"
      }
    ]
  },
  "Jonathan Coulton": {
    "echonestId": "ARXSNCN1187B9B06A3",
    "genres": [
      "comic"
    ],
    "gigs": [
      {
        "date": "2009-11-08T00:00:00.000Z"
      },
      {
        "date": "2009-11-10T00:00:00.000Z"
      }
    ]
  },
  "Bad Religion": {
    "echonestId": "AR46CAD1187FB4D84B",
    "genres": [
      "punk",
      "skate punk",
      "hardcore punk",
      "melodic hardcore",
      "punk christmas",
      "pop punk"
    ],
    "gigs": [
      {
        "date": "2010-08-24T23:00:00.000Z"
      },
      {
        "date": "2011-07-11T23:00:00.000Z"
      },
      {
        "date": "2002-05-11T23:00:00.000Z"
      }
    ]
  },
  "Cat Empire": {
    "echonestId": "ARQNLH31187B9ADC1D",
    "genres": [
      "australian alternative rock"
    ],
    "gigs": [
      {
        "date": "2010-10-26T23:00:00.000Z"
      },
      {
        "date": "2011-10-25T23:00:00.000Z"
      }
    ]
  },
  "Bomb The Music Industry": {
    "echonestId": "ARGOGOZ1187B9AEAC6",
    "genres": [
      "ska punk",
      "folk punk",
      "ska"
    ],
    "gigs": [
      {
        "date": "2010-11-12T00:00:00.000Z"
      }
    ]
  },
  "The Riot Before": {
    "echonestId": "AR4F8941187FB564F2",
    "genres": [
      "rva indie",
      "orgcore",
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2010-11-21T20:00:00.000Z"
      }
    ]
  },
  "Gaslight Anthem": {
    "echonestId": "ARBVLCJ1187FB50E61",
    "genres": [
      "alternative emo"
    ],
    "gigs": [
      {
        "date": "2010-11-19T00:00:00.000Z"
      },
      {
        "date": "2010-06-22T23:00:00.000Z"
      }
    ]
  },
  "Cheap Girls": {
    "echonestId": "ARRHTEX12086C11179",
    "genres": [
      "orgcore",
      "alternative emo"
    ],
    "gigs": [
      {
        "date": "2011-08-09T19:00:00.000Z"
      }
    ]
  },
  "Flogging Molly": {
    "echonestId": "ARP6IJB1187B9B14DE",
    "genres": [
      "celtic rock",
      "folk punk",
      "bow pop",
      "celtic punk"
    ],
    "gigs": [
      {
        "date": "2011-08-24T23:00:00.000Z"
      }
    ]
  },
  "Henry Rollins": {
    "echonestId": "AR6QPPU1187B9AA726",
    "genres": [
      "hardcore punk",
      "punk",
      "comic",
      "funk metal",
      "post-hardcore",
      "funk rock",
      "alternative metal"
    ],
    "gigs": [
      {
        "date": "2012-01-14T00:00:00.000Z"
      },
      {
        "date": "2010-08-22T23:00:00.000Z"
      }
    ]
  },
  "Babybird": {
    "echonestId": "ARX3Z311187B994B5B",
    "genres": [
      "britpop",
      "madchester"
    ],
    "gigs": [
      {
        "date": "2012-01-31T19:00:00.000Z"
      },
      {
        "date": "2010-03-18T00:00:00.000Z"
      }
    ]
  },
  "The Menzingers": {
    "echonestId": "ARB7DJV1187FB42B79",
    "genres": [
      "orgcore",
      "alternative emo",
      "folk punk",
      "melodic hardcore"
    ],
    "gigs": [
      {
        "date": "2012-09-21T18:30:00.000Z"
      },
      {
        "date": "2013-08-07T18:30:00.000Z"
      },
      {
        "date": "2014-10-01T17:30:00.000Z"
      }
    ]
  },
  "Joyce Manor": {
    "echonestId": "ARKYVKE12D332C2586",
    "genres": [
      "alternative emo",
      "folk punk",
      "orgcore"
    ],
    "gigs": [
      {
        "date": "2012-09-26T18:30:00.000Z"
      },
      {
        "date": "2014-11-12T19:30:00.000Z"
      }
    ]
  },
  "The Cut Ups ": {
    "echonestId": "ARSYHOW12454A51B6E",
    "genres": [
      "deep orgcore"
    ],
    "gigs": [
      {
        "date": "2013-08-01T19:00:00.000Z"
      }
    ]
  },
  "Lau ": {
    "echonestId": "ARXRHWZ1187FB4ED8B",
    "genres": [
      "british folk",
      "traditional british folk"
    ],
    "gigs": [
      {
        "date": "2014-11-27T19:30:00.000Z"
      }
    ]
  },
  "Masked Intruder": {
    "echonestId": "ARGBTHB136658E98A5",
    "genres": [
      "power-pop punk",
      "orgcore",
      "punk christmas",
      "deep power-pop punk"
    ],
    "gigs": [
      {
        "date": "2015-05-14T18:30:00.000Z"
      }
    ]
  },
  "Red City Radio": {
    "echonestId": "ARYDXLV11EB9C82776",
    "genres": [
      "orgcore",
      "deep power-pop punk"
    ],
    "gigs": [
      {
        "date": "2015-07-16T18:30:00.000Z"
      }
    ]
  },
  "Barenaked Ladies": {
    "echonestId": "ARW7K0P1187B9B5B47",
    "genres": [
      "pop rock",
      "post-grunge",
      "neo mellow",
      "pop christmas"
    ],
    "gigs": [
      {
        "date": "2015-10-03T18:00:00.000Z"
      }
    ]
  },
  "Bouncing Souls": {
    "echonestId": "ARUU13E1187FB3EB48",
    "genres": [
      "melodic hardcore",
      "skate punk",
      "punk",
      "ska punk",
      "pop punk"
    ],
    "gigs": [
      {
        "date": "2013-03-17T19:00:00.000Z"
      }
    ]
  },
  "Laura Stevenson and The Cans": {
    "echonestId": "ARBYMVK12086C15955",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2014-12-10T19:00:00.000Z"
      },
      {
        "date": "2014-12-09T19:30:00.000Z"
      }
    ]
  },
  "Chuck Ragan": {
    "echonestId": "ARP8KLI1187B99BE6F",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2015-03-21T20:30:00.000Z"
      },
      {
        "date": "2015-03-22T19:00:00.000Z"
      }
    ]
  },
  "Nick Harper": {
    "echonestId": "ARVB9E41187B994C07",
    "genres": [
      "british folk"
    ],
    "gigs": [
      {
        "date": "2012-03-10T00:00:00.000Z"
      },
      {
        "date": "2004-04-16T20:30:00.000Z"
      },
      {
        "date": "2007-05-17T23:00:00.000Z"
      },
      {
        "date": "2010-05-12T23:00:00.000Z"
      },
      {
        "date": "2005-11-17T00:00:00.000Z"
      }
    ]
  },
  "The Streets": {
    "echonestId": "ARIHE7O1187FB47DED",
    "genres": [
      "uk garage"
    ],
    "gigs": [
      {
        "date": "2011-02-18T00:00:00.000Z"
      }
    ]
  },
  "Low": {
    "echonestId": "ARBZ19X1187B9ABB24",
    "genres": [
      "slow core",
      "melancholia",
      "indie christmas",
      "dream pop",
      "chamber pop",
      "lo-fi",
      "folk christmas",
      "indie rock",
      "indie folk",
      "pop christmas"
    ],
    "gigs": [
      {
        "date": "2011-05-17T18:30:00.000Z"
      }
    ]
  },
  "Dave Matthews Band": {
    "echonestId": "ARQXC7V1187FB4DA9E",
    "genres": [
      "jam band",
      "neo mellow",
      "pop rock",
      "pop christmas",
      "post-grunge"
    ],
    "gigs": [
      {
        "date": "2015-11-11T19:30:00.000Z"
      }
    ]
  },
  "The Queers": {
    "echonestId": "ARIEKZA1187B98FED4",
    "genres": [
      "power-pop punk",
      "skate punk",
      "punk"
    ],
    "gigs": [
      {
        "date": "2011-03-06T15:00:00.000Z"
      }
    ]
  },
  "Laura Stevenson": {
    "echonestId": "ARINEHN11EBCD78F29",
    "genres": [
      "folk punk"
    ],
    "gigs": [
      {
        "date": "2014-04-17T18:00:00.000Z"
      }
    ]
  },
  "Paradise Lost": {
    "echonestId": "ARF97QT1187B9B8B47",
    "genres": [
      "doom metal",
      "gothic metal",
      "metal"
    ],
    "gigs": [
      {
        "date": "2015-10-01T18:00:00.000Z"
      }
    ]
  },
  "Laura Veirs": {
    "echonestId": "ARXUCWV1187FB3E4D7",
    "genres": [
      "indie folk",
      "folk-pop",
      "freak folk",
      "chamber pop",
      "stomp and holler",
      "anti-folk",
      "new weird america",
      "slow core",
      "lilith"
    ],
    "gigs": [
      {
        "date": "2004-03-27T21:30:00.000Z"
      },
      {
        "date": "2008-01-30T00:00:00.000Z"
      }
    ]
  },
  "Abigail Washburn": {
    "echonestId": "ARBIR151187FB5524D",
    "genres": [
      "progressive bluegrass",
      "new americana",
      "bluegrass"
    ],
    "gigs": [
      {
        "date": "2011-05-21T23:00:00.000Z"
      }
    ]
  },
  "Pearl Jam": {
    "echonestId": "ARFVYJI1187B9B8E13",
    "genres": [
      "grunge",
      "alternative rock",
      "post-grunge",
      "permanent wave",
      "rock"
    ],
    "gigs": [
      {
        "date": "2000-06-02T23:00:00.000Z"
      }
    ]
  },
  "Ben Folds": {
    "echonestId": "AR76NY61187FB4F82F",
    "genres": [
      "piano rock",
      "neo mellow",
      "indie christmas",
      "pop rock",
      "permanent wave",
      "pop christmas"
    ],
    "gigs": [
      {
        "date": "2001-09-10T23:00:00.000Z"
      }
    ]
  },
  "Snuff": {
    "echonestId": "AR3B6OB1187FB47C14",
    "genres": [],
    "gigs": [
      {
        "date": "2000-05-11T23:00:00.000Z"
      }
    ]
  },
  "Cowboy Junkies": {
    "echonestId": "ARU5ZVG1187B9A6E97",
    "genres": [
      "roots rock",
      "alternative country",
      "melancholia",
      "country rock",
      "singer-songwriter",
      "cowpunk",
      "lilith",
      "folk",
      "folk-pop",
      "folk rock"
    ],
    "gigs": [
      {
        "date": "2004-10-08T23:00:00.000Z"
      }
    ]
  },
  "Laura Cantrell": {
    "echonestId": "ARAPRJI1187B9ACEBD",
    "genres": [
      "alternative country",
      "new americana",
      "folk",
      "cowpunk",
      "outlaw country"
    ],
    "gigs": [
      {
        "date": "2002-12-02T00:00:00.000Z"
      },
      {
        "date": "2011-05-06T18:30:00.000Z"
      },
      {
        "date": "2003-01-29T00:00:00.000Z"
      }
    ]
  },
  "People Under The Stairs": {
    "echonestId": "ARBX5291187B997B3F",
    "genres": [
      "underground hip hop",
      "turntablism",
      "hip hop",
      "alternative hip hop",
      "acid jazz"
    ],
    "gigs": [
      {
        "date": "2006-10-10T23:00:00.000Z"
      }
    ]
  },
  "Ratdog": {
    "echonestId": "ARFSAP61187FB3BADA",
    "genres": [
      "jam band"
    ],
    "gigs": [
      {
        "date": "2003-08-26T23:00:00.000Z"
      }
    ]
  },
  "Dananananaykroyd": {
    "echonestId": "ARZQB3X1187FB47E1B",
    "genres": [
      "math pop"
    ],
    "gigs": [
      {
        "date": "2011-06-03T18:30:00.000Z"
      }
    ]
  },
  "Loudon Wainwright": {
    "echonestId": "ARV1JVD1187B9AD195",
    "genres": [
      "folk",
      "traditional folk",
      "singer-songwriter",
      "folk rock",
      "roots rock",
      "folk-pop"
    ],
    "gigs": [
      {
        "date": "2003-10-14T23:00:00.000Z"
      }
    ]
  },
  "Therion": {
    "echonestId": "ARZN98V1187B990D1D",
    "genres": [
      "gothic metal",
      "progressive metal",
      "symphonic metal",
      "swedish metal",
      "gothic symphonic metal",
      "power metal",
      "folk metal",
      "metal",
      "melodic death metal",
      "viking metal",
      "symphonic black metal",
      "neo classical metal"
    ],
    "gigs": [
      {
        "date": "1998-09-23T23:00:00.000Z"
      }
    ]
  },
  "String Cheese Incident": {
    "echonestId": "ARWTFGY1187B992CBA",
    "genres": [
      "jam band"
    ],
    "gigs": [
      {
        "date": "2004-03-31T23:00:00.000Z"
      }
    ]
  },
  "Ben Folds Five": {
    "echonestId": "ARBAN8S1187FB4D22F",
    "genres": [
      "piano rock",
      "power pop",
      "permanent wave",
      "pop rock",
      "alternative rock",
      "neo mellow"
    ],
    "gigs": [
      {
        "date": "1999-12-20T00:00:00.000Z"
      },
      {
        "date": "1997-03-02T00:00:00.000Z"
      }
    ]
  },
  "Gomez": {
    "echonestId": "ARYW4BX1187B98DDE8",
    "genres": [
      "britpop",
      "madchester",
      "alternative rock",
      "rock"
    ],
    "gigs": [
      {
        "date": "1999-10-14T23:00:00.000Z"
      }
    ]
  },
  "Feeder": {
    "echonestId": "ARFG2HF1187FB3D4EC",
    "genres": [
      "britpop",
      "welsh rock",
      "rock",
      "post-grunge",
      "pop rock",
      "madchester",
      "alternative rock"
    ],
    "gigs": [
      {
        "date": "1999-10-02T23:00:00.000Z"
      }
    ]
  },
  "Even In Blackouts": {
    "echonestId": "ARCP84R1187B991789",
    "genres": [
      "power-pop punk",
      "deep power-pop punk",
      "orgcore"
    ],
    "gigs": [
      {
        "date": "2005-02-06T00:00:00.000Z"
      },
      {
        "date": "2005-02-04T00:00:00.000Z"
      },
      {
        "date": "2006-11-11T00:00:00.000Z"
      }
    ]
  },
  "The Lightning Seeds": {
    "echonestId": "ARTAACA1187B9B73DE",
    "genres": [
      "madchester",
      "britpop",
      "new wave",
      "new romantic",
      "new wave pop"
    ],
    "gigs": [
      {
        "date": "1999-11-28T00:00:00.000Z"
      }
    ]
  },
  "Presidents of the USA": {
    "echonestId": "ARXDFN01187B9AE80E",
    "genres": [
      "alternative rock",
      "post-grunge",
      "grunge",
      "pop rock",
      "funk metal",
      "power pop",
      "comic",
      "ska punk",
      "funk rock"
    ],
    "gigs": [
      {
        "date": "2005-08-16T23:00:00.000Z"
      }
    ]
  },
  "Peter Rowan": {
    "echonestId": "ARK60RL1187FB3A130",
    "genres": [
      "bluegrass",
      "progressive bluegrass"
    ],
    "gigs": [
      {
        "date": "2003-11-26T00:00:00.000Z"
      }
    ]
  },
  "Against Me ": {
    "echonestId": "ARDUFS01187FB4CF5E",
    "genres": [
      "folk punk",
      "melodic hardcore",
      "skate punk",
      "orgcore",
      "punk"
    ],
    "gigs": [
      {
        "date": "2014-11-15T19:00:00.000Z"
      }
    ]
  },
  "Kacey Musgraves ": {
    "echonestId": "AROJNKE11EB9C8253F",
    "genres": [
      "country dawn",
      "deep contemporary country",
      "modern country rock",
      "contemporary country",
      "texas country",
      "country road",
      "outlaw country"
    ],
    "gigs": [
      {
        "date": "2014-07-08T18:00:00.000Z"
      }
    ]
  },
  "Jurassic 5": {
    "echonestId": "AREGC1Z1187B995A90",
    "genres": [
      "underground hip hop",
      "hip hop",
      "turntablism",
      "rap",
      "old school hip hop",
      "alternative hip hop",
      "rap rock",
      "east coast hip hop",
      "hardcore hip hop"
    ],
    "gigs": [
      {
        "date": "2014-06-20T18:00:22.000Z"
      }
    ]
  },
  "Samamidon": {
    "echonestId": "ARTJ6AE1187B98CCC5",
    "genres": [
      "stomp and holler",
      "indie folk",
      "freak folk",
      "slow core",
      "new americana",
      "new weird america",
      "chamber pop",
      "folk"
    ],
    "gigs": [
      {
        "date": "2008-11-10T00:00:00.000Z"
      }
    ]
  },
  "Ugly Duckling": {
    "echonestId": "ARBYVIH1187B9B9F64",
    "genres": [
      "underground hip hop",
      "turntablism",
      "hip hop",
      "old school hip hop",
      "acid jazz",
      "rap",
      "alternative hip hop",
      "rap rock"
    ],
    "gigs": [
      {
        "date": "2006-05-03T23:00:00.000Z"
      }
    ]
  },
  "The Deadly Gentlemen": {
    "echonestId": "ARXTFAE122CC3B12E6",
    "genres": [
      "progressive bluegrass"
    ],
    "gigs": [
      {
        "date": "2012-03-21T00:00:00.000Z"
      }
    ]
  },
  "Less Than Jake": {
    "echonestId": "ARG8DXO1187B9AF743",
    "genres": [
      "ska punk",
      "ska",
      "skate punk",
      "melodic hardcore",
      "pop punk",
      "punk"
    ],
    "gigs": [
      {
        "date": "2001-04-10T23:00:00.000Z"
      }
    ]
  },
  "Gong": {
    "echonestId": "ARCZD5Y1187B9ADDF5",
    "genres": [
      "canterbury scene",
      "space rock",
      "zolo",
      "kraut rock",
      "art rock",
      "experimental",
      "symphonic rock",
      "progressive rock"
    ],
    "gigs": [
      {
        "date": "2000-11-26T00:00:00.000Z"
      }
    ]
  },
  "The Vandals": {
    "echonestId": "ARW0K5F1187B9AFCC0",
    "genres": [
      "skate punk",
      "punk",
      "punk christmas",
      "melodic hardcore",
      "heavy christmas",
      "ska punk",
      "hardcore punk",
      "ska",
      "pop punk"
    ],
    "gigs": [
      {
        "date": "2000-10-16T23:00:00.000Z"
      }
    ]
  },
  "My Life Story": {
    "echonestId": "ARENI8E1187FB367EB",
    "genres": [
      "britpop",
      "chamber pop"
    ],
    "gigs": [
      {
        "date": "1997-12-01T00:00:00.000Z"
      }
    ]
  },
  "Jeff Rosenstock": {
    "echonestId": "ARLMACC1187FB443F5",
    "genres": [
      "folk punk",
      "alternative emo"
    ],
    "gigs": [
      {
        "date": "2016-03-20T19:00:00.000Z"
      }
    ]
  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZDNmYy5qcyIsInNyYy9qcy9naWctZGF0YS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsT0FBTyxDQUFQLEdBQVcsT0FBTyxNQUFQLEdBQWdCLFFBQVEsUUFBUixDQUEzQjtBQUNBLFFBQVEsV0FBUjs7QUFFQSxJQUFNLEtBQUssUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNLEtBQUssUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUEsSUFBTSxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEtBQXZFLEVBQThFLEtBQTlFLENBQWY7QUFDQSxJQUFNLGVBQWUsUUFBUSxpQkFBUixDQUFyQjs7QUFFQSxFQUFFLFVBQUYsRUFBYyxLQUFkLENBQW9CLEtBQXBCOztBQUVBLFNBQVMsS0FBVCxHQUFpQjtBQUNmLE1BQU0sUUFBUSxHQUFkO0FBQ0EsTUFBTSxTQUFTLEdBQWY7QUFDQSxNQUFNLFdBQVc7QUFDZixhQUFTLEtBRE07QUFFZixjQUFVO0FBRkssR0FBakI7O0FBS0EsTUFBTSxPQUFPLEdBQUcsTUFBSCxDQUFVLFVBQVYsRUFBc0IsSUFBdEIsQ0FBMkIsRUFBM0IsQ0FBYjs7QUFFQSxjQUFZLEtBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBd0IsUUFBeEIsQ0FBWjtBQUNBLGlCQUFlLEtBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNEOztBQUVELFNBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQztBQUNqQyxNQUFNLE9BQU8sRUFBRSxLQUFGLENBQVEsWUFBUixFQUNVLFNBRFYsQ0FDb0IsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ25CLFdBQU87QUFDTCxnQkFBVSxDQURMO0FBRUwsZUFBUyxFQUFFLElBQUYsQ0FBTztBQUZYLEtBQVA7QUFJRCxHQU5WLEVBT1UsTUFQVixHQVFVLE1BUlYsQ0FRaUIsVUFBQyxNQUFEO0FBQUEsV0FBWSxPQUFPLEtBQVAsR0FBZSxDQUEzQjtBQUFBLEdBUmpCLEVBU1UsS0FUVixFQUFiOztBQVdBLE1BQU0sU0FBUyxHQUFHLEtBQUgsQ0FBUyxPQUFULEdBQ1osTUFEWSxDQUNMLEVBQUUsR0FBRixDQUFNLElBQU4sRUFBWSxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsTUFBVDtBQUFBLEdBQVosQ0FESyxFQUVaLFdBRlksQ0FFQSxDQUFDLENBQUQsRUFBSSxHQUFKLENBRkEsRUFFVSxDQUZWLENBQWY7O0FBSUEsTUFBTSxTQUFTLEdBQUcsS0FBSCxDQUFTLE1BQVQsR0FDWixNQURZLENBQ0wsQ0FBQyxDQUFELEVBQUksRUFBSixDQURLLEVBRVosS0FGWSxDQUVOLENBQUMsR0FBRCxFQUFNLENBQU4sQ0FGTSxDQUFmOztBQUlBLE1BQU0sU0FBUyxHQUFHLE1BQUgsQ0FBVSxHQUFWLEdBQ1osTUFEWSxDQUNMLFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxNQUFUO0FBQUEsR0FESyxFQUVaLE1BRlksQ0FFTCxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsS0FBVDtBQUFBLEdBRkssRUFHWixNQUhZLENBR0wsTUFISyxFQUlaLE1BSlksQ0FJTCxNQUpLLENBQWY7O0FBTUEsWUFDRyxLQURILENBQ1MsSUFEVCxFQUVHLElBRkgsQ0FFUSxNQUZSO0FBR0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLFNBQXJCLEVBQWdDO0FBQzlCLE1BQU0sY0FBYyxFQUFFLEtBQUYsQ0FBUSxZQUFSLEVBQ0csR0FESCxDQUNPLFVBQUMsTUFBRDtBQUFBLFdBQVksT0FBTyxJQUFuQjtBQUFBLEdBRFAsRUFFRyxXQUZILEdBR0csR0FISCxDQUdPLFVBQUMsR0FBRCxFQUFTO0FBQ1osUUFBTSxVQUFVLElBQUksSUFBSixDQUFTLElBQUksSUFBYixDQUFoQjtBQUNBLFdBQU87QUFDTCxlQUFTLE9BQU8sUUFBUSxRQUFSLEVBQVA7QUFESixLQUFQO0FBR0QsR0FSSCxFQVNHLE9BVEgsQ0FTVyxFQUFFLFFBQUYsQ0FBVyxPQUFYLENBVFgsRUFVRyxTQVZILENBVWEsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ25CLFdBQU87QUFDTCxlQUFTLENBREo7QUFFTCxlQUFTO0FBRkosS0FBUDtBQUlELEdBZkgsRUFnQkcsTUFoQkgsR0FpQkcsS0FqQkgsRUFBcEI7O0FBb0JBLE1BQUksVUFBVSxHQUFHLElBQUgsQ0FBUSxNQUFSLEdBQ1gsT0FEVyxDQUNILENBREcsRUFFWCxHQUZXLENBRVAsQ0FBQyxDQUFELEVBQUksR0FBSixDQUZPLEVBR1gsTUFIVyxDQUdKLENBQUMsT0FBRCxDQUhJLENBQWQ7O0FBS0EsTUFBSSxRQUFRLEdBQUcsS0FBSCxDQUFTLFNBQVQsQ0FBbUIsR0FBRyxLQUFILENBQVMsT0FBVCxFQUFuQixFQUF1QyxHQUFHLEtBQUgsQ0FBUyxNQUFULEVBQXZDLEVBQ1QsVUFEUyxDQUNFLGVBREYsRUFFVCxPQUZTLENBRUQsTUFGQyxFQUdULE9BSFMsQ0FHRCxRQUFRLFdBQVIsQ0FIQyxFQUlULE1BSlMsQ0FJRixDQUpFLEVBS1QsS0FMUyxFQUFaOztBQU9BLE1BQUksU0FBUyxHQUFHLE1BQUgsQ0FBVSxHQUFWLEdBQ1YsTUFEVSxDQUNILFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxLQUFUO0FBQUEsR0FERyxFQUVWLE1BRlUsQ0FFSCxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsS0FBVDtBQUFBLEdBRkcsQ0FBYjs7QUFJQSxRQUFNLFFBQU4sQ0FBZSxNQUFmOztBQUVBLFlBQ0csS0FESCxDQUNTLFdBRFQsRUFFRyxJQUZILENBRVEsS0FGUjtBQUtEOzs7QUN0R0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsICQgKi9cbndpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbmNvbnN0IGQzID0gcmVxdWlyZSgnZDMnKTtcbmNvbnN0IGZjID0gcmVxdWlyZSgnZDNmYycpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5jb25zdCBnaWdzQnlBcnRpc3QgPSByZXF1aXJlKCcuL2dpZy1kYXRhLmpzb24nKTtcblxuJCgnLmNvbnRlbnQnKS5yZWFkeShzZXR1cCk7XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICBjb25zdCB3aWR0aCA9IDUwMDtcbiAgY29uc3QgaGVpZ2h0ID0gMjUwO1xuICBjb25zdCBzdmdBdHRycyA9IHtcbiAgICAnd2lkdGgnOiB3aWR0aCxcbiAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gIH07XG5cbiAgY29uc3Qgcm9vdCA9IGQzLnNlbGVjdCgnLmNvbnRlbnQnKS5odG1sKCcnKVxuXG4gIGdpZ3NCeU1vbnRoKHJvb3QuYXBwZW5kKCdzdmcnKS5hdHRyKHN2Z0F0dHJzKSk7XG4gIHBvcHVsYXJBcnRpc3RzKHJvb3QuYXBwZW5kKCdzdmcnKS5hdHRyKHN2Z0F0dHJzKSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXJBcnRpc3RzKHNlbGVjdGlvbikge1xuICBjb25zdCBnaWdzID0gXy5jaGFpbihnaWdzQnlBcnRpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwVmFsdWVzKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FydGlzdCc6IGssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50Jzogdi5naWdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoYXJ0aXN0KSA9PiBhcnRpc3QuY291bnQgPiAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XG5cbiAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGUub3JkaW5hbCgpXG4gICAgLmRvbWFpbihfLm1hcChnaWdzLCAoZCkgPT4gZC5hcnRpc3QpKVxuICAgIC5yYW5nZVBvaW50cyhbMCwgNTAwXSwgMSk7XG5cbiAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAuZG9tYWluKFswLCAxMF0pXG4gICAgLnJhbmdlKFsyNTAsIDBdKTtcblxuICBjb25zdCBzZXJpZXMgPSBmYy5zZXJpZXMuYmFyKClcbiAgICAueFZhbHVlKChkKSA9PiBkLmFydGlzdClcbiAgICAueVZhbHVlKChkKSA9PiBkLmNvdW50KVxuICAgIC54U2NhbGUoeFNjYWxlKVxuICAgIC55U2NhbGUoeVNjYWxlKTtcblxuICBzZWxlY3Rpb25cbiAgICAuZGF0dW0oZ2lncylcbiAgICAuY2FsbChzZXJpZXMpO1xufVxuXG5mdW5jdGlvbiBnaWdzQnlNb250aChzZWxlY3Rpb24pIHtcbiAgY29uc3QgZ2lnc0J5TW9udGggPSBfLmNoYWluKGdpZ3NCeUFydGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGFydGlzdCkgPT4gYXJ0aXN0LmdpZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmxhdHRlbkRlZXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoZ2lnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdpZ0RhdGUgPSBuZXcgRGF0ZShnaWcuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vbnRoJzogbW9udGhzW2dpZ0RhdGUuZ2V0TW9udGgoKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY291bnRCeShfLnByb3BlcnR5KCdtb250aCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFZhbHVlcygodiwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb250aCc6IGssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50JzogdlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XG5cblxuICB2YXIgeUV4dGVudCA9IGZjLnV0aWwuZXh0ZW50KClcbiAgICAuaW5jbHVkZSgwKVxuICAgIC5wYWQoWzAsIDAuNV0pXG4gICAgLmZpZWxkcyhbJ2NvdW50J10pO1xuXG4gIHZhciBjaGFydCA9IGZjLmNoYXJ0LmNhcnRlc2lhbihkMy5zY2FsZS5vcmRpbmFsKCksIGQzLnNjYWxlLmxpbmVhcigpKVxuICAgIC5jaGFydExhYmVsKCdHaWdzIEJ5IE1vbnRoJylcbiAgICAueERvbWFpbihtb250aHMpXG4gICAgLnlEb21haW4oeUV4dGVudChnaWdzQnlNb250aCkpXG4gICAgLnlUaWNrcyg1KVxuICAgIC55TmljZSgpO1xuXG4gIHZhciBzZXJpZXMgPSBmYy5zZXJpZXMuYmFyKClcbiAgICAueFZhbHVlKChkKSA9PiBkLm1vbnRoKVxuICAgIC55VmFsdWUoKGQpID0+IGQuY291bnQpO1xuXG4gIGNoYXJ0LnBsb3RBcmVhKHNlcmllcyk7XG5cbiAgc2VsZWN0aW9uXG4gICAgLmRhdHVtKGdpZ3NCeU1vbnRoKVxuICAgIC5jYWxsKGNoYXJ0KTtcblxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiTWV1cnNhdWx0XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlJYR0dTMTE4N0ZCNUMyM0VcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNjb3R0aXNoIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMy0wOVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMTItMDVUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA1LTIwVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJHb2dvbCBCb3JkZWxsb1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwWU1FNjExODdGQjNCNTQ0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMy0xNFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQW5kcmV3IEphY2tzb24gSmloYWRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRlVaTjYxMTg3RkI0Q0JBOVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcImFudGktZm9sa1wiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTI3VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMC0wM1QxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTAtMDRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA2LTE0VDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJDYWtlXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlFSUVJBMTIxMzFCNEI1QThcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIixcbiAgICAgIFwiZnVuayBtZXRhbFwiLFxuICAgICAgXCJmdW5rIHJvY2tcIixcbiAgICAgIFwiZ2FyYWdlIHJvY2tcIixcbiAgICAgIFwicmFwIHJvY2tcIixcbiAgICAgIFwibmVvIG1lbGxvd1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTExLTE2VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJGcmFueiBOaWNvbGF5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUklMWUtEMTE4N0I5QjY3NjBcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTEyLTA2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0xMS0yMFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDEtMTRUMjA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlNwYXJrc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwNDBKWjExODdGQjM5OUE5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJ6b2xvXCIsXG4gICAgICBcImdsYW0gcm9ja1wiLFxuICAgICAgXCJhcnQgcm9ja1wiLFxuICAgICAgXCJuZXcgd2F2ZVwiLFxuICAgICAgXCJkYW5jZSByb2NrXCIsXG4gICAgICBcInByb3RvcHVua1wiLFxuICAgICAgXCJuZXcgcm9tYW50aWNcIixcbiAgICAgIFwiZXhwZXJpbWVudGFsXCIsXG4gICAgICBcIm5ldyB3YXZlIHBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTEwLTIwVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMdWNlcm9cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQlcxSjYxMTg3QjlCOEI1NFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0xMS0yNFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDItMDVUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNvbGluIEhheVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI5UU9OTTExODdCOUEwQThDXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJuZW8gbWVsbG93XCIsXG4gICAgICBcImFjb3VzdGljIHBvcFwiLFxuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiLFxuICAgICAgXCJwb3Agcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTA1LTAzVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOS0xMS0xM1QwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRGF2ZSBIYXVzZSBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSTllWT1IxMjA4NkMxMjFDQlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMTEtMTVUMjA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRyYW1wbGVkIEJ5IFR1cnRsZXNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFST05OWDUxMTg3Qjk4REQ0N1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCIsXG4gICAgICBcIm5ldyBhbWVyaWNhbmFcIixcbiAgICAgIFwiYmx1ZWdyYXNzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDEtMjVUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTE4VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMaW5kaSBPcnRlZ2FcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVlZTUFAxMUVCQ0Q3OEJBM1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZWN0b2ZvbGtcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiLFxuICAgICAgXCJjb3VudHJ5IGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTAxLTE2VDIwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJJcm9uIENoaWNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWkJGSVQxMjA4NkMxNkIwRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBlbW9cIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wNS0wNlQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMTRUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIk9sZCBDcm93IE1lZGljaW5lIFNob3dcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWU85SDExMTg3RkI1Nzk0NVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcInByb2dyZXNzaXZlIGJsdWVncmFzc1wiLFxuICAgICAgXCJvbGQtdGltZVwiLFxuICAgICAgXCJibHVlZ3Jhc3NcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTAtMjJUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIldoZWF0dXNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSMDdLU0MxMTg3QjlCQTYwNlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIixcbiAgICAgIFwicG9wIHB1bmtcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTEwLTE5VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0xMC0yM1QyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTAtMTRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA2LTExVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wNS0yOFQxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDEtMTEtMTlUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRpbSBCYXJyeVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJOMjFYSzExODdCOTk1Q0MxXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wMi0yN1QxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMDYtMjhUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhaWJhY2hcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSME9YUzUxMTg3RkI0Rjg1QVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaW5kdXN0cmlhbFwiLFxuICAgICAgXCJpbmR1c3RyaWFsIHJvY2tcIixcbiAgICAgIFwiZWJtXCIsXG4gICAgICBcImVsZWN0cm8taW5kdXN0cmlhbFwiLFxuICAgICAgXCJtYXJ0aWFsIGluZHVzdHJpYWxcIixcbiAgICAgIFwiZXhwZXJpbWVudGFsXCIsXG4gICAgICBcImluZHVzdHJpYWwgbWV0YWxcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wMy0zMVQxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTItMTZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIllvIExhIFRlbmdvXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlVHNDhTMTE4N0I5QkExNDJcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImxvLWZpXCIsXG4gICAgICBcImluZGllIHJvY2tcIixcbiAgICAgIFwibm9pc2UgcG9wXCIsXG4gICAgICBcInNsb3cgY29yZVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCIsXG4gICAgICBcImRyZWFtIHBvcFwiLFxuICAgICAgXCJuZW8tcHN5Y2hlZGVsaWNcIixcbiAgICAgIFwic3BhY2Ugcm9ja1wiLFxuICAgICAgXCJudSBnYXplXCIsXG4gICAgICBcInBlcm1hbmVudCB3YXZlXCIsXG4gICAgICBcImNoYW1iZXIgcG9wXCIsXG4gICAgICBcImluZGllIHBvcFwiLFxuICAgICAgXCJleHBlcmltZW50YWwgcm9ja1wiLFxuICAgICAgXCJpbmRpZSBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTAtMTZUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTExLTA2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0wMy0yMlQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDYtMDVUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIldpbGhlbG0gU2NyZWFtXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUklSQ0tEMTNCNzFDRTY5QTNcIixcbiAgICBcImdlbnJlc1wiOiBbXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA4LTE5VDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUZWVuYWdlIEJvdHRsZXJvY2tldFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFNUxUOTExODdCOUIwNERFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3dlci1wb3AgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwic2thdGUgcHVua1wiLFxuICAgICAgXCJwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDgtMjFUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlN0ZXZlIEVhcmxlXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlJYN1owMTE4N0I5QUM0NDlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIGNvdW50cnlcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcImNvdW50cnkgcm9ja1wiLFxuICAgICAgXCJyb290cyByb2NrXCIsXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCIsXG4gICAgICBcInRleGFzIGNvdW50cnlcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9vdHMgcm9ja1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTAtMjdUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkhheWVzIENhcmxsXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlRNWllXMTE4N0I5QTdFQ0JcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCIsXG4gICAgICBcInRleGFzIGNvdW50cnlcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwiZm9sayBjaHJpc3RtYXNcIixcbiAgICAgIFwiY291bnRyeSBjaHJpc3RtYXNcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wOS0wNlQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGl0dXMgQW5kcm9uaWN1c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCRlk3QTExOUI4NjY5ODI3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJub2lzZSBwb3BcIixcbiAgICAgIFwibG8tZmlcIixcbiAgICAgIFwibm9pc2Ugcm9ja1wiLFxuICAgICAgXCJpbmRpZSByb2NrXCIsXG4gICAgICBcIm51IGdhemVcIixcbiAgICAgIFwibmVvLXBzeWNoZWRlbGljXCIsXG4gICAgICBcImluZGllIHBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTExLTEzVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJLcmlzIERyZXZlclwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI0U0VPVjExODdGQjU0NzZGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0aXNoIGZvbGtcIixcbiAgICAgIFwidHJhZGl0aW9uYWwgYnJpdGlzaCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDUtMTRUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIk11bmNpZSBHaXJsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJERE1SUjEzOEJFQzE4OEY4XCIsXG4gICAgXCJnZW5yZXNcIjogW10sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wMy0zMFQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRHJpdmUtQnkgVHJ1Y2tlcnNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFST01DRVYxMTg3QjlCM0Y1OFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJvdXRsYXcgY291bnRyeVwiLFxuICAgICAgXCJzb3V0aGVybiByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDgtMDZUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA1LTExVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMy0xMi0wMlQyMTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMDlUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTExLTEwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUb20gV2FpdHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRVJMUEcxMTg3RkIzQkIzOVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2luZ2VyLXNvbmd3cml0ZXJcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wNy0yNlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQXJyb2dhbnQgV29ybXNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUjk2SzAxMTg3Qjk4RDUyMFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiY29taWNcIixcbiAgICAgIFwiZ2VlayByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMDUtMjRUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNsb3JveCBHaXJsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIxNEJKUTExODdCOUFDQzJFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJnYXJhZ2UgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA2LTA2LTI5VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUb20gUGF4dG9uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjJKU08zMTE4N0ZCNTQwNUVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiLFxuICAgICAgXCJmb2xrIHJvY2tcIixcbiAgICAgIFwiYnJpdGlzaCBmb2xrXCIsXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDEtMjFUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTAyLTE3VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNS0wMi0yNFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSG9sZCBTdGVhZHlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRUZGUUYxMTg3RkIzRjg0NVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaW5kaWUgcm9ja1wiLFxuICAgICAgXCJsby1maVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTAyLTI1VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJLaW15YSBEYXdzb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSTjNQTUgxMTg3RkIzQzhBQVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYW50aS1mb2xrXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJpbmRpZSBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDUtMTNUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkhvdCBMZWdcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRFE3N1MxMUM4QTQxNUNCNFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2xlYXplIHJvY2tcIixcbiAgICAgIFwiZGVlcCBtZWxvZGljIGhhcmQgcm9ja1wiLFxuICAgICAgXCJnbGFtIHJvY2tcIixcbiAgICAgIFwiZ2xhbSBtZXRhbFwiLFxuICAgICAgXCJoYXJkIHJvY2tcIixcbiAgICAgIFwicm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTAzLTA1VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFJIV1oxMTg3RkI0RUQ4QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdGlzaCBmb2xrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGJyaXRpc2ggZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTAzLTE5VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOS0xMi0wNVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTEtMjhUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTAxLTI4VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0xMS0yOFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDgtMTlUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTExLTI0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0xMS0wNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDItMDRUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTEyLTAyVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCcnVjZSBTcHJpbmdzdGVlblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI5MUM4UzExODdCOTkwOTAxXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiLFxuICAgICAgXCJyb290cyByb2NrXCIsXG4gICAgICBcImZvbGsgcm9ja1wiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcIm1lbGxvdyBnb2xkXCIsXG4gICAgICBcImNvdW50cnkgcm9ja1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBmb2xrXCIsXG4gICAgICBcInBlcm1hbmVudCB3YXZlXCIsXG4gICAgICBcImZvbGstcG9wXCIsXG4gICAgICBcInJvY2tcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTA3LTEzVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJGcmFuayBUdXJuZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVlZVU0MxMTg3RkI0QkRBQ1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaW5kaWUgZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTEwLTE0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wMy0xNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTItMDJUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTExVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0xMS0yNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDItMDhUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTE4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJKb25hdGhhbiBDb3VsdG9uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhTTkNOMTE4N0I5QjA2QTNcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImNvbWljXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTEtMDhUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTExLTEwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYWQgUmVsaWdpb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSNDZDQUQxMTg3RkI0RDg0QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcImhhcmRjb3JlIHB1bmtcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJwdW5rIGNocmlzdG1hc1wiLFxuICAgICAgXCJwb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA4LTI0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNy0xMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDItMDUtMTFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNhdCBFbXBpcmVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUU5MSDMxMTg3QjlBREMxRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYXVzdHJhbGlhbiBhbHRlcm5hdGl2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTAtMjZUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTEwLTI1VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCb21iIFRoZSBNdXNpYyBJbmR1c3RyeVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJHT0dPWjExODdCOUFFQUM2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwic2thXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMTJUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBSaW90IEJlZm9yZVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI0Rjg5NDExODdGQjU2NEYyXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJydmEgaW5kaWVcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMS0yMVQyMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiR2FzbGlnaHQgQW50aGVtXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJWTENKMTE4N0ZCNTBFNjFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTExLTE5VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wNi0yMlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ2hlYXAgR2lybHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUkhURVgxMjA4NkMxMTE3OVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBlbW9cIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wOC0wOVQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRmxvZ2dpbmcgTW9sbHlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUDZJSkIxMTg3QjlCMTRERVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiY2VsdGljIHJvY2tcIixcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcImJvdyBwb3BcIixcbiAgICAgIFwiY2VsdGljIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wOC0yNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSGVucnkgUm9sbGluc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI2UVBQVTExODdCOUFBNzI2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJoYXJkY29yZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIixcbiAgICAgIFwiY29taWNcIixcbiAgICAgIFwiZnVuayBtZXRhbFwiLFxuICAgICAgXCJwb3N0LWhhcmRjb3JlXCIsXG4gICAgICBcImZ1bmsgcm9ja1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBtZXRhbFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTAxLTE0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wOC0yMlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQmFieWJpcmRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWDNaMzExMTg3Qjk5NEI1QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdHBvcFwiLFxuICAgICAgXCJtYWRjaGVzdGVyXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDEtMzFUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTAzLTE4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgTWVuemluZ2Vyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCN0RKVjExODdGQjQyQjc5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiLFxuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTA5LTIxVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0wOC0wN1QxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTAtMDFUMTc6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkpveWNlIE1hbm9yXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUktZVktFMTJEMzMyQzI1ODZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiLFxuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwib3JnY29yZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTA5LTI2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMS0xMlQxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIEN1dCBVcHMgXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlNZSE9XMTI0NTRBNTFCNkVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImRlZXAgb3JnY29yZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTA4LTAxVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXUgXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhSSFdaMTE4N0ZCNEVEOEJcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRpc2ggZm9sa1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBicml0aXNoIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMS0yN1QxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTWFza2VkIEludHJ1ZGVyXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkdCVEhCMTM2NjU4RTk4QTVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwicHVuayBjaHJpc3RtYXNcIixcbiAgICAgIFwiZGVlcCBwb3dlci1wb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA1LTE0VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJSZWQgQ2l0eSBSYWRpb1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJZRFhMVjExRUI5QzgyNzc2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImRlZXAgcG93ZXItcG9wIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wNy0xNlQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQmFyZW5ha2VkIExhZGllc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJXN0swUDExODdCOUI1QjQ3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJuZW8gbWVsbG93XCIsXG4gICAgICBcInBvcCBjaHJpc3RtYXNcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0wM1QxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQm91bmNpbmcgU291bHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVVUxM0UxMTg3RkIzRUI0OFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIixcbiAgICAgIFwic2thIHB1bmtcIixcbiAgICAgIFwicG9wIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0wMy0xN1QxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGF1cmEgU3RldmVuc29uIGFuZCBUaGUgQ2Fuc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCWU1WSzEyMDg2QzE1OTU1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMi0xMFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTItMDlUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNodWNrIFJhZ2FuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlA4S0xJMTE4N0I5OUJFNkZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAzLTIxVDIwOjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wMy0yMlQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTmljayBIYXJwZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVkI5RTQxMTg3Qjk5NEMwN1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdGlzaCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDMtMTBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA0LTA0LTE2VDIwOjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNy0wNS0xN1QyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDUtMTJUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTExLTE3VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgU3RyZWV0c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJJSEU3TzExODdGQjQ3REVEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJ1ayBnYXJhZ2VcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMi0xOFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTG93XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJaMTlYMTE4N0I5QUJCMjRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNsb3cgY29yZVwiLFxuICAgICAgXCJtZWxhbmNob2xpYVwiLFxuICAgICAgXCJpbmRpZSBjaHJpc3RtYXNcIixcbiAgICAgIFwiZHJlYW0gcG9wXCIsXG4gICAgICBcImNoYW1iZXIgcG9wXCIsXG4gICAgICBcImxvLWZpXCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCIsXG4gICAgICBcImluZGllIHJvY2tcIixcbiAgICAgIFwiaW5kaWUgZm9sa1wiLFxuICAgICAgXCJwb3AgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMTdUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkRhdmUgTWF0dGhld3MgQmFuZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJRWEM3VjExODdGQjREQTlFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJqYW0gYmFuZFwiLFxuICAgICAgXCJuZW8gbWVsbG93XCIsXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcInBvcCBjaHJpc3RtYXNcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMS0xMVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIFF1ZWVyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJJRUtaQTExODdCOThGRUQ0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3dlci1wb3AgcHVua1wiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMy0wNlQxNTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGF1cmEgU3RldmVuc29uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUklORUhOMTFFQkNENzhGMjlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA0LTE3VDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJQYXJhZGlzZSBMb3N0XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkY5N1FUMTE4N0I5QjhCNDdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImRvb20gbWV0YWxcIixcbiAgICAgIFwiZ290aGljIG1ldGFsXCIsXG4gICAgICBcIm1ldGFsXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTAtMDFUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdXJhIFZlaXJzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhVQ1dWMTE4N0ZCM0U0RDdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImluZGllIGZvbGtcIixcbiAgICAgIFwiZm9say1wb3BcIixcbiAgICAgIFwiZnJlYWsgZm9sa1wiLFxuICAgICAgXCJjaGFtYmVyIHBvcFwiLFxuICAgICAgXCJzdG9tcCBhbmQgaG9sbGVyXCIsXG4gICAgICBcImFudGktZm9sa1wiLFxuICAgICAgXCJuZXcgd2VpcmQgYW1lcmljYVwiLFxuICAgICAgXCJzbG93IGNvcmVcIixcbiAgICAgIFwibGlsaXRoXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDQtMDMtMjdUMjE6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTAxLTMwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBYmlnYWlsIFdhc2hidXJuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJJUjE1MTE4N0ZCNTUyNERcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInByb2dyZXNzaXZlIGJsdWVncmFzc1wiLFxuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcImJsdWVncmFzc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTIxVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJQZWFybCBKYW1cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRlZZSkkxMTg3QjlCOEUxM1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZ3J1bmdlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwicm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAwLTA2LTAyVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCZW4gRm9sZHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSNzZOWTYxMTg3RkI0RjgyRlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicGlhbm8gcm9ja1wiLFxuICAgICAgXCJuZW8gbWVsbG93XCIsXG4gICAgICBcImluZGllIGNocmlzdG1hc1wiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwZXJtYW5lbnQgd2F2ZVwiLFxuICAgICAgXCJwb3AgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDEtMDktMTBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlNudWZmXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjNCNk9CMTE4N0ZCNDdDMTRcIixcbiAgICBcImdlbnJlc1wiOiBbXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAwLTA1LTExVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJDb3dib3kgSnVua2llc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJVNVpWRzExODdCOUE2RTk3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJyb290cyByb2NrXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGNvdW50cnlcIixcbiAgICAgIFwibWVsYW5jaG9saWFcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwibGlsaXRoXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwiZm9say1wb3BcIixcbiAgICAgIFwiZm9sayByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDQtMTAtMDhUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdXJhIENhbnRyZWxsXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkFQUkpJMTE4N0I5QUNFQkRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIGNvdW50cnlcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMi0xMi0wMlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMDZUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTAxLTI5VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJQZW9wbGUgVW5kZXIgVGhlIFN0YWlyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCWDUyOTExODdCOTk3QjNGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJ1bmRlcmdyb3VuZCBoaXAgaG9wXCIsXG4gICAgICBcInR1cm50YWJsaXNtXCIsXG4gICAgICBcImhpcCBob3BcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgaGlwIGhvcFwiLFxuICAgICAgXCJhY2lkIGphenpcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNi0xMC0xMFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUmF0ZG9nXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkZTQVA2MTE4N0ZCM0JBREFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImphbSBiYW5kXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDMtMDgtMjZUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkRhbmFuYW5hbmF5a3JveWRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWlFCM1gxMTg3RkI0N0UxQlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibWF0aCBwb3BcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNi0wM1QxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTG91ZG9uIFdhaW53cmlnaHRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVjFKVkQxMTg3QjlBRDE5NVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBmb2xrXCIsXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcImZvbGsgcm9ja1wiLFxuICAgICAgXCJyb290cyByb2NrXCIsXG4gICAgICBcImZvbGstcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDMtMTAtMTRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZXJpb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWk45OFYxMTg3Qjk5MEQxRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZ290aGljIG1ldGFsXCIsXG4gICAgICBcInByb2dyZXNzaXZlIG1ldGFsXCIsXG4gICAgICBcInN5bXBob25pYyBtZXRhbFwiLFxuICAgICAgXCJzd2VkaXNoIG1ldGFsXCIsXG4gICAgICBcImdvdGhpYyBzeW1waG9uaWMgbWV0YWxcIixcbiAgICAgIFwicG93ZXIgbWV0YWxcIixcbiAgICAgIFwiZm9sayBtZXRhbFwiLFxuICAgICAgXCJtZXRhbFwiLFxuICAgICAgXCJtZWxvZGljIGRlYXRoIG1ldGFsXCIsXG4gICAgICBcInZpa2luZyBtZXRhbFwiLFxuICAgICAgXCJzeW1waG9uaWMgYmxhY2sgbWV0YWxcIixcbiAgICAgIFwibmVvIGNsYXNzaWNhbCBtZXRhbFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk4LTA5LTIzVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJTdHJpbmcgQ2hlZXNlIEluY2lkZW50XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUldURkdZMTE4N0I5OTJDQkFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImphbSBiYW5kXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDQtMDMtMzFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJlbiBGb2xkcyBGaXZlXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJBTjhTMTE4N0ZCNEQyMkZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBpYW5vIHJvY2tcIixcbiAgICAgIFwicG93ZXIgcG9wXCIsXG4gICAgICBcInBlcm1hbmVudCB3YXZlXCIsXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwibmVvIG1lbGxvd1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk5LTEyLTIwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5Ny0wMy0wMlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiR29tZXpcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWVc0QlgxMTg3Qjk4RERFOFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdHBvcFwiLFxuICAgICAgXCJtYWRjaGVzdGVyXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwicm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk5LTEwLTE0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJGZWVkZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRkcySEYxMTg3RkIzRDRFQ1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdHBvcFwiLFxuICAgICAgXCJ3ZWxzaCByb2NrXCIsXG4gICAgICBcInJvY2tcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwibWFkY2hlc3RlclwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTktMTAtMDJUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkV2ZW4gSW4gQmxhY2tvdXRzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkNQODRSMTE4N0I5OTE3ODlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcImRlZXAgcG93ZXItcG9wIHB1bmtcIixcbiAgICAgIFwib3JnY29yZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTAyLTA2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNS0wMi0wNFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMTEtMTFUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBMaWdodG5pbmcgU2VlZHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVEFBQ0ExMTg3QjlCNzNERVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibWFkY2hlc3RlclwiLFxuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcIm5ldyB3YXZlXCIsXG4gICAgICBcIm5ldyByb21hbnRpY1wiLFxuICAgICAgXCJuZXcgd2F2ZSBwb3BcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5OS0xMS0yOFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUHJlc2lkZW50cyBvZiB0aGUgVVNBXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhERk4wMTE4N0I5QUU4MEVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwicG9zdC1ncnVuZ2VcIixcbiAgICAgIFwiZ3J1bmdlXCIsXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcImZ1bmsgbWV0YWxcIixcbiAgICAgIFwicG93ZXIgcG9wXCIsXG4gICAgICBcImNvbWljXCIsXG4gICAgICBcInNrYSBwdW5rXCIsXG4gICAgICBcImZ1bmsgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTA4LTE2VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJQZXRlciBSb3dhblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJLNjBSTDExODdGQjNBMTMwXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJibHVlZ3Jhc3NcIixcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDMtMTEtMjZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkFnYWluc3QgTWUgXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkRVRlMwMTE4N0ZCNENGNUVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTEtMTVUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkthY2V5IE11c2dyYXZlcyBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFST0pOS0UxMUVCOUM4MjUzRlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiY291bnRyeSBkYXduXCIsXG4gICAgICBcImRlZXAgY29udGVtcG9yYXJ5IGNvdW50cnlcIixcbiAgICAgIFwibW9kZXJuIGNvdW50cnkgcm9ja1wiLFxuICAgICAgXCJjb250ZW1wb3JhcnkgY291bnRyeVwiLFxuICAgICAgXCJ0ZXhhcyBjb3VudHJ5XCIsXG4gICAgICBcImNvdW50cnkgcm9hZFwiLFxuICAgICAgXCJvdXRsYXcgY291bnRyeVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA3LTA4VDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJKdXJhc3NpYyA1XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkVHQzFaMTE4N0I5OTVBOTBcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInVuZGVyZ3JvdW5kIGhpcCBob3BcIixcbiAgICAgIFwiaGlwIGhvcFwiLFxuICAgICAgXCJ0dXJudGFibGlzbVwiLFxuICAgICAgXCJyYXBcIixcbiAgICAgIFwib2xkIHNjaG9vbCBoaXAgaG9wXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGhpcCBob3BcIixcbiAgICAgIFwicmFwIHJvY2tcIixcbiAgICAgIFwiZWFzdCBjb2FzdCBoaXAgaG9wXCIsXG4gICAgICBcImhhcmRjb3JlIGhpcCBob3BcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wNi0yMFQxODowMDoyMi4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU2FtYW1pZG9uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlRKNkFFMTE4N0I5OENDQzVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInN0b21wIGFuZCBob2xsZXJcIixcbiAgICAgIFwiaW5kaWUgZm9sa1wiLFxuICAgICAgXCJmcmVhayBmb2xrXCIsXG4gICAgICBcInNsb3cgY29yZVwiLFxuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcIm5ldyB3ZWlyZCBhbWVyaWNhXCIsXG4gICAgICBcImNoYW1iZXIgcG9wXCIsXG4gICAgICBcImZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0xMS0xMFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVWdseSBEdWNrbGluZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCWVZJSDExODdCOUI5RjY0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJ1bmRlcmdyb3VuZCBoaXAgaG9wXCIsXG4gICAgICBcInR1cm50YWJsaXNtXCIsXG4gICAgICBcImhpcCBob3BcIixcbiAgICAgIFwib2xkIHNjaG9vbCBoaXAgaG9wXCIsXG4gICAgICBcImFjaWQgamF6elwiLFxuICAgICAgXCJyYXBcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgaGlwIGhvcFwiLFxuICAgICAgXCJyYXAgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA2LTA1LTAzVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgRGVhZGx5IEdlbnRsZW1lblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYVEZBRTEyMkNDM0IxMkU2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwcm9ncmVzc2l2ZSBibHVlZ3Jhc3NcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMy0yMVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGVzcyBUaGFuIEpha2VcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRzhEWE8xMTg3QjlBRjc0M1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2thIHB1bmtcIixcbiAgICAgIFwic2thXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJwb3AgcHVua1wiLFxuICAgICAgXCJwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDEtMDQtMTBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkdvbmdcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQ1pENVkxMTg3QjlBRERGNVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiY2FudGVyYnVyeSBzY2VuZVwiLFxuICAgICAgXCJzcGFjZSByb2NrXCIsXG4gICAgICBcInpvbG9cIixcbiAgICAgIFwia3JhdXQgcm9ja1wiLFxuICAgICAgXCJhcnQgcm9ja1wiLFxuICAgICAgXCJleHBlcmltZW50YWxcIixcbiAgICAgIFwic3ltcGhvbmljIHJvY2tcIixcbiAgICAgIFwicHJvZ3Jlc3NpdmUgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAwLTExLTI2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgVmFuZGFsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJXMEs1RjExODdCOUFGQ0MwXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIixcbiAgICAgIFwicHVuayBjaHJpc3RtYXNcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJoZWF2eSBjaHJpc3RtYXNcIixcbiAgICAgIFwic2thIHB1bmtcIixcbiAgICAgIFwiaGFyZGNvcmUgcHVua1wiLFxuICAgICAgXCJza2FcIixcbiAgICAgIFwicG9wIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMC0xMC0xNlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTXkgTGlmZSBTdG9yeVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFTkk4RTExODdGQjM2N0VCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcImNoYW1iZXIgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTctMTItMDFUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkplZmYgUm9zZW5zdG9ja1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJMTUFDQzExODdGQjQ0M0Y1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDMtMjBUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9XG59Il19

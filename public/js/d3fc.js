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
  var svgAttrs = {
    'width': 500,
    'height': 250,
    'padding': 30
  };

  var root = d3.select('.content').html('');

  gigsByMonth(root.append('svg'), svgAttrs);
  popularArtists(root.append('svg'), svgAttrs);
}

function popularArtists(selection, config) {
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
  })).rangePoints([0, config.width - config.padding], 1);

  var yScale = d3.scale.linear().domain([0, d3.max(gigs, function (d) {
    return d.count;
  })]).range([config.height - config.padding, config.padding]);

  var yAxis = fc.svg.axis().scale(yScale).tickValues([2, 4, 6, 8, 10]).orient('right');

  var series = fc.series.bar().xValue(function (d) {
    return d.artist;
  }).yValue(function (d) {
    return d.count;
  }).xScale(xScale).yScale(yScale);

  selection.attr({
    width: config.width,
    height: config.height
  });

  selection.datum(gigs).call(series);

  selection.append('g').call(yAxis).attr('transform', 'translate(' + (config.width - config.padding) + ', 0)');
}

function gigsByMonth(selection, config) {
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

  selection.attr({
    width: config.width,
    height: config.height
  });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZDNmYy5qcyIsInNyYy9qcy9naWctZGF0YS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsT0FBTyxDQUFQLEdBQVcsT0FBTyxNQUFQLEdBQWdCLFFBQVEsUUFBUixDQUEzQjtBQUNBLFFBQVEsV0FBUjs7QUFFQSxJQUFNLEtBQUssUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNLEtBQUssUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUEsSUFBTSxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEtBQXZFLEVBQThFLEtBQTlFLENBQWY7QUFDQSxJQUFNLGVBQWUsUUFBUSxpQkFBUixDQUFyQjs7QUFFQSxFQUFFLFVBQUYsRUFBYyxLQUFkLENBQW9CLEtBQXBCOztBQUVBLFNBQVMsS0FBVCxHQUFpQjtBQUNmLE1BQU0sV0FBVztBQUNmLGFBQVMsR0FETTtBQUVmLGNBQVUsR0FGSztBQUdmLGVBQVc7QUFISSxHQUFqQjs7QUFNQSxNQUFNLE9BQU8sR0FBRyxNQUFILENBQVUsVUFBVixFQUFzQixJQUF0QixDQUEyQixFQUEzQixDQUFiOztBQUVBLGNBQVksS0FBSyxNQUFMLENBQVksS0FBWixDQUFaLEVBQWdDLFFBQWhDO0FBQ0EsaUJBQWUsS0FBSyxNQUFMLENBQVksS0FBWixDQUFmLEVBQW1DLFFBQW5DO0FBQ0Q7O0FBRUQsU0FBUyxjQUFULENBQXdCLFNBQXhCLEVBQW1DLE1BQW5DLEVBQTJDO0FBQ3pDLE1BQU0sT0FBTyxFQUFFLEtBQUYsQ0FBUSxZQUFSLEVBQ1UsU0FEVixDQUNvQixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDbkIsV0FBTztBQUNMLGdCQUFVLENBREw7QUFFTCxlQUFTLEVBQUUsSUFBRixDQUFPO0FBRlgsS0FBUDtBQUlELEdBTlYsRUFPVSxNQVBWLEdBUVUsTUFSVixDQVFpQixVQUFDLE1BQUQ7QUFBQSxXQUFZLE9BQU8sS0FBUCxHQUFlLENBQTNCO0FBQUEsR0FSakIsRUFTVSxLQVRWLEVBQWI7O0FBV0EsTUFBTSxTQUFTLEdBQUcsS0FBSCxDQUFTLE9BQVQsR0FDWixNQURZLENBQ0wsRUFBRSxHQUFGLENBQU0sSUFBTixFQUFZLFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxNQUFUO0FBQUEsR0FBWixDQURLLEVBRVosV0FGWSxDQUVBLENBQUMsQ0FBRCxFQUFJLE9BQU8sS0FBUCxHQUFlLE9BQU8sT0FBMUIsQ0FGQSxFQUVvQyxDQUZwQyxDQUFmOztBQUlBLE1BQU0sU0FBUyxHQUFHLEtBQUgsQ0FBUyxNQUFULEdBQ1osTUFEWSxDQUNMLENBQUMsQ0FBRCxFQUFJLEdBQUcsR0FBSCxDQUFPLElBQVAsRUFBYSxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsS0FBVDtBQUFBLEdBQWIsQ0FBSixDQURLLEVBRVosS0FGWSxDQUVOLENBQUMsT0FBTyxNQUFQLEdBQWdCLE9BQU8sT0FBeEIsRUFBaUMsT0FBTyxPQUF4QyxDQUZNLENBQWY7O0FBSUEsTUFBTSxRQUFRLEdBQUcsR0FBSCxDQUFPLElBQVAsR0FDWCxLQURXLENBQ0wsTUFESyxFQUVYLFVBRlcsQ0FFQSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxFQUFULENBRkEsRUFHWCxNQUhXLENBR0osT0FISSxDQUFkOztBQUtBLE1BQU0sU0FBUyxHQUFHLE1BQUgsQ0FBVSxHQUFWLEdBQ1osTUFEWSxDQUNMLFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxNQUFUO0FBQUEsR0FESyxFQUVaLE1BRlksQ0FFTCxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsS0FBVDtBQUFBLEdBRkssRUFHWixNQUhZLENBR0wsTUFISyxFQUlaLE1BSlksQ0FJTCxNQUpLLENBQWY7O0FBTUEsWUFBVSxJQUFWLENBQWU7QUFDYixXQUFPLE9BQU8sS0FERDtBQUViLFlBQVEsT0FBTztBQUZGLEdBQWY7O0FBS0EsWUFDRyxLQURILENBQ1MsSUFEVCxFQUVHLElBRkgsQ0FFUSxNQUZSOztBQUlBLFlBQVUsTUFBVixDQUFpQixHQUFqQixFQUFzQixJQUF0QixDQUEyQixLQUEzQixFQUNHLElBREgsQ0FDUSxXQURSLEVBQ3FCLGdCQUFnQixPQUFPLEtBQVAsR0FBZSxPQUFPLE9BQXRDLElBQWlELE1BRHRFO0FBRUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLFNBQXJCLEVBQWdDLE1BQWhDLEVBQXdDO0FBQ3RDLE1BQU0sY0FBYyxFQUFFLEtBQUYsQ0FBUSxZQUFSLEVBQ0csR0FESCxDQUNPLFVBQUMsTUFBRDtBQUFBLFdBQVksT0FBTyxJQUFuQjtBQUFBLEdBRFAsRUFFRyxXQUZILEdBR0csR0FISCxDQUdPLFVBQUMsR0FBRCxFQUFTO0FBQ1osUUFBTSxVQUFVLElBQUksSUFBSixDQUFTLElBQUksSUFBYixDQUFoQjtBQUNBLFdBQU87QUFDTCxlQUFTLE9BQU8sUUFBUSxRQUFSLEVBQVA7QUFESixLQUFQO0FBR0QsR0FSSCxFQVNHLE9BVEgsQ0FTVyxFQUFFLFFBQUYsQ0FBVyxPQUFYLENBVFgsRUFVRyxTQVZILENBVWEsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ25CLFdBQU87QUFDTCxlQUFTLENBREo7QUFFTCxlQUFTO0FBRkosS0FBUDtBQUlELEdBZkgsRUFnQkcsTUFoQkgsR0FpQkcsS0FqQkgsRUFBcEI7O0FBb0JBLE1BQUksVUFBVSxHQUFHLElBQUgsQ0FBUSxNQUFSLEdBQ1gsT0FEVyxDQUNILENBREcsRUFFWCxHQUZXLENBRVAsQ0FBQyxDQUFELEVBQUksR0FBSixDQUZPLEVBR1gsTUFIVyxDQUdKLENBQUMsT0FBRCxDQUhJLENBQWQ7O0FBS0EsTUFBSSxRQUFRLEdBQUcsS0FBSCxDQUFTLFNBQVQsQ0FBbUIsR0FBRyxLQUFILENBQVMsT0FBVCxFQUFuQixFQUF1QyxHQUFHLEtBQUgsQ0FBUyxNQUFULEVBQXZDLEVBQ1QsVUFEUyxDQUNFLGVBREYsRUFFVCxPQUZTLENBRUQsTUFGQyxFQUdULE9BSFMsQ0FHRCxRQUFRLFdBQVIsQ0FIQyxFQUlULE1BSlMsQ0FJRixDQUpFLEVBS1QsS0FMUyxFQUFaOztBQU9BLE1BQUksU0FBUyxHQUFHLE1BQUgsQ0FBVSxHQUFWLEdBQ1YsTUFEVSxDQUNILFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxLQUFUO0FBQUEsR0FERyxFQUVWLE1BRlUsQ0FFSCxVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsS0FBVDtBQUFBLEdBRkcsQ0FBYjs7QUFJQSxRQUFNLFFBQU4sQ0FBZSxNQUFmOztBQUVBLFlBQVUsSUFBVixDQUFlO0FBQ2IsV0FBTyxPQUFPLEtBREQ7QUFFYixZQUFRLE9BQU87QUFGRixHQUFmOztBQUtBLFlBQ0csS0FESCxDQUNTLFdBRFQsRUFFRyxJQUZILENBRVEsS0FGUjtBQUtEOzs7QUN2SEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsICQgKi9cbndpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbmNvbnN0IGQzID0gcmVxdWlyZSgnZDMnKTtcbmNvbnN0IGZjID0gcmVxdWlyZSgnZDNmYycpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5jb25zdCBnaWdzQnlBcnRpc3QgPSByZXF1aXJlKCcuL2dpZy1kYXRhLmpzb24nKTtcblxuJCgnLmNvbnRlbnQnKS5yZWFkeShzZXR1cCk7XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICBjb25zdCBzdmdBdHRycyA9IHtcbiAgICAnd2lkdGgnOiA1MDAsXG4gICAgJ2hlaWdodCc6IDI1MCxcbiAgICAncGFkZGluZyc6IDMwXG4gIH07XG5cbiAgY29uc3Qgcm9vdCA9IGQzLnNlbGVjdCgnLmNvbnRlbnQnKS5odG1sKCcnKVxuXG4gIGdpZ3NCeU1vbnRoKHJvb3QuYXBwZW5kKCdzdmcnKSwgc3ZnQXR0cnMpO1xuICBwb3B1bGFyQXJ0aXN0cyhyb290LmFwcGVuZCgnc3ZnJyksIHN2Z0F0dHJzKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhckFydGlzdHMoc2VsZWN0aW9uLCBjb25maWcpIHtcbiAgY29uc3QgZ2lncyA9IF8uY2hhaW4oZ2lnc0J5QXJ0aXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFZhbHVlcygodiwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcnRpc3QnOiBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudCc6IHYuZ2lncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGFydGlzdCkgPT4gYXJ0aXN0LmNvdW50ID4gMilcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuXG4gIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgIC5kb21haW4oXy5tYXAoZ2lncywgKGQpID0+IGQuYXJ0aXN0KSlcbiAgICAucmFuZ2VQb2ludHMoWzAsIGNvbmZpZy53aWR0aCAtIGNvbmZpZy5wYWRkaW5nXSwgMSk7XG5cbiAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAuZG9tYWluKFswLCBkMy5tYXgoZ2lncywgKGQpID0+IGQuY291bnQpXSlcbiAgICAucmFuZ2UoW2NvbmZpZy5oZWlnaHQgLSBjb25maWcucGFkZGluZywgY29uZmlnLnBhZGRpbmddKTtcblxuICBjb25zdCB5QXhpcyA9IGZjLnN2Zy5heGlzKClcbiAgICAuc2NhbGUoeVNjYWxlKVxuICAgIC50aWNrVmFsdWVzKFsyLDQsNiw4LDEwXSlcbiAgICAub3JpZW50KCdyaWdodCcpXG5cbiAgY29uc3Qgc2VyaWVzID0gZmMuc2VyaWVzLmJhcigpXG4gICAgLnhWYWx1ZSgoZCkgPT4gZC5hcnRpc3QpXG4gICAgLnlWYWx1ZSgoZCkgPT4gZC5jb3VudClcbiAgICAueFNjYWxlKHhTY2FsZSlcbiAgICAueVNjYWxlKHlTY2FsZSk7XG5cbiAgc2VsZWN0aW9uLmF0dHIoe1xuICAgIHdpZHRoOiBjb25maWcud2lkdGgsXG4gICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0XG4gIH0pO1xuXG4gIHNlbGVjdGlvblxuICAgIC5kYXR1bShnaWdzKVxuICAgIC5jYWxsKHNlcmllcyk7XG5cbiAgc2VsZWN0aW9uLmFwcGVuZCgnZycpLmNhbGwoeUF4aXMpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIChjb25maWcud2lkdGggLSBjb25maWcucGFkZGluZykgKyAnLCAwKScpXG59XG5cbmZ1bmN0aW9uIGdpZ3NCeU1vbnRoKHNlbGVjdGlvbiwgY29uZmlnKSB7XG4gIGNvbnN0IGdpZ3NCeU1vbnRoID0gXy5jaGFpbihnaWdzQnlBcnRpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChhcnRpc3QpID0+IGFydGlzdC5naWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZsYXR0ZW5EZWVwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGdpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnaWdEYXRlID0gbmV3IERhdGUoZ2lnLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb250aCc6IG1vbnRoc1tnaWdEYXRlLmdldE1vbnRoKCldXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50QnkoXy5wcm9wZXJ0eSgnbW9udGgnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBWYWx1ZXMoKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9udGgnOiBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudCc6IHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuXG5cbiAgdmFyIHlFeHRlbnQgPSBmYy51dGlsLmV4dGVudCgpXG4gICAgLmluY2x1ZGUoMClcbiAgICAucGFkKFswLCAwLjVdKVxuICAgIC5maWVsZHMoWydjb3VudCddKTtcblxuICB2YXIgY2hhcnQgPSBmYy5jaGFydC5jYXJ0ZXNpYW4oZDMuc2NhbGUub3JkaW5hbCgpLCBkMy5zY2FsZS5saW5lYXIoKSlcbiAgICAuY2hhcnRMYWJlbCgnR2lncyBCeSBNb250aCcpXG4gICAgLnhEb21haW4obW9udGhzKVxuICAgIC55RG9tYWluKHlFeHRlbnQoZ2lnc0J5TW9udGgpKVxuICAgIC55VGlja3MoNSlcbiAgICAueU5pY2UoKTtcblxuICB2YXIgc2VyaWVzID0gZmMuc2VyaWVzLmJhcigpXG4gICAgLnhWYWx1ZSgoZCkgPT4gZC5tb250aClcbiAgICAueVZhbHVlKChkKSA9PiBkLmNvdW50KTtcblxuICBjaGFydC5wbG90QXJlYShzZXJpZXMpO1xuXG4gIHNlbGVjdGlvbi5hdHRyKHtcbiAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgIGhlaWdodDogY29uZmlnLmhlaWdodFxuICB9KTtcblxuICBzZWxlY3Rpb25cbiAgICAuZGF0dW0oZ2lnc0J5TW9udGgpXG4gICAgLmNhbGwoY2hhcnQpO1xuXG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJNZXVyc2F1bHRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUlhHR1MxMTg3RkI1QzIzRVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2NvdHRpc2ggcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAzLTA5VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0xMi0wNVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDUtMjBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkdvZ29sIEJvcmRlbGxvXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjBZTUU2MTE4N0ZCM0I1NDRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAzLTE0VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBbmRyZXcgSmFja3NvbiBKaWhhZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGVVpONjExODdGQjRDQkE5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwiYW50aS1mb2xrXCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMjdUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTEwLTAzVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMC0wNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDYtMTRUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNha2VcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUVJRUkExMjEzMUI0QjVBOFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJmdW5rIG1ldGFsXCIsXG4gICAgICBcImZ1bmsgcm9ja1wiLFxuICAgICAgXCJnYXJhZ2Ugcm9ja1wiLFxuICAgICAgXCJyYXAgcm9ja1wiLFxuICAgICAgXCJuZW8gbWVsbG93XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTEtMTZUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkZyYW56IE5pY29sYXlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSUxZS0QxMTg3QjlCNjc2MFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTItMDZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTExLTIwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMS0xNFQyMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU3BhcmtzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjA0MEpaMTE4N0ZCMzk5QTlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInpvbG9cIixcbiAgICAgIFwiZ2xhbSByb2NrXCIsXG4gICAgICBcImFydCByb2NrXCIsXG4gICAgICBcIm5ldyB3YXZlXCIsXG4gICAgICBcImRhbmNlIHJvY2tcIixcbiAgICAgIFwicHJvdG9wdW5rXCIsXG4gICAgICBcIm5ldyByb21hbnRpY1wiLFxuICAgICAgXCJleHBlcmltZW50YWxcIixcbiAgICAgIFwibmV3IHdhdmUgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMTAtMjBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkx1Y2Vyb1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCVzFKNjExODdCOUI4QjU0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwicm9vdHMgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTI0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wMi0wNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ29saW4gSGF5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjlRT05NMTE4N0I5QTBBOENcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwiYWNvdXN0aWMgcG9wXCIsXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcInBvcCByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMDUtMDNUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTExLTEzVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEYXZlIEhhdXNlIFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJOWVZPUjEyMDg2QzEyMUNCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0xMS0xNVQyMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVHJhbXBsZWQgQnkgVHVydGxlc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJPTk5YNTExODdCOThERDQ3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwcm9ncmVzc2l2ZSBibHVlZ3Jhc3NcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJibHVlZ3Jhc3NcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wMS0yNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTEtMThUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxpbmRpIE9ydGVnYVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJWVlNQUDExRUJDRDc4QkEzXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJlY3RvZm9sa1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCIsXG4gICAgICBcImNvdW50cnkgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDEtMTZUMjA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIklyb24gQ2hpY1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJaQkZJVDEyMDg2QzE2QjBEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA1LTA2VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0xNFQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiT2xkIENyb3cgTWVkaWNpbmUgU2hvd1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJZTzlIMTExODdGQjU3OTQ1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCIsXG4gICAgICBcIm9sZC10aW1lXCIsXG4gICAgICBcImJsdWVncmFzc1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMC0yMlQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiV2hlYXR1c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwN0tTQzExODdCOUJBNjA2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJwb3AgcHVua1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTAtMTlUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTEwLTIzVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0xMC0xNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDYtMTFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTA1LTI4VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMS0xMS0xOVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGltIEJhcnJ5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUk4yMVhLMTE4N0I5OTVDQzFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAyLTI3VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0wNi0yOFQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGFpYmFjaFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwT1hTNTExODdGQjRGODVBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmR1c3RyaWFsXCIsXG4gICAgICBcImluZHVzdHJpYWwgcm9ja1wiLFxuICAgICAgXCJlYm1cIixcbiAgICAgIFwiZWxlY3Ryby1pbmR1c3RyaWFsXCIsXG4gICAgICBcIm1hcnRpYWwgaW5kdXN0cmlhbFwiLFxuICAgICAgXCJleHBlcmltZW50YWxcIixcbiAgICAgIFwiaW5kdXN0cmlhbCBtZXRhbFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAzLTMxVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMi0xNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiWW8gTGEgVGVuZ29cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVUc0OFMxMTg3QjlCQTE0MlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibG8tZmlcIixcbiAgICAgIFwiaW5kaWUgcm9ja1wiLFxuICAgICAgXCJub2lzZSBwb3BcIixcbiAgICAgIFwic2xvdyBjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwiZHJlYW0gcG9wXCIsXG4gICAgICBcIm5lby1wc3ljaGVkZWxpY1wiLFxuICAgICAgXCJzcGFjZSByb2NrXCIsXG4gICAgICBcIm51IGdhemVcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIixcbiAgICAgIFwiaW5kaWUgcG9wXCIsXG4gICAgICBcImV4cGVyaW1lbnRhbCByb2NrXCIsXG4gICAgICBcImluZGllIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0xNlQxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTEtMDZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTAzLTIyVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNi0wNVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiV2lsaGVsbSBTY3JlYW1cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSVJDS0QxM0I3MUNFNjlBM1wiLFxuICAgIFwiZ2VucmVzXCI6IFtdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDgtMTlUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRlZW5hZ2UgQm90dGxlcm9ja2V0XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkU1TFQ5MTE4N0I5QjA0REVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcIm1lbG9kaWMgaGFyZGNvcmVcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wOC0yMVQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU3RldmUgRWFybGVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUlg3WjAxMTg3QjlBQzQ0OVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIixcbiAgICAgIFwidGV4YXMgY291bnRyeVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb290cyByb2NrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0yN1QxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSGF5ZXMgQ2FybGxcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVE1aWVcxMTg3QjlBN0VDQlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIixcbiAgICAgIFwidGV4YXMgY291bnRyeVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiLFxuICAgICAgXCJjb3VudHJ5IGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA5LTA2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaXR1cyBBbmRyb25pY3VzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJGWTdBMTE5Qjg2Njk4MjdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm5vaXNlIHBvcFwiLFxuICAgICAgXCJsby1maVwiLFxuICAgICAgXCJub2lzZSByb2NrXCIsXG4gICAgICBcImluZGllIHJvY2tcIixcbiAgICAgIFwibnUgZ2F6ZVwiLFxuICAgICAgXCJuZW8tcHN5Y2hlZGVsaWNcIixcbiAgICAgIFwiaW5kaWUgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTEtMTNUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIktyaXMgRHJldmVyXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjRTRU9WMTE4N0ZCNTQ3NkZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRpc2ggZm9sa1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBicml0aXNoIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wNS0xNFQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTXVuY2llIEdpcmxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkRETVJSMTM4QkVDMTg4RjhcIixcbiAgICBcImdlbnJlc1wiOiBbXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTAzLTMwVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEcml2ZS1CeSBUcnVja2Vyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJPTUNFVjExODdCOUIzRjU4XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwicm9vdHMgcm9ja1wiLFxuICAgICAgXCJjb3VudHJ5IHJvY2tcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCIsXG4gICAgICBcInNvdXRoZXJuIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wOC0wNlQxODowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDUtMTFUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTEyLTAyVDIxOjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0wOVQxODowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMTBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRvbSBXYWl0c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFUkxQRzExODdGQjNCQjM5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTA3LTI2VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBcnJvZ2FudCBXb3Jtc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJSOTZLMDExODdCOThENTIwXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJjb21pY1wiLFxuICAgICAgXCJnZWVrIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNi0wNS0yNFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ2xvcm94IEdpcmxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjE0QkpRMTE4N0I5QUNDMkVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImdhcmFnZSBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMDYtMjlUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRvbSBQYXh0b25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSMkpTTzMxMTg3RkI1NDA1RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidHJhZGl0aW9uYWwgZm9sa1wiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCIsXG4gICAgICBcImZvbGsgcm9ja1wiLFxuICAgICAgXCJicml0aXNoIGZvbGtcIixcbiAgICAgIFwic2luZ2VyLXNvbmd3cml0ZXJcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wMS0yMVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDItMTdUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTAyLTI0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJIb2xkIFN0ZWFkeVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFRkZRRjExODdGQjNGODQ1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmRpZSByb2NrXCIsXG4gICAgICBcImxvLWZpXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDItMjVUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIktpbXlhIERhd3NvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJOM1BNSDExODdGQjNDOEFBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbnRpLWZvbGtcIixcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcImluZGllIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wNS0xM1QxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSG90IExlZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJEUTc3UzExQzhBNDE1Q0I0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzbGVhemUgcm9ja1wiLFxuICAgICAgXCJkZWVwIG1lbG9kaWMgaGFyZCByb2NrXCIsXG4gICAgICBcImdsYW0gcm9ja1wiLFxuICAgICAgXCJnbGFtIG1ldGFsXCIsXG4gICAgICBcImhhcmQgcm9ja1wiLFxuICAgICAgXCJyb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDMtMDVUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYUkhXWjExODdGQjRFRDhCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0aXNoIGZvbGtcIixcbiAgICAgIFwidHJhZGl0aW9uYWwgYnJpdGlzaCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDMtMTlUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTEyLTA1VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMS0yOFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDEtMjhUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTExLTI4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wOC0xOVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMjRUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTA2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMi0wNFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTItMDJUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJydWNlIFNwcmluZ3N0ZWVuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjkxQzhTMTE4N0I5OTA5MDFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwiZm9sayByb2NrXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwibWVsbG93IGdvbGRcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwiZm9say1wb3BcIixcbiAgICAgIFwicm9ja1wiLFxuICAgICAgXCJwb3AgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDctMTNUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkZyYW5rIFR1cm5lclwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJWVlVTQzExODdGQjRCREFDXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmRpZSBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTAtMTRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTAzLTE2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMi0wMlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMTFUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTExLTI1VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wMi0wOFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMTEtMThUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkpvbmF0aGFuIENvdWx0b25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFNOQ04xMTg3QjlCMDZBM1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiY29taWNcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOS0xMS0wOFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTEtMTBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJhZCBSZWxpZ2lvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI0NkNBRDExODdGQjREODRCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwdW5rXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwiaGFyZGNvcmUgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcInB1bmsgY2hyaXN0bWFzXCIsXG4gICAgICBcInBvcCBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDgtMjRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA3LTExVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMi0wNS0xMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ2F0IEVtcGlyZVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJRTkxIMzExODdCOUFEQzFEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhdXN0cmFsaWFuIGFsdGVybmF0aXZlIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMC0yNlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTAtMjVUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJvbWIgVGhlIE11c2ljIEluZHVzdHJ5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkdPR09aMTE4N0I5QUVBQzZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNrYSBwdW5rXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJza2FcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMS0xMlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIFJpb3QgQmVmb3JlXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjRGODk0MTE4N0ZCNTY0RjJcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInJ2YSBpbmRpZVwiLFxuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTExLTIxVDIwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJHYXNsaWdodCBBbnRoZW1cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQlZMQ0oxMTg3RkI1MEU2MVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMTlUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA2LTIyVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJDaGVhcCBHaXJsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJSSFRFWDEyMDg2QzExMTc5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA4LTA5VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJGbG9nZ2luZyBNb2xseVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJQNklKQjExODdCOUIxNERFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJjZWx0aWMgcm9ja1wiLFxuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwiYm93IHBvcFwiLFxuICAgICAgXCJjZWx0aWMgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA4LTI0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJIZW5yeSBSb2xsaW5zXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjZRUFBVMTE4N0I5QUE3MjZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImhhcmRjb3JlIHB1bmtcIixcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJjb21pY1wiLFxuICAgICAgXCJmdW5rIG1ldGFsXCIsXG4gICAgICBcInBvc3QtaGFyZGNvcmVcIixcbiAgICAgIFwiZnVuayByb2NrXCIsXG4gICAgICBcImFsdGVybmF0aXZlIG1ldGFsXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDEtMTRUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA4LTIyVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYWJ5YmlyZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYM1ozMTExODdCOTk0QjVCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcIm1hZGNoZXN0ZXJcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMS0zMVQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDMtMThUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBNZW56aW5nZXJzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkI3REpWMTE4N0ZCNDJCNzlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDktMjFUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTA4LTA3VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMC0wMVQxNzozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSm95Y2UgTWFub3JcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSS1lWS0UxMkQzMzJDMjU4NlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJvcmdjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDktMjZUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTEyVDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgQ3V0IFVwcyBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSU1lIT1cxMjQ1NEE1MUI2RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZGVlcCBvcmdjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMDgtMDFUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdSBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFJIV1oxMTg3RkI0RUQ4QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdGlzaCBmb2xrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGJyaXRpc2ggZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTI3VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJNYXNrZWQgSW50cnVkZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSR0JUSEIxMzY2NThFOThBNVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicG93ZXItcG9wIHB1bmtcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJwdW5rIGNocmlzdG1hc1wiLFxuICAgICAgXCJkZWVwIHBvd2VyLXBvcCBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDUtMTRUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlJlZCBDaXR5IFJhZGlvXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUllEWExWMTFFQjlDODI3NzZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiZGVlcCBwb3dlci1wb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA3LTE2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYXJlbmFrZWQgTGFkaWVzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlc3SzBQMTE4N0I5QjVCNDdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCIsXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTEwLTAzVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCb3VuY2luZyBTb3Vsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJVVTEzRTExODdGQjNFQjQ4XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJwb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTAzLTE3VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXVyYSBTdGV2ZW5zb24gYW5kIFRoZSBDYW5zXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJZTVZLMTIwODZDMTU5NTVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTEyLTEwVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMi0wOVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ2h1Y2sgUmFnYW5cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUDhLTEkxMTg3Qjk5QkU2RlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDMtMjFUMjA6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAzLTIyVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJOaWNrIEhhcnBlclwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJWQjlFNDExODdCOTk0QzA3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0aXNoIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMy0xMFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDQtMDQtMTZUMjA6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA3LTA1LTE3VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wNS0xMlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDUtMTEtMTdUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBTdHJlZXRzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUklIRTdPMTE4N0ZCNDdERURcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInVrIGdhcmFnZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAyLTE4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMb3dcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQloxOVgxMTg3QjlBQkIyNFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2xvdyBjb3JlXCIsXG4gICAgICBcIm1lbGFuY2hvbGlhXCIsXG4gICAgICBcImluZGllIGNocmlzdG1hc1wiLFxuICAgICAgXCJkcmVhbSBwb3BcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIixcbiAgICAgIFwibG8tZmlcIixcbiAgICAgIFwiZm9sayBjaHJpc3RtYXNcIixcbiAgICAgIFwiaW5kaWUgcm9ja1wiLFxuICAgICAgXCJpbmRpZSBmb2xrXCIsXG4gICAgICBcInBvcCBjaHJpc3RtYXNcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0xN1QxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRGF2ZSBNYXR0aGV3cyBCYW5kXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlFYQzdWMTE4N0ZCNERBOUVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImphbSBiYW5kXCIsXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTExLTExVDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgUXVlZXJzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUklFS1pBMTE4N0I5OEZFRDRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwicHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAzLTA2VDE1OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXVyYSBTdGV2ZW5zb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSU5FSE4xMUVCQ0Q3OEYyOVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDQtMTdUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlBhcmFkaXNlIExvc3RcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRjk3UVQxMTg3QjlCOEI0N1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZG9vbSBtZXRhbFwiLFxuICAgICAgXCJnb3RoaWMgbWV0YWxcIixcbiAgICAgIFwibWV0YWxcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0wMVQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGF1cmEgVmVpcnNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFVDV1YxMTg3RkIzRTREN1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaW5kaWUgZm9sa1wiLFxuICAgICAgXCJmb2xrLXBvcFwiLFxuICAgICAgXCJmcmVhayBmb2xrXCIsXG4gICAgICBcImNoYW1iZXIgcG9wXCIsXG4gICAgICBcInN0b21wIGFuZCBob2xsZXJcIixcbiAgICAgIFwiYW50aS1mb2xrXCIsXG4gICAgICBcIm5ldyB3ZWlyZCBhbWVyaWNhXCIsXG4gICAgICBcInNsb3cgY29yZVwiLFxuICAgICAgXCJsaWxpdGhcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNC0wMy0yN1QyMTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDEtMzBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkFiaWdhaWwgV2FzaGJ1cm5cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQklSMTUxMTg3RkI1NTI0RFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCIsXG4gICAgICBcIm5ldyBhbWVyaWNhbmFcIixcbiAgICAgIFwiYmx1ZWdyYXNzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMjFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlBlYXJsIEphbVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGVllKSTExODdCOUI4RTEzXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJncnVuZ2VcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJwZXJtYW5lbnQgd2F2ZVwiLFxuICAgICAgXCJyb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDAtMDYtMDJUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJlbiBGb2xkc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVI3Nk5ZNjExODdGQjRGODJGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwaWFubyByb2NrXCIsXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwiaW5kaWUgY2hyaXN0bWFzXCIsXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcInBlcm1hbmVudCB3YXZlXCIsXG4gICAgICBcInBvcCBjaHJpc3RtYXNcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMS0wOS0xMFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU251ZmZcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSM0I2T0IxMTg3RkI0N0MxNFwiLFxuICAgIFwiZ2VucmVzXCI6IFtdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDAtMDUtMTFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNvd2JveSBKdW5raWVzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlU1WlZHMTE4N0I5QTZFOTdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJtZWxhbmNob2xpYVwiLFxuICAgICAgXCJjb3VudHJ5IHJvY2tcIixcbiAgICAgIFwic2luZ2VyLXNvbmd3cml0ZXJcIixcbiAgICAgIFwiY293cHVua1wiLFxuICAgICAgXCJsaWxpdGhcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJmb2xrLXBvcFwiLFxuICAgICAgXCJmb2xrIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNC0xMC0wOFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGF1cmEgQ2FudHJlbGxcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQVBSSkkxMTg3QjlBQ0VCRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwiY293cHVua1wiLFxuICAgICAgXCJvdXRsYXcgY291bnRyeVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAyLTEyLTAyVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0wNlQxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDMtMDEtMjlUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlBlb3BsZSBVbmRlciBUaGUgU3RhaXJzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJYNTI5MTE4N0I5OTdCM0ZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInVuZGVyZ3JvdW5kIGhpcCBob3BcIixcbiAgICAgIFwidHVybnRhYmxpc21cIixcbiAgICAgIFwiaGlwIGhvcFwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBoaXAgaG9wXCIsXG4gICAgICBcImFjaWQgamF6elwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA2LTEwLTEwVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJSYXRkb2dcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRlNBUDYxMTg3RkIzQkFEQVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiamFtIGJhbmRcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMy0wOC0yNlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRGFuYW5hbmFuYXlrcm95ZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJaUUIzWDExODdGQjQ3RTFCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJtYXRoIHBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA2LTAzVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMb3Vkb24gV2FpbndyaWdodFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJWMUpWRDExODdCOUFEMTk1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIixcbiAgICAgIFwic2luZ2VyLXNvbmd3cml0ZXJcIixcbiAgICAgIFwiZm9sayByb2NrXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwiZm9say1wb3BcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMy0xMC0xNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlcmlvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJaTjk4VjExODdCOTkwRDFEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJnb3RoaWMgbWV0YWxcIixcbiAgICAgIFwicHJvZ3Jlc3NpdmUgbWV0YWxcIixcbiAgICAgIFwic3ltcGhvbmljIG1ldGFsXCIsXG4gICAgICBcInN3ZWRpc2ggbWV0YWxcIixcbiAgICAgIFwiZ290aGljIHN5bXBob25pYyBtZXRhbFwiLFxuICAgICAgXCJwb3dlciBtZXRhbFwiLFxuICAgICAgXCJmb2xrIG1ldGFsXCIsXG4gICAgICBcIm1ldGFsXCIsXG4gICAgICBcIm1lbG9kaWMgZGVhdGggbWV0YWxcIixcbiAgICAgIFwidmlraW5nIG1ldGFsXCIsXG4gICAgICBcInN5bXBob25pYyBibGFjayBtZXRhbFwiLFxuICAgICAgXCJuZW8gY2xhc3NpY2FsIG1ldGFsXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTgtMDktMjNUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlN0cmluZyBDaGVlc2UgSW5jaWRlbnRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSV1RGR1kxMTg3Qjk5MkNCQVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiamFtIGJhbmRcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNC0wMy0zMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQmVuIEZvbGRzIEZpdmVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQkFOOFMxMTg3RkI0RDIyRlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicGlhbm8gcm9ja1wiLFxuICAgICAgXCJwb3dlciBwb3BcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJuZW8gbWVsbG93XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTktMTItMjBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk3LTAzLTAyVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJHb21lelwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJZVzRCWDExODdCOThEREU4XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcIm1hZGNoZXN0ZXJcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJyb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTktMTAtMTRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkZlZWRlclwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGRzJIRjExODdGQjNENEVDXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcIndlbHNoIHJvY2tcIixcbiAgICAgIFwicm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJtYWRjaGVzdGVyXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5OS0xMC0wMlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRXZlbiBJbiBCbGFja291dHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQ1A4NFIxMTg3Qjk5MTc4OVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicG93ZXItcG9wIHB1bmtcIixcbiAgICAgIFwiZGVlcCBwb3dlci1wb3AgcHVua1wiLFxuICAgICAgXCJvcmdjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDUtMDItMDZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTAyLTA0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNi0xMS0xMVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIExpZ2h0bmluZyBTZWVkc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJUQUFDQTExODdCOUI3M0RFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJtYWRjaGVzdGVyXCIsXG4gICAgICBcImJyaXRwb3BcIixcbiAgICAgIFwibmV3IHdhdmVcIixcbiAgICAgIFwibmV3IHJvbWFudGljXCIsXG4gICAgICBcIm5ldyB3YXZlIHBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk5LTExLTI4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJQcmVzaWRlbnRzIG9mIHRoZSBVU0FcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWERGTjAxMTg3QjlBRTgwRVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJncnVuZ2VcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwiZnVuayBtZXRhbFwiLFxuICAgICAgXCJwb3dlciBwb3BcIixcbiAgICAgIFwiY29taWNcIixcbiAgICAgIFwic2thIHB1bmtcIixcbiAgICAgIFwiZnVuayByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDUtMDgtMTZUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlBldGVyIFJvd2FuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUks2MFJMMTE4N0ZCM0ExMzBcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJsdWVncmFzc1wiLFxuICAgICAgXCJwcm9ncmVzc2l2ZSBibHVlZ3Jhc3NcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMy0xMS0yNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQWdhaW5zdCBNZSBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRFVGUzAxMTg3RkI0Q0Y1RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcIm1lbG9kaWMgaGFyZGNvcmVcIixcbiAgICAgIFwic2thdGUgcHVua1wiLFxuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcInB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMS0xNVQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiS2FjZXkgTXVzZ3JhdmVzIFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJPSk5LRTExRUI5QzgyNTNGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJjb3VudHJ5IGRhd25cIixcbiAgICAgIFwiZGVlcCBjb250ZW1wb3JhcnkgY291bnRyeVwiLFxuICAgICAgXCJtb2Rlcm4gY291bnRyeSByb2NrXCIsXG4gICAgICBcImNvbnRlbXBvcmFyeSBjb3VudHJ5XCIsXG4gICAgICBcInRleGFzIGNvdW50cnlcIixcbiAgICAgIFwiY291bnRyeSByb2FkXCIsXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDctMDhUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkp1cmFzc2ljIDVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRUdDMVoxMTg3Qjk5NUE5MFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidW5kZXJncm91bmQgaGlwIGhvcFwiLFxuICAgICAgXCJoaXAgaG9wXCIsXG4gICAgICBcInR1cm50YWJsaXNtXCIsXG4gICAgICBcInJhcFwiLFxuICAgICAgXCJvbGQgc2Nob29sIGhpcCBob3BcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgaGlwIGhvcFwiLFxuICAgICAgXCJyYXAgcm9ja1wiLFxuICAgICAgXCJlYXN0IGNvYXN0IGhpcCBob3BcIixcbiAgICAgIFwiaGFyZGNvcmUgaGlwIGhvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA2LTIwVDE4OjAwOjIyLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJTYW1hbWlkb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVEo2QUUxMTg3Qjk4Q0NDNVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic3RvbXAgYW5kIGhvbGxlclwiLFxuICAgICAgXCJpbmRpZSBmb2xrXCIsXG4gICAgICBcImZyZWFrIGZvbGtcIixcbiAgICAgIFwic2xvdyBjb3JlXCIsXG4gICAgICBcIm5ldyBhbWVyaWNhbmFcIixcbiAgICAgIFwibmV3IHdlaXJkIGFtZXJpY2FcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIixcbiAgICAgIFwiZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTExLTEwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJVZ2x5IER1Y2tsaW5nXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJZVklIMTE4N0I5QjlGNjRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInVuZGVyZ3JvdW5kIGhpcCBob3BcIixcbiAgICAgIFwidHVybnRhYmxpc21cIixcbiAgICAgIFwiaGlwIGhvcFwiLFxuICAgICAgXCJvbGQgc2Nob29sIGhpcCBob3BcIixcbiAgICAgIFwiYWNpZCBqYXp6XCIsXG4gICAgICBcInJhcFwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBoaXAgaG9wXCIsXG4gICAgICBcInJhcCByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMDUtMDNUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBEZWFkbHkgR2VudGxlbWVuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhURkFFMTIyQ0MzQjEyRTZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInByb2dyZXNzaXZlIGJsdWVncmFzc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTAzLTIxVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMZXNzIFRoYW4gSmFrZVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJHOERYTzExODdCOUFGNzQzXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJza2FcIixcbiAgICAgIFwic2thdGUgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcInBvcCBwdW5rXCIsXG4gICAgICBcInB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMS0wNC0xMFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiR29uZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJDWkQ1WTExODdCOUFEREY1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJjYW50ZXJidXJ5IHNjZW5lXCIsXG4gICAgICBcInNwYWNlIHJvY2tcIixcbiAgICAgIFwiem9sb1wiLFxuICAgICAgXCJrcmF1dCByb2NrXCIsXG4gICAgICBcImFydCByb2NrXCIsXG4gICAgICBcImV4cGVyaW1lbnRhbFwiLFxuICAgICAgXCJzeW1waG9uaWMgcm9ja1wiLFxuICAgICAgXCJwcm9ncmVzc2l2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDAtMTEtMjZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBWYW5kYWxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlcwSzVGMTE4N0I5QUZDQzBcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJwdW5rIGNocmlzdG1hc1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcImhlYXZ5IGNocmlzdG1hc1wiLFxuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJoYXJkY29yZSBwdW5rXCIsXG4gICAgICBcInNrYVwiLFxuICAgICAgXCJwb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAwLTEwLTE2VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJNeSBMaWZlIFN0b3J5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkVOSThFMTE4N0ZCMzY3RUJcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRwb3BcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5Ny0xMi0wMVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSmVmZiBSb3NlbnN0b2NrXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkxNQUNDMTE4N0ZCNDQzRjVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBlbW9cIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wMy0yMFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iXX0=

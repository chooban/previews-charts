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
    'height': 300,
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
    return artist.count >= 2;
  }).value();

  var xScale = d3.scale.ordinal().domain(_.map(gigs, function (d) {
    return d.artist;
  })).rangePoints([config.padding, config.width - config.padding], 1);

  var xAxis = fc.svg.axis().scale(xScale).orient('bottom').decorate(function (s) {
    s.enter().select('text').style('text-anchor', 'end').attr('transform', 'rotate(-65 10 10)');
  });

  var xAxisNode = selection.append('g').classed('xaxis', true).call(xAxis);

  var xAxisHeight = Math.ceil(xAxisNode.node().getBBox().height);

  xAxisNode.attr('transform', 'translate(0, ' + (config.height - xAxisHeight) + ')');

  var yScale = d3.scale.linear().domain([0, d3.max(gigs, function (d) {
    return d.count;
  }) + 2]).range([config.height - xAxisHeight, config.padding]);

  var yAxis = fc.svg.axis().scale(yScale).tickValues([2, 4, 6, 8, 10, 12]).orient('right');

  var series = fc.series.bar().xValue(function (d) {
    return d.artist;
  }).yValue(function (d) {
    return d.count;
  }).xScale(xScale).yScale(yScale).decorate(function (s) {
    s.select('path').append('title').text(function (d) {
      return d.artist + ' (' + d.count + ')';
    });
  });

  selection.attr({
    width: config.width,
    height: config.height
  });

  selection.append('g').classed('bars', true).datum(gigs).call(series);

  selection.append('g').classed('yaxis', true).call(yAxis).attr('transform', 'translate(' + (config.width - config.padding) + ', 0)');
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
      },
      {
        "date": "2016-06-01T17:30:00.000Z"
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
      },
      {
        "date": "2016-04-09T18:00:00.000Z"
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
      },
      {
        "date": "2016-01-18T19:00:00.000Z"
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
      },
      {
        "date": "2016-06-04T18:30:00.000Z"
      },
      {
        "date": "2014-12-09T19:30:00.000Z"
      },
      {
        "date": "2014-12-10T19:00:00.000Z"
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
  },
  "Brian Fallon": {
    "echonestId": "AROXVEE12086C15BA4",
    "genres": [],
    "gigs": [
      {
        "date": "2016-04-06T18:00:00.000Z"
      }
    ]
  },
  "Public Service Broadcasting": {
    "echonestId": "ARFHKLB136658E6A24",
    "genres": [],
    "gigs": [
      {
        "date": "2016-02-08T19:00:00.000Z"
      }
    ]
  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZDNmYy5qcyIsInNyYy9qcy9naWctZGF0YS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsT0FBTyxDQUFQLEdBQVcsT0FBTyxNQUFQLEdBQWdCLFFBQVEsUUFBUixDQUEzQjtBQUNBLFFBQVEsV0FBUjs7QUFFQSxJQUFNLEtBQUssUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNLEtBQUssUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUEsSUFBTSxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEtBQXZFLEVBQThFLEtBQTlFLENBQWY7QUFDQSxJQUFNLGVBQWUsUUFBUSxpQkFBUixDQUFyQjs7QUFFQSxFQUFFLFVBQUYsRUFBYyxLQUFkLENBQW9CLEtBQXBCOztBQUVBLFNBQVMsS0FBVCxHQUFpQjtBQUNmLE1BQU0sV0FBVztBQUNmLGFBQVMsR0FETTtBQUVmLGNBQVUsR0FGSztBQUdmLGVBQVc7QUFISSxHQUFqQjs7QUFNQSxNQUFNLE9BQU8sR0FBRyxNQUFILENBQVUsVUFBVixFQUFzQixJQUF0QixDQUEyQixFQUEzQixDQUFiOztBQUVBLGNBQVksS0FBSyxNQUFMLENBQVksS0FBWixDQUFaLEVBQWdDLFFBQWhDO0FBQ0EsaUJBQWUsS0FBSyxNQUFMLENBQVksS0FBWixDQUFmLEVBQW1DLFFBQW5DO0FBQ0Q7O0FBRUQsU0FBUyxjQUFULENBQXdCLFNBQXhCLEVBQW1DLE1BQW5DLEVBQTJDO0FBQ3pDLE1BQU0sT0FBTyxFQUFFLEtBQUYsQ0FBUSxZQUFSLEVBQ1UsU0FEVixDQUNvQixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsICQgKi9cbndpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbmNvbnN0IGQzID0gcmVxdWlyZSgnZDMnKTtcbmNvbnN0IGZjID0gcmVxdWlyZSgnZDNmYycpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5jb25zdCBnaWdzQnlBcnRpc3QgPSByZXF1aXJlKCcuL2dpZy1kYXRhLmpzb24nKTtcblxuJCgnLmNvbnRlbnQnKS5yZWFkeShzZXR1cCk7XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICBjb25zdCBzdmdBdHRycyA9IHtcbiAgICAnd2lkdGgnOiA1MDAsXG4gICAgJ2hlaWdodCc6IDMwMCxcbiAgICAncGFkZGluZyc6IDMwXG4gIH07XG5cbiAgY29uc3Qgcm9vdCA9IGQzLnNlbGVjdCgnLmNvbnRlbnQnKS5odG1sKCcnKVxuXG4gIGdpZ3NCeU1vbnRoKHJvb3QuYXBwZW5kKCdzdmcnKSwgc3ZnQXR0cnMpO1xuICBwb3B1bGFyQXJ0aXN0cyhyb290LmFwcGVuZCgnc3ZnJyksIHN2Z0F0dHJzKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhckFydGlzdHMoc2VsZWN0aW9uLCBjb25maWcpIHtcbiAgY29uc3QgZ2lncyA9IF8uY2hhaW4oZ2lnc0J5QXJ0aXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFZhbHVlcygodiwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcnRpc3QnOiBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudCc6IHYuZ2lncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGFydGlzdCkgPT4gYXJ0aXN0LmNvdW50ID49IDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWUoKTtcblxuICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAuZG9tYWluKF8ubWFwKGdpZ3MsIChkKSA9PiBkLmFydGlzdCkpXG4gICAgLnJhbmdlUG9pbnRzKFtjb25maWcucGFkZGluZywgY29uZmlnLndpZHRoIC0gY29uZmlnLnBhZGRpbmddLCAxKTtcblxuICBjb25zdCB4QXhpcyA9IGZjLnN2Zy5heGlzKClcbiAgICAuc2NhbGUoeFNjYWxlKVxuICAgIC5vcmllbnQoJ2JvdHRvbScpXG4gICAgLmRlY29yYXRlKChzKSA9PiB7XG4gICAgICBzLmVudGVyKCkuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtNjUgMTAgMTApJylcbiAgICB9KVxuXG4gIGNvbnN0IHhBeGlzTm9kZSA9IHNlbGVjdGlvbi5hcHBlbmQoJ2cnKVxuICAgIC5jbGFzc2VkKCd4YXhpcycsIHRydWUpXG4gICAgLmNhbGwoeEF4aXMpXG5cbiAgY29uc3QgeEF4aXNIZWlnaHQgPSBNYXRoLmNlaWwoeEF4aXNOb2RlLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0KTtcblxuICB4QXhpc05vZGUuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgKGNvbmZpZy5oZWlnaHQgLSB4QXhpc0hlaWdodCkgKyAnKScpXG5cbiAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAuZG9tYWluKFswLCBkMy5tYXgoZ2lncywgKGQpID0+IGQuY291bnQpICsgMl0pXG4gICAgLnJhbmdlKFtjb25maWcuaGVpZ2h0IC0geEF4aXNIZWlnaHQsIGNvbmZpZy5wYWRkaW5nXSk7XG5cbiAgY29uc3QgeUF4aXMgPSBmYy5zdmcuYXhpcygpXG4gICAgLnNjYWxlKHlTY2FsZSlcbiAgICAudGlja1ZhbHVlcyhbMiw0LDYsOCwxMCwxMl0pXG4gICAgLm9yaWVudCgncmlnaHQnKVxuXG4gIGNvbnN0IHNlcmllcyA9IGZjLnNlcmllcy5iYXIoKVxuICAgIC54VmFsdWUoKGQpID0+IGQuYXJ0aXN0KVxuICAgIC55VmFsdWUoKGQpID0+IGQuY291bnQpXG4gICAgLnhTY2FsZSh4U2NhbGUpXG4gICAgLnlTY2FsZSh5U2NhbGUpXG4gICAgLmRlY29yYXRlKChzKSA9PiB7XG4gICAgICBzLnNlbGVjdCgncGF0aCcpXG4gICAgICAgIC5hcHBlbmQoJ3RpdGxlJylcbiAgICAgICAgICAudGV4dCgoZCkgPT4gZC5hcnRpc3QgKyAnICgnICsgZC5jb3VudCArICcpJylcbiAgICB9KVxuXG4gIHNlbGVjdGlvbi5hdHRyKHtcbiAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgIGhlaWdodDogY29uZmlnLmhlaWdodFxuICB9KTtcblxuICBzZWxlY3Rpb25cbiAgICAuYXBwZW5kKCdnJylcbiAgICAuY2xhc3NlZCgnYmFycycsIHRydWUpXG4gICAgLmRhdHVtKGdpZ3MpXG4gICAgLmNhbGwoc2VyaWVzKTtcblxuICBzZWxlY3Rpb24uYXBwZW5kKCdnJylcbiAgICAuY2xhc3NlZCgneWF4aXMnLCB0cnVlKVxuICAgIC5jYWxsKHlBeGlzKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAoY29uZmlnLndpZHRoIC0gY29uZmlnLnBhZGRpbmcpICsgJywgMCknKVxuXG59XG5cbmZ1bmN0aW9uIGdpZ3NCeU1vbnRoKHNlbGVjdGlvbiwgY29uZmlnKSB7XG4gIGNvbnN0IGdpZ3NCeU1vbnRoID0gXy5jaGFpbihnaWdzQnlBcnRpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChhcnRpc3QpID0+IGFydGlzdC5naWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZsYXR0ZW5EZWVwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGdpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnaWdEYXRlID0gbmV3IERhdGUoZ2lnLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb250aCc6IG1vbnRoc1tnaWdEYXRlLmdldE1vbnRoKCldXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50QnkoXy5wcm9wZXJ0eSgnbW9udGgnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBWYWx1ZXMoKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9udGgnOiBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudCc6IHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuXG5cbiAgdmFyIHlFeHRlbnQgPSBmYy51dGlsLmV4dGVudCgpXG4gICAgLmluY2x1ZGUoMClcbiAgICAucGFkKFswLCAwLjVdKVxuICAgIC5maWVsZHMoWydjb3VudCddKTtcblxuICB2YXIgY2hhcnQgPSBmYy5jaGFydC5jYXJ0ZXNpYW4oZDMuc2NhbGUub3JkaW5hbCgpLCBkMy5zY2FsZS5saW5lYXIoKSlcbiAgICAuY2hhcnRMYWJlbCgnR2lncyBCeSBNb250aCcpXG4gICAgLnhEb21haW4obW9udGhzKVxuICAgIC55RG9tYWluKHlFeHRlbnQoZ2lnc0J5TW9udGgpKVxuICAgIC55VGlja3MoNSlcbiAgICAueU5pY2UoKTtcblxuICB2YXIgc2VyaWVzID0gZmMuc2VyaWVzLmJhcigpXG4gICAgLnhWYWx1ZSgoZCkgPT4gZC5tb250aClcbiAgICAueVZhbHVlKChkKSA9PiBkLmNvdW50KTtcblxuICBjaGFydC5wbG90QXJlYShzZXJpZXMpO1xuXG4gIHNlbGVjdGlvbi5hdHRyKHtcbiAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgIGhlaWdodDogY29uZmlnLmhlaWdodFxuICB9KTtcblxuICBzZWxlY3Rpb25cbiAgICAuZGF0dW0oZ2lnc0J5TW9udGgpXG4gICAgLmNhbGwoY2hhcnQpO1xuXG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJNZXVyc2F1bHRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUlhHR1MxMTg3RkI1QzIzRVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2NvdHRpc2ggcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAzLTA5VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0xMi0wNVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDUtMjBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkdvZ29sIEJvcmRlbGxvXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjBZTUU2MTE4N0ZCM0I1NDRcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTAzLTE0VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBbmRyZXcgSmFja3NvbiBKaWhhZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGVVpONjExODdGQjRDQkE5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwiYW50aS1mb2xrXCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDUtMjdUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTEwLTAzVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMC0wNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDYtMTRUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNha2VcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUVJRUkExMjEzMUI0QjVBOFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJmdW5rIG1ldGFsXCIsXG4gICAgICBcImZ1bmsgcm9ja1wiLFxuICAgICAgXCJnYXJhZ2Ugcm9ja1wiLFxuICAgICAgXCJyYXAgcm9ja1wiLFxuICAgICAgXCJuZW8gbWVsbG93XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTEtMTZUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkZyYW56IE5pY29sYXlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSUxZS0QxMTg3QjlCNjc2MFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTItMDZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTExLTIwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wMS0xNFQyMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU3BhcmtzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjA0MEpaMTE4N0ZCMzk5QTlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInpvbG9cIixcbiAgICAgIFwiZ2xhbSByb2NrXCIsXG4gICAgICBcImFydCByb2NrXCIsXG4gICAgICBcIm5ldyB3YXZlXCIsXG4gICAgICBcImRhbmNlIHJvY2tcIixcbiAgICAgIFwicHJvdG9wdW5rXCIsXG4gICAgICBcIm5ldyByb21hbnRpY1wiLFxuICAgICAgXCJleHBlcmltZW50YWxcIixcbiAgICAgIFwibmV3IHdhdmUgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMTAtMjBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkx1Y2Vyb1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCVzFKNjExODdCOUI4QjU0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwicm9vdHMgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTI0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wMi0wNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ29saW4gSGF5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjlRT05NMTE4N0I5QTBBOENcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwiYWNvdXN0aWMgcG9wXCIsXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcInBvcCByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMDUtMDNUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTExLTEzVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEYXZlIEhhdXNlIFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJOWVZPUjEyMDg2QzEyMUNCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0xMS0xNVQyMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVHJhbXBsZWQgQnkgVHVydGxlc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJPTk5YNTExODdCOThERDQ3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwcm9ncmVzc2l2ZSBibHVlZ3Jhc3NcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJibHVlZ3Jhc3NcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wMS0yNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTEtMThUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxpbmRpIE9ydGVnYVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJWVlNQUDExRUJDRDc4QkEzXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJlY3RvZm9sa1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCIsXG4gICAgICBcImNvdW50cnkgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDEtMTZUMjA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIklyb24gQ2hpY1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJaQkZJVDEyMDg2QzE2QjBEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJvcmdjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTA1LTA2VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0xNFQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiT2xkIENyb3cgTWVkaWNpbmUgU2hvd1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJZTzlIMTExODdGQjU3OTQ1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCIsXG4gICAgICBcIm9sZC10aW1lXCIsXG4gICAgICBcImJsdWVncmFzc1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMC0yMlQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiV2hlYXR1c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwN0tTQzExODdCOUJBNjA2XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3N0LWdydW5nZVwiLFxuICAgICAgXCJwb3AgcHVua1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMTAtMTlUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTEwLTIzVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0xMC0xNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDYtMTFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTA1LTI4VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMS0xMS0xOVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGltIEJhcnJ5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUk4yMVhLMTE4N0I5OTVDQzFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGsgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAyLTI3VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMy0wNi0yOFQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTGFpYmFjaFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIwT1hTNTExODdGQjRGODVBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmR1c3RyaWFsXCIsXG4gICAgICBcImluZHVzdHJpYWwgcm9ja1wiLFxuICAgICAgXCJlYm1cIixcbiAgICAgIFwiZWxlY3Ryby1pbmR1c3RyaWFsXCIsXG4gICAgICBcIm1hcnRpYWwgaW5kdXN0cmlhbFwiLFxuICAgICAgXCJleHBlcmltZW50YWxcIixcbiAgICAgIFwiaW5kdXN0cmlhbCBtZXRhbFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTAzLTMxVDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMi0xNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiWW8gTGEgVGVuZ29cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVUc0OFMxMTg3QjlCQTE0MlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwibG8tZmlcIixcbiAgICAgIFwiaW5kaWUgcm9ja1wiLFxuICAgICAgXCJub2lzZSBwb3BcIixcbiAgICAgIFwic2xvdyBjb3JlXCIsXG4gICAgICBcImFsdGVybmF0aXZlIHJvY2tcIixcbiAgICAgIFwiZHJlYW0gcG9wXCIsXG4gICAgICBcIm5lby1wc3ljaGVkZWxpY1wiLFxuICAgICAgXCJzcGFjZSByb2NrXCIsXG4gICAgICBcIm51IGdhemVcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIixcbiAgICAgIFwiaW5kaWUgcG9wXCIsXG4gICAgICBcImV4cGVyaW1lbnRhbCByb2NrXCIsXG4gICAgICBcImluZGllIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0xNlQxODozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTEtMDZUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTAzLTIyVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNi0wNVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiV2lsaGVsbSBTY3JlYW1cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSVJDS0QxM0I3MUNFNjlBM1wiLFxuICAgIFwiZ2VucmVzXCI6IFtdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDgtMTlUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRlZW5hZ2UgQm90dGxlcm9ja2V0XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkU1TFQ5MTE4N0I5QjA0REVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcIm1lbG9kaWMgaGFyZGNvcmVcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcInB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wOC0yMVQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU3RldmUgRWFybGVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUlg3WjAxMTg3QjlBQzQ0OVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgY291bnRyeVwiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIixcbiAgICAgIFwidGV4YXMgY291bnRyeVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb290cyByb2NrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMC0yN1QxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSGF5ZXMgQ2FybGxcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVE1aWVcxMTg3QjlBN0VDQlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIixcbiAgICAgIFwidGV4YXMgY291bnRyeVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiLFxuICAgICAgXCJjb3VudHJ5IGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA5LTA2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaXR1cyBBbmRyb25pY3VzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkJGWTdBMTE5Qjg2Njk4MjdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm5vaXNlIHBvcFwiLFxuICAgICAgXCJsby1maVwiLFxuICAgICAgXCJub2lzZSByb2NrXCIsXG4gICAgICBcImluZGllIHJvY2tcIixcbiAgICAgIFwibnUgZ2F6ZVwiLFxuICAgICAgXCJuZW8tcHN5Y2hlZGVsaWNcIixcbiAgICAgIFwiaW5kaWUgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTEtMTNUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIktyaXMgRHJldmVyXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjRTRU9WMTE4N0ZCNTQ3NkZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRpc2ggZm9sa1wiLFxuICAgICAgXCJ0cmFkaXRpb25hbCBicml0aXNoIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wNS0xNFQxODozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiTXVuY2llIEdpcmxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkRETVJSMTM4QkVDMTg4RjhcIixcbiAgICBcImdlbnJlc1wiOiBbXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTAzLTMwVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEcml2ZS1CeSBUcnVja2Vyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJPTUNFVjExODdCOUIzRjU4XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcImNvd3B1bmtcIixcbiAgICAgIFwicm9vdHMgcm9ja1wiLFxuICAgICAgXCJjb3VudHJ5IHJvY2tcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJuZXcgYW1lcmljYW5hXCIsXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCIsXG4gICAgICBcInNvdXRoZXJuIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wOC0wNlQxODowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDUtMTFUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTEyLTAyVDIxOjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0wOVQxODowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMTBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRvbSBXYWl0c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFUkxQRzExODdGQjNCQjM5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA4LTA3LTI2VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBcnJvZ2FudCBXb3Jtc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJSOTZLMDExODdCOThENTIwXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJjb21pY1wiLFxuICAgICAgXCJnZWVrIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNi0wNS0yNFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ2xvcm94IEdpcmxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjE0QkpRMTE4N0I5QUNDMkVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImdhcmFnZSBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMDYtMjlUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRvbSBQYXh0b25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSMkpTTzMxMTg3RkI1NDA1RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidHJhZGl0aW9uYWwgZm9sa1wiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImZvbGsgY2hyaXN0bWFzXCIsXG4gICAgICBcImZvbGsgcm9ja1wiLFxuICAgICAgXCJicml0aXNoIGZvbGtcIixcbiAgICAgIFwic2luZ2VyLXNvbmd3cml0ZXJcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wMS0yMVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDItMTdUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA1LTAyLTI0VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJIb2xkIFN0ZWFkeVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFRkZRRjExODdGQjNGODQ1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmRpZSByb2NrXCIsXG4gICAgICBcImxvLWZpXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMDItMjVUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIktpbXlhIERhd3NvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJOM1BNSDExODdGQjNDOEFBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbnRpLWZvbGtcIixcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcImluZGllIGZvbGtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wNS0xM1QxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSG90IExlZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJEUTc3UzExQzhBNDE1Q0I0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzbGVhemUgcm9ja1wiLFxuICAgICAgXCJkZWVwIG1lbG9kaWMgaGFyZCByb2NrXCIsXG4gICAgICBcImdsYW0gcm9ja1wiLFxuICAgICAgXCJnbGFtIG1ldGFsXCIsXG4gICAgICBcImhhcmQgcm9ja1wiLFxuICAgICAgXCJyb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDMtMDVUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYUkhXWjExODdGQjRFRDhCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0aXNoIGZvbGtcIixcbiAgICAgIFwidHJhZGl0aW9uYWwgYnJpdGlzaCBmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDMtMTlUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTEyLTA1VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0xMS0yOFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDEtMjhUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTExLTI4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wOC0xOVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMjRUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTA2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMi0wNFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMTItMDJUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkJydWNlIFNwcmluZ3N0ZWVuXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjkxQzhTMTE4N0I5OTA5MDFcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNpbmdlci1zb25nd3JpdGVyXCIsXG4gICAgICBcInJvb3RzIHJvY2tcIixcbiAgICAgIFwiZm9sayByb2NrXCIsXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwibWVsbG93IGdvbGRcIixcbiAgICAgIFwiY291bnRyeSByb2NrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGZvbGtcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwiZm9say1wb3BcIixcbiAgICAgIFwicm9ja1wiLFxuICAgICAgXCJwb3AgY2hyaXN0bWFzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMDctMTNUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTA2LTAxVDE3OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJGcmFuayBUdXJuZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVlZVU0MxMTg3RkI0QkRBQ1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaW5kaWUgZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTEwLTE0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0wMy0xNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTItMDJUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTExVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0xMS0yNVQxOTozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDItMDhUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTExLTE4VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJKb25hdGhhbiBDb3VsdG9uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlhTTkNOMTE4N0I5QjA2QTNcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImNvbWljXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDktMTEtMDhUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA5LTExLTEwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYWQgUmVsaWdpb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSNDZDQUQxMTg3RkI0RDg0QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcImhhcmRjb3JlIHB1bmtcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJwdW5rIGNocmlzdG1hc1wiLFxuICAgICAgXCJwb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA4LTI0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNy0xMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDItMDUtMTFUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNhdCBFbXBpcmVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUU5MSDMxMTg3QjlBREMxRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYXVzdHJhbGlhbiBhbHRlcm5hdGl2ZSByb2NrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTAtMjZUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTEwLTI1VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wNC0wOVQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQm9tYiBUaGUgTXVzaWMgSW5kdXN0cnlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSR09HT1oxMTg3QjlBRUFDNlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2thIHB1bmtcIixcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcInNrYVwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTExLTEyVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgUmlvdCBCZWZvcmVcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSNEY4OTQxMTg3RkI1NjRGMlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicnZhIGluZGllXCIsXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiZm9sayBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMTEtMjFUMjA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkdhc2xpZ2h0IEFudGhlbVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCVkxDSjExODdGQjUwRTYxXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBlbW9cIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMC0xMS0xOVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDYtMjJUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkNoZWFwIEdpcmxzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlJIVEVYMTIwODZDMTExNzlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDgtMDlUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkZsb2dnaW5nIE1vbGx5XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlA2SUpCMTE4N0I5QjE0REVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImNlbHRpYyByb2NrXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJib3cgcG9wXCIsXG4gICAgICBcImNlbHRpYyBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDgtMjRUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkhlbnJ5IFJvbGxpbnNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSNlFQUFUxMTg3QjlBQTcyNlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiaGFyZGNvcmUgcHVua1wiLFxuICAgICAgXCJwdW5rXCIsXG4gICAgICBcImNvbWljXCIsXG4gICAgICBcImZ1bmsgbWV0YWxcIixcbiAgICAgIFwicG9zdC1oYXJkY29yZVwiLFxuICAgICAgXCJmdW5rIHJvY2tcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgbWV0YWxcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMS0xNFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDgtMjJUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTAxLTE4VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYWJ5YmlyZFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYM1ozMTExODdCOTk0QjVCXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJicml0cG9wXCIsXG4gICAgICBcIm1hZGNoZXN0ZXJcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMi0wMS0zMVQxOTowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTAtMDMtMThUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBNZW56aW5nZXJzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkI3REpWMTE4N0ZCNDJCNzlcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDktMjFUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTA4LTA3VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMC0wMVQxNzozMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSm95Y2UgTWFub3JcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSS1lWS0UxMkQzMzJDMjU4NlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYWx0ZXJuYXRpdmUgZW1vXCIsXG4gICAgICBcImZvbGsgcHVua1wiLFxuICAgICAgXCJvcmdjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDktMjZUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTEyVDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgQ3V0IFVwcyBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSU1lIT1cxMjQ1NEE1MUI2RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZGVlcCBvcmdjb3JlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTMtMDgtMDFUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdSBcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFJIV1oxMTg3RkI0RUQ4QlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdGlzaCBmb2xrXCIsXG4gICAgICBcInRyYWRpdGlvbmFsIGJyaXRpc2ggZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTI3VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJNYXNrZWQgSW50cnVkZXJcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSR0JUSEIxMzY2NThFOThBNVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicG93ZXItcG9wIHB1bmtcIixcbiAgICAgIFwib3JnY29yZVwiLFxuICAgICAgXCJwdW5rIGNocmlzdG1hc1wiLFxuICAgICAgXCJkZWVwIHBvd2VyLXBvcCBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDUtMTRUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlJlZCBDaXR5IFJhZGlvXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUllEWExWMTFFQjlDODI3NzZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwiZGVlcCBwb3dlci1wb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTA3LTE2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCYXJlbmFrZWQgTGFkaWVzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlc3SzBQMTE4N0I5QjVCNDdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCIsXG4gICAgICBcIm5lbyBtZWxsb3dcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTEwLTAzVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCb3VuY2luZyBTb3Vsc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJVVTEzRTExODdGQjNFQjQ4XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJtZWxvZGljIGhhcmRjb3JlXCIsXG4gICAgICBcInNrYXRlIHB1bmtcIixcbiAgICAgIFwicHVua1wiLFxuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJwb3AgcHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEzLTAzLTE3VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJDaHVjayBSYWdhblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJQOEtMSTExODdCOTlCRTZGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNS0wMy0yMVQyMDozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMDMtMjJUMTk6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIk5pY2sgSGFycGVyXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlZCOUU0MTE4N0I5OTRDMDdcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRpc2ggZm9sa1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEyLTAzLTEwVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNC0wNC0xNlQyMDozMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDctMDUtMTdUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDEwLTA1LTEyVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNS0xMS0xN1QwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIFN0cmVldHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSUhFN08xMTg3RkI0N0RFRFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidWsgZ2FyYWdlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDItMThUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxvd1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCWjE5WDExODdCOUFCQjI0XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzbG93IGNvcmVcIixcbiAgICAgIFwibWVsYW5jaG9saWFcIixcbiAgICAgIFwiaW5kaWUgY2hyaXN0bWFzXCIsXG4gICAgICBcImRyZWFtIHBvcFwiLFxuICAgICAgXCJjaGFtYmVyIHBvcFwiLFxuICAgICAgXCJsby1maVwiLFxuICAgICAgXCJmb2xrIGNocmlzdG1hc1wiLFxuICAgICAgXCJpbmRpZSByb2NrXCIsXG4gICAgICBcImluZGllIGZvbGtcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTE3VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEYXZlIE1hdHRoZXdzIEJhbmRcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSUVhDN1YxMTg3RkI0REE5RVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiamFtIGJhbmRcIixcbiAgICAgIFwibmVvIG1lbGxvd1wiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJwb3AgY2hyaXN0bWFzXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTUtMTEtMTFUMTk6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlRoZSBRdWVlcnNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSUVLWkExMTg3Qjk4RkVENFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicG93ZXItcG9wIHB1bmtcIixcbiAgICAgIFwic2thdGUgcHVua1wiLFxuICAgICAgXCJwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDMtMDZUMTU6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxhdXJhIFN0ZXZlbnNvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJJTkVITjExRUJDRDc4RjI5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wNC0xN1QxODowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDYtMDRUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTEyLTA5VDE5OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0xMi0xMFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUGFyYWRpc2UgTG9zdFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGOTdRVDExODdCOUI4QjQ3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJkb29tIG1ldGFsXCIsXG4gICAgICBcImdvdGhpYyBtZXRhbFwiLFxuICAgICAgXCJtZXRhbFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE1LTEwLTAxVDE4OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXVyYSBWZWlyc1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYVUNXVjExODdGQjNFNEQ3XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJpbmRpZSBmb2xrXCIsXG4gICAgICBcImZvbGstcG9wXCIsXG4gICAgICBcImZyZWFrIGZvbGtcIixcbiAgICAgIFwiY2hhbWJlciBwb3BcIixcbiAgICAgIFwic3RvbXAgYW5kIGhvbGxlclwiLFxuICAgICAgXCJhbnRpLWZvbGtcIixcbiAgICAgIFwibmV3IHdlaXJkIGFtZXJpY2FcIixcbiAgICAgIFwic2xvdyBjb3JlXCIsXG4gICAgICBcImxpbGl0aFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA0LTAzLTI3VDIxOjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwOC0wMS0zMFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQWJpZ2FpbCBXYXNoYnVyblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCSVIxNTExODdGQjU1MjREXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwcm9ncmVzc2l2ZSBibHVlZ3Jhc3NcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJibHVlZ3Jhc3NcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxMS0wNS0yMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUGVhcmwgSmFtXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkZWWUpJMTE4N0I5QjhFMTNcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImdydW5nZVwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCIsXG4gICAgICBcInBlcm1hbmVudCB3YXZlXCIsXG4gICAgICBcInJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMC0wNi0wMlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQmVuIEZvbGRzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUjc2Tlk2MTE4N0ZCNEY4MkZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInBpYW5vIHJvY2tcIixcbiAgICAgIFwibmVvIG1lbGxvd1wiLFxuICAgICAgXCJpbmRpZSBjaHJpc3RtYXNcIixcbiAgICAgIFwicG9wIHJvY2tcIixcbiAgICAgIFwicGVybWFuZW50IHdhdmVcIixcbiAgICAgIFwicG9wIGNocmlzdG1hc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAxLTA5LTEwVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJTbnVmZlwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVIzQjZPQjExODdGQjQ3QzE0XCIsXG4gICAgXCJnZW5yZXNcIjogW10sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMC0wNS0xMVQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiQ293Ym95IEp1bmtpZXNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVTVaVkcxMTg3QjlBNkU5N1wiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicm9vdHMgcm9ja1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcIm1lbGFuY2hvbGlhXCIsXG4gICAgICBcImNvdW50cnkgcm9ja1wiLFxuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcImxpbGl0aFwiLFxuICAgICAgXCJmb2xrXCIsXG4gICAgICBcImZvbGstcG9wXCIsXG4gICAgICBcImZvbGsgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA0LTEwLTA4VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJMYXVyYSBDYW50cmVsbFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJBUFJKSTExODdCOUFDRUJEXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSBjb3VudHJ5XCIsXG4gICAgICBcIm5ldyBhbWVyaWNhbmFcIixcbiAgICAgIFwiZm9sa1wiLFxuICAgICAgXCJjb3dwdW5rXCIsXG4gICAgICBcIm91dGxhdyBjb3VudHJ5XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDItMTItMDJUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDExLTA1LTA2VDE4OjMwOjAwLjAwMFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMy0wMS0yOVQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUGVvcGxlIFVuZGVyIFRoZSBTdGFpcnNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQlg1MjkxMTg3Qjk5N0IzRlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidW5kZXJncm91bmQgaGlwIGhvcFwiLFxuICAgICAgXCJ0dXJudGFibGlzbVwiLFxuICAgICAgXCJoaXAgaG9wXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGhpcCBob3BcIixcbiAgICAgIFwiYWNpZCBqYXp6XCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDYtMTAtMTBUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlJhdGRvZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGU0FQNjExODdGQjNCQURBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJqYW0gYmFuZFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTA4LTI2VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJEYW5hbmFuYW5heWtyb3lkXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlpRQjNYMTE4N0ZCNDdFMUJcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm1hdGggcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTEtMDYtMDNUMTg6MzA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxvdWRvbiBXYWlud3JpZ2h0XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlYxSlZEMTE4N0I5QUQxOTVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImZvbGtcIixcbiAgICAgIFwidHJhZGl0aW9uYWwgZm9sa1wiLFxuICAgICAgXCJzaW5nZXItc29uZ3dyaXRlclwiLFxuICAgICAgXCJmb2xrIHJvY2tcIixcbiAgICAgIFwicm9vdHMgcm9ja1wiLFxuICAgICAgXCJmb2xrLXBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTEwLTE0VDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGVyaW9uXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlpOOThWMTE4N0I5OTBEMURcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImdvdGhpYyBtZXRhbFwiLFxuICAgICAgXCJwcm9ncmVzc2l2ZSBtZXRhbFwiLFxuICAgICAgXCJzeW1waG9uaWMgbWV0YWxcIixcbiAgICAgIFwic3dlZGlzaCBtZXRhbFwiLFxuICAgICAgXCJnb3RoaWMgc3ltcGhvbmljIG1ldGFsXCIsXG4gICAgICBcInBvd2VyIG1ldGFsXCIsXG4gICAgICBcImZvbGsgbWV0YWxcIixcbiAgICAgIFwibWV0YWxcIixcbiAgICAgIFwibWVsb2RpYyBkZWF0aCBtZXRhbFwiLFxuICAgICAgXCJ2aWtpbmcgbWV0YWxcIixcbiAgICAgIFwic3ltcGhvbmljIGJsYWNrIG1ldGFsXCIsXG4gICAgICBcIm5lbyBjbGFzc2ljYWwgbWV0YWxcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5OC0wOS0yM1QyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiU3RyaW5nIENoZWVzZSBJbmNpZGVudFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJXVEZHWTExODdCOTkyQ0JBXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJqYW0gYmFuZFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA0LTAzLTMxVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCZW4gRm9sZHMgRml2ZVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJCQU44UzExODdGQjREMjJGXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwaWFubyByb2NrXCIsXG4gICAgICBcInBvd2VyIHBvcFwiLFxuICAgICAgXCJwZXJtYW5lbnQgd2F2ZVwiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCIsXG4gICAgICBcIm5lbyBtZWxsb3dcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5OS0xMi0yMFQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTctMDMtMDJUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkdvbWV6XCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUllXNEJYMTE4N0I5OERERThcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRwb3BcIixcbiAgICAgIFwibWFkY2hlc3RlclwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCIsXG4gICAgICBcInJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMTk5OS0xMC0xNFQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiRmVlZGVyXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkZHMkhGMTE4N0ZCM0Q0RUNcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImJyaXRwb3BcIixcbiAgICAgIFwid2Vsc2ggcm9ja1wiLFxuICAgICAgXCJyb2NrXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCIsXG4gICAgICBcInBvcCByb2NrXCIsXG4gICAgICBcIm1hZGNoZXN0ZXJcIixcbiAgICAgIFwiYWx0ZXJuYXRpdmUgcm9ja1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk5LTEwLTAyVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJFdmVuIEluIEJsYWNrb3V0c1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJDUDg0UjExODdCOTkxNzg5XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJwb3dlci1wb3AgcHVua1wiLFxuICAgICAgXCJkZWVwIHBvd2VyLXBvcCBwdW5rXCIsXG4gICAgICBcIm9yZ2NvcmVcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNS0wMi0wNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDUtMDItMDRUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDA2LTExLTExVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJUaGUgTGlnaHRuaW5nIFNlZWRzXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUlRBQUNBMTE4N0I5QjczREVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcIm1hZGNoZXN0ZXJcIixcbiAgICAgIFwiYnJpdHBvcFwiLFxuICAgICAgXCJuZXcgd2F2ZVwiLFxuICAgICAgXCJuZXcgcm9tYW50aWNcIixcbiAgICAgIFwibmV3IHdhdmUgcG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjE5OTktMTEtMjhUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlByZXNpZGVudHMgb2YgdGhlIFVTQVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJYREZOMDExODdCOUFFODBFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJhbHRlcm5hdGl2ZSByb2NrXCIsXG4gICAgICBcInBvc3QtZ3J1bmdlXCIsXG4gICAgICBcImdydW5nZVwiLFxuICAgICAgXCJwb3Agcm9ja1wiLFxuICAgICAgXCJmdW5rIG1ldGFsXCIsXG4gICAgICBcInBvd2VyIHBvcFwiLFxuICAgICAgXCJjb21pY1wiLFxuICAgICAgXCJza2EgcHVua1wiLFxuICAgICAgXCJmdW5rIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNS0wOC0xNlQyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiUGV0ZXIgUm93YW5cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSSzYwUkwxMTg3RkIzQTEzMFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYmx1ZWdyYXNzXCIsXG4gICAgICBcInByb2dyZXNzaXZlIGJsdWVncmFzc1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAzLTExLTI2VDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJBZ2FpbnN0IE1lIFwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJEVUZTMDExODdGQjRDRjVFXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJmb2xrIHB1bmtcIixcbiAgICAgIFwibWVsb2RpYyBoYXJkY29yZVwiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcIm9yZ2NvcmVcIixcbiAgICAgIFwicHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE0LTExLTE1VDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJLYWNleSBNdXNncmF2ZXMgXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUk9KTktFMTFFQjlDODI1M0ZcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImNvdW50cnkgZGF3blwiLFxuICAgICAgXCJkZWVwIGNvbnRlbXBvcmFyeSBjb3VudHJ5XCIsXG4gICAgICBcIm1vZGVybiBjb3VudHJ5IHJvY2tcIixcbiAgICAgIFwiY29udGVtcG9yYXJ5IGNvdW50cnlcIixcbiAgICAgIFwidGV4YXMgY291bnRyeVwiLFxuICAgICAgXCJjb3VudHJ5IHJvYWRcIixcbiAgICAgIFwib3V0bGF3IGNvdW50cnlcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNC0wNy0wOFQxODowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiSnVyYXNzaWMgNVwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJFR0MxWjExODdCOTk1QTkwXCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJ1bmRlcmdyb3VuZCBoaXAgaG9wXCIsXG4gICAgICBcImhpcCBob3BcIixcbiAgICAgIFwidHVybnRhYmxpc21cIixcbiAgICAgIFwicmFwXCIsXG4gICAgICBcIm9sZCBzY2hvb2wgaGlwIGhvcFwiLFxuICAgICAgXCJhbHRlcm5hdGl2ZSBoaXAgaG9wXCIsXG4gICAgICBcInJhcCByb2NrXCIsXG4gICAgICBcImVhc3QgY29hc3QgaGlwIGhvcFwiLFxuICAgICAgXCJoYXJkY29yZSBoaXAgaG9wXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTQtMDYtMjBUMTg6MDA6MjIuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlNhbWFtaWRvblwiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJUSjZBRTExODdCOThDQ0M1XCIsXG4gICAgXCJnZW5yZXNcIjogW1xuICAgICAgXCJzdG9tcCBhbmQgaG9sbGVyXCIsXG4gICAgICBcImluZGllIGZvbGtcIixcbiAgICAgIFwiZnJlYWsgZm9sa1wiLFxuICAgICAgXCJzbG93IGNvcmVcIixcbiAgICAgIFwibmV3IGFtZXJpY2FuYVwiLFxuICAgICAgXCJuZXcgd2VpcmQgYW1lcmljYVwiLFxuICAgICAgXCJjaGFtYmVyIHBvcFwiLFxuICAgICAgXCJmb2xrXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDgtMTEtMTBUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlVnbHkgRHVja2xpbmdcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSQllWSUgxMTg3QjlCOUY2NFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwidW5kZXJncm91bmQgaGlwIGhvcFwiLFxuICAgICAgXCJ0dXJudGFibGlzbVwiLFxuICAgICAgXCJoaXAgaG9wXCIsXG4gICAgICBcIm9sZCBzY2hvb2wgaGlwIGhvcFwiLFxuICAgICAgXCJhY2lkIGphenpcIixcbiAgICAgIFwicmFwXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGhpcCBob3BcIixcbiAgICAgIFwicmFwIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwNi0wNS0wM1QyMzowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIERlYWRseSBHZW50bGVtZW5cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSWFRGQUUxMjJDQzNCMTJFNlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwicHJvZ3Jlc3NpdmUgYmx1ZWdyYXNzXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTItMDMtMjFUMDA6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIkxlc3MgVGhhbiBKYWtlXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkc4RFhPMTE4N0I5QUY3NDNcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcInNrYSBwdW5rXCIsXG4gICAgICBcInNrYVwiLFxuICAgICAgXCJza2F0ZSBwdW5rXCIsXG4gICAgICBcIm1lbG9kaWMgaGFyZGNvcmVcIixcbiAgICAgIFwicG9wIHB1bmtcIixcbiAgICAgIFwicHVua1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDAxLTA0LTEwVDIzOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJHb25nXCI6IHtcbiAgICBcImVjaG9uZXN0SWRcIjogXCJBUkNaRDVZMTE4N0I5QURERjVcIixcbiAgICBcImdlbnJlc1wiOiBbXG4gICAgICBcImNhbnRlcmJ1cnkgc2NlbmVcIixcbiAgICAgIFwic3BhY2Ugcm9ja1wiLFxuICAgICAgXCJ6b2xvXCIsXG4gICAgICBcImtyYXV0IHJvY2tcIixcbiAgICAgIFwiYXJ0IHJvY2tcIixcbiAgICAgIFwiZXhwZXJpbWVudGFsXCIsXG4gICAgICBcInN5bXBob25pYyByb2NrXCIsXG4gICAgICBcInByb2dyZXNzaXZlIHJvY2tcIlxuICAgIF0sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAwMC0xMS0yNlQwMDowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiVGhlIFZhbmRhbHNcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSVzBLNUYxMTg3QjlBRkNDMFwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwic2thdGUgcHVua1wiLFxuICAgICAgXCJwdW5rXCIsXG4gICAgICBcInB1bmsgY2hyaXN0bWFzXCIsXG4gICAgICBcIm1lbG9kaWMgaGFyZGNvcmVcIixcbiAgICAgIFwiaGVhdnkgY2hyaXN0bWFzXCIsXG4gICAgICBcInNrYSBwdW5rXCIsXG4gICAgICBcImhhcmRjb3JlIHB1bmtcIixcbiAgICAgIFwic2thXCIsXG4gICAgICBcInBvcCBwdW5rXCJcbiAgICBdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMDAtMTAtMTZUMjM6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIk15IExpZmUgU3RvcnlcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSRU5JOEUxMTg3RkIzNjdFQlwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiYnJpdHBvcFwiLFxuICAgICAgXCJjaGFtYmVyIHBvcFwiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIxOTk3LTEyLTAxVDAwOjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJKZWZmIFJvc2Vuc3RvY2tcIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFSTE1BQ0MxMTg3RkI0NDNGNVwiLFxuICAgIFwiZ2VucmVzXCI6IFtcbiAgICAgIFwiZm9sayBwdW5rXCIsXG4gICAgICBcImFsdGVybmF0aXZlIGVtb1wiXG4gICAgXSxcbiAgICBcImdpZ3NcIjogW1xuICAgICAge1xuICAgICAgICBcImRhdGVcIjogXCIyMDE2LTAzLTIwVDE5OjAwOjAwLjAwMFpcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJCcmlhbiBGYWxsb25cIjoge1xuICAgIFwiZWNob25lc3RJZFwiOiBcIkFST1hWRUUxMjA4NkMxNUJBNFwiLFxuICAgIFwiZ2VucmVzXCI6IFtdLFxuICAgIFwiZ2lnc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDQtMDZUMTg6MDA6MDAuMDAwWlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIlB1YmxpYyBTZXJ2aWNlIEJyb2FkY2FzdGluZ1wiOiB7XG4gICAgXCJlY2hvbmVzdElkXCI6IFwiQVJGSEtMQjEzNjY1OEU2QTI0XCIsXG4gICAgXCJnZW5yZXNcIjogW10sXG4gICAgXCJnaWdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJkYXRlXCI6IFwiMjAxNi0wMi0wOFQxOTowMDowMC4wMDBaXCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iXX0=

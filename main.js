var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
var currIndex;                  // index of current chart
var currChart;                  // chart currently displayed
var chartList = [];             // array of all charts

// --- DATA ----------------------------------------------------------------------------------------
// --- LINE GRAPH ---
var dataList = [];              // array of data points in line graph
var tData = [];                 // array of all data points
var mData = [];                 // array of 30 most recent data points
var wData = [];                 // array of 7 most recent data points (DEFAULT LINE GRAPH DISPLAY)

// GENERATE DATA: 
// addPoint: adds a point to tData with date and "score"
function addPoint(year, month, day, num) {
    tData.push({
        x: new Date(year, month - 1, day),
        y: num
    });
}

// score: generates a random score between 0 and 100
function score() { return Math.floor((Math.random() * 100) + 1); }

// add January Data to tData
for (var i = 1; i < 32; i++) { addPoint(2016, 1, i, score()); }

// add February Data to tData
for (var i = 1; i < 29; i++) { addPoint(2016, 2, i, score()); }

// for (var i = 1; i < 62; i++) { temp.push(score()); }

// set wData and mData to their respective sections of tData
wData = tData.slice(tData.length - 7);
mData = tData.slice(tData.length - 30);

// set dataList to default section of tData
dataList = wData;

// --- BAR GRAPH ---
var dates = [];                 // array of dates represented in bar graph
var displayDates = [];          // array of dates currently displayed
var tScores = [];               // array of total times played on all difficulties
var eScores = [];               // array of times played on easy difficulty
var mScores = [];               // array of times played on medium difficulty
var hScores = [];               // array of times played on hard difficulty
var try1 = [];                  // array of times word said on first try
var try2 = [];                  // array of times word said on second try
var try3 = [];                  // array of times word said on third try

// var ePercent = [];              // array of percentages played on easy difficulty
// var mPercent = [];              // array of percentages played on medium difficulty
// var hPercent = [];              // array of percentages played on hard difficulty

// GENERATE DATA:
// rounds: generates a random number between 0 and 20 for the rounds played at a certain difficulty
function rounds() { return Math.floor((Math.random() * 20) + 1); }

// add January dates to dates array
for (var i = 1; i < 32; i++) { dates.push("Jan " + i + ", 2016"); }

// add February dates to dates array
for (var i = 1; i < 29; i++) { dates.push("Feb " + i + ", 2016"); }

// add random data for January and February to eScores, mScores, and hScores
for (var i = 1; i < 62; i++) {
    eScores.push(rounds());
    mScores.push(rounds());
    hScores.push(rounds());
    try1.push(rounds());
    try2.push(rounds());
    try3.push(rounds());
}

// calculates averages and puts them into their respective arrays
for (var i = 0; i < dates.length; ++i) {
    var total = eScores[i] + mScores[i] + hScores[i];
    tScores.push(total);
    // ePercent.push(eScores[i] / total);
    // mPercent.push(mScores[i] / total);
    // hPercent.push(hScores[i] / total);
}

// set displayDates to default section of dates
displayDates = dates.slice(dates.length - 7);

// --- ON CHANGE FUNCTIONS ---------------------------------------------------------------------------
//when chart type changed in menu, change chart to reflect option selected
$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") {
        displayDates = dates.slice(dates.length - 7) 
        setChart(0); 
    }
    else if (this.value == "point") { 
        dataList = wData;
        setChart(1); 
    }
    else if (this.value == "diff") { 
        displayDates = dates.slice(dates.length - 7)
        setChart(2); 
    } 
    else { 
        setChart(3); 
        document.getElementById('acc-q').style.display = "block";
        document.getElementById('acc-opt').style.display = "block";
    }
    if (this.value != "acc") {
        document.getElementById('acc-q').style.display = "none";
        document.getElementById('acc-opt').style.display = "none";
    }
});

//when accuracy question changed in menu, change chart and menu to reflect option selected
$('#acc-opt').val('selectedvalue').change(function() {
    if (this.value == "all") {
        document.getElementById('consonant-q').style.display = "none";
        document.getElementById('consonant-opt').style.display = "none";
        document.getElementById('syllable-q').style.display = "none";
        document.getElementById('syllable-opt').style.display = "none";
    } else if (this.value == "con") {
        document.getElementById('consonant-q').style.display = "block";
        document.getElementById('consonant-opt').style.display = "block";
        document.getElementById('syllable-q').style.display = "none";
        document.getElementById('syllable-opt').style.display = "none";
    } else {
        document.getElementById('syllable-q').style.display = "block";
        document.getElementById('syllable-opt').style.display = "block";
        document.getElementById('consonant-q').style.display = "none";
        document.getElementById('consonant-opt').style.display = "none";
    }
});

//when time range changed in menu, change chart && dataList to reflect option selected
$('#dateRange').val('selectedvalue').change(function() {
    if (this.value == "7") { 
        if (currIndex == 1) { dataList = wData; } 
        else if (currIndex == 0 || currIndex == 2) { displayDates = dates.slice(dates.length - 7); }
    }
    else if (this.value == "30") { 
        if (currIndex == 1) { dataList = mData; } 
        else if (currIndex == 0 || currIndex == 2) { displayDates = dates.slice(dates.length - 30); }
    }
    else { 
        if (currIndex == 1) { dataList = tData; } 
        else if (currIndex == 0 || currIndex == 2) { displayDates = dates; }
    }
    setChart(currIndex);
});

// --- CHARTS --------------------------------------------------------------------------------------

//CHART 0: DEFAULT CHART: points as a line graph and rounds played as a bar graph
var build0 = function() {
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: displayDates,
            datasets: [{
                type: 'bar',
                label: 'Rounds Played',
                labels: dates,
                data: tScores,
                backgroundColor: 'rgba(255, 242, 0, 0.5)'
            }, 
            {
                type: 'line',
                label: 'Points Scored',
                data: tData,
                fill: false,
                borderColor: 'rgba(0,0,255, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Points Scored and Rounds Played',
                position: 'top'
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
    return myChart;
}

// CHART 1: points as a line graph
var build1 = function () {
    var myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Points',
                data: dataList,
                backgroundColor: 'rgba(0,0,255, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Points Scored',
                position: 'top'
            },
            legend: {
                display: true,
                position: 'right'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: { unit: 'day' }
                }]
            }
        }
    });
    return myChart1;
}


// CHART 2: Various difficulties shown as a bar graph
var build2 = function () {
    var myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: displayDates,
            datasets: [{
                label: 'Easy',
                data: eScores,
                backgroundColor: 'rgba(0,255,0, 0.5)'
            }, {
                label: 'Medium',
                data: mScores,
                backgroundColor: 'rgba(255, 150, 0, 0.5)'
            }, {
                label: 'Hard',
                data: hScores,
                backgroundColor: 'rgba(255, 0, 0, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'User Game Play Progress',
                position: 'top'
            },
            legend: {
                display: true,
                position: 'right'
            },
            scales: {
                yAxes: [{ stacked: true }]
            }
        }
    });
    return myChart2;
}


// CHART 3: Syllables/Consonants accuracy shown as a bar graph
var build3 = function () {
    var myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: displayDates,
            datasets: [{
                label: 'First Try',
                data: try1,
                backgroundColor: 'rgba(0, 0, 255, 0.5)'
            }, {
                label: 'Second Try',
                data: try2,
                backgroundColor: 'rgba(0, 255, 250, 0.5)'
            }, {
                label: 'Third Try',
                data: try3,
                backgroundColor: 'rgba(0, 255, 161, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Accuracy for Consonants and Syllables',
                position: 'top'
            },
            legend: {
                display: true,
                position: 'right'
            },
            scales: {
                yAxes: [{ stacked: true }]
            }
        }
    });
    return myChart3;
}

// Put all charts into chartList array
chartList.push(build0);
chartList.push(build1);
chartList.push(build2);
chartList.push(build3);

// setChart: loads correct chart to page based on an index (1-4)
function setChart(index) {
    currIndex = index;
    if (currChart) { currChart.destroy(); }
    currChart = chartList[index]();
}

setChart(0);            // DEFAULT GRAPH DISPLAYED

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
var try1 = [];                  // array of percentage word said on first try (out of total words said in day)
var try2 = [];                  // array of percentage word said on second try (out of total words said in day)
var try3 = [];                  // array of percentage word said on third try (out of total words said in day)
var dispT1 = [];                // subarray of try1 currently displayed
var dispT2 = [];                // subarray of try2 currently displayed
var dispT3 = [];                // subarray of try3 currently displayed



// GENERATE DATA:
// rounds: generates a random number between 0 and 20 for the rounds played at a certain difficulty
function rounds() { return Math.floor((Math.random() * 20) + 1); }

// add January dates to dates array
for (var i = 1; i < 32; i++) { dates.push("Jan " + i + ", 2016"); }

// add February dates to dates array
for (var i = 1; i < 29; i++) { dates.push("Feb " + i + ", 2016"); }

// add random data for January and February to eScores, mScores, and hScores
for (var i = 1; i < 60 ; i++) {
    eScores.push(rounds());
    mScores.push(rounds());
    hScores.push(rounds());
}

// calculates averages and puts them into their respective arrays
for (var i = 0; i < dates.length; ++i) {
    var total = eScores[i] + mScores[i] + hScores[i];
    tScores.push(total);
    eScore = (eScores[i] / total) * 100;
    mScore = (mScores[i] / total) * 100;
    hScore = (hScores[i] / total) * 100;
    try1.push(eScore);
    try2.push(mScore);
    try3.push(hScore);
}

// set dispTX to default sections of arrays
dispT1 = try1.slice(try1.length - 7);
dispT2 = try2.slice(try2.length - 7);
dispT3 = try3.slice(try3.length - 7);

// set displayDates to default section of dates
displayDates = dates.slice(dates.length - 7);

// --- ON CHANGE FUNCTIONS ---------------------------------------------------------------------------
//when chart type changed in menu, change chart to reflect option selected
$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") {
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(0); 
    } else if (this.value == "diff") { 
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(1); 
    } 
    else { 
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(2); 
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
        if (currIndex == 0) { dataList = wData; }
        if (currIndex == 2) {
            dispT1 = try1.slice(try1.length - 7);
            dispT2 = try2.slice(try2.length - 7);
            dispT3 = try3.slice(try3.length - 7);
        }
        displayDates = dates.slice(dates.length - 7); 
    } else if (this.value == "30") { 
        if (currIndex == 0) { dataList = mData; }
        if (currIndex == 2) {
            dispT1 = try1.slice(try1.length - 30);
            dispT2 = try2.slice(try2.length - 30);
            dispT3 = try3.slice(try3.length - 30);
        }
        displayDates = dates.slice(dates.length - 30); 
    } else { 
        if (currIndex == 0) { dataList = tData; }
        if (currIndex == 2) {
            dispT1 = try1;
            dispT2 = try2;
            dispT3 = try3;
        }
        displayDates = dates; 
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
                label: 'Number of Rounds Played',
                labels: dates,
                data: tScores,
                backgroundColor: 'rgba(255, 242, 0, 0.5)'
            }, 
            {
                type: 'line',
                label: 'Number Points Scored',
                data: dataList,
                fill: false,
                borderColor: 'rgba(0,0,255, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Points Scored and Number of Rounds Played',
                position: 'top',
                fontSize: 17
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
    return myChart;
}

// CHART 1: Various difficulties shown as a bar graph
var build1 = function () {
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
                position: 'top',
                fontSize: 17
            },
            legend: {
                display: true,
                position: 'right'
            },
            scales: { yAxes: [{ stacked: true }] }
        }
    });
    return myChart2;
}

// CHART 2: Syllables/Consonants accuracy shown as a bar graph
var build2 = function () {
    var myChart3 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayDates,
            datasets: [{
                type: 'line',
                label: 'First Try',
                data: dispT1,
                fill: false,
                borderColor: 'rgba(0, 0, 255, 0.5)'
            }, {
                type: 'line',
                label: 'Second Try',
                data: dispT2,
                fill: false,
                borderColor: 'rgba(0, 255, 250, 0.5)'
            }, {
                type: 'line',
                label: 'Third Try',
                data: dispT3,
                fill: false,
                borderColor: 'rgba(0, 255, 161, 0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Accuracy for Consonants and Syllables (Percentage)',
                position: 'top',
                fontSize: 17
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
    return myChart3;
}

// Put all charts into chartList array
chartList.push(build0);
chartList.push(build1);
chartList.push(build2);

// setChart: loads correct chart to page based on an index (1-4)
function setChart(index) {
    currIndex = index;
    if (currChart) { currChart.destroy(); }
    currChart = chartList[index]();
}

setChart(0);            // DEFAULT GRAPH DISPLAYED

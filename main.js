var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
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
var tScores = [];               // array of total times played on all difficulties
var eScores = [];               // array of times played on easy difficulty
var mScores = [];               // array of times played on medium difficulty
var hScores = [];               // array of times played on hard difficulty
var ePercent = [];              // array of percentages played on easy difficulty
var mPercent = [];              // array of percentages played on medium difficulty
var hPercent = [];              // array of percentages played on hard difficulty

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
}

// calculates averages and puts them into their respective arrays
for (var i = 0; i < dates.length; ++i) {
    var total = eScores[i] + mScores[i] + hScores[i];
    tScores.push(total);
    ePercent.push(eScores[i] / total);
    mPercent.push(mScores[i] / total);
    hPercent.push(hScores[i] / total);
}











// --- ON CHANGE FUNCTIONS ---------------------------------------------------------------------------
//when chart type changed in menu, change chart to reflect option selected
$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") { setChart(0); }
    else if (this.value == "diff") { setChart(2); } 
    else if (this.value == "point") { setChart(1); }
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

//when time range changed in menu, change chart && dataList to reflect option selected
$('#dateRange').val('selectedvalue').change(function() {
    var temp = currChart;
    if (this.value == "7") { dataList = wData; }
    else if (this.value == "30") { dataList = mData; }
    else { dataList = tData; }
    setChart(1);
});

// --- CHARTS --------------------------------------------------------------------------------------

//CHART 0: DEFAULT CHART: points as a line graph and rounds played as a bar graph
var build0 = function() {
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                type: 'bar',
                label: 'Rounds Played',
                labels: dates,
                data: tScores,
                backgroundColor: 'rgba(255, 150, 0, 0.3)'
            }, 
            {
                type: 'line',
                label: 'Points Scored',
                data: tData,
                fill: false,
                borderColor: 'rgba(0,0,255, 0.2)'
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
    })
}






















var build1 = function () {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Points',
                data: dataList,
                backgroundColor: 'rgba(0,0,255, 0.2)'
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
                    time: {
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return myChart;
}


//chart 2
var build2 = function () {
    var myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Easy',
                data: eScores,
                backgroundColor: 'rgba(0,255,0, 0.2)'
            }, {
                label: 'Medium',
                data: mScores,
                backgroundColor: 'rgba(255, 150, 0, 0.2)'
            }, {
                label: 'Hard',
                data: hScores,
                backgroundColor: 'rgba(255,0,0,0.2)'
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
                xAxes: [{
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    return myChart2;
}


//chart 3
var build3 = function () {
    var myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Easy',
                data: ePercent,
                backgroundColor: 'rgba(0,255,0, 0.2)'
            }, {
                label: 'Medium',
                data: mPercent,
                backgroundColor: 'rgba(255, 150, 0, 0.2)'
            }, {
                label: 'Hard',
                data: hPercent,
                backgroundColor: 'rgba(255,0,0,0.2)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Percentages of Each Difficulty Played',
                position: 'top'
            },
            legend: {
                display: true,
                position: 'right'
            },
            scales: {
                xAxes: [{
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
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


//switch charts
//need to fix so works when change time range
function setChart(index) {
    if (currChart)
        currChart.destroy();
    currChart = chartList[index]();

}

setChart(0);

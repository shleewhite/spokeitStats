var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// current chart showing
var currChart;

//chart list for each chart
var chartList = [];

// --- LINE GRAPH ---
// dataList holds the list of data points in line graph
// wData holds list of seven most recent data points
// mData holds list of 30 most recent data points
// tData holds list of all data points
var dataList = [];
var wData = [];
var mData = [];
var tData = [];

/*
addPoint adds a point to the line graph with the given
date and "score"
*/
function addPoint(year, month, day, num) {
    tData.push({
        x: new Date(year, month - 1, day),
        y: num
    });
}

//generates a random score between 0 and 100
function score() {
    return Math.floor((Math.random() * 100) + 1);
}

//example for addPoint function
//January
addPoint(2016, 1, 12, score());
addPoint(2016, 1, 15, score());
addPoint(2016, 1, 20, score());
addPoint(2016, 1, 27, score());
addPoint(2016, 1, 28, score());
//February
for (var i = 1; i < 29; i++) {
    addPoint(2016, 2, i, score());
}

wData = tData.slice(tData.length -7);
mData = tData.slice(tData.length-30);

//DEFAULT: dataList shown is wData;
dataList = wData;

// --- BAR GRAPHS ---
// put values here
var dates = ['3/4/2017', '3/5/2017'];
var eScores = [20, 16];
var mScores = [12, 10];
var hScores = [6, 8];

// for the averages *don't touch
var ePercent = [];
var mPercent = [];
var hPercent = [];

//when chart type changed, chart change reflect option selected
$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") { setChart(0); }
    else if (this.value == "diff") { setChart(1); } 
    else if (this.value == "point") { setChart(0); }
    else { 
        setChart(2); 
        document.getElementById('acc-q').style.display = "block";
        document.getElementById('acc-opt').style.display = "block";
    }
    if (this.value != "acc") {
        document.getElementById('acc-q').style.display = "none";
        document.getElementById('acc-opt').style.display = "none";
    }
});

//when time range changed, chart && dataList change to reflect option selected
$('#dateRange').val('selectedvalue').change(function() {
    if (this.value == "7") { dataList = wData; }
    else if (this.value == "30") { dataList = mData; }
    else { dataList = tData; }
    setChart(0);
});

// init
//build the average list
for (var i = 0; i < dates.length; ++i) {
    var total = eScores[i] + mScores[i] + hScores[i];

    ePercent.push(eScores[i] / total);
    mPercent.push(mScores[i] / total);
    hPercent.push(hScores[i] / total);
}


//creates the chart
var build1 = function () {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Points',
                data: dataList,
                backgroundColor: [
                    'rgba(0,0,255, 0.2)'
                ]
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
chartList.push(build1);


//chart 2
var build2 = function () {
    var myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["3/4/2017", "3/5/2017"],
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
chartList.push(build2);


//chart 3
var build3 = function () {
    var myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["3/4/2017", "3/5/2017"],
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
chartList.push(build3);


//switch charts
function setChart(index) {
    if (currChart)
        currChart.destroy();
    currChart = chartList[index]();

}

setChart(0);

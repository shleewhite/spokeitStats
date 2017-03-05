var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// current chart showing
var currChart;

//chart list for each chart
var chartList = [];

// --- LINE GRAPH ---
// dataList holds the list of data points for line graph
var dataList = [];

/*
addPoint adds a point to the line graph with the given
date and "score"
*/
function addPoint(year, month, day, num) {
    dataList.push({
        x: new Date(year, month - 1, day),
        y: num
    });
}

//example for addPoint function
addPoint(2016, 1, 12, 100);
addPoint(2016, 2, 13, 50);


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


// --- Mouse Event ---
// on click change chart
var chartNum = 0;
canvas.onclick = function (e) {
    //console.log(chartNum);
    ++chartNum;
    if (chartNum > dates.length) {
        chartNum = 0;
    }
    setChart(chartNum);
}

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

setChart(chartNum);
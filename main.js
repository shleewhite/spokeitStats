var ctx = document.getElementById("myChart");

// dataList holds the list of data points
var dataList = [];

/*
addPoint adds a point to the graph with the given
date and "score"
*/
function addPoint(year, month, day, num) {
    dataList.push({
        x: new Date(year, month-1, day),
        y: num
    });
}

addPoint(2016, 1, 12, 100);
addPoint(2016, 2, 13, 50);

//creates the chart
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
                    beginAtZero:true
                }
            }]
        }
    }
});
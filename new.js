// canvas and chart related variables
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
var currIndex;                  		// index of current chart
var currChart;                  		// chart currently displayed
var chartList = [];             		// array of all charts

// data related variables
var dates = [];							// array for dates
var displayDates = [];         			// array of dates currently displayed
var time_speak = []						// array of amount of time spoken each day

var try1 = []							// array of times successful on first attempt each day
var try2 = []							// array of times successful on second attempt each day
var try3 = []							// array of times successful on third attempt each day

var w_avg = []                          // array of weighted average scores for each day

var h_perf = []                         // arrays for performance based on what said
var p_perf = []
var b_perf = []
var t_perf = []
var d_perf = []
var k_perf = []
var g_perf = []
var s_perf = []
var th_perf = []
var ths_perf = []
var sh_perf = []
var f_perf = []
var ch_perf = []
var j_perf = []
var nt_perf = []
var nd_perf = []
var lt_perf = []
var ld_perf = []

// adds all dates in January and February to dates array
for (var i = 1; i < 32; i++) { dates.push("Jan " + i + ", 2016"); }
for (var i = 1; i < 29; i++) { dates.push("Feb " + i + ", 2016"); }

// set displayDates to default section of dates
displayDates = dates.slice(dates.length - 7);

// adds amounts of time spoken each day
for (var i = 0; i < dates.length; i++) { time_speak.push(Math.random() * 21); }

// adds a value to each try arrays
for (var i = 0; i < dates.length; i++) {
	try1.push(Math.floor(Math.random() * 15));
	try2.push(Math.floor(Math.random() * 15));
	try3.push(Math.floor(Math.random() * 15));
}

// adds values to w_avg array
for (var i = 0; i < dates.length; i++) {
    var sum_1 = 0;
    var diff_sum = 0;
    for (var j = 0; j < try1[i]; j++) {
        temp = Math.floor(Math.random() * 9);
        sum_1 += temp;
        diff_sum += temp;
    }

    for (var j = 0; j < try2[i]; j++) {
        temp = Math.floor(Math.random() * 9);
        sum_1 += 2 * temp;
        diff_sum += temp;
    }

    for (var j = 0; j < try3[i]; j++) {
        temp = Math.floor(Math.random() * 9);
        sum_1 += 3 * temp;
        diff_sum += temp;
    }

    w_avg.push(sum_1 / diff_sum);
}

// add values to performance arrays
for (var i = 0; i < dates.length; ++i) {
    h_perf.push((Math.random()*9)*(Math.random()*4))
    p_perf.push((Math.random()*9)*(Math.random()*4))
    b_perf.push((Math.random()*9)*(Math.random()*4))
    t_perf.push((Math.random()*9)*(Math.random()*4))
    d_perf.push((Math.random()*9)*(Math.random()*4))
    k_perf.push((Math.random()*9)*(Math.random()*4))
    g_perf.push((Math.random()*9)*(Math.random()*4))
    s_perf.push((Math.random()*9)*(Math.random()*4))
    th_perf.push((Math.random()*9)*(Math.random()*4))
    ths_perf.push((Math.random()*9)*(Math.random()*4))
    sh_perf.push((Math.random()*9)*(Math.random()*4))
    f_perf.push((Math.random()*9)*(Math.random()*4))
    ch_perf.push((Math.random()*9)*(Math.random()*4))
    j_perf.push((Math.random()*9)*(Math.random()*4))
    nt_perf.push((Math.random()*9)*(Math.random()*4))
    nd_perf.push((Math.random()*9)*(Math.random()*4))
    lt_perf.push((Math.random()*9)*(Math.random()*4))
    ld_perf.push((Math.random()*9)*(Math.random()*4))

}

$('#dateRange').val('selectedvalue').change(function() {
    if (this.value == "7") { 
        displayDates = dates.slice(dates.length - 7); 
    } else if (this.value == "30") { 
        displayDates = dates.slice(dates.length - 30); 
    } else { 
        displayDates = dates; 
    }
    setChart(currIndex);
});

$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") {
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(0); 
    } else if (this.value == "per") {
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(1); 
    }

});

var chart1_dataset = [
    {
        label: 'Weighted Avgerage',
        type: 'line',
        data: w_avg,
        borderColor: 'blue',
        fill: false
    }, {
        label: 'Time Speaking',
        type: 'bar',
        data: time_speak,
        backgroundColor: 'green'
    }
]

var chart2_dataset = [
    {
        label: '/h/',
        data: h_perf,
        borderColor: 'rgba(255, 0, 0, 1)',
        fill: false
    }, {
        label: '/p/',
        data: p_perf,
        borderColor: 'rgba(255, 128, 0, 1)',
        fill: false
    } , {
        label: '/b/',
        data: b_perf,
        borderColor: 'rgba(255, 191, 0, 1)',
        fill: false
    }, {
        label: '/t/',
        data: t_perf,
        borderColor: 'rgba(255, 255, 0, 1)',
        fill: false
    }, {
        label: '/d/',
        data: d_perf,
        borderColor: 'rgba(191, 255, 0, 1)',
        fill: false
    }, {
        label: '/k/',
        data: k_perf,
        borderColor: 'rgba(128, 255, 0, 1)',
        fill: false
    }, {
        label: '/g/',
        data: g_perf,
        borderColor: 'rgba(0, 255, 128, 1)',
        fill: false
    }, {
        label: '/s/',
        data: s_perf,
        borderColor: 'rgba(0, 255, 255, 1)',
        fill: false
    }, {
        label: '/Θ/',
        data: th_perf,
        borderColor: '  rgba(0, 128, 255, 1)',
        fill: false,
        hidden: true
    }, {
        label: '/Θs/',
        data: ths_perf,
        borderColor: 'rgba(0, 0, 255, 1)',
        fill: false,
        hidden: true
    }, {
        label: '/∫/',
        data: sh_perf,
        borderColor: 'rgba(128, 0, 255, 1)',
        fill: false,
        hidden: true
    }, {
        label: '/f/',
        data: f_perf,
        borderColor: 'rgba(191, 0, 255, 1)',
        fill: false,
        hidden: true
    }, {
        label: '/t∫/',
        data: ch_perf,
        borderColor: 'rgba(255, 0, 255, 1)',
        fill: false,
        hidden: true
    }, {
        label: '/dʒ/',
        data: j_perf,
        borderColor: 'rgba(255, 0, 191, 1)',
        fill: false,
        hidden: true
    }, {
        label: 'Final /nt/',
        data: nt_perf,
        borderColor: 'rgba(255, 0, 128, 1)',
        fill: false,
        hidden: true
    }, {
        label: 'Final /nd/',
        data: nd_perf,
        borderColor: 'blue',
        fill: false,
        hidden: true
    }, {
        label: 'Final /lt/',
        data: lt_perf,
        borderColor: 'yellow',
        fill: false,
        hidden: true
    }, {
        label: 'Final /ld/',
        data: ld_perf,
        borderColor: 'rgba(255, 0, 0, 1)',
        fill: false,
        hidden: true
    }
]

// GRAPH 0: Accuracy and Difficulty Gradient
var build0 = function () {
	var myChart0 = new Chart(ctx, {
		type: 'bar',
		data: {
            labels: displayDates,
            datasets: chart1_dataset
        },
		options: {
	        title: {
	            display: true,
	            text: 'Overview',
	            position: 'top',
	            fontSize: 17
	        },
	        legend: {
	            display: true,
	            position: 'right'
	        },
	        scales: { 
        		yAxes: [{ 
	        		scaleLabel: {
	        			display: true,
	        			labelString: 'Time Spent Speaking (in Minutes)'
	        		}
        		}], xAxes: [{
	        		scaleLabel: {
	        			display: true, 
	        			labelString: 'Date (MM/DD/YYYY)'
	        		}
        		}]
	    	}
	    }			
	});
    return myChart0;
}

var build1 = function() {
    var myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayDates,
            datasets: chart2_dataset
        },
        options: {
            title: {
                display: true,
                text: 'Performance',
                position: 'top',
                fontSize: 17
            }, 
            legend: {
                display: true,
                position: 'right'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Performance (difficulty * attempts)'
                    }
                }], xAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date (MM/DD/YYYY)'
                    }
                }]
            }
        }
    });
    return myChart1;
}

// Put all charts into chartList array
chartList.push(build0);
chartList.push(build1);

// setChart: loads correct chart to page based on an index (1-4)
function setChart(index) {
    currIndex = index;
    if (currChart) { currChart.destroy(); }
    currChart = chartList[index]();
}

setChart(0); 

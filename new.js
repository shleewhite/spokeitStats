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
var disp_avg = []                       // array of scores currently displayed

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

var h_DISP = []                         // arrays of displayed perf data
var p_DISP = []
var b_DISP = []
var t_DISP = []
var d_DISP = []
var k_DISP = []
var g_DISP = []
var s_DISP = []
var th_DISP = []
var ths_DISP = []
var sh_DISP = []
var f_DISP = []
var ch_DISP = []
var j_DISP = []
var nt_DISP = []
var nd_DISP = []
var lt_DISP = []
var ld_DISP = []

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

// set disp_avg to default selection of dates
disp_avg = w_avg.slice(w_avg.length - 7);

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

// set performance arrays to default selection of dates
h_DISP = h_perf.slice(h_perf.length - 7);
p_DISP = p_perf.slice(p_perf.length - 7);
b_DISP = b_perf.slice(b_perf.length - 7);
t_DISP = t_perf.slice(t_perf.length - 7);
d_DISP = d_perf.slice(d_perf.length - 7);
k_DISP = k_perf.slice(k_perf.length - 7);
g_DISP = g_perf.slice(g_perf.length - 7);
s_DISP = s_perf.slice(s_perf.length - 7);
th_DISP = th_perf.slice(th_perf.length - 7);
ths_DISP = ths_perf.slice(ths_perf.length - 7);
sh_DISP = sh_perf.slice(sh_perf.length - 7);
f_DISP = f_perf.slice(f_perf.length - 7);
ch_DISP = ch_perf.slice(ch_perf.length - 7);
j_DISP = j_perf.slice(j_perf.length - 7);
nt_DISP = nt_perf.slice(nt_perf.length - 7);
nd_DISP = nd_perf.slice(nd_perf.length - 7);
lt_DISP = lt_perf.slice(lt_perf.length - 7);
ld_DISP = ld_perf.slice(ld_perf.length - 7);

$('#dateRange').val('selectedvalue').change(function() {
    if (this.value == "7") { 
        displayDates = dates.slice(dates.length - 7); 
        if (currIndex == 0) { disp_avg = w_avg.slice(w_avg.length - 7); }
        else if (currIndex == 1) {
            h_DISP = h_perf.slice(h_perf.length - 7);
            p_DISP = p_perf.slice(p_perf.length - 7);
            b_DISP = b_perf.slice(b_perf.length - 7);
            t_DISP = t_perf.slice(t_perf.length - 7);
            d_DISP = d_perf.slice(d_perf.length - 7);
            k_DISP = k_perf.slice(k_perf.length - 7);
            g_DISP = g_perf.slice(g_perf.length - 7);
            s_DISP = s_perf.slice(s_perf.length - 7);
            th_DISP = th_perf.slice(th_perf.length - 7);
            ths_DISP = ths_perf.slice(ths_perf.length - 7);
            sh_DISP = sh_perf.slice(sh_perf.length - 7);
            f_DISP = f_perf.slice(f_perf.length - 7);
            ch_DISP = ch_perf.slice(ch_perf.length - 7);
            j_DISP = j_perf.slice(j_perf.length - 7);
            nt_DISP = nt_perf.slice(nt_perf.length - 7);
            nd_DISP = nd_perf.slice(nd_perf.length - 7);
            lt_DISP = lt_perf.slice(lt_perf.length - 7);
            ld_DISP = ld_perf.slice(ld_perf.length - 7);
        }
    } else if (this.value == "30") { 
        displayDates = dates.slice(dates.length - 30); 
        if (currIndex == 0) { disp_avg = w_avg.slice(w_avg.length - 30); }
        else if (currIndex == 1) {
            h_DISP = h_perf.slice(h_perf.length - 30);
            p_DISP = p_perf.slice(p_perf.length - 30);
            b_DISP = b_perf.slice(b_perf.length - 30);
            t_DISP = t_perf.slice(t_perf.length - 30);
            d_DISP = d_perf.slice(d_perf.length - 30);
            k_DISP = k_perf.slice(k_perf.length - 30);
            g_DISP = g_perf.slice(g_perf.length - 30);
            s_DISP = s_perf.slice(s_perf.length - 30);
            th_DISP = th_perf.slice(th_perf.length - 30);
            ths_DISP = ths_perf.slice(ths_perf.length - 30);
            sh_DISP = sh_perf.slice(sh_perf.length - 30);
            f_DISP = f_perf.slice(f_perf.length - 30);
            ch_DISP = ch_perf.slice(ch_perf.length - 30);
            j_DISP = j_perf.slice(j_perf.length - 30);
            nt_DISP = nt_perf.slice(nt_perf.length - 30);
            nd_DISP = nd_perf.slice(nd_perf.length - 30);
            lt_DISP = lt_perf.slice(lt_perf.length - 30);
            ld_DISP = ld_perf.slice(ld_perf.length - 30);
        }
    } else { 
        displayDates = dates;
        if (currIndex == 0) { disp_avg = w_avg; }
        else if (currIndex == 1) {
            h_DISP = h_perf;
            p_DISP = p_perf;
            b_DISP = b_perf;
            t_DISP = t_perf;
            d_DISP = d_perf;
            k_DISP = k_perf;
            g_DISP = g_perf;
            s_DISP = s_perf;
            th_DISP = th_perf;
            ths_DISP = ths_perf;
            sh_DISP = sh_perf;
            f_DISP = f_perf;
            ch_DISP = ch_perf;
            j_DISP = j_perf;
            nt_DISP = nt_perf;
            nd_DISP = nd_perf;
            lt_DISP = lt_perf;
            ld_DISP = ld_perf;
        }
    }
    setChart(currIndex);
});

$('#type').val('selectedvalue').change(function() {
    if (this.value == "gen") {
        displayDates = dates.slice(dates.length - 7);
        disp_avg = w_avg.slice(w_avg.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(0); 
    } else if (this.value == "per") {
        displayDates = dates.slice(dates.length - 7);
        $("#dateRange").val('selectedvalue').val("7");
        setChart(1); 
    }
});

// GRAPH 0: Accuracy and Difficulty Gradient
var build0 = function () {
	var myChart0 = new Chart(ctx, {
		type: 'bar',
		data: {
            labels: displayDates,
            datasets: [
                {
                    label: 'Weighted Avgerage',
                    type: 'line',
                    data: disp_avg,
                    borderColor: 'blue',
                    fill: false
                }, {
                    label: 'Time Speaking',
                    type: 'bar',
                    data: time_speak,
                    backgroundColor: 'green'
                }
            ]
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
            datasets: [
                {
                    label: '/h/',
                    data: h_DISP,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    fill: false
                }, {
                    label: '/p/',
                    data: p_DISP,
                    borderColor: 'rgba(255, 128, 0, 1)',
                    fill: false
                } , {
                    label: '/b/',
                    data: b_DISP,
                    borderColor: 'rgba(255, 191, 0, 1)',
                    fill: false
                }, {
                    label: '/t/',
                    data: t_DISP,
                    borderColor: 'rgba(255, 255, 0, 1)',
                    fill: false
                }, {
                    label: '/d/',
                    data: d_DISP,
                    borderColor: 'rgba(191, 255, 0, 1)',
                    fill: false
                }, {
                    label: '/k/',
                    data: k_DISP,
                    borderColor: 'rgba(128, 255, 0, 1)',
                    fill: false
                }, {
                    label: '/g/',
                    data: g_DISP,
                    borderColor: 'rgba(0, 255, 128, 1)',
                    fill: false
                }, {
                    label: '/s/',
                    data: s_DISP,
                    borderColor: 'rgba(0, 255, 255, 1)',
                    fill: false
                }, {
                    label: '/Θ/',
                    data: th_DISP,
                    borderColor: '  rgba(0, 128, 255, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: '/Θs/',
                    data: ths_DISP,
                    borderColor: 'rgba(0, 0, 255, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: '/∫/',
                    data: sh_DISP,
                    borderColor: 'rgba(128, 0, 255, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: '/f/',
                    data: f_DISP,
                    borderColor: 'rgba(191, 0, 255, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: '/t∫/',
                    data: ch_DISP,
                    borderColor: 'rgba(255, 0, 255, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: '/dʒ/',
                    data: j_DISP,
                    borderColor: 'rgba(255, 0, 191, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: 'Final /nt/',
                    data: nt_DISP,
                    borderColor: 'rgba(255, 0, 128, 1)',
                    fill: false,
                    hidden: true
                }, {
                    label: 'Final /nd/',
                    data: nd_DISP,
                    borderColor: 'blue',
                    fill: false,
                    hidden: true
                }, {
                    label: 'Final /lt/',
                    data: lt_DISP,
                    borderColor: 'yellow',
                    fill: false,
                    hidden: true
                }, {
                    label: 'Final /ld/',
                    data: ld_DISP,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    fill: false,
                    hidden: true
                }
            ]
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

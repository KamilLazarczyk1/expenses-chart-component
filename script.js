fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        let maxChartBar = 0; // maxChartBar and tmp variables are crucial for changing the color of the bar representing the highest value 
        let tmp = 0;

        let totalNum = 0; // totalNum will contain the total amount of expenses

        for(let element of jsonData) //evaluating the total expenses of a user
        {
            totalNum+=element.amount;
        }

        document.querySelector("p#totalNum").innerText = "$" + totalNum;

        for (let i = 0; i < Object.keys(jsonData).length - 1; i++) {  //finding the highest value in the JSON file to change its style when generating the Google Chart
            if (Object.values(jsonData)[maxChartBar].amount < Object.values(jsonData)[i + 1].amount) {
                maxChartBar = i + 1;
            }
        }

        function drawChart() {
            let data = new google.visualization.DataTable();

            data.addColumn('string', 'Day');
            data.addColumn('number', 'Amount');
            data.addColumn({ type: 'string', role: 'style' });

            for (let element of jsonData) { // changes the color of the bar that is representing the highest number                
                if (maxChartBar == tmp) {
                    data.addRows([
                        [element.day, element.amount, "color: #76b5bc; border-radius: 10px;"]
                    ])
                } else {
                    data.addRows([
                        [element.day, element.amount, "color: #ec775f; border-radius: 10px;"]
                    ])
                }
                tmp++;
            }
            const options = {
                orientation: "horizontal",
                responsive: true,
                width: "100%",
                axisTitlesPosition: "none",
                legend: { position: "none" },
                backgroundColor: "#fffaf5",
                fontSize: 12,
                bar: {
                    groupWidth: "75%"
                },
                chartArea: {
                    width: "100%",
                    height: "80%",
                    top: 0
                },
                hAxis: {
                    textStyle:
                    {
                        color: "#93867b",
                        fontName: "'DM Sans', sans-serif"
                    },
                },
                vAxis: {
                    baselineColor: "#fffaf5",
                    format: "none",
                    gridlines: {
                        count: 0
                    },
                    textPosition: "none",
                }

            };
        
      
            const chart = new google.visualization.BarChart(document.querySelector("section.chartComponent div.chart"));
            chart.draw(data, options);    
            window.addEventListener('resize', e => { // making the chart responsive in the event of changing the windows size
                chart.draw(data, options);
            });
        }
    })




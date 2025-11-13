const ctx = document.getElementById("myChart");

new Chart(ctx,{
    type: "line",
    data: {
        labels: [
            "0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"
        ],
        datasets: [
            {
                label: "Today",
                data: [
                    15,21,26,28,28.5,28,30,44,51,42,25,19,18,22,38,46,48,46,42,38
                ],
                lineTension: 1/3,
                backgroundColor: "transparent",
                borderColor:"#284DFF",
                borderWidth: 2,
                pointRadius: 0.3,
                pointHoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#3366FF"
            },
            {
                label: "Yesterday",
                data: [
                    33,34,31.4,24,22.2,24.2,30,32.5,33,31.5,27,22,17.9,17.5,26,42,34,30,31.5,35
                ],
                lineTension: 1/3,
                backgroundColor: "transparent",
                borderColor:"#E4E5EF",
                borderWidth: 2,
                pointRadius: 0.3,
                pointHoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#E4E5EF"
            }
        ],
    },
    options: {
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false,  
                    drawTicks: true
                  }
            },
            y: {
                position: "right",
                suggestedMin: 0,
                suggestedMax: 60,
                grid: {
                    drawBorder: false, 
                }
            }
        },
        plugins: {
            legend: {
                align: "end",
                labels: {
                    usePointStyle: true,
                    pointStyle: "line",
                    boxWidth: 25,
                    boxHeight: 40,
                    padding: 10
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#fff",
                titleColor: "#000",
                bodyColor: "#000",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                titleFont: { size: 12, weight: "600" },
                bodyFont: { size: 12 },
                displayColors: false,
                padding: 8,
              }
        }
    }
})